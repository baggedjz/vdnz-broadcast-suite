// Pro Championship crew workflows: confidential protests, interview invitation/reply queue.
const make=(tag,text="",cls="")=>{const e=document.createElement(tag);e.textContent=String(text??"");if(cls)e.className=cls;return e;};
const wrap=(parent,...children)=>{for(const c of children)if(c)parent.append(c);return parent;};
const statusLabel=status=>make("span",status||"New","tag");
let protestSignature="",interviewSignature="";
export async function renderProtests(api,notify,role,force=false){
 const target=document.getElementById("protests-list");
 if(!target)return;
 if(!["staff","judge1","judge2","judge3","head"].includes(role)){
  target.replaceChildren(make("p","Open your private Judge link to review protests.","muted"));return;
 }
 const d=await api("/api/pro/protests"),sig=JSON.stringify(d);
 if(!force&&sig===protestSignature)return;protestSignature=sig;
 target.replaceChildren();
 if(!d.cases.length){target.append(make("p","No protests or judge questions have been submitted.","muted"));return;}
 for(const item of d.cases){
  const box=make("article","","panel"),top=make("div","","inline"),notes=d.notes.filter(n=>n.message_id===item.id);
  wrap(top,make("b",item.driver_name+" · "+item.kind.toUpperCase()),statusLabel(item.status));
  wrap(box,top,make("h3",item.subject),make("p",item.message));
  for(const n of notes)box.append(make("p","[Internal · "+n.judge_role+"] "+n.note,"muted"));
  if(item.answer)box.append(make("p","Official reply: "+item.answer));
  const noteForm=make("form","","stack"),note=make("textarea");
  note.placeholder="Private judge review note (not sent to driver)";note.rows=2;note.required=true;note.maxLength=2000;
  const button=make("button","Save Private Judge Note");
  noteForm.append(note,button);
  noteForm.onsubmit=async e=>{
   e.preventDefault();button.disabled=true;
   try{await api("/api/pro/protests/note",{id:item.id,note:note.value});notify("Judge note saved privately");await renderProtests(api,notify,role,true);}
   catch(ex){notify(ex.message,true)}finally{button.disabled=false}
  };
  box.append(noteForm);
  if(d.canReply){
   const formal=make("form","","stack"),reply=make("textarea"),select=make("select");
   reply.placeholder="Formal response to driver";reply.rows=2;reply.maxLength=3000;reply.value=item.answer||"";
   for(const s of ["Under Review","Answered","Closed"]){const o=make("option",s);o.value=s;select.append(o);}
   select.value=["Under Review","Answered","Closed"].includes(item.status)?item.status:"Under Review";
   const send=make("button","Update Protest & Notify Driver","primary");
   formal.append(make("h3","Head Judge / Official Response"),reply,select,send);
   formal.onsubmit=async e=>{
    e.preventDefault();send.disabled=true;
    try{await api("/api/pro/protests/respond",{id:item.id,answer:reply.value,status:select.value});notify("Driver notified through their portal");await renderProtests(api,notify,role,true);}
    catch(ex){notify(ex.message,true)}finally{send.disabled=false}
   };
   box.append(formal);
  }
  target.append(box);
 }
}
export async function renderInterviews(api,notify,role,force=false){
 const list=document.getElementById("interviews-list"),vol=document.getElementById("interview-volunteers");
 if(!list||!vol)return;
 if(!["staff","commentary"].includes(role)){list.replaceChildren(make("p","Commentator access required."));return;}
 const d=await api("/api/pro/interviews"),sig=JSON.stringify(d);
 if(!force&&sig===interviewSignature)return;interviewSignature=sig;
 list.replaceChildren();vol.replaceChildren();
 if(!d.invites.length)list.append(make("p","No interview invitations sent yet.","muted"));
 for(const invite of d.invites){
  const card=make("article","","panel"),bar=make("div","","inline");
  wrap(bar,make("b",invite.driver_name),statusLabel(invite.status));
  wrap(card,bar,make("p",invite.message),make("small",new Date(invite.updated_at||invite.created_at).toLocaleString("en-NZ")));
  list.append(card);
 }
 if(!d.volunteers.length)vol.append(make("p","No driver interview requests yet.","muted"));
 for(const v of d.volunteers){
  const card=make("article","","panel");
  wrap(card,make("h3",v.driver_name),make("p",v.subject),make("p",v.message),statusLabel(v.status));
  const invite=make("button","Invite This Driver","primary");
  invite.onclick=()=>{
   const s=document.getElementById("interview-driver"),m=document.getElementById("interview-message");
   s.value=v.user_id;m.value="Hi "+v.driver_name+", would you join us for an interview during the Pro Championship broadcast? Please accept or decline in your Driver Portal.";
   document.getElementById("interview-form").scrollIntoView({behavior:"smooth",block:"center"});
   m.focus();
  };card.append(invite);vol.append(card);
 }
}
export function setupInterviews(api,notify,getDrivers,getRole){
 const form=document.getElementById("interview-form"),select=document.getElementById("interview-driver");
 if(!form)return;
 let choices="";
 const populate=()=>{
  const names=(getDrivers()||[]),sig=JSON.stringify(names.map(x=>[x.id,x.name]));
  if(choices===sig)return;choices=sig;
  const old=select.value;select.replaceChildren();
  const first=make("option","Select approved driver");first.value="";select.append(first);
  for(const d of names){const op=make("option",d.name);op.value=d.id;select.append(op)}
  if(old)select.value=old;
 };
 form.onsubmit=async e=>{
  e.preventDefault();const submit=form.querySelector("button[type=submit]");
  submit.disabled=true;
  try{
   await api("/api/pro/interviews/invite",{user_id:select.value,message:document.getElementById("interview-message").value});
   notify("Interview invitation sent to Driver Portal");
   document.getElementById("interview-message").value="";
   await renderInterviews(api,notify,getRole(),true);
  }catch(ex){notify(ex.message,true)}finally{submit.disabled=false}
 };
 return populate;
}
