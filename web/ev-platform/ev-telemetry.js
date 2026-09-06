(function(w){
  'use strict';
  if(w.EVTelemetry && w.EVTelemetry.__v1){ return; }

  var queue = [];
  var allowed = Object.freeze({
    store_view:true,
    play_free_clicked:true,
    google_play_clicked:true,
    app_store_clicked:true,
    room_previewed:true,
    light_gate_completed:true,
    web_game_started:true,
    purchase_path_started:true,
    feedback_submitted:true
  });

  function track(name, data){
    name = String(name || '');
    if(!allowed[name]){ return false; }
    var item = {
      name:name,
      at:new Date().toISOString(),
      platform:(w.EVPlatform && w.EVPlatform.platform) ? w.EVPlatform.platform() : 'web',
      data:(data && typeof data === 'object') ? data : {}
    };
    queue.push(item);
    if(queue.length > 100){ queue.shift(); }
    try{ if(w.EVPlatform){ w.EVPlatform.emit('telemetry',item); } }catch(e){}
    return true;
  }

  w.EVTelemetry = {
    __v1:true,
    track:track,
    queued:function(){ return queue.slice(); },
    sendingEnabled:function(){ return !!(w.EV_CONFIG && w.EV_CONFIG.telemetryEnabled === true); }
  };
})(window);
