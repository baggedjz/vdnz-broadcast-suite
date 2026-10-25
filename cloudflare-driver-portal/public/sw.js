// Cache the public application shell only. Authenticated API responses never enter Cache Storage.
const CACHE="vdnz-driver-portal-staging-shell-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["/","/styles.css","/app.js","/icon.svg","/manifest.webmanifest"])));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==self.location.origin||u.pathname.startsWith("/api/")||u.pathname==="/health")return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type==="basic"){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request)));});
