(function(w){
  'use strict';
  if(w.EVEntitlements && w.EVEntitlements.__v2){ return; }

  var FREE=Object.freeze({
    okiyesor:true,cevre:true,hayvanat:true,boyama:true,bilgitoplari:true
  });
  var FIVE=Object.freeze({
    puzzle:true,refleks:true,bilgisayar:true,nefes:true,sifa:true
  });
  var FULL=Object.freeze({
    ibadet:true,sinema:true,ders:true,oyuncak:true,caliskan:true,
    sanat:true,mutfak:true,aile:true,ada:true,odulodasi:true,
    para:true,arapca:true,kucukmelekler:true,english:true,deutsch:true,
    francais:true,okyanus:true,atlas:true,muzik:true,kumanda:true,
    hikayestudio:true
  });

  function nativeSnapshot(){
  /* IOS_NATIVE_CACHE_V1 */
  try{
    if(
      w.EVPlatform &&
      typeof w.EVPlatform.platform === 'function' &&
      w.EVPlatform.platform() === 'ios' &&
      w.EVIOSStore &&
      typeof w.EVIOSStore.enabled === 'function' &&
      w.EVIOSStore.enabled() === true &&
      typeof w.EVIOSStore.snapshot === 'function'
    ){
      var iosState = w.EVIOSStore.snapshot();
      if(iosState && iosState.ready === true){
        return {
          bridge:true,
          fiveRoomAccess:iosState.fiveRoomAccess === true,
          fullAccess:iosState.fullAccess === true,
          source:'IOS_NATIVE'
        };
      }
    }
  }catch(e){}
    var bridge=null;
    try{ bridge=w.EVAccess||null; }catch(e){}
    if(!bridge || typeof bridge.getBillingStatus!=='function'){ return null; }
    try{
      var raw=bridge.getBillingStatus();
      var data=typeof raw==='object'?raw:JSON.parse(String(raw||'{}'));
      return {
        ready:data.ready===true,
        fiveRoomAccess:data.fiveRoomAccess===true,
        fullAccess:data.fullAccess===true,
        source:'ANDROID_NATIVE',
        state:String(data.state||'')
      };
    }catch(e){
      return {
        ready:false,
        fiveRoomAccess:false,
        fullAccess:false,
        source:'ANDROID_NATIVE_ERROR',
        state:'ERROR'
      };
    }
  }

  function accountSnapshot(){
    try{
      if(!w.EVAccount || !w.EVAccount.getState){ return null; }
      var a=w.EVAccount.getState();
      if(
        !a ||
        a.status!=='SIGNED_IN' ||
        a.source!=='BACKEND_VERIFIED' ||
        !a.entitlements
      ){ return null; }

      return {
        ready:true,
        fiveRoomAccess:a.entitlements.fiveRoomAccess===true,
        fullAccess:a.entitlements.fullAccess===true,
        source:'EDUVERSE_FAMILY_ACCOUNT',
        state:'VERIFIED'
      };
    }catch(e){ return null; }
  }

  function snapshot(){
    var n=nativeSnapshot();
    if(n){ return n; }

    var a=accountSnapshot();
    if(a){ return a; }

    return {
      ready:false,
      fiveRoomAccess:false,
      fullAccess:false,
      source:'REMOTE_NOT_CONNECTED',
      state:'FAIL_CLOSED'
    };
  }

  function tier(roomId){
    var id=String(roomId||'');
    if(id==='gizli'){ return 'STREAK_SECRET'; }
    if(FREE[id]){ return 'FREE'; }
    if(FIVE[id]){ return 'FIVE_PACK'; }
    if(FULL[id]){ return 'FULL_ONLY'; }
    return 'UNKNOWN_FAIL_CLOSED';
  }

  function canAccess(roomId){
    var t=tier(roomId);
    if(t==='FREE'){ return true; }
    if(t==='STREAK_SECRET'){ return false; }
    var s=snapshot();
    if(t==='FIVE_PACK'){ return s.fiveRoomAccess===true || s.fullAccess===true; }
    if(t==='FULL_ONLY'){ return s.fullAccess===true; }
    return false;
  }

  w.EVEntitlements={
    __v1:true,
    __v2:true,
    tier:tier,
    snapshot:snapshot,
    canAccess:canAccess
  };
})(window);


