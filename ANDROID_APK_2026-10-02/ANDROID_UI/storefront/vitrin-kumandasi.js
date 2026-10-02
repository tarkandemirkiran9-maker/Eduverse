(function(w,d){
  'use strict';
  if(w.EDUVERSE_VITRIN_KUMANDASI && w.EDUVERSE_VITRIN_KUMANDASI.__v1){return;}

  var MODES={
    prelaunch:{
      countdown:true,
      languagePromo:true,
      okiDede:true,
      ios:true,
      android:true,
      lightGate:true,
      pricing:true,
      freeRooms:true,
      campaign:false,
      socialProof:false,
      feedback:false,
      analytics:false,
      paidSales:false
    },
    live:{
      countdown:false,
      languagePromo:true,
      okiDede:true,
      ios:true,
      android:true,
      lightGate:true,
      pricing:true,
      freeRooms:true,
      campaign:false,
      socialProof:false,
      feedback:false,
      analytics:false,
      paidSales:false
    },
    campaign:{
      countdown:false,
      languagePromo:true,
      okiDede:true,
      ios:true,
      android:true,
      lightGate:true,
      pricing:true,
      freeRooms:true,
      campaign:true,
      socialProof:false,
      feedback:false,
      analytics:false,
      paidSales:false
    }
  };

  var SELECTORS={
    countdown:['#launch-countdown','.launch-countdown','.countdown-display','.countdown-matrix'],
    languagePromo:['.language-promo','.language-promo-head'],
    okiDede:['.oki','#oki','.oki-dede','#oki-dede','[data-module="oki-dede"]'],
    ios:['.store-ios','#store-ios','#ios-launch-link','.ios-launch-link'],
    android:['.store-android','#store-android'],
    lightGate:['#lightgate','.lightgate'],
    pricing:['.price','.price-card','.price-btn','.price-chip'],
    freeRooms:['.free','#free','[data-module="free-rooms"]'],
    campaign:['.campaign','#campaign','[data-module="campaign"]'],
    socialProof:['.social-proof','#social-proof','[data-module="social-proof"]'],
    feedback:['.feedback','#feedback','[data-module="feedback"]'],
    analytics:[]
  };

  function cfg(){
    var c=w.EDUVERSE_VITRIN_CONFIG||{};
    var mode=String(c.mode||'prelaunch');
    var base=Object.assign({},MODES[mode]||MODES.prelaunch);
    var mods=(c.modules&&typeof c.modules==='object')?c.modules:{};
    Object.keys(mods).forEach(function(k){
      if(Object.prototype.hasOwnProperty.call(base,k)){base[k]=mods[k]===true;}
    });
    base.paidSales=false; /* owner gate: never auto-enable */
    return {mode:mode,modules:base};
  }

  function nodes(key){
    var out=[];
    (SELECTORS[key]||[]).forEach(function(sel){
      try{ d.querySelectorAll(sel).forEach(function(n){ if(out.indexOf(n)<0)out.push(n); }); }catch(e){}
    });
    return out;
  }

  function apply(){
    var c=cfg();
    Object.keys(c.modules).forEach(function(key){
      if(key==='paidSales' || key==='analytics'){return;}
      nodes(key).forEach(function(n){
        if(c.modules[key]===true){
          if(n.dataset && n.dataset.evVitrinOldDisplay!==undefined){
            n.style.display=n.dataset.evVitrinOldDisplay;
            delete n.dataset.evVitrinOldDisplay;
          }else if(n.style.display==='none'){
            n.style.display='';
          }
          n.removeAttribute('aria-hidden');
        }else{
          if(n.dataset && n.dataset.evVitrinOldDisplay===undefined){
            n.dataset.evVitrinOldDisplay=n.style.display||'';
          }
          n.style.display='none';
          n.setAttribute('aria-hidden','true');
        }
      });
    });

    try{
      d.documentElement.setAttribute('data-eduverse-vitrin-mode',c.mode);
      d.documentElement.setAttribute('data-eduverse-paid-sales','off');
    }catch(e){}
    return c;
  }

  w.EDUVERSE_VITRIN_KUMANDASI={
    __v1:true,
    get:cfg,
    apply:apply,
    setModule:function(name,on){
      w.EDUVERSE_VITRIN_CONFIG=w.EDUVERSE_VITRIN_CONFIG||{mode:'prelaunch',modules:{}};
      w.EDUVERSE_VITRIN_CONFIG.modules=w.EDUVERSE_VITRIN_CONFIG.modules||{};
      w.EDUVERSE_VITRIN_CONFIG.modules[name]=on===true;
      return apply();
    },
    setMode:function(mode){
      w.EDUVERSE_VITRIN_CONFIG=w.EDUVERSE_VITRIN_CONFIG||{modules:{}};
      w.EDUVERSE_VITRIN_CONFIG.mode=String(mode||'prelaunch');
      return apply();
    }
  };

  if(d.readyState==='loading'){
    d.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }
})(window,document);

