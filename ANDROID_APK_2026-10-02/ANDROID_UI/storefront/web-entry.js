(function(w,d){
  'use strict';
  if(w.EDUVERSE_WEB_ENTRY && w.EDUVERSE_WEB_ENTRY.__v1){return;}

  function cfg(){
    var c=w.EDUVERSE_WEB_GAME_CONFIG||{};
    var host=(w.location&&w.location.hostname)||'';
    var local=(host==='127.0.0.1'||host==='localhost');
    return {
      enabled:c.enabled!==false,
      baseUrl:local
        ? String(c.localUrl||'http://127.0.0.1:8788/')
        : String(c.productionUrl||'https://play.eduverse.club/'),
      freeRoom:String(c.freeRoom||'okiyesor')
    };
  }

  function roomUrl(roomId){
    var c=cfg();
    var base=c.baseUrl;
    if(!base){return '';}
    try{
      var u=new URL(base,w.location.href);
      u.searchParams.set('room',String(roomId||c.freeRoom));
      return u.toString();
    }catch(e){return '';}
  }

  function makeButton(text,roomId,cls){
    var a=d.createElement('a');
    a.className='ev-web-entry '+(cls||'');
    a.textContent=text;
    var url=roomUrl(roomId);
    if(url){
      a.href=url;
      a.target='_blank';
      a.rel='noopener noreferrer';
    }else{
      a.href='#';
      a.setAttribute('aria-disabled','true');
    }
    return a;
  }

  function applyFreeCard(){
    var old=d.querySelector('.price-btn[data-plan="free"]');
    if(!old){return;}
    var card=old.closest('.price-card');
    if(!card){return;}

    var channels=card.querySelector('.ev-buy-channels');
    if(!channels){return;}

    var existing=card.querySelector('.ev-web-entry-free');
    if(existing){existing.remove();}

    var btn=makeButton(
      'WEBDE OYNA • 5 ÜCRETSİZ ODA',
      cfg().freeRoom,
      'ev-web-entry-free'
    );
    channels.insertAdjacentElement('beforebegin',btn);
  }

  function applyGate(){
    var reveal=d.getElementById('gate-reveal');
    if(!reveal){return;}

    var existing=reveal.querySelector('.ev-web-entry-gate');
    if(existing){existing.remove();}

    var btn=makeButton(
      '✦ Odaya Gir',
      cfg().freeRoom,
      'ev-web-entry-gate'
    );
    reveal.appendChild(btn);
  }

  function apply(){
    if(cfg().enabled!==true){return;}
    applyFreeCard();
    applyGate();
  }

  w.EDUVERSE_WEB_ENTRY={
    __v1:true,
    apply:apply,
    roomUrl:roomUrl,
    get:cfg
  };

  if(d.readyState==='loading'){
    d.addEventListener('DOMContentLoaded',function(){
      setTimeout(apply,0);
    },{once:true});
  }else{
    setTimeout(apply,0);
  }
})(window,document);

