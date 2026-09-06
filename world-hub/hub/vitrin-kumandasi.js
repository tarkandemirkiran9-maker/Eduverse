(function(w,d){
  'use strict';
  if(w.EDUVERSE_VITRIN && w.EDUVERSE_VITRIN.__v2){return;}

  var STYLE_ID='eduverseVitrinControllerStyle';
  var OFF_CLASS='ev-vitrin-off';
  var MODULE_SELECTORS={
    world:['.hero-grid'],
    store:['#eduverseStoreBridge'],
    showcase:['#eduverseStoreBridge .hub-showcase'],
    freeRooms:['#eduverseStoreBridge .hub-free'],
    family:['#eduverseStoreBridge .hub-family'],
    pricing:['#eduverseStoreBridge .hub-pricing'],
    worldBridge:['#eduverseStoreBridge .hub-world'],
    platform:['#eduverseStoreBridge .hub-platform'],
    android:['[data-hub-link="android"]','.ev-buy-android'],
    ios:['[data-hub-link="ios"]','.ev-buy-ios'],
    goodness:['#goodnessFund'],
    story:['#founderStory','.founder-story','[data-vitrin-module="story"]'],
    countdown:['#launchCountdown','.launch-countdown','[data-vitrin-module="countdown"]'],
    languagePromo:['#worldLanguageSelector','.language-promo','[data-vitrin-module="languagePromo"]'],
    askida:['#askidaEduverse','.askida-eduverse','[data-vitrin-module="askida"]'],
    campaign:['#eduverseCampaign','.eduverse-campaign','[data-vitrin-module="campaign"]'],
    socialProof:['#socialProof','.social-proof','[data-vitrin-module="socialProof"]'],
    feedback:['#feedback','.feedback','[data-vitrin-module="feedback"]'],
    analytics:['[data-vitrin-module="analytics"]']
  };

  function ensureStyle(){
    if(d.getElementById(STYLE_ID)){return;}
    var style=d.createElement('style');
    style.id=STYLE_ID;
    style.textContent='.'+OFF_CLASS+'{display:none !important;}';
    (d.head||d.documentElement).appendChild(style);
  }

  function config(){
    var c=w.EDUVERSE_VITRIN_CONFIG||{};
    c.modules=c.modules||{};
    return c;
  }

  function selectorsFor(name){
    var list=MODULE_SELECTORS[name]||[];
    return list.slice();
  }

  function nodesFor(name){
    var out=[];
    selectorsFor(name).forEach(function(sel){
      try{
        d.querySelectorAll(sel).forEach(function(el){
          if(out.indexOf(el)<0){out.push(el);}
        });
      }catch(e){}
    });
    return out;
  }

  function applyModule(name,on){
    ensureStyle();
    nodesFor(name).forEach(function(el){
      var shouldHide=on!==true;
      if(shouldHide){
        if(!el.classList.contains(OFF_CLASS)){el.classList.add(OFF_CLASS);}
        el.setAttribute('data-ev-vitrin-off',name);
      }else if(el.getAttribute('data-ev-vitrin-off')===name){
        el.classList.remove(OFF_CLASS);
        el.removeAttribute('data-ev-vitrin-off');
      }
    });
    try{d.documentElement.setAttribute('data-vitrin-'+name,on===true?'on':'off');}catch(e){}
  }

  function apply(){
    var c=config();
    Object.keys(MODULE_SELECTORS).forEach(function(name){
      applyModule(name,c.modules[name]===true);
    });
    try{
      d.documentElement.setAttribute('data-vitrin-mode',String(c.mode||'prelaunch'));
      d.documentElement.setAttribute('data-vitrin-version','2');
    }catch(e){}
    return snapshot();
  }

  function setModule(name,on){
    var c=config();
    if(!Object.prototype.hasOwnProperty.call(MODULE_SELECTORS,name)){return false;}
    c.modules[name]=on===true;
    applyModule(name,c.modules[name]);
    return true;
  }

  function setMode(mode){
    var c=config();
    c.mode=String(mode||'prelaunch');
    apply();
    return c.mode;
  }

  function snapshot(){
    var c=config(), result={version:2,mode:String(c.mode||'prelaunch'),modules:{}};
    Object.keys(MODULE_SELECTORS).forEach(function(name){
      result.modules[name]={enabled:c.modules[name]===true,nodes:nodesFor(name).length};
    });
    return result;
  }

  var applyQueued=false;
  function queueApply(){
    if(applyQueued){return;}
    applyQueued=true;
    (w.requestAnimationFrame||w.setTimeout)(function(){
      applyQueued=false;
      apply();
    },0);
  }

  w.EDUVERSE_VITRIN={
    __v2:true,
    apply:apply,
    setModule:setModule,
    setMode:setMode,
    snapshot:snapshot,
    selectors:MODULE_SELECTORS
  };

  if(d.readyState==='loading'){
    d.addEventListener('DOMContentLoaded',function(){
      apply();
      new MutationObserver(queueApply).observe(d.body,{childList:true,subtree:true});
    },{once:true});
  }else{
    apply();
    if(d.body){new MutationObserver(queueApply).observe(d.body,{childList:true,subtree:true});}
  }
})(window,document);
