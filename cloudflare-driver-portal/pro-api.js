import { proWorkflow } from "./pro-workflows.js";
// Dedicated Pro Championship staging engine. No live workbook, OBS or Pro Development writes.
const roles=["commentary","judge1","judge2","judge3","head"];
const stages=["Top 32","Top 16","Great 8","Final 4","Finals"];
const clean=(v,n=2000)=>String(v??"").trim().slice(0,n);
const json=(v,status=200)=>Response.json(v,{status,headers:{"Cache-Control":"private, no-store"}});
const fail=(error,status=403)=>json({error},status);
const now=()=>new Date().toISOString();
const hash=async x=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(x))),b=>b.toString(16).padStart(2,"0")).join("");
const same=(a,b)=>{a=String(a||"");b=String(b||"");let d=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)d|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return d===0;};
const eventKey=s=>[s.round,s.mode,s.stage,s.run,s.lead_id,s.chase_id];
async function access(req,env,staff){
 if(staff?.role==="staff")return "staff";
 const h=req.headers.get("Authorization")||"";
 if(!h.startsWith("Bearer "))return "";
 const k=h.slice(7);if(k.length<40||k.length>150)return "";
 const digest=await hash(k),rows=(await env.DB.prepare("SELECT role,token_hash FROM portal_pro_crew_keys").all()).results||[];
 return rows.find(x=>same(x.token_hash,digest))?.role||"";
}
const state=env=>env.DB.prepare("SELECT * FROM portal_pro_state WHERE id=1").first();
async function audit(env,who,action,detail){
 await env.DB.prepare("INSERT INTO portal_pro_audit(id,actor,action,detail,created_at) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),who,action,JSON.stringify(detail).slice(0,3000),now()).run();
}
async function people(env){
 const rows=(await env.DB.prepare("SELECT u.id,u.name,COALESCE(p.profile_json,'{}') profile_json,COALESCE(pt.points,0) points FROM portal_users u LEFT JOIN portal_profiles p ON p.user_id=u.id LEFT JOIN portal_points pt ON pt.user_id=u.id WHERE u.status='Approved' ORDER BY u.name COLLATE NOCASE LIMIT 150").all()).results||[];
 return rows.map(x=>{let p={};try{p=JSON.parse(x.profile_json)}catch{}return {id:x.id,name:x.name,number:clean(p.number,20),car:clean(p.car,160),team:clean(p.team,160),bio:clean(p.bio,500),points:x.points};});
}
async function snapshot(env,role){
 const s=await state(env);if(!s)return {error:"Run staging migration"};
 const [drivers,scores,chat,groups]=await Promise.all([
  people(env),
  env.DB.prepare("SELECT judge,line,angle,style,vote,notes,locked,updated_at FROM portal_pro_scores WHERE round=? AND mode=? AND stage=? AND run=? AND lead_id=? AND chase_id=? ORDER BY judge").bind(...eventKey(s)).all(),
  env.DB.prepare("SELECT seq,role,message,created_at FROM portal_pro_chat ORDER BY seq DESC LIMIT 80").all(),
  env.DB.prepare("SELECT g.group_number,g.slot,g.user_id,u.name FROM portal_groups g JOIN portal_users u ON u.id=g.user_id WHERE g.round=? ORDER BY g.group_number,g.slot").bind(s.round).all()
 ]);
 const all=scores.results||[],regular=all.filter(x=>["judge1","judge2","judge3"].includes(x.judge));
 const ready=regular.length===3&&regular.every(x=>x.locked===1);
 const reveal=role==="staff"||role==="commentary"&&ready;
 const safeScores=all.map(x=>({
  judge:x.judge,locked:!!x.locked,updated_at:x.updated_at,
  ...(reveal||x.judge===role?{line:x.line,angle:x.angle,style:x.style,vote:x.vote,notes:role==="staff"||role==="commentary"||x.judge===role?x.notes:""}:{})
 }));
 const average=ready&&s.mode==="qualifying"?Number((regular.reduce((z,x)=>z+Number(x.line)+Number(x.angle)+Number(x.style),0)/3).toFixed(2)):null;
 const votes=ready&&s.mode==="battle"?regular.map(x=>x.vote):[];
 const decision=ready&&s.mode==="battle"?["A","B","OMT","Head"].find(x=>votes.filter(v=>v===x).length>=2)||"Head":"";
 return {role,environment:"staging",state:{...s,obsConnected:false,workbookConnected:false,graphicsOnAir:false},drivers,groups:groups.results||[],scores:safeScores,chat:(chat.results||[]).reverse(),allLocked:ready,average,decision,warning:"STAGING: No live OBS, official workbook or Pro Development connection."};
}
async function payload(req){
 if(Number(req.headers.get("content-length")||0)>16000)throw Error("Request too large");
 return req.json();
}
export async function proApi(req,env,staff,path){
 const role=await access(req,env,staff),method=req.method;
 if(!role)return fail("Pro Championship staff or crew access required",401);
 if(path.startsWith("/api/pro/protests")||path.startsWith("/api/pro/interviews"))return await proWorkflow(req,env,role,path);
 if(path==="/api/pro/snapshot"&&method==="GET")return json(await snapshot(env,role));
 if(path==="/api/pro/chat"&&method==="POST"){
  const b=await payload(req),message=clean(b.message,500);if(!message)return fail("Type a message",400);
  await env.DB.prepare("INSERT INTO portal_pro_chat(role,message,created_at) VALUES(?,?,?)").bind(role,message,now()).run();
  return json({ok:true});
 }
 if(path==="/api/pro/score"&&method==="POST"){
  if(!["judge1","judge2","judge3","head"].includes(role))return fail("Judges only");
  const b=await payload(req),s=await state(env);
  if(!s?.lead_id)return fail("Select the driver in Broadcast Control first",409);
  if(s.mode==="battle"&&s.run!==2)return fail("Battle voting begins after Run 2",409);
  let line=null,angle=null,style=null,vote="";
  if(s.mode==="qualifying"){
   line=Number(b.line);angle=Number(b.angle);style=Number(b.style);
   if(![line,angle,style].every(Number.isFinite)||line<0||line>60||angle<0||angle>20||style<0||style>20)return fail("Line 0–60, Angle 0–20, Style 0–20",400);
  }else{
   vote=clean(b.vote,10);if(!["A","B","OMT","Head"].includes(vote))return fail("Select A, B, OMT or Head",400);
  }
  if(role==="head"){
   const r=(await env.DB.prepare("SELECT judge,vote,locked FROM portal_pro_scores WHERE round=? AND mode=? AND stage=? AND run=? AND lead_id=? AND chase_id=? AND judge IN ('judge1','judge2','judge3')").bind(...eventKey(s)).all()).results||[];
   if(s.mode!=="battle"||r.length!==3||!r.every(x=>x.locked)||!r.some(x=>x.vote==="Head"))return fail("Head Judge not eligible for this decision",409);
  }
  const q="INSERT INTO portal_pro_scores(round,mode,stage,run,lead_id,chase_id,judge,line,angle,style,vote,notes,locked,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,1,?) ON CONFLICT(round,mode,stage,run,lead_id,chase_id,judge) DO UPDATE SET line=excluded.line,angle=excluded.angle,style=excluded.style,vote=excluded.vote,notes=excluded.notes,locked=1,updated_at=excluded.updated_at WHERE portal_pro_scores.locked=0";
  const saved=await env.DB.prepare(q).bind(...eventKey(s),role,line,angle,style,vote,clean(b.notes,2000),now()).run();
  if(!saved.meta?.changes)return fail("Your decision is locked. Officials must explicitly reset this run.",409);
  await audit(env,role,"judge.lock",{round:s.round,mode:s.mode,run:s.run,lead_id:s.lead_id});
  return json({ok:true,locked:true,stagingOnly:true});
 }
 if(path==="/api/pro/notes"&&method==="POST"){
  if(!["judge1","judge2","judge3","head"].includes(role))return fail("Judges only");
  const b=await payload(req),s=await state(env);
  const written=await env.DB.prepare("UPDATE portal_pro_scores SET notes=?,updated_at=? WHERE round=? AND mode=? AND stage=? AND run=? AND lead_id=? AND chase_id=? AND judge=?").bind(clean(b.notes,2000),now(),...eventKey(s),role).run();
  if(!written.meta?.changes)return fail("Save notes after locking the run",409);
  return json({ok:true});
 }
 if(path==="/api/pro/crew/issue"&&method==="POST"){
  if(role!=="staff")return fail("Officials only");
  const b=await payload(req),who=clean(b.role,40);if(!roles.includes(who))return fail("Invalid role",400);
  const bytes=crypto.getRandomValues(new Uint8Array(32)),token=Array.from(bytes,x=>x.toString(16).padStart(2,"0")).join("");
  await env.DB.prepare("INSERT INTO portal_pro_crew_keys(role,token_hash,created_at) VALUES(?,?,?) ON CONFLICT(role) DO UPDATE SET token_hash=excluded.token_hash,created_at=excluded.created_at").bind(who,await hash(token),now()).run();
  await audit(env,role,"crew.rotate",{role:who});
  const url=new URL(who==="commentary"?"/pro/commentary":"/pro/judge?role="+who,req.url);
  url.hash="key="+encodeURIComponent(token);
  return json({ok:true,role:who,url:url.toString(),note:"Private link shown once. Regenerating revokes the previous key."});
 }
 if(path==="/api/pro/crew/revoke"&&method==="POST"){
  if(role!=="staff")return fail("Officials only");
  const who=clean((await payload(req)).role,40);if(!roles.includes(who))return fail("Invalid role",400);
  await env.DB.prepare("DELETE FROM portal_pro_crew_keys WHERE role=?").bind(who).run();
  await audit(env,role,"crew.revoke",{role:who});return json({ok:true});
 }
 if(path==="/api/pro/event"&&method==="POST"){
  if(role!=="staff")return fail("Officials only");
  const b=await payload(req),s=await state(env);
  const round=Number(b.round),run=Number(b.run),mode=clean(b.mode,20),stage=clean(b.stage,20),lead=clean(b.lead_id,90),chase=clean(b.chase_id,90);
  if(!Number.isInteger(round)||round<1||round>30||![1,2].includes(run)||!["qualifying","battle"].includes(mode)||!stages.includes(stage))return fail("Invalid round/stage",400);
  if((chase&&!lead)||(mode==="battle"&&lead&&(!chase||lead===chase)))return fail("Select two different drivers for a battle",400);
  const set=new Set((await people(env)).map(x=>x.id));
  if(lead&&!set.has(lead)||chase&&!set.has(chase))return fail("Approved Pro Championship drivers only",400);
  if(Number(b.version)!==s.version)return fail("Another window changed the event. Refresh.",409);
  const done=await env.DB.prepare("UPDATE portal_pro_state SET round=?,mode=?,stage=?,run=?,lead_id=?,chase_id=?,cue='idle',version=version+1,updated_at=? WHERE id=1 AND version=?").bind(round,mode,stage,run,lead,chase,now(),s.version).run();
  if(!done.meta?.changes)return fail("Event changed. Refresh and retry.",409);
  await audit(env,role,"event.select",{round,mode,stage,run,lead,chase});
  return json({ok:true,version:s.version+1,obsConnected:false});
 }
 if(path==="/api/pro/reset"&&method==="POST"){
  if(role!=="staff")return fail("Officials only");
  const b=await payload(req);if(b.confirm!=="RESET CURRENT RUN")return fail("Explicit reset confirmation required",400);
  const s=await state(env);
  const removed=await env.DB.prepare("DELETE FROM portal_pro_scores WHERE round=? AND mode=? AND stage=? AND run=? AND lead_id=? AND chase_id=?").bind(...eventKey(s)).run();
  await audit(env,role,"judge.reset",{round:s.round,mode:s.mode,stage:s.stage,run:s.run,removed:removed.meta?.changes});
  return json({ok:true,removed:removed.meta?.changes||0});
 }
 if(path==="/api/pro/history"&&method==="GET"){
  if(role!=="staff")return fail("Officials only");
  const [scores,audits]=await Promise.all([env.DB.prepare("SELECT * FROM portal_pro_scores ORDER BY updated_at DESC LIMIT 1000").all(),env.DB.prepare("SELECT * FROM portal_pro_audit ORDER BY created_at DESC LIMIT 250").all()]);
  return json({stagingOnly:true,scores:scores.results||[],audit:audits.results||[]});
 }
 return fail("Pro route not found",404);
}