// VDNZ PRO CHAMPIONSHIP / DRIVER PORTAL - staging-only Worker
// No official Google Sheets writes, no Pro Development connections, no public secret endpoints.
const enc=new TextEncoder();
const time=()=>new Date().toISOString();
const json=(body,status=200,extra={})=>Response.json(body,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...extra}});
const fail=(message,status=400)=>json({error:message},status);
const uid=()=>crypto.randomUUID();
const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const hx=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("");
const digest=async s=>hx(await crypto.subtle.digest("SHA-256",enc.encode(s)));
async function pwHash(password,salt) {
 const key=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
 return hx(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:enc.encode(salt),iterations:160000},key,256));
}
const eq=(a,b)=>{a=String(a||"");b=String(b||"");let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0;};
const s=(x,max=4000)=>String(x??"").trim().slice(0,max);
const getCookie=req=>{const m=(req.headers.get("cookie")||"").match(/(?:^|;\s*)__Host-vdnz_pro_session=([^;]+)/);return m?decodeURIComponent(m[1]):"";};
const cookie=(token,max)=>"__Host-vdnz_pro_session="+token+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age="+max;
const isValidEmail=e=>/^[^@\s]{1,100}@[^@\s]{1,100}\.[^@\s]{2,}$/.test(e);
const roundNo=x=>{const n=Number(x);if(!Number.isInteger(n)||n<1||n>30)throw Error("Invalid round");return n;};
async function body(req){if(Number(req.headers.get("content-length")||0)>25000)throw Error("Request too large");return await req.json();}
async function session(req,env){
 const token=getCookie(req);if(!token)return null;
 const row=await env.DB.prepare("SELECT user_id FROM portal_sessions WHERE token_hash=? AND expires_at>?").bind(await digest(token),Date.now()).first();
 if(!row)return null;
 if(row.user_id==="__staff__")return {id:"__staff__",role:"staff",name:"VDNZ Officials"};
 const user=await env.DB.prepare("SELECT id,email,name,status FROM portal_users WHERE id=?").bind(row.user_id).first();
 return user?{...user,role:"driver"}:null;
}
async function issueSession(env,user_id){
 const token=b64(crypto.getRandomValues(new Uint8Array(32)));
 await env.DB.prepare("INSERT INTO portal_sessions(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),user_id,Date.now()+7*86400000).run();
 return cookie(token,604800);
}
const staffRequired=u=>{if(!u||u.role!=="staff")throw Object.assign(Error("Staff access required"),{http:403});};
const loginRequired=u=>{if(!u)throw Object.assign(Error("Sign in required"),{http:401});};
async function sendNotice(env,user_id,title,message){
 await env.DB.prepare("INSERT INTO portal_notifications(id,user_id,title,message,created_at) VALUES(?,?,?,?,?)").bind(uid(),user_id,s(title,160),s(message,2000),time()).run();
}
async function currentRound(env){return await env.DB.prepare("SELECT * FROM portal_rounds ORDER BY round DESC LIMIT 1").first();}
async function listAssets(env,round){
 return (await env.DB.prepare("SELECT id,season,round,kind,file_name AS name,version,published_at AS publishedAt,bytes FROM portal_assets WHERE series='PRO' AND active=1 AND (round=0 OR round=?) ORDER BY round,kind").bind(round||0).all()).results||[];
}
async function publishAsset(env,v,actor){
 if(v.series&&v.series!=="PRO")throw Error("Pro Championship assets only");
 const kind=s(v.kind,30),season=s(v.season,4),round=Number(v.round||0),file=s(v.file_key,2000),name=s(v.file_name,180),version=s(v.version||"1",40);
 if(!["car-pack","track","line-map"].includes(kind)||!/^20\d\d$/.test(season)||!Number.isInteger(round)||round<0||round>30||!name||!version||!file)throw Error("Invalid asset information");
 if(file.startsWith("https://")){const u=new URL(file);if(u.username||u.password)throw Error("Invalid download link");}
 else if(!/^[\w.\-/]{1,500}$/.test(file)||file.includes(".."))throw Error("Supply an HTTPS link or valid R2 object key");
 const id=uid(),when=time();
 await env.DB.prepare("UPDATE portal_assets SET active=0 WHERE series='PRO' AND season=? AND round=? AND kind=?").bind(season,round,kind).run();
 await env.DB.prepare("INSERT INTO portal_assets(id,series,season,round,kind,file_key,file_name,version,bytes,mime,active,published_at,actor) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,"PRO",season,round,kind,file,name,version,Number(v.bytes)||0,"application/octet-stream",1,when,actor).run();
 return {id,kind,round,season,name,version};
}
const inputProfile=p=>{
 const keys=["bio","team","gamertag","simHistory","realCars","hobbies","goals","wheelbase","pedals","shifter","handbrake","car","location","discord","number"];
 const out={};for(const k of keys)out[k]=s(p?.[k],k==="bio"||k==="simHistory"?2500:350);
 return out;
};
const snapshot=async(env,u)=>{
 const r=await currentRound(env);
 const [profile,attendance,groups,questions,invites,notifs,points]=await Promise.all([
 env.DB.prepare("SELECT profile_json FROM portal_profiles WHERE user_id=?").bind(u.id).first(),
 env.DB.prepare("SELECT status FROM portal_attendance WHERE round=? AND user_id=?").bind(r?.round||0,u.id).first(),
 env.DB.prepare("SELECT group_number,slot FROM portal_groups WHERE round=? AND user_id=?").bind(r?.round||0,u.id).first(),
 env.DB.prepare("SELECT id,kind,subject,message,status,answer,created_at FROM portal_messages WHERE user_id=? ORDER BY created_at DESC LIMIT 40").bind(u.id).all(),
 env.DB.prepare("SELECT id,message,status,created_at FROM portal_invites WHERE user_id=? ORDER BY created_at DESC LIMIT 15").bind(u.id).all(),
 env.DB.prepare("SELECT id,title,message,created_at,read_at FROM portal_notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 40").bind(u.id).all(),
 env.DB.prepare("SELECT points FROM portal_points WHERE user_id=?").bind(u.id).first()
 ]);
 const approved=u.status==="Approved";
 const safeRound=r?{round:r.round,season:r.season,track_name:r.track_name,briefing_at:r.briefing_at,briefing_overview:r.briefing_overview,line_map_url:r.line_map_url,status:r.status,server_url:approved?r.server_url:"",server_password:approved?r.server_password:""}:null;
 return {user:u,profile:JSON.parse(profile?.profile_json||"{}"),round:safeRound,
 attendance:attendance?.status||"Pending",group:groups||null,points:points?.points||0,
 assets:approved?await listAssets(env,r?.round):[],
 questions:questions.results||[],invites:invites.results||[],notifications:notifs.results||[]};
};
async function handle(req,env){
 const url=new URL(req.url),path=url.pathname,method=req.method;
 if(path==="/health"&&method==="GET"){
  const t=await env.DB.prepare("SELECT COUNT(*) AS n FROM portal_users").first();
  await env.BUCKET.list({limit:1});
  return json({service:"VDNZ Pro Championship Driver Portal",environment:"staging",database:"connected",storage:"connected",accounts:t?.n||0,ok:true});
 }
 if(path==="/hub"||path.startsWith("/hub/")){
  if(method!=="GET")return fail("Method not allowed",405);
  if(path==="/hub/hub.css"||path==="/hub/login.js")return env.ASSETS.fetch(req);
  if(path==="/hub/login"||path==="/hub/login.html"){
   const current=await session(req,env);
   if(current?.role==="staff")return Response.redirect(new URL("/hub/",url.origin),302);
   return env.ASSETS.fetch(new Request(new URL("/hub/login.html",url.origin),req));
  }
  const staff=await session(req,env);
  if(!staff||staff.role!=="staff")return Response.redirect(new URL("/hub/login",url.origin),302);
  if(path==="/hub"||path==="/hub/")return env.ASSETS.fetch(new Request(new URL("/hub/index.html",url.origin),req));
  return env.ASSETS.fetch(req);
 }
 if(!path.startsWith("/api/"))return env.ASSETS.fetch(req);
 if(method!=="GET"&&req.headers.get("origin")!==url.origin)return fail("Invalid request origin",403);
 let u=await session(req,env);
 if(path==="/api/me"&&method==="GET")return json({user:u});
 if(path==="/api/signup"&&method==="POST"){
  const b=await body(req),name=s(b.name,90),email=s(b.email,200).toLowerCase(),password=String(b.password||"");
  if(name.length<2||!isValidEmail(email)||password.length<12||password.length>128) return fail("Enter a name, valid email and password of at least 12 characters");
  const salt=b64(crypto.getRandomValues(new Uint8Array(16))),hash=await pwHash(password,salt),id=uid();
  try{await env.DB.prepare("INSERT INTO portal_users(id,email,name,password_salt,password_hash,status,created_at) VALUES(?,?,?,?,?,'Pending',?)").bind(id,email,name,salt,hash,time()).run();}
  catch(e){if(String(e).includes("UNIQUE"))return fail("An account with that email already exists",409);throw e;}
  await env.DB.prepare("INSERT INTO portal_profiles(user_id,profile_json,updated_at) VALUES(?,?,?)").bind(id,"{}",time()).run();
  return json({ok:true,status:"Pending",message:"Account created. Staff must approve it before you can access competition downloads."},201,{"Set-Cookie":await issueSession(env,id)});
 }
 if(path==="/api/login"&&method==="POST"){
  const b=await body(req),email=s(b.email,200).toLowerCase(),password=String(b.password||"");
  const found=await env.DB.prepare("SELECT * FROM portal_users WHERE email=?").bind(email).first();
  if(!found||!eq(await pwHash(password,found.password_salt),found.password_hash))return fail("Incorrect email or password",401);
  if(found.status==="Suspended")return fail("Account suspended",403);
  return json({ok:true},200,{"Set-Cookie":await issueSession(env,found.id)});
 }
 if(path==="/api/admin/login"&&method==="POST"){
  const b=await body(req);
  if(!env.PORTAL_ADMIN_PASSWORD||env.PORTAL_ADMIN_PASSWORD.length<16)return fail("Staff login is not yet configured",503);
  if(!eq(await digest(String(b.password||"")),await digest(env.PORTAL_ADMIN_PASSWORD)))return fail("Incorrect staff password",401);
  return json({ok:true},200,{"Set-Cookie":await issueSession(env,"__staff__")});
 }
 if(path==="/api/logout"&&method==="POST"){
  const token=getCookie(req);if(token)await env.DB.prepare("DELETE FROM portal_sessions WHERE token_hash=?").bind(await digest(token)).run();
  return json({ok:true},200,{"Set-Cookie":cookie("",0)});
 }
 if(path==="/api/tech/publish"&&method==="POST"){
  if(!env.PRO_SCRUTINEERING_SYNC_KEY)return fail("Scrutineering sync is not configured",503);
  if(!eq(await digest(req.headers.get("x-vdnz-sync-key")||""),await digest(env.PRO_SCRUTINEERING_SYNC_KEY)))return fail("Unauthorized",401);
  const b=await body(req);if(b.series!=="PRO"||b.kind!=="car-pack")return fail("Pro Championship car packs only",403);
  return json({ok:true,asset:await publishAsset(env,b,"scrutineering")});
 }
 loginRequired(u);
 if(path==="/api/dashboard"&&method==="GET"){
  if(u.role==="staff")return json({user:u,staff:true});
  return json(await snapshot(env,u));
 }
 if(path==="/api/profile"&&method==="POST"){
  if(u.role!=="driver")return fail("Driver account required",403);
  const p=inputProfile(await body(req));
  await env.DB.prepare("INSERT INTO portal_profiles(user_id,profile_json,updated_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET profile_json=excluded.profile_json,updated_at=excluded.updated_at").bind(u.id,JSON.stringify(p),time()).run();
  return json({ok:true,profile:p});
 }
 if(path==="/api/messages"&&method==="POST"){
  if(u.role!=="driver")return fail("Driver account required",403);
  const b=await body(req),kind=s(b.kind,20),subject=s(b.subject,140),message=s(b.message,5000);
  if(!["briefing","judges","protest","support","interview"].includes(kind)||!subject||message.length<5)return fail("Choose a request type and enter your question");
  const id=uid();await env.DB.prepare("INSERT INTO portal_messages(id,user_id,kind,subject,message,status,answer,created_at,updated_at) VALUES(?,?,?,?,?,'New','',?,?)").bind(id,u.id,kind,subject,message,time(),time()).run();
  return json({ok:true,id},201);
 }
 if(path==="/api/interview/respond"&&method==="POST"){
  if(u.role!=="driver")return fail("Driver account required",403);
  const b=await body(req),status=s(b.status,12);
  if(!["Accepted","Declined"].includes(status))return fail("Invalid response");
  const result=await env.DB.prepare("UPDATE portal_invites SET status=?,updated_at=? WHERE id=? AND user_id=? AND status='Pending'").bind(status,time(),s(b.id,50),u.id).run();
  if(!result.meta.changes)return fail("Invitation not found or already answered",404);
  return json({ok:true});
 }
 if(path==="/api/download"&&method==="GET"){
  if(u.role!=="driver"||u.status!=="Approved")return fail("Approved registration required",403);
  const id=s(url.searchParams.get("id"),70);
  const row=await env.DB.prepare("SELECT * FROM portal_assets WHERE id=? AND series='PRO' AND active=1").bind(id).first();
  if(!row)return fail("File not available",404);
  if(row.file_key.startsWith("https://"))return Response.redirect(row.file_key,302);
  const obj=await env.BUCKET.get(row.file_key);if(!obj)return fail("File missing from staging storage",404);
  return new Response(obj.body,{headers:{"Content-Type":obj.httpMetadata?.contentType||"application/octet-stream","Content-Disposition":"attachment; filename=\""+row.file_name.replace(/[^\w .-]/g,"_")+"\"","Cache-Control":"private, no-store"}});
 }
 if(path==="/api/admin/social"&&method==="GET"){
  staffRequired(u);
  const result=await env.DB.prepare("SELECT id,title,body,channels,status,created_at FROM portal_social_drafts ORDER BY created_at DESC LIMIT 100").all();
  return json({drafts:result.results||[],publishing:"not-connected"});
 }
 if(path==="/api/admin/social"&&method==="POST"){
  staffRequired(u);const b=await body(req),title=s(b.title,160),post=s(b.body,8000),channels=s(b.channels,200);
  if(!title||!post)return fail("Draft title and post text are required");
  const id=uid();
  await env.DB.prepare("INSERT INTO portal_social_drafts(id,title,body,channels,status,created_at) VALUES(?,?,?,?,'Draft',?)").bind(id,title,post,channels,time()).run();
  return json({ok:true,id,status:"Draft",published:false},201);
 }
 if(path==="/api/admin/dashboard"&&method==="GET"){
  staffRequired(u);
  const [users,messages,attendance,groups,invites,notifications,round,assets]=await Promise.all([
    env.DB.prepare("SELECT id,email,name,status,created_at FROM portal_users ORDER BY created_at DESC LIMIT 200").all(),
    env.DB.prepare("SELECT m.*,p.name AS driver_name FROM portal_messages m JOIN portal_users p ON p.id=m.user_id ORDER BY m.created_at DESC LIMIT 100").all(),
    env.DB.prepare("SELECT a.*,p.name AS driver_name FROM portal_attendance a JOIN portal_users p ON p.id=a.user_id ORDER BY a.round DESC,p.name LIMIT 200").all(),
    env.DB.prepare("SELECT g.*,p.name AS driver_name,COALESCE(pt.points,0) AS points FROM portal_groups g JOIN portal_users p ON p.id=g.user_id LEFT JOIN portal_points pt ON pt.user_id=g.user_id ORDER BY g.round DESC,g.group_number,g.slot LIMIT 200").all(),
    env.DB.prepare("SELECT i.*,p.name AS driver_name FROM portal_invites i JOIN portal_users p ON p.id=i.user_id ORDER BY i.created_at DESC LIMIT 100").all(),
    env.DB.prepare("SELECT COUNT(*) AS n FROM portal_notifications").first(),
    currentRound(env),env.DB.prepare("SELECT id,season,round,kind,file_name,version,published_at FROM portal_assets WHERE series='PRO' AND active=1 ORDER BY published_at DESC LIMIT 50").all()
  ]);
  return json({user:u,users:users.results||[],messages:messages.results||[],attendance:attendance.results||[],groups:groups.results||[],invites:invites.results||[],notifications_count:notifications?.n||0,round,assets:assets.results||[],
    warnings:["Workbook X sync is not connected","Native phone push is not connected","Scrutineering webhook requires a separately configured sync key"]});
 }
 if(path==="/api/admin/user"&&method==="POST"){
  staffRequired(u);const b=await body(req),status=s(b.status,12);
  if(!["Pending","Approved","Suspended"].includes(status))return fail("Invalid account status");
  await env.DB.prepare("UPDATE portal_users SET status=? WHERE id=?").bind(status,s(b.id,80)).run();
  await sendNotice(env,s(b.id,80),"Registration status","Your Pro Championship account status is now "+status);
  return json({ok:true});
 }
 if(path==="/api/admin/round"&&method==="POST"){
  staffRequired(u);const b=await body(req),round=roundNo(b.round),season=s(b.season,4);
  if(!/^20\d\d$/.test(season))return fail("Invalid season");
  await env.DB.prepare("INSERT INTO portal_rounds(round,season,track_name,briefing_at,briefing_overview,line_map_url,server_url,server_password,status,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(round) DO UPDATE SET season=excluded.season,track_name=excluded.track_name,briefing_at=excluded.briefing_at,briefing_overview=excluded.briefing_overview,line_map_url=excluded.line_map_url,server_url=excluded.server_url,server_password=excluded.server_password,status=excluded.status,updated_at=excluded.updated_at").bind(round,season,s(b.track_name,150),s(b.briefing_at,80),s(b.briefing_overview,6000),s(b.line_map_url,1000),s(b.server_url,1000),s(b.server_password,160),s(b.status,60),time()).run();
  return json({ok:true});
 }
 if(path==="/api/admin/attendance"&&method==="POST"){
  staffRequired(u);const b=await body(req),round=roundNo(b.round),status=s(b.status,20);
  if(!["Pending","Here","Not Here"].includes(status))return fail("Invalid attendance");
  await env.DB.prepare("INSERT INTO portal_attendance(round,user_id,status,updated_at) VALUES(?,?,?,?) ON CONFLICT(round,user_id) DO UPDATE SET status=excluded.status,updated_at=excluded.updated_at").bind(round,s(b.user_id,80),status,time()).run();
  if(status==="Not Here")await env.DB.prepare("DELETE FROM portal_groups WHERE round=? AND user_id=?").bind(round,s(b.user_id,80)).run();
  return json({ok:true,workbookSync:"not-connected"});
 }
 if(path==="/api/admin/points"&&method==="POST"){
  staffRequired(u);const b=await body(req),points=Number(b.points);
  if(!Number.isSafeInteger(points)||points<0||points>100000)return fail("Invalid points");
  await env.DB.prepare("INSERT INTO portal_points(user_id,points) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET points=excluded.points").bind(s(b.user_id,80),points).run();
  return json({ok:true});
 }
 if(path==="/api/admin/groups"&&method==="POST"){
  staffRequired(u);const b=await body(req),round=roundNo(b.round),order=s(b.order,20);
  if(!["shuffle","low","high"].includes(order))return fail("Invalid group order");
  const row=await env.DB.prepare("SELECT COUNT(*) AS n FROM portal_groups WHERE round=?").bind(round).first();
  if(row?.n&&b.confirmOverwrite!==true)return fail("Groups already exist. Explicit confirmation required",409);
  const drivers=(await env.DB.prepare("SELECT p.id,p.name,COALESCE(t.points,0) AS points FROM portal_users p LEFT JOIN portal_points t ON t.user_id=p.id LEFT JOIN portal_attendance a ON a.round=? AND a.user_id=p.id WHERE p.status='Approved' AND COALESCE(a.status,'Pending')='Here' ORDER BY p.name").bind(round).all()).results||[];
  if(drivers.length>80)return fail("Maximum 80 drivers across four groups");
  if(order==="shuffle"){for(let i=drivers.length-1;i>0;i--){const j=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[drivers[i],drivers[j]]=[drivers[j],drivers[i]];}}
  else drivers.sort((a,b)=>(order==="low"?a.points-b.points:b.points-a.points)||a.name.localeCompare(b.name));
  await env.DB.prepare("DELETE FROM portal_groups WHERE round=?").bind(round).run();
  const sizes=Array.from({length:4},(_,i)=>Math.floor(drivers.length/4)+(i<drivers.length%4?1:0));
  let offset=0;for(let g=0;g<4;g++)for(let slot=1;slot<=sizes[g];slot++){const d=drivers[offset++];await env.DB.prepare("INSERT INTO portal_groups(round,user_id,group_number,slot) VALUES(?,?,?,?)").bind(round,d.id,g+1,slot).run();}
  return json({ok:true,counts:sizes,eligible:drivers.length,workbookSync:"not-connected"});
 }
 if(path==="/api/admin/answer"&&method==="POST"){
  staffRequired(u);const b=await body(req),answer=s(b.answer,5000),status=s(b.status,30);
  if(!["Answered","Under Review","Closed"].includes(status))return fail("Invalid request status");
  const row=await env.DB.prepare("SELECT user_id FROM portal_messages WHERE id=?").bind(s(b.id,80)).first();
  if(!row)return fail("Request not found",404);
  await env.DB.prepare("UPDATE portal_messages SET answer=?,status=?,updated_at=? WHERE id=?").bind(answer,status,time(),s(b.id,80)).run();
  await sendNotice(env,row.user_id,"Your request has an update",status+(answer?": "+answer:""));
  return json({ok:true});
 }
 if(path==="/api/admin/invite"&&method==="POST"){
  staffRequired(u);const b=await body(req),message=s(b.message,1000),target=s(b.user_id,80);
  if(!message)return fail("Invitation message required");
  let ids=target==="all"?(await env.DB.prepare("SELECT id FROM portal_users WHERE status='Approved'").all()).results.map(x=>x.id):[target];
  for(const id of ids){await env.DB.prepare("INSERT INTO portal_invites(id,user_id,message,status,created_at,updated_at) VALUES(?,?,?,'Pending',?,?)").bind(uid(),id,message,time(),time()).run();await sendNotice(env,id,"Interview invitation",message);}
  return json({ok:true,sent:ids.length});
 }
 if(path==="/api/admin/notify"&&method==="POST"){
  staffRequired(u);const b=await body(req),title=s(b.title,160),message=s(b.message,2000),target=s(b.user_id,80);
  if(!title||!message)return fail("Title and message required");
  const ids=target==="all"?(await env.DB.prepare("SELECT id FROM portal_users WHERE status='Approved'").all()).results.map(x=>x.id):[target];
  for(const id of ids)await sendNotice(env,id,title,message);
  return json({ok:true,recipients:ids.length,delivery:"in-app only"});
 }
 if(path==="/api/admin/asset"&&method==="POST"){
  staffRequired(u);return json({ok:true,asset:await publishAsset(env,await body(req),"VDNZ staff")});
 }
 return fail("Not found",404);
}
export default {async fetch(req,env){try{return await handle(req,env);}catch(e){console.error("VDNZ Portal request failed",e);return fail(e?.http?e.message:(e instanceof SyntaxError?"Invalid JSON":e?.message==="Request too large"?e.message:"Server error"),e?.http||500);}}};
