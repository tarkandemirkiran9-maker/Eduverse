(function(){
  if(window.__evAndroidTTSFixV3){return;} window.__evAndroidTTSFixV3=1;
  function normLang(lang){
    lang=String(lang||'').toLowerCase();
    if(lang.indexOf('de')===0) return 'de-DE';
    if(lang.indexOf('fr')===0) return 'fr-FR';
    if(lang.indexOf('en')===0) return 'en-US';
    if(lang.indexOf('ar')===0) return 'ar-SA';
    return 'tr-TR';
  }
  function later(fn,ms){ try{ setTimeout(fn,ms||0); }catch(e){} }
  function estimate(text){ return Math.min(5200, Math.max(850, String(text||'').length*55)); }
  var q=[];
  function nativeObj(){ return window.AndroidTTS || window.EVAndroidTTS || window.NativeTTS || null; }
  function nativeSpeak(text,lang,onend){
    try{
      text=String(text||'').trim(); if(!text) return false;
      var a=nativeObj();
      if(a && typeof a.speak==='function'){
        try{ a.speak(text,normLang(lang)); }catch(e){ return false; }
        if(typeof onend==='function') later(function(){try{onend({type:'end'});}catch(e){}}, estimate(text));
        return true;
      }
    }catch(e){}
    return false;
  }
  function oldWebSpeak(text,lang,rate,pitch,volume,onend){
    try{
      var old=window.__evOldSpeechSynthesis, C=window.__evOldSpeechSynthesisUtterance;
      if(!old || !old.speak || !C) return false;
      var u=new C(String(text||''));
      u.lang=normLang(lang); u.rate=rate||.86; u.pitch=pitch||1.06; u.volume=volume||1;
      if(typeof onend==='function') u.onend=onend;
      try{ old.cancel&&old.cancel(); }catch(e){}
      later(function(){ try{ old.resume&&old.resume(); old.speak(u); }catch(e){} },20);
      return true;
    }catch(e){return false;}
  }
  function flush(){
    try{
      var a=nativeObj(); if(a && a.warm) try{a.warm();}catch(e){}
      if(!a || typeof a.speak!=='function') return;
      var item=q.shift();
      if(item) nativeSpeak(item.text,item.lang,item.onend);
    }catch(e){}
  }
  function speakText(text,lang,rate,pitch,volume,onend){
    text=String(text||'').trim(); if(!text) return false;
    if(nativeSpeak(text,lang,onend)) return true;
    // Native köprü birkaç saniye geç görünürse metni kaybetme.
    q=[{text:text,lang:lang,onend:onend}];
    for(var i=1;i<=24;i++){ later(flush, i*250); }
    if(oldWebSpeak(text,lang,rate,pitch,volume,onend)) return true;
    // onend zincirleri kopmasın diye süre sonunda devam ettir.
    if(typeof onend==='function') later(function(){try{onend({type:'end'});}catch(e){}}, estimate(text));
    return true;
  }
  window.evAndroidSpeak=speakText; window.evSpeakText=speakText;
  try{
    if(!window.__evOldSpeechSynthesisUtterance && window.SpeechSynthesisUtterance) window.__evOldSpeechSynthesisUtterance=window.SpeechSynthesisUtterance;
  }catch(e){}
  function FakeUtterance(text){ this.text=String(text||''); this.lang='tr-TR'; this.rate=.86; this.pitch=1.06; this.volume=1; this.voice=null; this.onend=null; this.onerror=null; this.onstart=null; }
  try{ window.SpeechSynthesisUtterance=FakeUtterance; }catch(e){}
  function installShim(){
    try{
      if(!window.__evOldSpeechSynthesis && window.speechSynthesis && !window.speechSynthesis.__evTTSShimV3){ window.__evOldSpeechSynthesis=window.speechSynthesis; }
      var ss={
        __evTTSShimV3:1, speaking:false, pending:false, paused:false,
        getVoices:function(){ try{return (window.__evOldSpeechSynthesis&&window.__evOldSpeechSynthesis.getVoices)?window.__evOldSpeechSynthesis.getVoices():[];}catch(e){return[];} },
        cancel:function(){ try{ var a=nativeObj(); if(a&&a.stop) a.stop(); }catch(e){} try{ window.__evOldSpeechSynthesis&&window.__evOldSpeechSynthesis.cancel&&window.__evOldSpeechSynthesis.cancel(); }catch(e){} },
        pause:function(){}, resume:function(){ try{flush();}catch(e){} },
        speak:function(u){
          try{
            if(u&&typeof u.onstart==='function') later(function(){try{u.onstart({type:'start'});}catch(e){}},5);
            speakText(u&&u.text,u&&u.lang,u&&u.rate,u&&u.pitch,u&&u.volume,function(ev){ if(u&&typeof u.onend==='function') try{u.onend(ev);}catch(e){} });
          }catch(e){ try{ if(u&&typeof u.onerror==='function') u.onerror({type:'error'}); }catch(x){} }
        }
      };
      try{ Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true,writable:true}); }catch(e){ window.speechSynthesis=ss; }
      try{ var a=nativeObj(); if(a&&a.warm) a.warm(); }catch(e){}
    }catch(e){}
  }
  installShim();
  var tries=0; var iv=setInterval(function(){ installShim(); flush(); if(++tries>80) clearInterval(iv); },250);
  ['click','touchstart','touchend','pointerdown','pointerup'].forEach(function(n){
    document.addEventListener(n,function(){ installShim(); try{ var a=nativeObj(); if(a&&a.warm) a.warm(); }catch(e){} later(flush,50); },{capture:true,passive:true});
  });
  // Bütün yabancı kelime odalarını kesin native TTS'e bağla.
  window.speakWord=function(tr,foreign,lang){
    speakText(tr,'tr-TR',.86,1.08,1,function(){ later(function(){ speakText(foreign,lang,.84,1.05,1); },160); });
  };
  // Arapça harfler.
  window.speakArabic=function(letter){ speakText(String(letter||''),'ar-SA',.82,1.05,1); };
  function kmeText(){ try{ return (typeof evV43KMESelam==='function')?evV43KMESelam():'Selam. Küçük Melekler Evi\'ne hoş geldin.'; }catch(e){ return 'Selam. Küçük Melekler Evi\'ne hoş geldin.'; } }
  function kmeLang(){ try{ var l=(typeof evV43KMELang==='function')?evV43KMELang():'tr'; return l==='en'?'en-US':(l==='de'?'de-DE':(l==='fr'?'fr-FR':(l==='ar'?'ar-SA':'tr-TR'))); }catch(e){ return 'tr-TR'; } }
  window.evV43KMEWelcome=function(){ var txt=kmeText(); try{ if(typeof showOkiBubble==='function') later(function(){showOkiBubble(txt);},350); }catch(e){} later(function(){speakText(txt,kmeLang(),.86,1.08,1);},450); };
  window.evV46KMEWelcome=function(){ var txt=kmeText(); try{ if(typeof showOkiBubble==='function') later(function(){showOkiBubble(txt);},350); }catch(e){} later(function(){speakText(txt,kmeLang(),.86,1.08,1);},450); };
  window.evTTSV3Test=function(txt,lang){ return speakText(txt||'Ses testi çalışıyor.',lang||'tr-TR'); };
})();
