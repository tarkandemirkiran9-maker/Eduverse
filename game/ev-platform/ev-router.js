(function(w){
  'use strict';
  if(w.EVRouter && w.EVRouter.__v1){ return; }

  function clean(v){ return encodeURIComponent(String(v || '').trim()); }

  function roomFromLocation(){
    try{
      var u = new URL(w.location.href);
      var q = u.searchParams.get('room');
      if(q){ return String(q); }
      var m = u.pathname.match(/\/room\/([^\/?#]+)/i);
      return m ? decodeURIComponent(m[1]) : null;
    }catch(e){ return null; }
  }

  function webRoom(roomId){
    var base = String((w.EV_CONFIG && w.EV_CONFIG.playBase) || 'https://play.eduverse.club').replace(/\/+$/,'');
    return base + '/room/' + clean(roomId);
  }

  function smartRoom(roomId){
    var base = String((w.EV_CONFIG && w.EV_CONFIG.goBase) || 'https://go.eduverse.club').replace(/\/+$/,'');
    return base + '/room/' + clean(roomId);
  }

  w.EVRouter = {
    __v1:true,
    roomFromLocation:roomFromLocation,
    webRoom:webRoom,
    smartRoom:smartRoom
  };
})(window);
