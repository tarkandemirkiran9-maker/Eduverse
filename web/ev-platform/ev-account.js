(function(w){
  'use strict';
  if(w.EVAccount && w.EVAccount.__v3){ return; }

  var state={
    status:'SIGNED_OUT',
    familyId:null,
    profileId:null,
    source:'NONE',
    entitlements:null
  };

  function clear(){
    state.status='SIGNED_OUT';
    state.familyId=null;
    state.profileId=null;
    state.source='NONE';
    state.entitlements=null;
  }

  function getState(){
    return {
      status:state.status,
      familyId:state.familyId,
      profileId:state.profileId,
      source:state.source,
      entitlements:state.entitlements ? {
        fiveRoomAccess:state.entitlements.fiveRoomAccess===true,
        fullAccess:state.entitlements.fullAccess===true
      } : null
    };
  }

  async function refresh(){
    var cfg=w.EV_CONFIG||{};
    if(cfg.backendEnabled!==true){
      clear();
      return getState();
    }
    if(!w.EVApi || typeof w.EVApi.get!=='function'){
      clear();
      return getState();
    }
    if(!w.EVSessionContract || typeof w.EVSessionContract.parse!=='function'){
      clear();
      return getState();
    }

    try{
      var raw=await w.EVApi.get('/v1/account/session');
      var data=w.EVSessionContract.parse(raw);
      if(!data){
        clear();
        return getState();
      }

      state.status='SIGNED_IN';
      state.familyId=data.familyId;
      state.profileId=data.profileId;
      state.source='BACKEND_VERIFIED';
      state.entitlements=data.entitlements;
      return getState();
    }catch(e){
      clear();
      return getState();
    }
  }

  w.EVAccount={
    __v1:true,
    __v2:true,
    __v3:true,
    getState:getState,
    isSignedIn:function(){ return state.status==='SIGNED_IN'; },
    refresh:refresh,
    deviceIdentity:function(){
      return w.EVFamily && w.EVFamily.localIdentity
        ? w.EVFamily.localIdentity()
        : {deviceKey:null,account:false,paidRightsStoredLocally:false};
    }
  };
})(window);

