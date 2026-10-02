(function(w){
'use strict';
if(w.EVIOSStore && w.EVIOSStore.__v1){ return; }

var cache = {
  ready:false,
  fiveRoomAccess:false,
  fullAccess:false,
  ownedProductIds:[],
  source:'IOS_NATIVE_PENDING'
};

var nativePlugin = null;

function config(){
  try{ return w.EV_CONFIG || {}; }catch(e){ return {}; }
}

function isIOS(){
  try{
    return !!(
      w.EVPlatform &&
      typeof w.EVPlatform.platform === 'function' &&
      w.EVPlatform.platform() === 'ios'
    );
  }catch(e){ return false; }
}

function enabled(){
  return isIOS() && config().iosStoreEnabled === true;
}

function plugin(){
  if(!enabled()){ return null; }
  if(nativePlugin){ return nativePlugin; }

  try{
    if(!w.Capacitor || typeof w.Capacitor.registerPlugin !== 'function'){
      return null;
    }
    nativePlugin = w.Capacitor.registerPlugin('EduVerseStoreKit');
    return nativePlugin;
  }catch(e){
    return null;
  }
}

function applyState(value){
  var x = value && typeof value === 'object' ? value : {};
  cache = {
    ready:x.ready === true,
    fiveRoomAccess:x.fiveRoomAccess === true,
    fullAccess:x.fullAccess === true,
    ownedProductIds:Array.isArray(x.ownedProductIds) ? x.ownedProductIds.slice() : [],
    source:x.ready === true ? 'IOS_NATIVE' : 'IOS_NATIVE_PENDING'
  };
  return snapshot();
}

function snapshot(){
  return {
    ready:cache.ready === true,
    fiveRoomAccess:cache.fiveRoomAccess === true,
    fullAccess:cache.fullAccess === true,
    ownedProductIds:cache.ownedProductIds.slice(),
    source:cache.source
  };
}

async function refresh(){
  if(!enabled()){
    cache = {
      ready:false,
      fiveRoomAccess:false,
      fullAccess:false,
      ownedProductIds:[],
      source:'IOS_STORE_DISABLED'
    };
    return snapshot();
  }

  var p = plugin();
  if(!p || typeof p.status !== 'function'){
    cache = {
      ready:false,
      fiveRoomAccess:false,
      fullAccess:false,
      ownedProductIds:[],
      source:'IOS_NATIVE_UNAVAILABLE'
    };
    return snapshot();
  }

  try{
    return applyState(await p.status());
  }catch(e){
    cache = {
      ready:false,
      fiveRoomAccess:false,
      fullAccess:false,
      ownedProductIds:[],
      source:'IOS_NATIVE_ERROR'
    };
    return snapshot();
  }
}

async function launchPurchase(productId){
  var p = plugin();
  if(!p || typeof p.launchPurchase !== 'function'){
    return {ok:false,code:'IOS_NATIVE_UNAVAILABLE'};
  }

  try{
    var result = await p.launchPurchase({productId:String(productId || '')});
    if(result && typeof result === 'object' && result.ready === true){
      applyState(result);
    }else{
      await refresh();
    }
    return result || {};
  }catch(e){
    return {ok:false,code:String((e && e.message) || 'IOS_PURCHASE_ERROR')};
  }
}

async function restore(){
  var p = plugin();
  if(!p || typeof p.restore !== 'function'){
    return {ok:false,code:'IOS_NATIVE_UNAVAILABLE'};
  }
  try{
    var result = await p.restore();
    if(result && typeof result === 'object' && result.ready === true){
      applyState(result);
    }else{
      await refresh();
    }
    return result || {};
  }catch(e){
    return {ok:false,code:String((e && e.message) || 'IOS_RESTORE_ERROR')};
  }
}

async function call(name,args){
  var p = plugin();
  if(!p || typeof p[name] !== 'function'){
    return {ok:false,code:'IOS_NATIVE_UNAVAILABLE'};
  }
  try{
    return await p[name](args || {});
  }catch(e){
    return {ok:false,code:String((e && e.message) || 'IOS_NATIVE_ERROR')};
  }
}

w.EVIOSStore = {
  __v1:true,
  enabled:enabled,
  available:function(){ return !!plugin(); },
  snapshot:snapshot,
  refresh:refresh,
  launchPurchase:launchPurchase,
  restore:restore,

  getParentGateStatus:function(){
    return call('getParentGateStatus');
  },
  createParentPin:function(pin,confirmation){
    return call('createParentPin',{
      pin:String(pin || ''),
      confirmation:String(confirmation || '')
    });
  },
  verifyParentPin:function(pin){
    return call('verifyParentPin',{pin:String(pin || '')});
  },
  authorizePurchaseWithParentPin:function(productId,pin){
    return call('authorizePurchaseWithParentPin',{
      productId:String(productId || ''),
      pin:String(pin || '')
    });
  },
  beginParentPinRecovery:function(){
    return call('beginParentPinRecovery');
  },
  getParentRecoveryStatus:function(){
    return call('getParentRecoveryStatus');
  },
  resetParentPinAfterDeviceAuth:function(pin,confirmation){
    return call('resetParentPinAfterDeviceAuth',{
      pin:String(pin || ''),
      confirmation:String(confirmation || '')
    });
  }
};

if(enabled()){
  setTimeout(function(){ refresh(); },0);
}
})(window);

