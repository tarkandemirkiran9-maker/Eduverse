(function(w){
  'use strict';
  if(w.EVPurchaseHandoff && w.EVPurchaseHandoff.__v1){ return; }

  var PLAY_URL='https://play.google.com/store/apps/details?id=club.eduverse.app';

  var PRODUCT_NAMES={
    eduverse_5_room_pack:{
      tr:'EduVerse 5 Oda Paketi',en:'EduVerse 5 Room Pack',
      de:'EduVerse 5-Räume-Paket',fr:'Pack EduVerse 5 salles',ar:'حزمة EduVerse من 5 غرف'
    },
    eduverse_full_access:{
      tr:'EduVerse Tam Erişim',en:'EduVerse Full Access',
      de:'EduVerse Vollzugang',fr:'Accès complet EduVerse',ar:'الوصول الكامل إلى EduVerse'
    },
    eduverse_full_upgrade:{
      tr:'Tam Erişime Geç',en:'Upgrade to Full Access',
      de:'Auf Vollzugang wechseln',fr:'Passer à l’accès complet',ar:'الترقية إلى الوصول الكامل'
    }
  };

  var TEXT={
    tr:{
      title:'Satın Alma',
      web:'Bu satın alma Google Play üzerinden tamamlanır. Android telefonunuzda EduVerse’i açabilir veya Google Play sayfasına gidebilirsiniz.',
      ios:'iPhone ve iPad satın alma desteği çok yakında.',
      play:'Google Play’de Aç',
      close:'Kapat',
      note:'Satın alma tamamlandıktan sonra EduVerse’e geri dönebilirsiniz.'
    },
    en:{
      title:'Purchase',
      web:'This purchase is completed through Google Play. Open EduVerse on your Android phone or continue to Google Play.',
      ios:'Purchase support for iPhone and iPad is coming soon.',
      play:'Open in Google Play',
      close:'Close',
      note:'Your web game stays open. Once the shared account system is connected, purchased access will be recognized on the same family account.'
    },
    de:{
      title:'Kauf',
      web:'Dieser Kauf wird über Google Play abgeschlossen. Öffnen Sie EduVerse auf Ihrem Android-Telefon oder gehen Sie zu Google Play.',
      ios:'Kaufunterstützung für iPhone und iPad folgt in Kürze.',
      play:'In Google Play öffnen',
      close:'Schließen',
      note:'Das Web-Spiel bleibt geöffnet. Sobald das gemeinsame Kontosystem verbunden ist, wird der gekaufte Zugang im selben Familienkonto erkannt.'
    },
    fr:{
      title:'Achat',
      web:'Cet achat est finalisé via Google Play. Ouvrez EduVerse sur votre téléphone Android ou continuez vers Google Play.',
      ios:'La prise en charge des achats sur iPhone et iPad arrive bientôt.',
      play:'Ouvrir dans Google Play',
      close:'Fermer',
      note:'Le jeu web reste ouvert. Une fois le compte commun connecté, l’accès acheté sera reconnu avec le même compte famille.'
    },
    ar:{
      title:'الشراء',
      web:'يتم إكمال هذا الشراء عبر Google Play. افتح EduVerse على هاتف Android أو انتقل إلى Google Play.',
      ios:'دعم الشراء على iPhone وiPad قريبًا.',
      play:'فتح Google Play',
      close:'إغلاق',
      note:'ستبقى لعبة الويب مفتوحة. بعد ربط الحساب المشترك، سيتم التعرف على الوصول المشترى عبر حساب العائلة نفسه.'
    }
  };

  function lang(){
    try{
      var l=String(document.documentElement.lang||navigator.language||'tr').toLowerCase().slice(0,2);
      return TEXT[l]?l:'tr';
    }catch(e){ return 'tr'; }
  }

  function ensure(){
    var ov=document.getElementById('ev-purchase-handoff');
    if(ov){ return ov; }

    var style=document.createElement('style');
    style.id='ev-purchase-handoff-style';
    style.textContent=
      '#ev-purchase-handoff{position:fixed;inset:0;z-index:2147483600;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(3,7,22,.84);backdrop-filter:blur(14px);box-sizing:border-box}'+
      '#ev-purchase-handoff .evph-card{width:min(440px,100%);border-radius:26px;padding:22px;border:1px solid rgba(255,255,255,.20);background:linear-gradient(150deg,rgba(25,32,82,.98),rgba(15,17,48,.98));box-shadow:0 24px 70px rgba(0,0,0,.55);color:#fff;font-family:Nunito,Arial,sans-serif}'+
      '#ev-purchase-handoff .evph-title{font-family:"Fredoka One",Arial,sans-serif;font-size:1.35rem;color:#FFD86A;margin-bottom:6px}'+
      '#ev-purchase-handoff .evph-product{font-weight:900;color:#fff;margin-bottom:12px}'+
      '#ev-purchase-handoff .evph-text{font-size:.9rem;line-height:1.55;color:rgba(255,255,255,.82);margin-bottom:12px}'+
      '#ev-purchase-handoff .evph-note{font-size:.72rem;line-height:1.45;color:rgba(255,255,255,.48);margin:12px 0}'+
      '#ev-purchase-handoff .evph-actions{display:flex;gap:9px;flex-wrap:wrap}'+
      '#ev-purchase-handoff button{flex:1;min-width:140px;border-radius:18px;padding:11px 14px;font:800 .85rem Nunito,Arial;cursor:pointer}'+
      '#ev-purchase-handoff .evph-play{border:1px solid rgba(255,220,110,.55);background:linear-gradient(135deg,#FFD85A,#FF9D2E);color:#1b0d00}'+
      '#ev-purchase-handoff .evph-close{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:rgba(255,255,255,.78)}';
    document.head.appendChild(style);

    ov=document.createElement('div');
    ov.id='ev-purchase-handoff';
    ov.innerHTML='<div class="evph-card">'+
      '<div class="evph-title"></div>'+
      '<div class="evph-product"></div>'+
      '<div class="evph-text"></div>'+
      '<div class="evph-note"></div>'+
      '<div class="evph-actions"><button class="evph-play"></button><button class="evph-close"></button></div>'+
      '</div>';
    document.body.appendChild(ov);

    ov.querySelector('.evph-close').onclick=function(){ ov.style.display='none'; };
    ov.addEventListener('click',function(e){ if(e.target===ov){ ov.style.display='none'; } });
    return ov;
  }

  function productName(id,l){
    var p=PRODUCT_NAMES[id]||{};
    return p[l]||p.tr||String(id||'');
  }

  function open(productId){
    var l=lang(),t=TEXT[l],ov=ensure();
    var platform='web';
    try{ platform=w.EVPlatform&&w.EVPlatform.platform?w.EVPlatform.platform():'web'; }catch(e){}

    ov.setAttribute('dir',l==='ar'?'rtl':'ltr');
    ov.querySelector('.evph-title').textContent=t.title;
    ov.querySelector('.evph-product').textContent=productName(String(productId||''),l);
    ov.querySelector('.evph-text').textContent=platform==='ios'?t.ios:t.web;
    ov.querySelector('.evph-note').textContent=t.note;

    var play=ov.querySelector('.evph-play');
    play.textContent=t.play;
    play.style.display=platform==='ios'?'none':'block';
    play.onclick=function(){
      try{ if(w.EVTelemetry){w.EVTelemetry.track('google_play_clicked',{productId:String(productId||'')});} }catch(e){}
      w.open(PLAY_URL,'_blank','noopener');
    };

    ov.querySelector('.evph-close').textContent=t.close;
    ov.style.display='flex';

    try{ if(w.EVTelemetry){w.EVTelemetry.track('purchase_path_started',{productId:String(productId||''),source:'web_handoff'});} }catch(e){}
    return true;
  }

  w.EVPurchaseHandoff={__v1:true,open:open,playUrl:PLAY_URL};
})(window);


