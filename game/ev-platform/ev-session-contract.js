(function(w){
  'use strict';
  if(w.EVSessionContract && w.EVSessionContract.__v1){ return; }

  function idOk(v,prefix){
    return new RegExp('^'+prefix+'_[A-Za-z0-9_-]{8,}$').test(String(v||''));
  }

  function parse(data){
    if(!data || typeof data!=='object') return null;
    if(data.schemaVersion!==1) return null;
    if(data.authenticated!==true) return null;
    if(data.verified!==true) return null;
    if(!idOk(data.familyId,'fam')) return null;

    var e=data.entitlements;
    if(!e || typeof e!=='object') return null;

    return {
      familyId:String(data.familyId),
      profileId:idOk(data.profileId,'pro') ? String(data.profileId) : null,
      entitlements:{
        fiveRoomAccess:e.fiveRoomAccess===true,
        fullAccess:e.fullAccess===true
      }
    };
  }

  w.EVSessionContract={__v1:true,parse:parse};
})(window);

