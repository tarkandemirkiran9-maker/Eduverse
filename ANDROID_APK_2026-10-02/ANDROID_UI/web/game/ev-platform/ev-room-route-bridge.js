(function(w){
  'use strict';
  if(w.EVRoomRouteBridge && w.EVRoomRouteBridge.__v1){ return; }

  var handled=false;

  function findRoom(id){
    try{
      if(!w.ROOMS || !Array.isArray(w.ROOMS)){ return null; }
      for(var i=0;i<w.ROOMS.length;i++){
        if(w.ROOMS[i] && String(w.ROOMS[i].id)===String(id)){ return w.ROOMS[i]; }
      }
    }catch(e){}
    return null;
  }

  function tier(id){
    try{
      if(typeof w.evRoomCommercialTier==='function'){
        return String(w.evRoomCommercialTier(id)||'');
      }
    }catch(e){}
    return '';
  }

  function decision(room){
    try{
      if(typeof w.evRoomCommercialDecision==='function'){
        return w.evRoomCommercialDecision(room);
      }
    }catch(e){}
    return {allowed:false};
  }

  function openAccess(){
    try{
      if(typeof w.openEduverseAccess==='function'){
        w.openEduverseAccess();
        return true;
      }
    }catch(e){}
    return false;
  }

  function run(){
    if(handled){ return true; }
    if(!w.EVDeepLink || typeof w.EVDeepLink.current!=='function'){ return false; }

    var route=w.EVDeepLink.current();
    if(!route || route.type!=='ROOM' || !route.roomId){ return true; }

    var room=findRoom(route.roomId);
    if(!room){ return false; }

    var d=decision(room);
    var t=tier(route.roomId);

    if(d && d.allowed===true){
      /*
       * WEB4:
       * Oki'ye Sor is a special FREE room with its own tested opener.
       * A deep link must not pass through legacy room presentation gates
       * that can surface a paid handoff over a free room.
       * Commercial entitlement is still checked above; only FREE Oki uses
       * the existing dedicated room opener.
       */
      if(
        t==='FREE' &&
        route.roomId==='okiyesor' &&
        typeof w.openOkiyeSorRoom==='function'
      ){
        handled=true;
        w.openOkiyeSorRoom();
        return true;
      }

      if(typeof w.enterRoom!=='function'){ return false; }
      handled=true;
      w.enterRoom(room);
      return true;
    }

    if(t==='FIVE_PACK' || t==='FULL_ONLY'){
      handled=true;
      openAccess();
      return true;
    }

    /* Gizli/özel/bilinmeyen oda: kilidi veya özel şartı atlama. */
    handled=true;
    return true;
  }

  function boot(){
    var tries=0;
    function attempt(){
      tries++;
      if(run() || tries>=30){ return; }
      setTimeout(attempt,100);
    }
    attempt();
  }

  w.EVRoomRouteBridge={__v1:true,run:run};

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }
})(window);

