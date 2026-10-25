/* VDNZ Main Hub — live staging data, strict staff session, Pro Championship only. */
const $=id=>document.getElementById(id);
const $all=s=>Array.from(document.querySelectorAll(s));
const txt=(tag,value="",className="")=>{let x=document.createElement(tag);x.textContent=String(value??"");if(className)x.className=className;return x;};
const add=(p,...children)=>{for(const n of children)if(n)p.append(n);return p;};
const clear=x=>x.replaceChildren();
const line=(label,value)=>{const d=txt("p");add(d,txt("strong",label+": "),txt("span",value||"Not set"));return d;};
const msg=(text,error=false)=>{const e=$("toast");e.textContent=text;e.className="toast"+(error?" error":"");e.style.display="block";clearTimeout(msg.t);msg.t=setTimeout(()=>e.style.display="none",4200);};
const button=(name,handler,klass="button secondary small")=>{const b=txt("button",name,klass);b.type="button";b.onclick=async()=>{b.disabled=true;try{await handler();}catch(e){msg(e.message,true);}finally{b.disabled=false;}};return b;};
const label=(name,text)=>{const x=txt("span",name,"badge");if(text==="Approved"||text==="Here"||text==="Accepted")x.classList.add("green");if(text==="Suspended"||text==="Not Here"||text==="Declined")x.classList.add("red");return x;};
const record=(title,body="")=>{const x=txt("article","","record");add(x,txt("h3",title));if(body)add(x,txt("p",body));return x;};
const empty=(target,text)=>{target.replaceChildren(txt("p",text,"empty"));};
const val=(form,name)=>String(new FormData(form).get(name)||"").trim();
const payload=form=>Object.fromEntries(new FormData(form).entries());
let data=null,active="overview",activeFetch=null;
async function api(path,body){
 const opts={credentials:"same-origin",headers:{"Accept":"application/json"}};
 if(body!==undefined){opts.method="POST";opts.headers["Content-Type"]="application/json";opts.body=JSON.stringify(body);}
 const r=await fetch(path,opts);let result;try{result=await r.json();}catch{throw Error("Invalid server response");}
 if(!r.ok)throw Error(result.error||"Request failed");
 return result;
}
async function check(){
 const me=await api("/api/me");
 if(!me.user||me.user.role!=="staff"){location.replace("/hub/login");throw Error("Staff session required");}
}
function go(page){
 const valid=$all(".navbtn[data-tab]").map(b=>b.dataset.tab);
 if(page==="crew")page="broadcast";
 if(!valid.includes(page))page="overview";
 active=page;
 $all(".tabpage").forEach(x=>x.hidden=x.id!=="tab-"+page);
 $all(".navbtn").forEach(x=>{
  const selected=x.dataset.tab===page;
  x.classList.toggle("current",selected);
  if(selected)x.setAttribute("aria-current","page");else x.removeAttribute("aria-current");
 });
 if(location.hash!=="#"+page)history.replaceState(null,"","#"+page);
 scrollTo(0,0);
}
function metric(name,value){
 const e=txt("article","","metric");
 add(e,txt("strong",value),txt("small",name));
 return e;
}
async function load(){
 const r=await api("/api/admin/dashboard");
 data=r;
 render(r);
}
function render(d){
 const activeRound=d.round?.round||0,users=d.users||[],att=d.attendance||[],groups=d.groups||[],messages=d.messages||[];
 const here=att.filter(a=>a.round===activeRound&&a.status==="Here").length;
 const absent=att.filter(a=>a.round===activeRound&&a.status==="Not Here").length;
 const metrics=$("metric-grid");clear(metrics);
 for(const [k,v] of [["REGISTERED DRIVERS",users.length],["APPROVED",users.filter(u=>u.status==="Approved").length],["PRESENT AT BRIEFING",here],["AWAY",absent]])metrics.append(metric(k,v));
 const event=$("event-status");clear(event);
 add(event,line("Round",d.round?.round||"Not configured"),line("Track",d.round?.track_name||"Not configured"),line("Briefing",d.round?.briefing_at||"Not configured"),line("Status",d.round?.status||"Upcoming"),line("Requests awaiting review",messages.filter(m=>m.status==="New").length));
 renderDrivers(d,activeRound);
 const rf=$("round-form");
 if(d.round){for(const input of $all("#round-form [name]"))if(input.name in d.round)input.value=d.round[input.name]||""; }
 $("groups-form").elements.round.value=activeRound||1;
 renderGroups(d,activeRound);renderRequests(d);renderInvites(d);renderAssets(d);renderRecipients(d);
}
function renderDrivers(d,round){
 const parent=$("drivers-list");clear(parent);
 if(!(d.users||[]).length)return empty(parent,"No staging driver registrations yet.");
 for(const user of d.users){
  const item=record(user.name,user.email),row=txt("div","","row"),state=txt("select");
  for(const value of ["Pending","Approved","Suspended"]){const option=txt("option",value);option.value=value;state.append(option)}state.value=user.status;
  add(row,txt("span","ACCOUNT","muted"),label(user.status,user.status),state,button("Update account",async()=>{await api("/api/admin/user",{id:user.id,status:state.value});msg("Account updated");await load();}));
  if(round){
   const presence=d.attendance.find(a=>a.user_id===user.id&&a.round===round)?.status||"Pending";
   const pick=txt("select");
   for(const x of ["Pending","Here","Not Here"]){const opt=txt("option",x);opt.value=x;pick.append(opt);}pick.value=presence;
   add(row,txt("span","BRIEFING","muted"),label(presence,presence),pick,button("Save roll call",async()=>{
    await api("/api/admin/attendance",{round,user_id:user.id,status:pick.value});msg("Attendance saved in staging ONLY — sheet X unchanged");await load();
   }));
  }
  const pts=d.groups.find(g=>g.user_id===user.id)?.points||0;
  const inp=txt("input");inp.type="number";inp.min="0";inp.max="100000";inp.value=pts;inp.className="points";inp.setAttribute("aria-label","Championship points for "+user.name);
  add(row,txt("span","POINTS","muted"),inp,button("Set staging points",async()=>{await api("/api/admin/points",{user_id:user.id,points:Number(inp.value)});msg("Staging points updated");await load();}));
  add(item,row);parent.append(item);
 }
}
function renderGroups(d,round){
 const parent=$("groups-list");clear(parent);
 for(let g=1;g<=4;g++){
  const list=d.groups.filter(x=>x.round===round&&x.group_number===g);
  const panel=txt("article","","group-card");add(panel,txt("h2","GROUP "+g),txt("small",list.length+"/20 Drivers","muted"));
  if(!list.length)panel.append(txt("p","No drivers assigned yet.","muted"));
  else{const ol=txt("ol");for(const x of list)ol.append(txt("li",x.driver_name+" · "+x.points+" pts"));panel.append(ol)}
  parent.append(panel);
 }
}
function renderRequests(d){
 const parent=$("requests-list");clear(parent);
 if(!(d.messages||[]).length)return empty(parent,"No requests, protests or questions in the staging queue.");
 for(const m of d.messages){
  const item=record(m.kind.toUpperCase()+" · "+m.subject,m.message),row=txt("div","","row");
  add(row,txt("span",m.driver_name,"muted"),label(m.status,m.status));
  const input=txt("textarea");input.rows=3;input.value=m.answer||"";input.placeholder="Response or review notes";
  const select=txt("select");for(const x of ["Under Review","Answered","Closed"]){const op=txt("option",x);op.value=x;select.append(op)}
  select.value=["Under Review","Answered","Closed"].includes(m.status)?m.status:"Under Review";
  add(item,row,input,select,button("Save response",async()=>{await api("/api/admin/answer",{id:m.id,answer:input.value,status:select.value});msg("Driver notified in portal");await load();},"button primary small"));
  parent.append(item);
 }
}
function renderInvites(d){
 const parent=$("invites-list");clear(parent);
 if(!(d.invites||[]).length)return empty(parent,"No interview invitations sent yet.");
 for(const i of d.invites){
  const item=record(i.driver_name,i.message);add(item,label(i.status,i.status));parent.append(item);
 }
}
function renderAssets(d){
 const parent=$("assets-list");clear(parent);
 if(!(d.assets||[]).length)return empty(parent,"No Pro Championship downloads have been published.");
 for(const f of d.assets){
  const item=record(f.file_name,f.kind+" · "+f.season+" · "+(f.round?"Round "+f.round:"Whole season")+" · Version "+f.version);
  parent.append(item);
 }
}
function renderRecipients(d){
 for(const select of $all(".recipient")){
  const old=select.value;clear(select);const all=txt("option","All approved drivers");all.value="all";select.append(all);
  for(const u of d.users){const op=txt("option",u.name+" · "+u.status);op.value=u.id;select.append(op)}
  select.value=Array.from(select.options).some(x=>x.value===old)?old:"all";
 }
}
const crewRoles=[["commentary","Commentators"],["judge1","Judge 1"],["judge2","Judge 2"],["judge3","Judge 3"],["head","Head Judge"],["producer","Production / Kieren"],["broadcast","Broadcast Control"]];
let storedCrewLinks=[];
async function loadCrew(){
 const response=await api("/api/admin/crew");
 storedCrewLinks=response.links||[];
 const parent=$("crew-link-list");clear(parent);
 for(const [role,name] of crewRoles){
  const record=storedCrewLinks.find(x=>x.role===role);
  const card=txt("article","","panel external");
  add(card,txt("div",record?"VERIFIED URL SAVED":"NOT CONNECTED","kicker"),txt("h2",name));
  if(record){
   const status=txt("p","Staff link configured. Click to open it in a new tab. Keep unique judge links private.","muted");
   const url=new URL(record.url);
   const anchor=txt("a","Open "+name+" ↗","button primary small");
   anchor.href=url.href;anchor.target="_blank";anchor.rel="noopener noreferrer";
   const copy=button("Copy private link",async()=>{
    await navigator.clipboard.writeText(url.href);msg(name+" link copied — share only with the intended crew member");
   });
   add(card,status,anchor,copy);
  }else{
   add(card,txt("p","No Cloudflare Pro Championship crew service URL has been configured for this role.","muted"));
  }
  parent.append(card);
 }
 const current=storedCrewLinks.find(x=>x.role===$("crew-role").value);
 $("crew-url").value=current?.url||"";
}
async function loadSocial(){
 const r=await api("/api/admin/social");
 const target=$("social-list");clear(target);
 if(!r.drafts.length)return empty(target,"No drafts yet. Create your first staging announcement above.");
 for(const p of r.drafts){
  const item=record(p.title,p.body);
  const bar=txt("div","","row");add(bar,txt("span",p.channels||"Channels not selected","muted"),txt("span",p.status,"badge"),txt("small",new Date(p.created_at).toLocaleString(),"muted"));
  item.append(bar);target.append(item);
 }
}
async function loadHealth(){
 const out=$("health-status");empty(out,"Checking Cloudflare resources...");
 try{
  const h=await api("/health");clear(out);
  add(out,line("Service",h.service),line("Environment",h.environment),line("D1 database",h.database),line("R2 bucket",h.storage),line("Driver accounts",h.accounts),line("Health",h.ok?"PASS":"FAIL"));
 }catch(e){empty(out,"Health check failed: "+e.message);}
}
function send(formId,endpoint,fn,after){
 const form=$(formId);form.addEventListener("submit",async ev=>{
  ev.preventDefault();const submit=form.querySelector("button:not([type])")||form.querySelector("[type=submit]");
  if(submit)submit.disabled=true;
  try{
   const body=fn?fn(form):payload(form);
   const res=await api(endpoint,body);msg(res.message||"Saved to staging");
   if(after)await after(res);else await load();
  }catch(e){msg(e.message,true)}finally{if(submit)submit.disabled=false;}
 });
}
$all("[data-tab]").forEach(b=>b.onclick=()=>go(b.dataset.tab));
$all("[data-open]").forEach(b=>b.onclick=()=>go(b.dataset.open));
$("refresh-drivers").onclick=()=>load().then(()=>msg("Driver list updated")).catch(e=>msg(e.message,true));
$("health-refresh").onclick=loadHealth;
$("crew-role").addEventListener("change",()=>{
 const entry=storedCrewLinks.find(x=>x.role===$("crew-role").value);
 $("crew-url").value=entry?.url||"";
});
$("crew-clear").onclick=async()=>{
 try{
  await api("/api/admin/crew",{role:$("crew-role").value,url:""});
  msg("Selected link removed");await loadCrew();
 }catch(e){msg(e.message,true);}
};
$("logout").onclick=async()=>{await api("/api/logout",{});location.assign("/hub/login")};
send("round-form","/api/admin/round",null,load);
send("groups-form","/api/admin/groups",f=>({round:Number(val(f,"round")),order:val(f,"order"),confirmOverwrite:f.elements.confirmOverwrite.checked}),load);
send("invite-form","/api/admin/invite",null,load);
send("notify-form","/api/admin/notify",null,load);
send("asset-form","/api/admin/asset",null,load);
send("social-form","/api/admin/social",f=>({title:val(f,"title"),body:val(f,"body"),channels:val(f,"channels")}),async()=>{$("social-form").reset();await loadSocial()});
send("crew-form","/api/admin/crew",f=>({role:val(f,"role"),url:val(f,"url")}),loadCrew);
window.addEventListener("hashchange",()=>go(location.hash.slice(1)));
(async()=>{try{
 await check();
 go(location.hash.slice(1)||"overview");
 await Promise.all([load(),loadSocial(),loadHealth(),loadCrew()]);
}catch(e){if(!String(e.message).includes("Staff session"))msg(e.message,true)}})();
setInterval(()=>load().catch(()=>{}),60000);
