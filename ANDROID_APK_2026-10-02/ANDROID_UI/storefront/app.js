(function(){
  'use strict';

  var themes = {
    eduverse:{bg0:'#070312',bg1:'#120725',bg2:'#24104b',accent:'#c06cff',rgb:'192,108,255',accent2:'#ffd35e',rgb2:'255,211,94'},
    ice:{bg0:'#020a14',bg1:'#04172a',bg2:'#0b3c58',accent:'#6ee7ff',rgb:'110,231,255',accent2:'#d8fbff',rgb2:'216,251,255'},
    rose:{bg0:'#13030f',bg1:'#2a0822',bg2:'#5a164c',accent:'#ff70c8',rgb:'255,112,200',accent2:'#ffd1ea',rgb2:'255,209,234'},
    nebula:{bg0:'#020b07',bg1:'#051c12',bg2:'#0a4a2d',accent:'#67f3c9',rgb:'103,243,201',accent2:'#c8ffe8',rgb2:'200,255,232'},
    fire:{bg0:'#140603',bg1:'#301006',bg2:'#6a2508',accent:'#ff9a4a',rgb:'255,154,74',accent2:'#ffe06b',rgb2:'255,224,107'},
    space:{bg0:'#00030d',bg1:'#061022',bg2:'#0e2458',accent:'#5c9cff',rgb:'92,156,255',accent2:'#ffe36f',rgb2:'255,227,111'}
  };

  var root = document.documentElement;
  var body = document.body;
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message){
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); },1800);
  }

  var audioCtx = null;
  function tone(freq,duration,type,volume){
    try{
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      if(!audioCtx) audioCtx = new AC();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq || 440;
      gain.gain.setValueAtTime(volume || .025,audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime + (duration || .12));
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + (duration || .12));
    }catch(e){}
  }

  function applyTheme(id,announce){
    var t = themes[id] || themes.eduverse;
    body.setAttribute('data-theme',id);
    root.style.setProperty('--bg0',t.bg0);
    root.style.setProperty('--bg1',t.bg1);
    root.style.setProperty('--bg2',t.bg2);
    root.style.setProperty('--accent',t.accent);
    root.style.setProperty('--accent-rgb',t.rgb);
    root.style.setProperty('--accent2',t.accent2);
    root.style.setProperty('--accent2-rgb',t.rgb2);
    document.querySelectorAll('.theme-orb').forEach(function(btn){
      btn.classList.toggle('is-active',btn.getAttribute('data-theme')===id);
    });
    try{ localStorage.setItem('eduverse_store_theme',id); }catch(e){}
    if(announce){
      body.classList.remove('theme-switching');
      void body.offsetWidth;
      body.classList.add('theme-switching');
      window.setTimeout(function(){ body.classList.remove('theme-switching'); },720);
      tone(520,.12,'sine',.018);
      showToast('Yeni ışık seçildi.');
    }
  }

  document.querySelectorAll('.theme-orb').forEach(function(btn){
    btn.addEventListener('click',function(){ applyTheme(this.getAttribute('data-theme'),true); });
  });

  try{
    var saved = localStorage.getItem('eduverse_store_theme');
    if(saved && themes[saved]) applyTheme(saved,false);
  }catch(e){}


/* EDUVERSE_STORE_ROUTING_V4_START */
  var storeLinks = window.EDUVERSE_STORE_LINKS || {
    android:'https://play.google.com/store/apps/details?id=club.eduverse.app',
    ios:''
  };

  function isIOSDevice(){
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function syncStoreLinks(){
    document.querySelectorAll('[data-store]').forEach(function(link){
      var store = link.getAttribute('data-store');
      var url = storeLinks[store] || '';
      if(url){
        link.setAttribute('href',url);
        link.setAttribute('target','_blank');
        link.setAttribute('rel','noopener noreferrer');
        link.classList.remove('is-coming');
        link.removeAttribute('aria-disabled');
      }else{
        link.setAttribute('href','#');
        link.removeAttribute('target');
        link.classList.add('is-coming');
        link.setAttribute('aria-disabled','true');
      }
    });
  }

  document.querySelectorAll('[data-store]').forEach(function(link){
    link.addEventListener('click',function(e){
      var store = this.getAttribute('data-store');
      var url = storeLinks[store] || '';
      if(!url){
        e.preventDefault();
        tone(320,.10,'sine',.015);
        showToast(store === 'ios' ? 'iOS sürümü hazırlanıyor. App Store bağlantısı hazır olduğunda bu düğme otomatik olarak aktif olacak.' : 'Mağaza bağlantısı henüz hazır değil.');
      }
    });
  });

  function openFreeStore(){
    var preferred = isIOSDevice() ? 'ios' : 'android';
    var url = storeLinks[preferred] || storeLinks.android || storeLinks.ios || '';
    if(url){
      window.open(url,'_blank','noopener');
    }else{
      showToast('Uygulama mağazası bağlantısı henüz hazır değil.');
    }
  }

  syncStoreLinks();
/* EDUVERSE_STORE_ROUTING_V4_END */

  var revealObserver = null;
  if('IntersectionObserver' in window){
    revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
    },{threshold:.1});
    document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }

  var gateStart = document.getElementById('gate-start');
  var gateArena = document.getElementById('gate-arena');
  var gateStatus = document.getElementById('gate-status');
  var gateProgress = document.getElementById('gate-progress');
  var portal = document.getElementById('portal');
  var gateReveal = document.getElementById('gate-reveal');
  var gateRevealImage = document.getElementById('gate-reveal-image');
  var gateRunning = false;
  var gateHits = 0;
  var gateMax = 5;
  var roomImages = ['./assets/oki_topics.jpg','./assets/music.jpg','./assets/gym.jpg','./assets/rooms.jpg','./assets/character.jpg'];

  function clearNode(){
    if(!gateArena) return;
    gateArena.querySelectorAll('.light-node').forEach(function(n){ n.remove(); });
  }

  function spawnNode(){
    if(!gateRunning || !gateArena) return;
    clearNode();
    var node = document.createElement('button');
    node.type = 'button';
    node.className = 'light-node';
    node.setAttribute('aria-label','Parlayan ışığı yakala');
    var bounds = gateArena.getBoundingClientRect();
    var pad = 55;
    var x = pad + Math.random()*Math.max(10,bounds.width-pad*2-54);
    var y = pad + Math.random()*Math.max(10,bounds.height-pad*2-54);
    node.style.left = x+'px'; node.style.top = y+'px';
    node.addEventListener('click',function(){
      if(!gateRunning) return;
      gateHits += 1;
      tone(420 + gateHits*95,.13,'sine',.025);
      if(gateProgress) gateProgress.style.width = ((gateHits/gateMax)*100)+'%';
      if(gateStatus) gateStatus.textContent = gateHits < gateMax ? ('Işık '+gateHits+'/'+gateMax+' — devam!') : 'Geçit açılıyor…';
      node.remove();
      if(gateHits >= gateMax){ finishGate(); } else { setTimeout(spawnNode,160); }
    });
    gateArena.appendChild(node);
  }

  function finishGate(){
    gateRunning = false;
    clearNode();
    portal && portal.classList.add('is-open');
    tone(660,.18,'sine',.025); setTimeout(function(){ tone(880,.22,'sine',.02); },110);
    var img = roomImages[Math.floor(Math.random()*roomImages.length)];
    if(gateRevealImage) gateRevealImage.src = img;
    setTimeout(function(){ if(gateReveal) gateReveal.hidden = false; if(gateStatus) gateStatus.textContent = 'Kapı açıldı.'; },520);
    if(gateStart) gateStart.textContent = '✦ Bir Kapı Daha Aç';
  }

  function startGate(){
    if(!gateArena) return;
    gateRunning = true; gateHits = 0;
    if(gateReveal) gateReveal.hidden = true;
    if(gateProgress) gateProgress.style.width = '0%';
    portal && portal.classList.remove('is-open');
    portal && portal.classList.add('is-awake');
    if(gateStatus) gateStatus.textContent = 'Parlayan 5 ışığı yakala.';
    if(gateStart) gateStart.textContent = 'Geçit Uyanıyor…';
    tone(330,.12,'sine',.02);
    setTimeout(spawnNode,350);
  }

  gateStart && gateStart.addEventListener('click',startGate);

/* EDUVERSE_LAUNCH_COUNTDOWN_JS_START */
  var launchTarget = new Date('2026-09-22T12:54:27Z');
  var countDays = document.getElementById('count-days');
  var countHours = document.getElementById('count-hours');
  var countMinutes = document.getElementById('count-minutes');
  var countSeconds = document.getElementById('count-seconds');
  var launchStatus = document.getElementById('launch-status');
  var launchBadge = document.querySelector('.launch-badge');
  var matrixLines = Array.prototype.slice.call(document.querySelectorAll('.matrix-line'));
  var matrixPhrases = [
    'EDUVERSE // FULL LAUNCH // 33 ROOMS // OKI',
    '5 LANGUAGES // LIGHT GATE // FAMILY PDF',
    'DISCOVER // PLAY // LEARN // EXPLORE',
    'PRE-LAUNCH MODE // COUNTDOWN ACTIVE // ACCESS SOON'
  ];

  function pad2(value){
    return String(value).padStart(2,'0');
  }

  function setCounterValue(el,value){
    if(el) el.textContent = value;
  }

  function updateLaunchCountdown(){
    if(!(launchTarget instanceof Date) || isNaN(launchTarget.getTime())) return;
    var now = new Date();
    var remaining = launchTarget.getTime() - now.getTime();

    if(remaining <= 0){
      setCounterValue(countDays,'00');
      setCounterValue(countHours,'00');
      setCounterValue(countMinutes,'00');
      setCounterValue(countSeconds,'00');
      if(launchStatus){
        launchStatus.innerHTML = '<b>Açılış çok yakında.</b> Tam erişim ve satın alma seçenekleri owner onayıyla açılacak. Şimdilik 5 ücretsiz odayı keşfedebilirsin.';
      }
      if(launchBadge){
        launchBadge.textContent = '🚀 AÇILIŞ ÇOK YAKINDA';
        launchBadge.classList.add('is-ready');
      }
      return;
    }

    var totalSeconds = Math.floor(remaining / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    setCounterValue(countDays,String(days));
    setCounterValue(countHours,pad2(hours));
    setCounterValue(countMinutes,pad2(minutes));
    setCounterValue(countSeconds,pad2(seconds));

    if(launchBadge){
      launchBadge.textContent = '🚀 EDUVERSE TAM AÇILIŞA HAZIRLANIYOR';
      launchBadge.classList.remove('is-ready');
    }
    if(launchStatus){
      launchStatus.textContent = 'Tam erişim, tüm odalar ve satın alma seçenekleri açılışla birlikte kullanılabilir olacak. Şimdilik 5 ücretsiz odayı keşfedebilirsin.';
    }
  }

  function shuffleMatrix(){
    if(!matrixLines.length) return;
    matrixLines.forEach(function(line,index){
      var phrase = matrixPhrases[(Math.floor(Math.random()*matrixPhrases.length) + index) % matrixPhrases.length];
      var binary = Math.random().toString(2).replace('0.','').slice(0,18);
      line.textContent = binary + ' // ' + phrase + ' // ' + Math.random().toString(36).slice(2,8).toUpperCase();
    });
  }

  updateLaunchCountdown();
  shuffleMatrix();
  window.setInterval(updateLaunchCountdown,1000);
  window.setInterval(shuffleMatrix,2400);
/* EDUVERSE_LAUNCH_COUNTDOWN_JS_END */
  var dialog = document.getElementById('access-dialog');
  var dialogTitle = document.getElementById('dialog-title');
  var planLabels = {free:'Ücretsiz Başlangıç',five:'EduVerse 5 Oda Paketi',full:'EduVerse Tam Erişim',upgrade:'Tam Erişime Geç'};
  var planMessages = {
    five:'Bu paket tam açılışla birlikte aktif olacak. Şimdilik geri sayımı takip edebilir ve 5 ücretsiz odayı Google Play üzerinden keşfedebilirsin.',
    full:'Tam erişim, açılışla birlikte kullanıma açılacak. O zamana kadar geri sayımı takip et ve 5 ücretsiz odayı keşfet.',
    upgrade:'Yükseltme seçeneği tam açılışla birlikte aktif olacak. Şimdilik geri sayımı takip edebilir ve 5 ücretsiz odayı keşfedebilirsin.'
  };
  document.querySelectorAll('.price-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var plan = this.getAttribute('data-plan');
      tone(480,.1,'sine',.018);
      if(plan === 'free'){
        openFreeStore();
        return;
      }
      if(dialogTitle) dialogTitle.textContent = planLabels[plan] || 'EduVerse';
      if(dialogCopy) dialogCopy.textContent = planMessages[plan] || 'Bu erişim seçeneği tam açılışla birlikte aktif olacak. Şimdilik geri sayımı takip edebilir ve 5 ücretsiz odayı keşfedebilirsin.';
      if(dialog && typeof dialog.showModal === 'function') dialog.showModal();
      else showToast('Bu erişim seçeneği yakında web’de.');
    });
  });
  var close = dialog && dialog.querySelector('.dialog-close');
  close && close.addEventListener('click',function(){ dialog.close(); });
  dialog && dialog.addEventListener('click',function(e){ if(e.target===dialog) dialog.close(); });

  var year = document.getElementById('year');
  if(year) year.textContent = String(new Date().getFullYear());
})();



