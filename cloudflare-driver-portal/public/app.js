/* VDNZ Driver Portal — phone-first frontend, Pro Championship staging. */
const $=id=>document.getElementById(id);
const q=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const el=(tag,txt="",className="")=>{const x=document.createElement(tag);if(txt!==undefined&&txt!==null)x.textContent=String(txt);if(className)x.className=className;return x;};
const add=(parent,...children)=>{for(const c of children)if(c)parent.append(c);return parent;};
const empty=(target,msg)=>{target.replaceChildren(el("div",msg,"empty"));};
const notice=(message,error=false)=>{const t=$("toast");t.textContent=message;t.className="toast"+(error?" error":"");t.style.display="block";clearTimeout(notice.timer);notice.timer=setTimeout(()=>t.style.display="none",4500);};
let me=null,driverData=null,staffData=null,selectedDriverView="home",selectedStaffView="staff-overview";
async function api(path,payload){
 const opts={credentials:"same-origin",headers:{"Accept":"application/json"}};
 if(payload!==undefined){opts.method="POST";opts.headers["Content-Type"]="application/json";opts.body=JSON.stringify(payload);}
 const response=await fetch(path,opts);
 let data;try{data=await response.json();}catch{throw Error("Unexpected server response");}
 if(!response.ok)throw Error(data.error||"Request failed");
 return data;
}
const val=(form,name)=>String(new FormData(form).get(name)||"").trim();
const formObj=form=>Object.fromEntries(new FormData(form).entries());
const safeHref=v=>{try{const u=new URL(v);return u.protocol==="https:"?u.href:"";}catch{return"";}};
function link(label,url){const address=safeHref(url);if(!address)return el("span","Not published yet","muted");const a=el("a",label,"link");a.href=address;a.rel="noopener noreferrer";a.target="_blank";return a;}
function button(label,cb,cls="btn"){const b=el("button",label,cls);b.type="button";b.onclick=()=>Promise.resolve(cb()).catch(e=>notice(e.message,true));return b;}
function line(label,detail){const p=el("p");add(p,el("strong",label+": "),el("span",detail||"Not available yet"));return p;}
function card(title,content=""){const d=el("article",undefined,"item");add(d,el("h3",title));if(content)add(d,el("p",content));return d;}
function statusBadge(text){const x=el("span",text||"Pending","pill");if(["Pending","New","Under Review","Not Here"].includes(text))x.classList.add("warn");if(["Suspended","Declined"].includes(text))x.classList.add("err");return x;}
function showAuth(tab){$("auth").hidden=false;$("driver").hidden=true;$("staff").hidden=true;$("logout").hidden=true;q("[data-auth]").forEach(b=>b.classList.toggle("active",b.dataset.auth===tab));for(const k of ["login","signup","staff"])$("form-"+k).hidden=k!==tab;}
function showDriverPage(page){selectedDriverView=page;q("[data-page]").forEach(x=>x.classList.toggle("active",x.dataset.page===page));q("#driver .view").forEach(x=>x.hidden=x.id!==page);scrollTo(0,0);}
function showStaffPage(page){selectedStaffView=page;q("[data-staff-page]").forEach(x=>x.classList.toggle("active",x.dataset.staffPage===page));q("#staff .staffview").forEach(x=>x.hidden=x.id!==page);scrollTo(0,0);}
async function loginAndOpen(){
 const r=await api("/api/me");me=r.user;
 if(!me){showAuth("login");return;}
 $("auth").hidden=true;$("logout").hidden=false;
 if(me.role==="staff"){$("driver").hidden=true;$("staff").hidden=false;await refreshStaff();showStaffPage(selectedStaffView);}
 else{$("staff").hidden=true;$("driver").hidden=false;await refreshDriver();showDriverPage(selectedDriverView);}
}
async function refreshDriver(){
 driverData=await api("/api/dashboard");me=driverData.user;const d=driverData;
 $("welcome").textContent="Kia ora, "+me.name;
 $("approval").textContent=me.status;$("group").textContent=d.group?"Group "+d.group.group_number+" · Slot "+d.group.slot:"Not assigned";
 $("attendance").textContent=d.attendance;$("points").textContent=String(d.points)+" pts";
 const r=d.round;
 const box=$("round-summary");box.replaceChildren();
 const briefing=$("briefing-details");briefing.replaceChildren();
 if(!r){empty(box,"Briefing details have not been published yet.");empty(briefing,"No round briefing has been configured.");}
 else{
  add(box,line("Round",r.round+" · "+r.season),line("Track",r.track_name),line("Event status",r.status),
   line("Briefing",r.briefing_at),line("Your status",d.attendance),line("Qualifying",d.group?"Group "+d.group.group_number:"Awaiting groups"));
  add(briefing,line("Track",r.track_name),line("Briefing",r.briefing_at),line("Status",r.status),line("Overview",r.briefing_overview));
  if(safeHref(r.line_map_url))add(briefing,link("View official line map",r.line_map_url));
  const access=el("article",undefined,"file");
  add(access,el("h3","Server information"));
  if(me.status!=="Approved"){add(access,el("p","Available once staff approve your account.","muted"));}
  else{
   add(access,el("p","Join link: "),link("Open server",r.server_url));
   if(r.server_password){
    const secret=el("span","••••••••","muted");let revealed=false;
    const toggle=button("Reveal password",()=>{revealed=!revealed;secret.textContent=revealed?r.server_password:"••••••••";toggle.textContent=revealed?"Hide password":"Reveal password";},"btn small");
    const copy=button("Copy password",()=>navigator.clipboard.writeText(r.server_password).then(()=>notice("Password copied")),"btn small");
    const a=el("div",undefined,"row");add(a,secret,toggle,copy);add(access,a);
   }else add(access,el("p","Password not yet published.","muted"));
  }
  briefing.append(access);
 }
 q("#form-profile [name]").forEach(f=>{f.value=String(d.profile?.[f.name]||"");});
 const assets=$("asset-list");assets.replaceChildren();
 if(me.status!=="Approved")empty(assets,"Downloads become available after registration approval.");
 else if(!d.assets.length)empty(assets,"The current approved car pack, track ZIPs and line maps haven't been published.");
 else for(const f of d.assets){
   const c=card(({"car-pack":"CAR PACK",track:"TRACK", "line-map":"LINE MAP"}[f.kind]||f.kind)+" · "+f.name);
   add(c,line("Season / round",f.season+" / "+(f.round||"All rounds")),line("Version",f.version));
   const a=el("a","Download file","btn primary");a.href="/api/download?id="+encodeURIComponent(f.id);a.rel="nofollow";c.append(a);assets.append(c);
 }
 const reqs=$("my-requests");reqs.replaceChildren();
 if(!d.questions.length)empty(reqs,"You haven't submitted any questions or protests.");
 else for(const item of d.questions){
  const c=card(item.subject,item.message);const header=el("div",undefined,"row");add(header,statusBadge(item.status),el("small",item.kind+" · "+new Date(item.created_at).toLocaleDateString()));c.prepend(header);
  if(item.answer)add(c,line("Official response",item.answer));
  reqs.append(c);
 }
 const invites=$("my-invites");invites.replaceChildren();
 if(!d.invites.length)empty(invites,"No interview invitations yet.");
 else for(const item of d.invites){
   const c=card("Broadcast invitation",item.message);add(c,statusBadge(item.status));
   if(item.status==="Pending"){
    const bar=el("div",undefined,"row");
    add(bar,button("Accept",async()=>{await api("/api/interview/respond",{id:item.id,status:"Accepted"});notice("Interview accepted");await refreshDriver();},"btn primary"),button("Decline",async()=>{await api("/api/interview/respond",{id:item.id,status:"Declined"});notice("Interview declined");await refreshDriver();},"btn"));
    c.append(bar);
   }
   invites.append(c);
 }
 const fills=[[$("my-notices"),d.notifications],[$("home-notices"),d.notifications.slice(0,4)]];
 for(const [target,arr] of fills){target.replaceChildren();if(!arr.length){empty(target,"No new updates yet.");continue;}for(const item of arr){const c=card(item.title,item.message);add(c,el("small",new Date(item.created_at).toLocaleString()));target.append(c);}}
}
async function refreshStaff(){
 staffData=await api("/api/admin/dashboard");const d=staffData;
 const metrics=$("staff-metrics");metrics.replaceChildren();
 for(const [name,value] of [["REGISTERED",d.users.length],["APPROVED",d.users.filter(x=>x.status==="Approved").length],["QUESTIONS",d.messages.filter(x=>x.status==="New").length],["GROUPED",d.groups.filter(x=>x.round===d.round?.round).length]]){
  const v=el("article",undefined,"stat");add(v,el("small",name),el("strong",value));metrics.append(v);
 }
 $("staff-summary").replaceChildren(line("Round",d.round?.round||"Not set"),line("Track",d.round?.track_name||"Not set"));
 const fr=$("form-round");if(d.round)for(const field of q("[name]",fr))if(field.name in d.round)field.value=d.round[field.name]||"";
 const fg=$("form-groups");if(d.round)fg.elements.round.value=d.round.round;
 const list=$("staff-driver-list");list.replaceChildren();
 if(!d.users.length)empty(list,"No drivers have registered on the staging portal.");
 for(const u of d.users){
   const row=card(u.name,u.email),toolbar=el("div",undefined,"row");
   const st=el("select");for(const x of ["Pending","Approved","Suspended"]){const o=el("option",x);o.value=x;st.append(o);}st.value=u.status;
   const save=button("Update approval",async()=>{await api("/api/admin/user",{id:u.id,status:st.value});notice("Registration updated");await refreshStaff();},"btn small");
   add(toolbar,statusBadge(u.status),st,save);
   if(d.round){
    const state=d.attendance.find(x=>x.user_id===u.id&&x.round===d.round.round)?.status||"Pending";
    const at=el("select");for(const x of ["Pending","Here","Not Here"]){const o=el("option",x);o.value=x;at.append(o);}at.value=state;
    const mark=button("Save roll call",async()=>{await api("/api/admin/attendance",{user_id:u.id,round:d.round.round,status:at.value});notice("Staging attendance saved; official sheet unchanged");await refreshStaff();},"btn small");
    add(toolbar,el("span","Roll call ·","muted"),at,mark);
   }
   const points=d.groups.find(x=>x.user_id===u.id)?.points||0;
   const inp=el("input");inp.type="number";inp.min="0";inp.max="100000";inp.value=String(points);inp.className="inline-input";inp.setAttribute("aria-label","Championship points for "+u.name);
   const setPts=button("Set points",async()=>{await api("/api/admin/points",{user_id:u.id,points:Number(inp.value)});notice("Staging points set");},"btn small");
   add(toolbar,el("span","Points","muted"),inp,setPts);row.append(toolbar);list.append(row);
 }
 const gr=$("staff-group-list");gr.replaceChildren();
 for(let g=1;g<=4;g++){
  const c=el("article",undefined,"panel");add(c,el("h2","Group "+g));
  const arr=d.groups.filter(x=>x.group_number===g&&x.round===d.round?.round);
  if(!arr.length)c.append(el("p","No drivers assigned.","muted"));
  else for(const x of arr)c.append(line(String(x.slot),x.driver_name+" · "+x.points+" pts"));
  gr.append(c);
 }
 const qs=$("staff-message-list");qs.replaceChildren();
 if(!d.messages.length)empty(qs,"No questions or protests yet.");
 for(const m of d.messages){
  const c=card(m.kind.toUpperCase()+" — "+m.subject,m.message);
  add(c,line("Driver",m.driver_name),statusBadge(m.status));
  const ans=el("textarea");ans.value=m.answer||"";ans.rows=3;ans.placeholder="Response to driver";
  const status=el("select");for(const st of ["Under Review","Answered","Closed"]){const o=el("option",st);o.value=st;status.append(o);}status.value=["Under Review","Answered","Closed"].includes(m.status)?m.status:"Under Review";
  add(c,ans,status,button("Save response",async()=>{await api("/api/admin/answer",{id:m.id,answer:ans.value,status:status.value});notice("Response saved and in-app notice sent");await refreshStaff();},"btn primary small"));qs.append(c);
 }
 for(const sel of q(".staff-target")){
  const old=sel.value;sel.replaceChildren();const all=el("option","All approved drivers");all.value="all";sel.append(all);
  for(const u of d.users){const o=el("option",u.name+" ("+u.status+")");o.value=u.id;sel.append(o);}
  sel.value=old&&q("option",sel).some(x=>x.value===old)?old:"all";
 }
 const invites=$("staff-invite-list");invites.replaceChildren();
 if(!d.invites.length)empty(invites,"No interview invitations sent yet.");
 else for(const x of d.invites){const c=card(x.driver_name,x.message);add(c,statusBadge(x.status));invites.append(c);}
 const assets=$("staff-asset-list");assets.replaceChildren();
 if(!d.assets.length)empty(assets,"No files published.");
 else for(const f of d.assets)assets.append(line(f.kind.toUpperCase(),f.file_name+" · "+f.version+" · Round "+f.round));
}
function submit(id,endpoint,mapper,after){
 const form=$(id);form.addEventListener("submit",async ev=>{
  ev.preventDefault();const btn=form.querySelector("button[type=submit],button:not([type])");if(btn)btn.disabled=true;
  try{const data=await api(endpoint,mapper?mapper(formObj(form),form):formObj(form));notice(data.message||"Saved");if(after)await after(data);else await (me?.role==="staff"?refreshStaff():refreshDriver());}
  catch(e){notice(e.message,true);}finally{if(btn)btn.disabled=false;}
 });
}
q("[data-auth]").forEach(x=>x.onclick=()=>showAuth(x.dataset.auth));
q("[data-page]").forEach(x=>x.onclick=()=>showDriverPage(x.dataset.page));
q("[data-staff-page]").forEach(x=>x.onclick=()=>showStaffPage(x.dataset.staffPage));
$("logout").onclick=async()=>{try{await api("/api/logout",{});}catch{}me=null;showAuth("login");notice("Signed out");};
submit("form-login","/api/login",null,loginAndOpen);
submit("form-signup","/api/signup",null,async()=>{await loginAndOpen();notice("Account created; staff approval is required");});
submit("form-staff","/api/admin/login",null,loginAndOpen);
submit("form-profile","/api/profile",null,refreshDriver);
submit("form-briefing-question","/api/messages",null,async()=>{$("form-briefing-question").reset();await refreshDriver();});
submit("form-request","/api/messages",null,async()=>{$("form-request").reset();await refreshDriver();});
submit("form-round","/api/admin/round",null,refreshStaff);
submit("form-asset","/api/admin/asset",null,async()=>{$("form-asset").reset();await refreshStaff();});
submit("form-invite","/api/admin/invite",null,async()=>{$("form-invite").reset();await refreshStaff();});
submit("form-notify","/api/admin/notify",null,async()=>{$("form-notify").reset();await refreshStaff();});
submit("form-groups","/api/admin/groups",(b,form)=>({round:Number(b.round),order:b.order,confirmOverwrite:form.elements.confirmOverwrite.checked}),refreshStaff);
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
loginAndOpen().catch(e=>{showAuth("login");notice(e.message,true);});
setInterval(()=>{if(!me)return;(me.role==="staff"?refreshStaff():refreshDriver()).catch(()=>{});},45000);
