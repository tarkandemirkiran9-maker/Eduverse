(function(w){
  'use strict';
  if(w.EV_CONFIG && w.EV_CONFIG.__v1){ return; }
  w.EV_CONFIG = Object.freeze({
    __v1:true,
    apiBase:'https://api.eduverse.club',
    playBase:'https://play.eduverse.club',
    goBase:'https://go.eduverse.club',
    backendEnabled:false,
    telemetryEnabled:false,
    webPaymentsEnabled:false,
    androidStoreEnabled:true,
    iosStoreEnabled:false
  });
})(window);
