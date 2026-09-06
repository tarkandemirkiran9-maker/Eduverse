/* V48S61 cache hygiene service worker: no fetch cache, clears old caches, then unregisters. */
self.addEventListener('install',function(e){ try{ self.skipWaiting(); }catch(x){} });
self.addEventListener('activate',function(e){
  try{
    e.waitUntil(
      caches.keys().then(function(keys){
        return Promise.all(keys.map(function(k){ return caches.delete(k); }));
      }).then(function(){
        try{ return self.clients.claim(); }catch(x){ return null; }
      }).then(function(){
        try{ return self.registration.unregister(); }catch(x){ return null; }
      })
    );
  }catch(x){}
});
