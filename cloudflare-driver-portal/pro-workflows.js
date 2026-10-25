// Pro Championship staging-only judge requests + commentator interviews
const out=(value,status=200)=>Response.json(value,{status,headers:{"Cache-Control":"no-store"}});
const err=(error,status=400)=>out({error},status);
const crop=(v,n)=>String(v??"").trim().slice(0,n);
const isJudge=r=>["judge1","judge2","judge3","head","staff"].includes(r);
const isComms=r=>["commentary","staff"].includes(r);
export async function proWorkflow(req,env,role,path){
 const method=req.method;
 if(path==="/api/pro/protests"&&method==="GET"){
  if(!isJudge(role))return err("Judges only",403);
  const [cases,notes]=await Promise.all([
   env.DB.prepare("SELECT m.id,m.user_id,u.name driver_name,m.kind,m.subject,m.message,m.status,m.answer,m.created_at FROM portal_messages m JOIN portal_users u ON u.id=m.user_id WHERE m.kind IN ('protest','judges') ORDER BY m.created_at DESC LIMIT 150").all(),
   env.DB.prepare("SELECT id,message_id,judge_role,note,created_at FROM portal_pro_protest_notes ORDER BY created_at DESC LIMIT 500").all()
  ]);
  return out({cases:cases.results||[],notes:notes.results||[],canReply:role==="head"||role==="staff"});
 }
 if(path==="/api/pro/protests/note"&&method==="POST"){
  if(!isJudge(role))return err("Judges only",403);
  const b=await req.json(),id=crop(b.id,100),note=crop(b.note,2000);
  if(!note)return err("A review note is required");
  const found=await env.DB.prepare("SELECT id FROM portal_messages WHERE id=? AND kind IN ('protest','judges')").bind(id).first();
  if(!found)return err("Request not found",404);
  await env.DB.prepare("INSERT INTO portal_pro_protest_notes(id,message_id,judge_role,note,created_at) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),id,role,note,new Date().toISOString()).run();
  return out({ok:true,private:true});
 }
 if(path==="/api/pro/protests/respond"&&method==="POST"){
  if(!["staff","head"].includes(role))return err("Head Judge or Officials only",403);
  const b=await req.json(),id=crop(b.id,100),answer=crop(b.answer,3000),status=crop(b.status,30);
  if(!["Under Review","Answered","Closed"].includes(status))return err("Invalid review status");
  if(status==="Answered"&&!answer)return err("Formal answer required");
  const found=await env.DB.prepare("SELECT user_id FROM portal_messages WHERE id=? AND kind IN ('protest','judges')").bind(id).first();
  if(!found)return err("Request not found",404);
  const now=new Date().toISOString();
  await env.DB.prepare("UPDATE portal_messages SET answer=?,status=?,updated_at=? WHERE id=?").bind(answer,status,now,id).run();
  await env.DB.prepare("INSERT INTO portal_notifications(id,user_id,title,message,created_at) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),found.user_id,"Judging request updated",status+(answer?": "+answer:""),now).run();
  return out({ok:true,delivery:"in-app only"});
 }

 if(path==="/api/pro/interviews"&&method==="GET"){
  if(!isComms(role))return err("Commentators only",403);
  const [invites,volunteers]=await Promise.all([
   env.DB.prepare("SELECT i.id,i.user_id,u.name driver_name,i.message,i.status,i.created_at,i.updated_at FROM portal_invites i JOIN portal_users u ON u.id=i.user_id ORDER BY i.created_at DESC LIMIT 150").all(),
   env.DB.prepare("SELECT m.id,m.user_id,u.name driver_name,m.subject,m.message,m.created_at,m.status FROM portal_messages m JOIN portal_users u ON u.id=m.user_id WHERE m.kind='interview' ORDER BY m.created_at DESC LIMIT 100").all()
  ]);
  return out({invites:invites.results||[],volunteers:volunteers.results||[],delivery:"Driver Portal in-app"});
 }
 if(path==="/api/pro/interviews/invite"&&method==="POST"){
  if(!isComms(role))return err("Commentators only",403);
  const b=await req.json(),userId=crop(b.user_id,90),message=crop(b.message,1200);
  if(message.length<5)return err("Enter interview details");
  const person=await env.DB.prepare("SELECT id,name FROM portal_users WHERE id=? AND status='Approved'").bind(userId).first();
  if(!person)return err("Select an approved driver",404);
  const id=crypto.randomUUID(),when=new Date().toISOString();
  await env.DB.prepare("INSERT INTO portal_invites(id,user_id,message,status,created_at,updated_at) VALUES(?,?,?,'Pending',?,?)").bind(id,userId,message,when,when).run();
  await env.DB.prepare("INSERT INTO portal_notifications(id,user_id,title,message,created_at) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),userId,"Commentary interview invitation",message,when).run();
  return out({ok:true,id,driver:person.name,delivery:"in-app only"});
 }
 return null;
}
