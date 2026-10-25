// VDNZ Driver Portal: cache PUBLIC static shell only, never private hub or authenticated endpoints.
const CACHE="vdnz-driver-portal-staging-shell-v4";
const PUBLIC_FILES=["/","/styles.css","/app.js","/icon.svg","/manifest.webmanifest"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PUBLIC_FILES)));
 self.skipWaiting();
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener("fetch",event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=="GET"||url.origin!==self.location.origin||url.pathname.startsWith("/api/")||url.pathname.startsWith("/hub")||url.pathname==="/health")return;
 if(!PUBLIC_FILES.includes(url.pathname))return;
 event.respondWith(fetch(req).then(response=>{
  if(response.ok&&response.type==="basic")caches.open(CACHE).then(cache=>cache.put(req,response.clone()));
  return response;
 }).catch(()=>caches.match(req)));
});
