(function(){
  "use strict";
  if(window.__EV_ANDROID_APP_LAYER_APK10)return;
  window.__EV_ANDROID_APP_LAYER_APK10=1;

  var T={
    tr:{play:"OYNA",free:"OYNA · 5 ÜCRETSİZ ODA",title:"EduVerse bu cihazda.",desc:"EduVerse dünyasına bu cihazdan devam edin."},
    en:{play:"PLAY",free:"PLAY · 5 FREE ROOMS",title:"EduVerse on this device.",desc:"Continue into the EduVerse world on this device."},
    de:{play:"SPIELEN",free:"SPIELEN · 5 KOSTENLOSE RÄUME",title:"EduVerse auf diesem Gerät.",desc:"Setze deine EduVerse-Welt auf diesem Gerät fort."},
    fr:{play:"JOUER",free:"JOUER · 5 SALLES GRATUITES",title:"EduVerse sur cet appareil.",desc:"Continuez dans l’univers EduVerse sur cet appareil."},
    ar:{play:"العب",free:"العب · 5 غرف مجانية",title:"EduVerse على هذا الجهاز.",desc:"تابع إلى عالم EduVerse على هذا الجهاز."}
  };

  function lang(){
    var l=(document.documentElement.getAttribute("lang")||"tr").toLowerCase();
    if(/^en/.test(l))return "en";
    if(/^de/.test(l))return "de";
    if(/^fr/.test(l))return "fr";
    if(/^ar/.test(l))return "ar";
    return "tr";
  }

  function apply(){
    document.documentElement.classList.add("ev-android-app");
    var t=T[lang()]||T.tr;

    document.querySelectorAll('[data-hub-room]').forEach(function(a){
      var room=(a.getAttribute("data-hub-room")||"okiyesor").trim();
      var href="./game/index.html?room="+encodeURIComponent(room);
      if(a.getAttribute("href")!==href)a.setAttribute("href",href);
    });

    document.querySelectorAll('[data-hub-link="web"]').forEach(function(a){
      var hadFive=/\b5\b/.test(a.textContent||"");
      var next=hadFive?t.free:t.play;
      if(a.textContent!==next)a.textContent=next;
      if(a.getAttribute("href")!=="./game/index.html?room=okiyesor")a.setAttribute("href","./game/index.html?room=okiyesor");
      if(a.hasAttribute("target"))a.removeAttribute("target");
    });

    var pt=document.querySelector('[data-hub="platT"]');
    var pd=document.querySelector('[data-hub="platD"]');
    if(pt && pt.textContent!==t.title)pt.textContent=t.title;
    if(pd && pd.textContent!==t.desc)pd.textContent=t.desc;
  }

  function burst(){
    apply();
    setTimeout(apply,60);
    setTimeout(apply,180);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",burst,{once:true});
  }else{
    burst();
  }

  // Reapply after user-driven language/UI changes only. No subtree observer.
  document.addEventListener("click",function(){ setTimeout(burst,0); },true);
  window.addEventListener("pageshow",burst);
  document.addEventListener("visibilitychange",function(){
    if(!document.hidden)burst();
  });

  // Observe only the root language attribute. apply() never writes this attribute,
  // so there is no self-triggering mutation loop.
  try{
    new MutationObserver(function(){burst();}).observe(document.documentElement,{
      attributes:true,
      attributeFilter:["lang"]
    });
  }catch(e){}
})();