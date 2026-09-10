(function(w){
  'use strict';
  if(w.EVPlatform && w.EVPlatform.__v1){ return; }

  function platform(){
    try{
      if(w.Capacitor && typeof w.Capacitor.getPlatform === 'function'){
        var p = String(w.Capacitor.getPlatform() || '').toLowerCase();
        if(p === 'android' || p === 'ios' || p === 'web'){ return p; }
      }
      if(w.Capacitor && typeof w.Capacitor.isNativePlatform === 'function' && w.Capacitor.isNativePlatform()){
        var ua = String((w.navigator && w.navigator.userAgent) || '').toLowerCase();
        if(ua.indexOf('android') >= 0){ return 'android'; }
        if(/iphone|ipad|ipod/.test(ua)){ return 'ios'; }
      }
    }catch(e){}
    return 'web';
  }

  function emit(name, detail){
    try{ w.dispatchEvent(new CustomEvent('eduverse:'+name,{detail:detail||{}})); }catch(e){}
  }

  w.EVPlatform = {
    __v1:true,
    version:'1.0.0',
    config:w.EV_CONFIG || {},
    platform:platform,
    isNative:function(){ return platform() !== 'web'; },
    nativeAccess:function(){
      try{ return w.EVAccess || null; }catch(e){ return null; }
    },
    emit:emit
  };
})(window);
