(async()=>{try{const r=await fetch("/api/me",{credentials:"same-origin"});const d=await r.json();if(d.user?.role==="staff"){location.replace("/hub/");return;}}catch{}})();
const form=document.getElementById("login-form"),submit=document.getElementById("submit"),err=document.getElementById("error");
form.addEventListener("submit",async e=>{
 e.preventDefault();submit.disabled=true;err.style.display="none";err.textContent="";
 try{
  const password=document.getElementById("password").value;
  const r=await fetch("/api/admin/login",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({password})});
  const data=await r.json();
  if(!r.ok)throw Error(data.error||"Could not sign in");
  location.replace("/hub/");
 }catch(error){err.textContent=error.message;err.style.display="block";submit.disabled=false;}
});