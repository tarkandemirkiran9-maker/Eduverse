(function(){
  "use strict";
  if(window.__EV_ANDROID_GAME_NAV_APK13)return;
  window.__EV_ANDROID_GAME_NAV_APK13=1;

  var HOME="../index.html";

  function goHome(){
    try{
      window.location.replace(HOME);
    }catch(e){
      window.location.href=HOME;
    }
  }

  function label(){
    var l=(document.documentElement.getAttribute("lang")||navigator.language||"tr").toLowerCase();
    if(/^en/.test(l))return "HOME";
    if(/^de/.test(l))return "START";
    if(/^fr/.test(l))return "ACCUEIL";
    if(/^ar/.test(l))return "الرئيسية";
    return "VİTRİN";
  }

  function mount(){
    if(document.getElementById("evAndroidHomeBtn"))return;

    var b=document.createElement("button");
    b.id="evAndroidHomeBtn";
    b.type="button";
    b.setAttribute("aria-label","EduVerse");
    b.innerHTML='<span class="ev-home-icon" aria-hidden="true">‹</span><span class="ev-home-text"></span>';
    b.querySelector(".ev-home-text").textContent=label();

    b.addEventListener("click",function(e){
      e.preventDefault();
      e.stopPropagation();
      goHome();
    },true);

    (document.body||document.documentElement).appendChild(b);
  }

  // Give Android/WebView history a guaranteed in-page step.
  // System back will pop this step first and return to the showcase.
  try{
    if(!history.state || history.state.evAndroidGameGuard!==1){
      history.pushState({evAndroidGameGuard:1},"",location.href);
    }
    window.addEventListener("popstate",function(){
      goHome();
    });
  }catch(e){}

  // Cordova-style back event, if exposed.
  try{
    document.addEventListener("backbutton",function(e){
      if(e && e.preventDefault)e.preventDefault();
      goHome();
    },false);
  }catch(e){}

  // Capacitor App plugin, if this build exposes it.
  try{
    var cap=window.Capacitor;
    var app=cap && cap.Plugins && cap.Plugins.App;
    if(app && typeof app.addListener==="function"){
      app.addListener("backButton",function(){
        goHome();
      });
    }
  }catch(e){}

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",mount,{once:true});
  }else{
    mount();
  }

  window.addEventListener("pageshow",mount);
})();