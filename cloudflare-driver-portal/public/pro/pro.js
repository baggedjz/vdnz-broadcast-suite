import {renderProtests,renderInterviews,setupInterviews} from "./crew-workflows.js";
const $=id=>document.getElementById(id);
const el=(tag,value="",cls="")=>{const e=document.createElement(tag);e.textContent=String(value??"");if(cls)e.className=cls;return e};
const replace=(target,...items)=>target.replaceChildren(...items);
const pages=["qualifying","battle","settings","judge","commentary","overlay"];
const path=location.pathname;
const selectedView=new URLSearchParams(location.search).get("view");
const page=pages.includes(selectedView)?selectedView:(pages.find(p=>p==="qualifying"?path.includes("/qualifying"):p==="battle"?path.includes("/battle"):p==="settings"?path.includes("/settings"):path.includes("/"+p))||"qualifying");
const names={staff:"Officials",judge1:"Judge 1",judge2:"Judge 2",judge3:"Judge 3",head:"Head Judge",commentary:"Commentators"};
const option=(value,label)=>{const x=el("option",label);x.value=value;return x};
let crewToken="",current=null,renderKey="",settingForm=false,loading=false,toastTimeout,populateInvites=()=>{};
try{crewToken=new URLSearchParams(location.hash.slice(1)).get("key")||sessionStorage.getItem("vdnz-pro-staging-crew-key")||"";if(location.hash.includes("key=")){sessionStorage.setItem("vdnz-pro-staging-crew-key",crewToken);history.replaceState(null,"",location.pathname+location.search)}if(!["judge","commentary"].includes(page))crewToken="";}catch{}
function show(id,value=true){$(id).hidden=!value}
function notice(message,error=false){const n=$("notice");n.textContent=message;n.classList.toggle("error",error);show("notice");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>show("notice",false),6500)}
async function api(uri,body){
 const headers={"Accept":"application/json"};
 if(crewToken)headers.Authorization="Bearer "+crewToken;
 const options={credentials:"same-origin",headers};
 if(body!==undefined){options.method="POST";headers["Content-Type"]="application/json";options.body=JSON.stringify(body)}
 const res=await fetch(uri,options);let data;try{data=await res.json()}catch{throw Error("Server returned unexpected data")}
 if(!res.ok)throw Error(data.error||"Request failed");return data;
}
function pageHead(){
 const map={qualifying:["QUALIFYING CONTROL","Manage the current qualifying driver and run."],battle:["BATTLE CONTROL","Set lead, chase and battle stage."],settings:["CREW & SETTINGS","Issue and revoke private Pro Championship crew links."],judge:["JUDGE SCORECARD","Submit one score and one note per run; review protests."],commentary:["COMMENTARY DESK","Driver profiles, interviews, judges and results."],overlay:["GRAPHICS PREVIEW","Staging display only. Not an on-air OBS source."]};
 $("page-kicker").textContent="PRO CHAMPIONSHIP / STAGING";
 $("page-title").textContent=map[page][0];$("page-desc").textContent=map[page][1];
 for(const id of ["controls","settings","judge","commentary","overlay"])show(id,id===(["qualifying","battle"].includes(page)?"controls":page));
 for(const a of document.querySelectorAll(".rail a[data-path]")){
  const selected=a.dataset.path===page&&(page!=="judge"||new URL(a.href).searchParams.get("role")===(new URLSearchParams(location.search).get("role")||"judge1"));
  a.classList.toggle("selected",selected);
}
}
function stats(d){
 const s=d.state;
 $("role-label").textContent=(names[d.role]||d.role).toUpperCase();
 $("round-summary").textContent="R"+s.round;
 $("stage-summary").textContent=s.mode==="qualifying"?"QUALIFYING":s.stage.toUpperCase();
 $("run-summary").textContent="RUN "+s.run;
 $("locked-summary").textContent=d.scores.filter(x=>["judge1","judge2","judge3"].includes(x.judge)&&x.locked).length+" / 3";
}
const driver=(d,id)=>d.drivers.find(x=>x.id===id);
const driverName=(d,id)=>driver(d,id)?.name||"Driver not selected";
function judgeCards(d,target){
 const box=$(target);replace(box);
 for(const who of ["judge1","judge2","judge3"]){
  const score=d.scores.find(x=>x.judge===who),c=el("div","","judgeitem"+(score?.locked?" locked":""));
  c.append(el("small",names[who]),el("strong",score?.locked?"LOCKED":"WAITING"));
  if(score?.locked&&d.state.mode==="qualifying"&&score.line!=null)c.append(el("small",(Number(score.line)+Number(score.angle)+Number(score.style)).toFixed(1)+"/100"));
  if(score?.locked&&d.state.mode==="battle"&&score.vote)c.append(el("small",score.vote));
  box.append(c);
 }
}
function groups(d,target){
 const box=$(target);replace(box);
 for(let group=1;group<=4;group++){
  const rows=d.groups.filter(x=>x.group_number===group),card=el("section","","group"),list=el("ol");
  card.append(el("h3","GROUP "+group+" · "+rows.length+"/20"));
  for(const row of rows)list.append(el("li",row.name));
  if(!rows.length)card.append(el("small","No drivers assigned"));
  card.append(list);box.append(card);
 }
}
function chat(d,target){
 const box=$(target);replace(box);
 for(const entry of d.chat){
  const row=el("div","","chatline");
  row.append(el("small",new Date(entry.created_at).toLocaleTimeString("en-NZ",{hour:"2-digit",minute:"2-digit"})+" "),el("b",names[entry.role]||entry.role),el("span",entry.message));
  box.append(row);
 }
 box.scrollTop=box.scrollHeight;
}
function fillSelect(target,d,chosen){
 const element=$(target);replace(element,option("","Select approved driver"));
 for(const x of d.drivers)element.append(option(x.id,(x.number?"#"+x.number+" ":"")+x.name));
 element.value=chosen||"";
}
function controlView(d){
 const s=d.state,key=[s.round,s.mode,s.stage,s.run,s.lead_id,s.chase_id].join("|");
 if(renderKey!==key&&!settingForm){
  $("event-round").value=s.round;$("event-run").value=s.run;$("event-mode").value=s.mode;$("event-stage").value=s.stage;
  fillSelect("event-lead",d,s.lead_id);fillSelect("event-chase",d,s.chase_id);
  renderKey=key;
 }
 show("chase-wrap",$("event-mode").value==="battle");
 const canChange=d.role==="staff";
 for(const input of document.querySelectorAll("#event-form input,#event-form select,#event-form button"))input.disabled=!canChange;
 $("reset-run").disabled=!canChange;
 judgeCards(d,"control-scores");groups(d,"event-groups");
}
function judgeView(d){
 const s=d.state,mine=d.scores.find(x=>x.judge===d.role),key=[s.round,s.mode,s.stage,s.run,s.lead_id,s.chase_id].join("|");
 if(key!==renderKey){
  renderKey=key;$("judge-notes").value=mine?.notes||"";
  for(const i of ["score-line","score-angle","score-style"])$(i).value="";
  for(const i of document.querySelectorAll('input[name="vote"]'))i.checked=false;
 }
 const box=$("judge-current");replace(box,el("h3",driverName(d,s.lead_id)),el("p",s.mode==="battle"?"Lead: "+driverName(d,s.lead_id)+" · Chase: "+driverName(d,s.chase_id):"Qualifying · Round "+s.round+" · Run "+s.run));
 show("qual-fields",s.mode==="qualifying");show("vote-fields",s.mode==="battle");
 for(const id of ["score-line","score-angle","score-style"])$(id).disabled=s.mode!=="qualifying";
 const isJudge=["judge1","judge2","judge3","head"].includes(d.role),locked=!!mine?.locked;
 $("lock-btn").disabled=!isJudge||locked||!s.lead_id||(s.mode==="battle"&&s.run!==2);
 $("save-notes").disabled=!isJudge||!locked;
 $("judge-status").textContent=locked?"RUN LOCKED · You may update your note.":!s.lead_id?"Awaiting production run selection":s.mode==="battle"&&s.run!==2?"Watching Run 1 · Vote after Run 2":"Complete and lock this run.";
 judgeCards(d,"judge-locked");chat(d,"judge-chat");
 replace($("judge-context"),el("p","Mode: "+s.mode),el("p","Stage: "+s.stage),el("p","Run: "+s.run));
}
function commentaryView(d){
 const s=d.state,box=$("commentary-drivers");replace(box);
 for(const [id,tag] of [[s.lead_id,"LEAD / CURRENT"],[s.chase_id,"CHASE / OPPONENT"]]){
  const x=driver(d,id),card=el("article","","drivercard");
  card.append(el("small",tag),el("h3",x?.name||"Awaiting driver"),el("p",x?.car||""),el("small",x?.team||""),el("small",x?.bio||""));
  box.append(card);
 }
 $("judges-cue").textContent=d.allLocked?"JUDGES LOCKED · HOLD FOR BROADCAST":"AWAITING JUDGES";
 judgeCards(d,"commentary-scores");
 $("commentary-result").textContent=d.allLocked?(s.mode==="qualifying"?"Average: "+d.average+"/100":d.decision==="Head"?"HEAD JUDGE REQUIRED":d.decision==="OMT"?"ONE MORE TIME":"Decision: "+d.decision)+" · STAGING ONLY":"Awaiting all three judges.";
 chat(d,"commentary-chat");groups(d,"commentary-groups");
 const board=$("commentary-standings");replace(board);
 for(const x of d.drivers.slice().sort((a,b)=>b.points-a.points).slice(0,12))board.append(el("p",x.name+" · "+x.points+" staging points"));
}
function preview(d){
 const s=d.state,box=$("overlay-preview");
 replace(box,el("small","NOT AN OBS SOURCE"),el("span","VDNZ PRO CHAMPIONSHIP"),el("strong",driverName(d,s.lead_id)),el("small",s.stage+" · RUN "+s.run));
}
async function refresh(){
 if(loading)return;loading=true;
 try{
  const d=await api("/api/pro/snapshot");current=d;
  show("access",false);show("content-area");pageHead();stats(d);
  $("connection").textContent="CONNECTED: "+(names[d.role]||d.role)+" · STAGING";
  if(["battle","qualifying"].includes(page))controlView(d);
  if(page==="judge"){judgeView(d);await renderProtests(api,notice,d.role);}
  if(page==="commentary"){commentaryView(d);populateInvites();await renderInterviews(api,notice,d.role);}
 }catch(error){show("access");show("content-area",false);$("connection").textContent="AUTHENTICATION REQUIRED";if(!/crew access required|access required|sign in/i.test(error.message))notice(error.message,true)}
 finally{loading=false}
}
async function perform(uri,body){try{const v=await api(uri,body);notice(v.note||"Saved in staging");await refresh();return v}catch(e){notice(e.message,true);return null}}

$("access-form").addEventListener("submit",async e=>{
 e.preventDefault();crewToken=$("crew-token").value.trim();
 try{sessionStorage.setItem("vdnz-pro-staging-crew-key",crewToken)}catch{}
 await refresh();
});
$("event-mode").addEventListener("change",()=>{settingForm=true;show("chase-wrap",$("event-mode").value==="battle")});
for(const id of ["event-round","event-run","event-stage","event-lead","event-chase"])$(id).addEventListener("change",()=>settingForm=true);
$("event-form").addEventListener("submit",async e=>{
 e.preventDefault();if(!current)return;
 const payload={version:current.state.version,round:Number($("event-round").value),run:Number($("event-run").value),mode:$("event-mode").value,stage:$("event-stage").value,lead_id:$("event-lead").value,chase_id:$("event-mode").value==="battle"?$("event-chase").value:""};
 settingForm=false;await perform("/api/pro/event",payload);renderKey="";
});
$("reset-run").addEventListener("click",async()=>{
 if(!current||!confirm("Delete ONLY the current staging run's judge scores and locks?"))return;
 await perform("/api/pro/reset",{confirm:"RESET CURRENT RUN"});
});
const total=()=>{$("score-total").textContent=["score-line","score-angle","score-style"].reduce((sum,id)=>sum+Number($(id).value||0),0).toFixed(1)};
for(const id of ["score-line","score-angle","score-style"])$(id).addEventListener("input",total);
$("judge-form").addEventListener("submit",async e=>{
 e.preventDefault();if(!current)return;
 const b={notes:$("judge-notes").value};
 if(current.state.mode==="qualifying"){b.line=Number($("score-line").value);b.angle=Number($("score-angle").value);b.style=Number($("score-style").value);}
 else{
  const vote=document.querySelector('input[name="vote"]:checked');
  if(!vote)return notice("Select a decision first",true);
  b.vote=vote.value;
 }
 await perform("/api/pro/score",b);
});
$("save-notes").addEventListener("click",async()=>await perform("/api/pro/notes",{notes:$("judge-notes").value}));
for(const id of ["judge-chat-form","commentary-chat-form"]){
 $(id).addEventListener("submit",async e=>{
  e.preventDefault();const field=$(id).elements.message;const v=field.value.trim();if(!v)return;
  if(await perform("/api/pro/chat",{message:v}))field.value="";
 });
}
$("issue-key").addEventListener("click",async()=>{
 const x=await perform("/api/pro/crew/issue",{role:$("issue-role").value});
 if(x){$("issued-url").value=x.url;show("issued-wrap")}
});
$("revoke-key").addEventListener("click",async()=>{
 if(!confirm("Revoke this crew member's existing link?"))return;
 if(await perform("/api/pro/crew/revoke",{role:$("issue-role").value})){show("issued-wrap",false);$("issued-url").value="";}
});
$("copy-issued").addEventListener("click",async()=>{
 await navigator.clipboard.writeText($("issued-url").value);notice("Private link copied. Share with intended crew member only.");
});
$("export-judging").addEventListener("click",async()=>{
 try{
  const data=await api("/api/pro/history");
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),link=document.createElement("a");
  link.href=url;link.download="vdnz-pro-championship-STAGING-judging.json";document.body.append(link);link.click();link.remove();URL.revokeObjectURL(url);
 }catch(e){notice(e.message,true)}
});
populateInvites=setupInterviews(api,notice,()=>current?.drivers||[],()=>current?.role)||(()=>{});
pageHead();
refresh();
setInterval(refresh,12000);
