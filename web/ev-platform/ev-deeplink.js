(function(w){
  'use strict';
  if(w.EVDeepLink && w.EVDeepLink.__v1){ return; }

  var ROOM_IDS=Object.freeze({
    okiyesor:true,cevre:true,hayvanat:true,boyama:true,bilgitoplari:true,
    puzzle:true,refleks:true,bilgisayar:true,nefes:true,sifa:true,
    ibadet:true,sinema:true,ders:true,oyuncak:true,caliskan:true,
    sanat:true,mutfak:true,aile:true,ada:true,odulodasi:true,
    para:true,arapca:true,kucukmelekler:true,english:true,deutsch:true,
    francais:true,okyanus:true,atlas:true,muzik:true,kumanda:true,
    hikayestudio:true,gizli:true
  });

  function cleanRoom(v){
    var id=String(v||'').trim().toLowerCase();
    return ROOM_IDS[id] ? id : null;
  }

  function parse(input){
    try{
      var u=new URL(String(input||w.location.href),w.location.href);
      var m=u.pathname.match(/\/room\/([A-Za-z0-9_-]+)\/?$/i);
      var room=cleanRoom(m&&m[1] ? m[1] : u.searchParams.get('room'));
      if(!room){ return {type:'NONE',roomId:null}; }
      return {type:'ROOM',roomId:room};
    }catch(e){
      return {type:'NONE',roomId:null};
    }
  }

  function current(){ return parse(w.location.href); }

  function announce(){
    var r=current();
    if(r.type!=='ROOM'){ return r; }
    try{
      w.dispatchEvent(new CustomEvent('eduverse:room-route',{detail:r}));
    }catch(e){}
    return r;
  }

  w.EVDeepLink={
    __v1:true,
    parse:parse,
    current:current,
    announce:announce
  };
})(window);

