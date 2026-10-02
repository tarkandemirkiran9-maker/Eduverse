(function(w){
  'use strict';
  if(w.EVApi && w.EVApi.__v1){ return; }

  function base(){
    return String((w.EV_CONFIG && w.EV_CONFIG.apiBase) || '').replace(/\/+$/,'');
  }

  async function request(path, options){
    var cfg=w.EV_CONFIG||{};
    if(cfg.backendEnabled!==true){
      throw new Error('BACKEND_DISABLED');
    }
    var p=String(path||'');
    if(!/^\/[A-Za-z0-9_\/\-?.=&%]*$/.test(p)){
      throw new Error('INVALID_API_PATH');
    }
    var res=await fetch(base()+p,Object.assign({
      method:'GET',
      credentials:'include',
      cache:'no-store',
      headers:{'Accept':'application/json','X-EduVerse-Client':'web-core-v1'}
    },options||{}));
    if(!res.ok){ throw new Error('API_'+res.status); }
    return await res.json();
  }

  w.EVApi={
    __v1:true,
    get:function(path){ return request(path); },
    post:function(path,body){
      return request(path,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'X-EduVerse-Client':'web-core-v1'
        },
        body:JSON.stringify(body||{})
      });
    }
  };
})(window);

