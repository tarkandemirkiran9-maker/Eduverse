(function(w,d){
  'use strict';

  var ROOT_ID='launchCountdown';
  var timer=0;
  var observer=null;
  var state={mode:'soon',lang:'tr'};

  var TEXT={
    tr:{kicker:'EDUVERSE GELİYOR',soon:'Açılış çok yakında.',soonSub:'EduVerse çok yakında sizinle.',count:'EduVerse’in açılışına kalan süre',countSub:'Yeni dünyamızın kapıları 21 Eylül’de açılıyor.',days:'GÜN',hours:'SAAT',minutes:'DK',seconds:'SN',langs:'5 DİL',clock:'EDUVERSE · ŞİMDİ'},
    en:{kicker:'EDUVERSE IS COMING',soon:'Opening very soon.',soonSub:'EduVerse will be with you very soon.',count:'Time until EduVerse opens',countSub:'Our new world opens its doors on 21 September.',days:'DAYS',hours:'HOURS',minutes:'MIN',seconds:'SEC',langs:'5 LANGUAGES',clock:'EDUVERSE · NOW'},
    de:{kicker:'EDUVERSE KOMMT',soon:'Eröffnung sehr bald.',soonSub:'EduVerse ist schon sehr bald für Sie da.',count:'Zeit bis zur Eröffnung von EduVerse',countSub:'Unsere neue Welt öffnet am 21. September ihre Türen.',days:'TAGE',hours:'STD',minutes:'MIN',seconds:'SEK',langs:'5 SPRACHEN',clock:'EDUVERSE · JETZT'},
    fr:{kicker:'EDUVERSE ARRIVE',soon:'Ouverture très bientôt.',soonSub:'EduVerse sera bientôt avec vous.',count:'Temps restant avant l’ouverture d’EduVerse',countSub:'Notre nouveau monde ouvre ses portes le 21 septembre.',days:'JOURS',hours:'H',minutes:'MIN',seconds:'SEC',langs:'5 LANGUES',clock:'EDUVERSE · MAINTENANT'},
    ar:{kicker:'EDUVERSE قادم',soon:'الافتتاح قريب جدًا.',soonSub:'سيكون EduVerse معكم قريبًا جدًا.',count:'الوقت المتبقي لافتتاح EduVerse',countSub:'يفتح عالمنا الجديد أبوابه في 21 سبتمبر.',days:'يوم',hours:'ساعة',minutes:'دقيقة',seconds:'ثانية',langs:'5 لغات',clock:'EDUVERSE · الآن'}
  };
  var LOCALE={tr:'tr-TR',en:'en-GB',de:'de-DE',fr:'fr-FR',ar:'ar'};

  function root(){return d.getElementById(ROOT_ID);}
  function cfg(){return w.EDUVERSE_LAUNCH_CONFIG||{};}
  function lang(){var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';return TEXT[x]?x:'tr';}
  function el(sel){var r=root();return r?r.querySelector(sel):null;}
  function text(sel,value){var n=el(sel);if(n&&n.textContent!==value)n.textContent=value;}
  function pad(n){return String(Math.max(0,n|0)).padStart(2,'0');}
  function targetMs(){var raw=String(cfg().targetAt||'').trim();if(!raw)return NaN;var ms=Date.parse(raw);return Number.isFinite(ms)?ms:NaN;}
  function safePaidGuard(){
    try{
      if(cfg().autoSales===false && w.EDUVERSE_PURCHASE_CONFIG){w.EDUVERSE_PURCHASE_CONFIG.paidSalesEnabled=false;}
    }catch(e){}
  }
  function applyWords(mode){
    var l=lang(),t=TEXT[l];state.lang=l;
    text('[data-launch="kicker"]',t.kicker);
    text('[data-launch="title"]',mode==='countdown'?t.count:t.soon);
    text('[data-launch="subtitle"]',mode==='countdown'?t.countSub:t.soonSub);
    text('[data-launch-label="days"]',t.days);
    text('[data-launch-label="hours"]',t.hours);
    text('[data-launch-label="minutes"]',t.minutes);
    text('[data-launch-label="seconds"]',t.seconds);
    text('[data-launch="langsLabel"]',t.langs);
    text('[data-launch="clockNote"]',t.clock);
    var promo=el('.language-promo');if(promo)promo.setAttribute('aria-label',t.langs+' — TR, EN, DE, FR, AR');
  }
  function show(mode){
    var r=root();if(!r)return;
    state.mode=mode;r.dataset.mode=mode;
    var units=el('.launch-countdown__units'),clock=el('.launch-clock');
    if(units){
      units.hidden=(mode==='clock');
      units.style.display=(mode==='clock')?'none':'';
    }
    if(clock){
      clock.hidden=(mode!=='clock');
      clock.style.display=(mode==='clock')?'grid':'none';
    }
  }
  function renderSoon(){
    show('soon');applyWords('soon');
    ['days','hours','minutes','seconds'].forEach(function(k){text('[data-launch-value="'+k+'"]','—');});
  }
  function renderCountdown(diff){
    show('countdown');applyWords('countdown');
    var total=Math.max(0,Math.floor(diff/1000));
    var days=Math.floor(total/86400);total-=days*86400;
    var hours=Math.floor(total/3600);total-=hours*3600;
    var minutes=Math.floor(total/60);var seconds=total-minutes*60;
    text('[data-launch-value="days"]',String(days));
    text('[data-launch-value="hours"]',pad(hours));
    text('[data-launch-value="minutes"]',pad(minutes));
    text('[data-launch-value="seconds"]',pad(seconds));
  }
  function renderClock(now){
    show('clock');
    var l=lang(),t=TEXT[l],loc=LOCALE[l]||LOCALE.tr;
    state.lang=l;
    text('[data-launch="kicker"]',t.kicker);
    text('[data-launch="title"]',t.clock);
    text('[data-launch="subtitle"]','');
    text('[data-launch="langsLabel"]',t.langs);
    text('[data-launch="clockNote"]',t.clock);
    try{
      text('[data-launch="clockDate"]',new Intl.DateTimeFormat(loc,{day:'2-digit',month:'long',year:'numeric'}).format(now));
      text('[data-launch="clockTime"]',new Intl.DateTimeFormat(loc,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now));
    }catch(e){
      text('[data-launch="clockDate"]',now.toLocaleDateString());text('[data-launch="clockTime"]',now.toLocaleTimeString());
    }
  }
  function tick(){
    var now=new Date(),ms=targetMs();
    safePaidGuard();
    if(!Number.isFinite(ms)){renderSoon();return state.mode;}
    var diff=ms-now.getTime();
    if(diff>0){renderCountdown(diff);return state.mode;}
    if(String(cfg().afterMode||'clock')==='clock'){renderClock(now);return state.mode;}
    renderSoon();return state.mode;
  }
  function start(){
    if(timer){w.clearInterval(timer);}tick();timer=w.setInterval(tick,1000);
    if(!observer&&d.body){observer=new MutationObserver(function(){var l=lang();if(l!==state.lang)tick();});observer.observe(d.body,{attributes:true,attributeFilter:['data-edu-lang']});}
  }
  function stop(){if(timer){w.clearInterval(timer);timer=0;}}
  function setTarget(value){cfg().targetAt=String(value||'');return tick();}
  function snapshot(){return {mode:state.mode,lang:state.lang,targetAt:String(cfg().targetAt||''),paidSalesEnabled:!!(w.EDUVERSE_PURCHASE_CONFIG&&w.EDUVERSE_PURCHASE_CONFIG.paidSalesEnabled),autoSales:cfg().autoSales===true};}

  w.EDUVERSE_LAUNCH={start:start,stop:stop,tick:tick,setTarget:setTarget,snapshot:snapshot};
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start,{once:true});else start();
})(window,document);
