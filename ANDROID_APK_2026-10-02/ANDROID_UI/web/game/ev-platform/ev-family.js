(function(w){
  'use strict';
  if(w.EVFamily && w.EVFamily.__v1){ return; }

  var KEY='ev_family_device_key_v1';

  function randomKey(){
    try{
      if(w.crypto && typeof w.crypto.randomUUID==='function'){
        return 'evd_'+w.crypto.randomUUID();
      }
    }catch(e){}
    return 'evd_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,14);
  }

  function deviceKey(){
    var k='';
    try{ k=String(localStorage.getItem(KEY)||''); }catch(e){}
    if(/^evd_[A-Za-z0-9_-]{8,}$/.test(k)){ return k; }
    k=randomKey();
    try{ localStorage.setItem(KEY,k); }catch(e){}
    return k;
  }

  w.EVFamily={
    __v1:true,
    deviceKey:deviceKey,
    localIdentity:function(){
      return {
        deviceKey:deviceKey(),
        account:false,
        paidRightsStoredLocally:false
      };
    }
  };
})(window);

