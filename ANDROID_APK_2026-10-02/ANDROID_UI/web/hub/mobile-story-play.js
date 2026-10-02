(function(){
  "use strict";

  function getLang(root){
    var l=(document.body&&document.body.getAttribute("data-edu-lang")) || document.documentElement.lang || "tr";
    l=(l||"tr").toLowerCase();
    return /^(tr|en|de|fr|ar)$/.test(l)?l:"tr";
  }

  var labels={
    tr:{play:"BAŞLAT",pause:"DURDUR"},
    en:{play:"START",pause:"PAUSE"},
    de:{play:"START",pause:"PAUSE"},
    fr:{play:"LANCER",pause:"PAUSE"},
    ar:{play:"ابدأ",pause:"إيقاف"}
  };

  function init(){
    var root=document.getElementById("founderStory");
    if(!root)return;

    var btn=root.querySelector('[data-story-action="toggle"]');
    var rewind=root.querySelector('[data-story-action="rewind"]');
    var vp=root.querySelector('[data-story-viewport]');
    if(!btn||!vp)return;

    var raf=0,last=0,playing=false;

    function updateLabel(){
      var t=labels[getLang(root)]||labels.tr;
      var s=btn.querySelector('[data-story="play"]');
      if(s)s.textContent=playing?t.pause:t.play;
      btn.setAttribute("aria-pressed",playing?"true":"false");
    }

    function stop(){
      playing=false;
      last=0;
      if(raf){cancelAnimationFrame(raf);raf=0;}
      updateLabel();
    }

    function frame(ts){
      if(!playing){raf=0;return;}
      if(!last)last=ts;
      var dt=Math.min(.05,(ts-last)/1000);
      last=ts;

      var max=Math.max(0,vp.scrollHeight-vp.clientHeight);
      vp.scrollTop=Math.min(max,vp.scrollTop+(34*dt));
      vp.dispatchEvent(new Event("scroll"));

      if(vp.scrollTop>=max-.5){
        stop();
        return;
      }
      raf=requestAnimationFrame(frame);
    }

    btn.addEventListener("click",function(e){
      e.preventDefault();
      e.stopPropagation();
      playing=!playing;
      updateLabel();
      if(playing){
        if(!raf)raf=requestAnimationFrame(frame);
      }else{
        stop();
      }
    },true);

    if(rewind){
      rewind.addEventListener("click",function(e){
        e.preventDefault();
        stop();
        vp.scrollTop=0;
        vp.dispatchEvent(new Event("scroll"));
      },true);
    }

    updateLabel();

    if(document.body){
      new MutationObserver(updateLabel).observe(document.body,{attributes:true,attributeFilter:["data-edu-lang"]});
    }
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();