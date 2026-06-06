(function(){
  var extraTracks = [
    {name:'Neseli Cocuklar 15s', src:'music/happy-kids-15s.mp3'},
    {name:'Cocuk Muzigi 54s', src:'music/kids-music-54s.mp3'},
    {name:'Neseli Orkestra', src:'music/funny-orchestra.mp3'},
    {name:'Doga Sabahi', src:'music/nature-morning.mp3'},
    {name:'Ilkbahar Ormani', src:'music/spring-forest.mp3'},
    {name:'Huzurlu Fon', src:'music/islamic-soft.mp3'},
    {name:'Arap Ezgisi', src:'music/arabian-lounge.mp3'},
    {name:'Muzik Kutusu', src:'music/music-box.mp3'}
  ];

  var baseNames = [
    'Cairo Arabian', 'Golden Sand Oud', 'Posh Oud', 'Oriental Song',
    'Islami Muzik', 'Kus Sesleri', 'Neseli Cocuk', 'Cocuk Muzigi'
  ];
  var tracks = baseNames.concat(extraTracks.map(function(t){ return t.name; }));
  var englishTrackNames = [
    'Cairo Melody', 'Golden Sand Oud', 'Elegant Oud', 'Eastern Melody',
    'Peaceful Background', 'Birdsong', 'Happy Children', "Children's Music",
    'Happy Children 15s', "Children's Music 54s", 'Cheerful Orchestra', 'Nature Morning',
    'Spring Forest', 'Peaceful Background', 'Arabian Melody', 'Music Box'
  ];
  var frenchTrackNames = [
    'Melodie du Caire', 'Oud des sables dores', 'Oud elegant', 'Melodie orientale',
    'Fond paisible', 'Chant des oiseaux', 'Enfants joyeux', 'Musique pour enfants',
    'Enfants joyeux 15 s', 'Musique pour enfants 54 s', 'Orchestre joyeux', 'Matin dans la nature',
    'Foret printaniere', 'Fond paisible', 'Melodie arabe', 'Boite a musique'
  ];
  var arabicTrackNames = [
    'لحن القاهرة', 'عود الرمال الذهبية', 'عود أنيق', 'لحن شرقي',
    'خلفية هادئة', 'أصوات الطيور', 'أطفال سعداء', 'موسيقى الأطفال',
    'أطفال سعداء 15 ثانية', 'موسيقى الأطفال 54 ثانية', 'أوركسترا مرحة', 'صباح الطبيعة',
    'غابة الربيع', 'خلفية هادئة', 'لحن عربي', 'صندوق الموسيقى'
  ];

  var roomMap = {
    ibadet:13, arapca:13, dua:13, sifa:13, nefes:12,
    ada:14, sinema:10, atlas:10, okyanus:11, cevre:12, ilkbahar:12, hayvanat:12,
    ders:15, caliskan:15, english:15, deutsch:15, bilgisayar:9,
    oyuncak:8, odulodasi:8, kumanda:9, refleks:9, puzzle:9, lazer:10,
    sanat:15, boyama:15, muzik:9, mutfak:14, aile:15, para:15, gizli:10
  };

  var labels = {
    0:'Ritimli muzik odasi havasi',
    1:'Sakin oud ve sicak oda havasi',
    2:'Sanat icin yumusak melodi',
    3:'Sinema ve kesif havasi',
    4:'Manevi ve huzurlu fon',
    5:'Doga ve kus sesleri',
    6:'Neseli cocuk enerjisi',
    7:'Ders icin hafif odak muzigi',
    8:'Kisa neseli cocuk melodisi',
    9:'Oyun ve hareket enerjisi',
    10:'Macera ve sinema havasi',
    11:'Sakin sabah dogasi',
    12:'Orman ve ilkbahar sesi',
    13:'Huzurlu islami fon',
    14:'Oud ve sicak aile havasi',
    15:'Yumusak muzik kutusu havasi'
  };

  var lastRoomId = '';
  var tipTimer = null;
  var added = false;

  function $(id){ return document.getElementById(id); }
  function tr(text){ return (window.eduverseValuesOn && window.eduverseValuesOn() && window.eduverseValuesText) ? window.eduverseValuesText(text) : text; }
  function displayTrackName(i){
    var en=window.eduverseValuesOn&&window.eduverseValuesOn()&&window.eduverseValuesLang&&window.eduverseValuesLang()==='en';
    var fr=window.eduverseValuesOn&&window.eduverseValuesOn()&&window.eduverseValuesLang&&window.eduverseValuesLang()==='fr';
    var ar=window.eduverseValuesOn&&window.eduverseValuesOn()&&window.eduverseValuesLang&&window.eduverseValuesLang()==='ar';
    return en?(englishTrackNames[i]||tracks[i]):(fr?(frenchTrackNames[i]||tracks[i]):(ar?(arabicTrackNames[i]||tracks[i]):tracks[i]));
  }

  function addExtraTracks(){
    if (added) return;
    if (!window._ADA_TRACKS || !Array.isArray(window._ADA_TRACKS)) return;
    extraTracks.forEach(function(t){
      var exists = window._ADA_TRACKS.some(function(x){ return x && x.name === t.name; });
      if (!exists) window._ADA_TRACKS.push({name:t.name, src:t.src});
    });
    added = true;
  }

  function ensureTip(){
    var tip = $('ev-room-music-tip');
    if (tip) return tip;
    tip = document.createElement('div');
    tip.id = 'ev-room-music-tip';
    tip.innerHTML = '<div class="ev-rm-title"></div><div class="ev-rm-sub"></div>';
    document.body.appendChild(tip);
    return tip;
  }

  function showTip(roomName, idx){
    var tip = document.getElementById('ev-room-music-tip');
    if(tip) tip.classList.remove('show');
  }

  function makeTrackButton(i){
    var btn = document.createElement('button');
    btn.id = 'adaTrk' + i;
    btn.className = 'ada-trk-row';
    btn.type = 'button';
    btn.textContent = String.fromCodePoint(0x1F3B5) + ' ' + displayTrackName(i);
    btn.onclick = function(){ if (typeof window._adaPlay === 'function') window._adaPlay(i); };
    return btn;
  }

  function ensurePanelRows(){
    addExtraTracks();
    var rows = document.querySelectorAll('.ada-trk-row');
    var parent = rows.length ? rows[rows.length - 1].parentNode : null;
    if (!parent) return;
    for (var i=8;i<tracks.length;i++){
      if (!$('adaTrk' + i)) parent.appendChild(makeTrackButton(i));
    }
    for (var j=0;j<tracks.length;j++){
      var row=$('adaTrk'+j);
      if(row) row.textContent=String.fromCodePoint(0x1F3B5)+' '+displayTrackName(j);
    }
  }

  function markTrack(idx){
    ensurePanelRows();
    for (var i=0;i<tracks.length;i++){
      var row = $('adaTrk' + i);
      if (!row) continue;
      row.style.outline = i === idx ? '2px solid rgba(255,216,91,.75)' : '';
      row.style.boxShadow = i === idx ? '0 0 18px rgba(255,216,91,.22)' : '';
    }
  }

  function pickForRoom(room){
    addExtraTracks();
    if (!room || !room.id) return;
    lastRoomId = room.id;
    var idx = roomMap[room.id];
    if (idx === undefined) idx = 8;
    try { window._adaIdx = idx; } catch(e) {}
    markTrack(idx);
    showTip(room.name, idx);
  }

  function wrapEnterRoom(){
    if (typeof window._doEnterRoom === 'function' && !window._doEnterRoom.__roomMusicWrapped) {
      var oldDo = window._doEnterRoom;
      window._doEnterRoom = function(room){
        var res = oldDo.apply(this, arguments);
        setTimeout(function(){ pickForRoom(room); }, 250);
        return res;
      };
      window._doEnterRoom.__roomMusicWrapped = true;
    }

    if (typeof window.enterRoom === 'function' && !window.enterRoom.__roomMusicWrapped) {
      var oldEnter = window.enterRoom;
      window.enterRoom = function(room){
        setTimeout(function(){ pickForRoom(room); }, 800);
        return oldEnter.apply(this, arguments);
      };
      window.enterRoom.__roomMusicWrapped = true;
    }
  }

  function wrapAdaPanel(){
    if (typeof window._adaTogglePanel === 'function' && !window._adaTogglePanel.__roomMusicWrapped) {
      var oldPanel = window._adaTogglePanel;
      window._adaTogglePanel = function(){
        var res = oldPanel.apply(this, arguments);
        setTimeout(function(){
          ensurePanelRows();
          if (lastRoomId && roomMap[lastRoomId] !== undefined) markTrack(roomMap[lastRoomId]);
        }, 80);
        return res;
      };
      window._adaTogglePanel.__roomMusicWrapped = true;
    }
  }

  function boot(){
    addExtraTracks();
    ensurePanelRows();
    wrapEnterRoom();
    wrapAdaPanel();
    setTimeout(function(){
      try { if (window.currentRoom) pickForRoom(window.currentRoom); } catch(e) {}
    }, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  setTimeout(boot, 1500);
  setTimeout(boot, 3500);
})();


