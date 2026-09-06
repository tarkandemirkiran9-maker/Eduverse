(function(w,d){
  'use strict';
  if(w.EDUVERSE_VITRIN2 && w.EDUVERSE_VITRIN2.__ready){return;}

  var OFF='ev2-off';
  var STYLE_ID='eduverseVitrin2Style';
  var SELECTORS={
    world:['.globe-panel'],
    league:['.side-stack'],
    countdown:['#launchCountdown','.launch-countdown','[data-vitrin-module="countdown"]'],
    languagePromo:['.language-promo','#worldLanguageSelector','[data-vitrin-module="languagePromo"]'],
    story:['#founderStory','.founder-story','[data-vitrin-module="story"]'],
    store:['#eduverseStoreBridge'],
    showcase:['#eduverseStoreBridge .hub-showcase'],
    freeRooms:['#eduverseStoreBridge .hub-free'],
    family:['#eduverseStoreBridge .hub-family'],
    pricing:['#eduverseStoreBridge .hub-pricing'],
    worldBridge:['#eduverseStoreBridge .hub-world'],
    platform:['#eduverseStoreBridge .hub-platform'],
    android:['[data-hub-link="android"]','.ev-buy-android'],
    ios:['[data-hub-link="ios"]','.ev-buy-ios'],
    goodness:['#goodnessFund','.goodness-fund','[data-vitrin-module="goodness"]'],
    askida:['#askidaEduverse','.askida-eduverse','[data-vitrin-module="askida"]'],
    okiDede:['#okiDede','.oki-dede','[data-vitrin-module="okiDede"]'],
    lightGate:['#lightGate','.light-gate','[data-vitrin-module="lightGate"]'],
    campaign:['#eduverseCampaign','.eduverse-campaign','[data-vitrin-module="campaign"]'],
    socialProof:['#socialProof','.social-proof','[data-vitrin-module="socialProof"]'],
    feedback:['#feedback','.feedback','[data-vitrin-module="feedback"]'],
    analytics:['[data-vitrin-module="analytics"]']
  };

  function ensureStyle(){
    if(d.getElementById(STYLE_ID)){return;}
    var s=d.createElement('style');
    s.id=STYLE_ID;
    s.textContent='.'+OFF+'{display:none!important}.hero-grid.ev2-world-off,.hero-grid.ev2-league-off{grid-template-columns:minmax(0,1fr)!important}.hero-grid.ev2-world-off .side-stack{width:min(100%,760px);margin-inline:auto}.hero-grid.ev2-league-off .globe-panel{width:100%}';
    (d.head||d.documentElement).appendChild(s);
  }

  function cfg(){
    var c=w.EDUVERSE_VITRIN2_CONFIG||{};
    c.modules=c.modules||{};
    c.profiles=c.profiles||{};
    return c;
  }

  function nodes(name){
    var out=[];
    (SELECTORS[name]||[]).forEach(function(sel){
      try{
        d.querySelectorAll(sel).forEach(function(el){if(out.indexOf(el)<0){out.push(el);}});
      }catch(e){}
    });
    return out;
  }

  function setHidden(el,name,hidden){
    if(hidden){
      el.classList.add(OFF);
      el.setAttribute('data-ev2-off',name);
    }else if(el.getAttribute('data-ev2-off')===name){
      el.classList.remove(OFF);
      el.removeAttribute('data-ev2-off');
    }
  }

  function syncLegacy(){
    var c=cfg();
    var legacy=w.EDUVERSE_VITRIN_CONFIG=w.EDUVERSE_VITRIN_CONFIG||{};
    legacy.modules=legacy.modules||{};
    legacy.mode=String(c.mode||'prelaunch');
    Object.keys(c.modules).forEach(function(name){
      if(name==='league'){return;}
      if(name==='world'){
        legacy.modules.world=true;
      }else{
        legacy.modules[name]=c.modules[name]===true;
      }
    });
    if(w.EDUVERSE_VITRIN && typeof w.EDUVERSE_VITRIN.apply==='function'){
      try{w.EDUVERSE_VITRIN.apply();}catch(e){}
    }
  }

  function applyOne(name){
    var c=cfg();
    var on=c.modules[name]===true;
    nodes(name).forEach(function(el){setHidden(el,name,!on);});
    try{d.documentElement.setAttribute('data-vitrin2-'+name,on?'on':'off');}catch(e){}
  }

  function applyHero(){
    var c=cfg();
    var worldOn=c.modules.world===true;
    var leagueOn=c.modules.league===true;
    d.querySelectorAll('.hero-grid').forEach(function(hero){
      hero.classList.toggle('ev2-world-off',!worldOn&&leagueOn);
      hero.classList.toggle('ev2-league-off',worldOn&&!leagueOn);
      setHidden(hero,'worldLeague',!worldOn&&!leagueOn);
    });
  }

  function apply(){
    ensureStyle();
    syncLegacy();
    Object.keys(SELECTORS).forEach(applyOne);
    applyHero();
    try{
      d.documentElement.setAttribute('data-vitrin2-mode',String(cfg().mode||'prelaunch'));
      d.documentElement.setAttribute('data-vitrin2-version','2.0');
    }catch(e){}
    return snapshot();
  }

  function setModule(name,on){
    var c=cfg();
    if(!Object.prototype.hasOwnProperty.call(SELECTORS,name)){return false;}
    c.modules[name]=on===true;
    apply();
    return true;
  }

  function setMode(mode){
    var c=cfg();
    mode=String(mode||'prelaunch');
    if(!c.profiles[mode]){return false;}
    c.mode=mode;
    Object.keys(c.profiles[mode]).forEach(function(name){
      if(Object.prototype.hasOwnProperty.call(SELECTORS,name)){
        c.modules[name]=c.profiles[mode][name]===true;
      }
    });
    apply();
    return true;
  }

  function snapshot(){
    var c=cfg();
    var out={version:'2.0',mode:String(c.mode||'prelaunch'),modules:{}};
    Object.keys(SELECTORS).forEach(function(name){
      out.modules[name]={enabled:c.modules[name]===true,nodes:nodes(name).length};
    });
    return out;
  }

  var queued=false;
  function queueApply(){
    if(queued){return;}
    queued=true;
    (w.requestAnimationFrame||w.setTimeout)(function(){queued=false;apply();},0);
  }

  w.EDUVERSE_VITRIN2={
    __ready:true,
    version:'2.0',
    apply:apply,
    setModule:setModule,
    setMode:setMode,
    snapshot:snapshot,
    config:cfg,
    selectors:SELECTORS
  };

  if(d.readyState==='loading'){
    d.addEventListener('DOMContentLoaded',function(){
      apply();
      if(d.body&&w.MutationObserver){new MutationObserver(queueApply).observe(d.body,{childList:true,subtree:true});}
    },{once:true});
  }else{
    apply();
    if(d.body&&w.MutationObserver){new MutationObserver(queueApply).observe(d.body,{childList:true,subtree:true});}
  }
})(window,document);
