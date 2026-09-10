(function(w){
  'use strict';
  if(w.EVStore && w.EVStore.__v1){ return; }

  var PRODUCTS = Object.freeze({
    FIVE:'eduverse_5_room_pack',
    FULL:'eduverse_full_access',
    UPGRADE:'eduverse_full_upgrade'
  });

  function platform(){
    try{ return w.EVPlatform ? w.EVPlatform.platform() : 'web'; }catch(e){ return 'web'; }
  }

  function status(){
    var p = platform();
    if(p === 'android'){
      return {
        platform:p,
        purchaseAvailable:!!(w.EVAccess && typeof w.EVAccess.launchPurchase === 'function'),
        mode:'GOOGLE_PLAY'
      };
    }
    if(p === 'ios'){
      /* IOS_STORE_STATUS_V1 */
var iosReady = !!(
  w.EVIOSStore &&
  typeof w.EVIOSStore.enabled === 'function' &&
  w.EVIOSStore.enabled() === true &&
  typeof w.EVIOSStore.available === 'function' &&
  w.EVIOSStore.available() === true
);
return {
  platform:p,
  purchaseAvailable:iosReady,
  mode:iosReady ? 'APP_STORE' : 'APP_STORE_ADAPTER_PENDING'
};
    }
    return {platform:'web',purchaseAvailable:false,mode:'STORE_HANDOFF'};
  }

  function launch(productId){
    var s = status();
    var id = String(productId || '');
    if(Object.values(PRODUCTS).indexOf(id) < 0){
      return {ok:false,state:'UNKNOWN_PRODUCT'};
    }
    if(s.platform === 'android' && s.purchaseAvailable){
      try{
        return {ok:true,state:'NATIVE_LAUNCH',result:w.EVAccess.launchPurchase(id)};
      }catch(e){
        return {ok:false,state:'ANDROID_LAUNCH_ERROR'};
      }
    }
    if(s.platform === 'ios'){
      return {ok:false,state:'IOS_ADAPTER_PENDING'};
    }
    return {ok:false,state:'STORE_HANDOFF_REQUIRED'};
  }

  w.EVStore = {
    __v1:true,
    PRODUCTS:PRODUCTS,
    status:status,
    launch:launch
  };
})(window);

