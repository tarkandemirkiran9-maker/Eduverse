(function(){
  'use strict';

  var themes = {
    eduverse:{bg0:'#050814',bg1:'#090b20',bg2:'#15103a',accent:'#AA88FF',rgb:'170,136,255',accent2:'#FFD700',rgb2:'255,215,0'},
    ice:{bg0:'#020817',bg1:'#020c1e',bg2:'#082244',accent:'#44CCFF',rgb:'68,204,255',accent2:'#B8EEFF',rgb2:'184,238,255'},
    rose:{bg0:'#120516',bg1:'#1a0520',bg2:'#40104c',accent:'#FF88CC',rgb:'255,136,204',accent2:'#FFD0EA',rgb2:'255,208,234'},
    nebula:{bg0:'#020b07',bg1:'#020e08',bg2:'#071f14',accent:'#44FF88',rgb:'68,255,136',accent2:'#B9FFD0',rgb2:'185,255,208'},
    fire:{bg0:'#130600',bg1:'#1a0800',bg2:'#441800',accent:'#FF8833',rgb:'255,136,51',accent2:'#FFD35E',rgb2:'255,211,94'},
    space:{bg0:'#00030d',bg1:'#000510',bg2:'#050d30',accent:'#4D8DFF',rgb:'77,141,255',accent2:'#FFD700',rgb2:'255,215,0'}
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
    if(announce){ tone(520,.12,'sine',.018); showToast('Tema değişti.'); }
  }

  document.querySelectorAll('.theme-orb').forEach(function(btn){
    btn.addEventListener('click',function(){ applyTheme(this.getAttribute('data-theme'),true); });
  });

  try{
    var saved = localStorage.getItem('eduverse_store_theme');
    if(saved && themes[saved]) applyTheme(saved,false);
  }catch(e){}

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

  var dialog = document.getElementById('access-dialog');
  var dialogTitle = document.getElementById('dialog-title');
  var planLabels = {free:'Ücretsiz Başlangıç',five:'EduVerse 5 Oda Paketi',full:'EduVerse Tam Erişim',upgrade:'Tam Erişime Geç'};
  document.querySelectorAll('.price-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var plan = this.getAttribute('data-plan');
      tone(480,.1,'sine',.018);
      if(plan === 'free'){
        window.open('https://play.google.com/store/apps/details?id=club.eduverse.app','_blank','noopener');
        return;
      }
      if(dialogTitle) dialogTitle.textContent = planLabels[plan] || 'EduVerse';
      if(dialog && typeof dialog.showModal === 'function') dialog.showModal();
      else showToast('Web üzerinden satın alma çok yakında.');
    });
  });
  var close = dialog && dialog.querySelector('.dialog-close');
  close && close.addEventListener('click',function(){ dialog.close(); });
  dialog && dialog.addEventListener('click',function(e){ if(e.target===dialog) dialog.close(); });

  var year = document.getElementById('year');
  if(year) year.textContent = String(new Date().getFullYear());
})();
