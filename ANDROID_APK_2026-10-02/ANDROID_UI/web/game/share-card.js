(function(){
  function $(id){ return document.getElementById(id); }

  function safeText(v, fallback){
    v = String(v || '').trim();
    return v || fallback;
  }

  function valuesLang(){ return window.eduverseValuesLang ? window.eduverseValuesLang() : 'tr'; }
  function tr(text){ return (window.eduverseValuesOn && window.eduverseValuesOn() && window.eduverseValuesText) ? window.eduverseValuesText(text) : text; }
  function cardText(key){
    if(window.eduverseValuesOn && window.eduverseValuesOn() && valuesLang()==='de'){
      var de={
        tagline:'spielen • lernen • schaffen',
        badge:'SUPER-LERNER',
        stars:'Sterne gesammelt',
        success:'Der heutige Erfolg ist es wert, geteilt zu werden!',
        hero:'EduVerse-Held',
        title:'Erfolgskarte',
        card:'Karte',
        close:'Schliessen',
        download:'Herunterladen',
        share:'Teilen'
      };
      return de[key] || key;
    }
    var trMap={tagline:'oyna • ogren • basar',badge:'SUPER OGRENEN',stars:'yildiz topladi',success:'Bugunun basarisi paylasilmaya deger!',hero:'EduVerse Kahramani',title:'Basari karti',card:'Kart',close:'Kapat',download:'Indir',share:'Paylas'};
    return tr(trMap[key] || key);
  }
  function isGermanValues(){ return !!(window.eduverseValuesOn && window.eduverseValuesOn() && valuesLang()==='de'); }

  function levelText(text){
    if(!(window.eduverseValuesOn && window.eduverseValuesOn() && valuesLang()==='de')) return tr(text);
    var map={
      'Başlangıç':'Anfaenger','Baslangic':'Anfaenger','Meraklı':'Neugierig','Merakli':'Neugierig','Duacı':'Traeumer','Duaci':'Traeumer','Kahraman':'Held','Yıldız':'Stern','Yildiz':'Stern','Melek':'Engel',
      'Bebek Okişi':'Baby Oki','Küçük Okişi':'Kleiner Oki','Okul Okişi':'Schul-Oki','Kahraman Okişi':'Helden-Oki','Yıldız Okişi':'Stern-Oki','Melek Okişi':'Engel-Oki'
    };
    return map[String(text||'').trim()] || text;
  }

  function getPlayerName(){
    try { return safeText(localStorage.getItem('dei_lastplayer'), cardText('hero')); } catch(e) {}
    var input = $('ni');
    return safeText(input && input.value, cardText('hero'));
  }

  function getScore(){
    var el = $('hsc');
    if (el && el.textContent) return safeText(el.textContent, '0');
    try {
      var name = getPlayerName();
      var saved = JSON.parse(localStorage.getItem('dei_player_' + name) || 'null');
      if (saved && saved.totalScore !== undefined) return String(saved.totalScore);
    } catch(e) {}
    return '0';
  }

  function getLevel(){
    var el = $('hlv');
    if (el && el.textContent) return safeText(el.textContent, levelText('Baslangic'));
    return levelText('Baslangic');
  }

  function ensureUi(){
    if ($('ev-share-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'ev-share-btn';
    btn.type = 'button';
    btn.textContent = cardText('card');
    btn.onclick = openShareCard;
    document.body.appendChild(btn);

    var ov = document.createElement('div');
    ov.id = 'ev-share-ov';
    ov.innerHTML =
      '<div class="ev-share-card" role="dialog" aria-modal="true">' +
        '<div class="ev-share-title"></div>' +
        '<canvas id="ev-share-canvas" width="900" height="1200"></canvas>' +
        '<div class="ev-share-actions">' +
          '<button type="button" id="ev-share-close"></button>' +
          '<button type="button" id="ev-share-download"></button>' +
          '<button type="button" id="ev-share-send"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    refreshShareLang();
    $('ev-share-close').onclick = closeShareCard;
    $('ev-share-download').onclick = downloadCard;
    $('ev-share-send').onclick = shareCard;
    ov.addEventListener('click', function(e){ if(e.target === ov) closeShareCard(); });
  }

  function roundRect(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
  }

  function drawCentered(ctx, text, x, y, maxWidth, lineHeight){
    var words = String(text).split(' '), lines = [], line = '';
    words.forEach(function(word){
      var test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
      else line = test;
    });
    if (line) lines.push(line);
    lines.forEach(function(l, i){ ctx.fillText(l, x, y + i * lineHeight); });
  }

  function hashText(text){
    var h = 2166136261;
    for (var i=0;i<text.length;i++) { h ^= text.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); }
    return h >>> 0;
  }

  function seeded(seed){
    return function(){
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function drawBadge(ctx, x, y){
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = '#ffcc3e';
    for (var i=0;i<18;i++){
      ctx.rotate(Math.PI/9);
      ctx.beginPath();
      ctx.moveTo(0,-82);
      ctx.lineTo(18,-48);
      ctx.lineTo(-18,-48);
      ctx.closePath();
      ctx.fill();
    }
    var rg = ctx.createRadialGradient(-22,-26,8,0,0,76);
    rg.addColorStop(0,'#fff4a6');
    rg.addColorStop(.48,'#ffd44b');
    rg.addColorStop(1,'#ff9628');
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(0,0,74,0,Math.PI*2); ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(255,255,255,.65)';
    ctx.stroke();
    ctx.fillStyle = '#5a2b00';
    ctx.font = '58px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★',0,20);
    ctx.restore();
  }

  function renderGermanShareCard(ctx,W,H,name,score,level,date){
    ctx.clearRect(0,0,W,H);
    var bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#10294f'); bg.addColorStop(.55,'#286b7a'); bg.addColorStop(1,'#1f5138');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    for(var i=0;i<80;i++){
      ctx.fillStyle='rgba(255,255,255,'+(0.12+Math.random()*0.38)+')';
      ctx.beginPath(); ctx.arc(Math.random()*W,Math.random()*H*.72,1+Math.random()*2.8,0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle='rgba(255,224,138,.88)'; ctx.lineWidth=8; roundRect(ctx,36,36,W-72,H-72,34); ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.22)'; ctx.lineWidth=2; roundRect(ctx,58,58,W-116,H-116,26); ctx.stroke();
    ctx.textAlign='center';
    ctx.fillStyle='#FFE08A'; ctx.font='66px Fredoka One, Arial, sans-serif'; ctx.fillText('EduVerse',W/2,122);
    ctx.fillStyle='rgba(255,255,255,.78)'; ctx.font='26px Nunito, Arial, sans-serif'; ctx.fillText('Werte - Lernen - Entdecken',W/2,160);
    ctx.fillStyle='rgba(255,255,255,.96)'; roundRect(ctx,84,220,W-168,650,34); ctx.fill();
    ctx.fillStyle='#173d6b'; ctx.font='40px Fredoka One, Arial, sans-serif'; ctx.fillText('Erfolgskarte',W/2,306);
    ctx.fillStyle='#20233d'; ctx.font='52px Fredoka One, Arial, sans-serif'; drawCentered(ctx,name,W/2,410,W-230,58);
    var chip=ctx.createLinearGradient(150,500,W-150,650); chip.addColorStop(0,'#FFE08A'); chip.addColorStop(1,'#7BD2B5');
    ctx.fillStyle=chip; roundRect(ctx,150,520,W-300,135,30); ctx.fill();
    ctx.fillStyle='#12324f'; ctx.font='78px Fredoka One, Arial, sans-serif'; ctx.fillText(String(score),W/2,602);
    ctx.font='28px Nunito, Arial, sans-serif'; ctx.fillText('Sterne gesammelt',W/2,636);
    ctx.fillStyle='#173d6b'; ctx.font='34px Fredoka One, Arial, sans-serif'; drawCentered(ctx,levelText(level)||'EduVerse-Held',W/2,735,W-250,42);
    ctx.fillStyle='#ffffff'; ctx.font='38px Fredoka One, Arial, sans-serif'; ctx.fillText('Heute gelernt. Weiter so.',W/2,955);
    ctx.fillStyle='rgba(255,255,255,.15)'; roundRect(ctx,118,1008,W-236,88,24); ctx.fill();
    ctx.fillStyle='#FFE08A'; ctx.font='28px Fredoka One, Arial, sans-serif'; ctx.fillText('eduverse.club',W/2,1045);
    ctx.fillStyle='rgba(255,255,255,.74)'; ctx.font='24px Nunito, Arial, sans-serif'; ctx.fillText(date,W/2,1080);
    ctx.fillStyle='#FFE08A'; ctx.font='62px Arial, sans-serif'; ctx.fillText('***',W/2,1144);
  }
  function renderCard(){
    var c = $('ev-share-canvas');
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    var name = getPlayerName();
    var score = getScore();
    var level = getLevel();
    var date = new Date().toLocaleDateString((window.eduverseValuesOn && window.eduverseValuesOn() && valuesLang()==='de') ? 'de-DE' : 'tr-TR');
    var rand = seeded(hashText(name + score + level));

    ctx.clearRect(0,0,W,H);
    var g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#05142d');
    g.addColorStop(.38,'#123b89');
    g.addColorStop(.72,'#4920a0');
    g.addColorStop(1,'#14061f');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    var aur = ctx.createRadialGradient(W*.18,H*.12,10,W*.18,H*.12,360);
    aur.addColorStop(0,'rgba(97,228,255,.5)');
    aur.addColorStop(1,'rgba(97,228,255,0)');
    ctx.fillStyle = aur; ctx.fillRect(0,0,W,H);
    var aur2 = ctx.createRadialGradient(W*.82,H*.05,10,W*.82,H*.05,420);
    aur2.addColorStop(0,'rgba(255,216,91,.45)');
    aur2.addColorStop(1,'rgba(255,216,91,0)');
    ctx.fillStyle = aur2; ctx.fillRect(0,0,W,H);

    for (var i=0;i<120;i++){
      var a = .16 + rand()*.58;
      ctx.fillStyle = 'rgba(255,255,255,'+a+')';
      ctx.beginPath();
      ctx.arc(rand()*W, rand()*H*.76, 1.4+rand()*3.8, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,216,91,.92)';
    ctx.lineWidth = 8;
    roundRect(ctx, 34, 34, W-68, H-68, 42); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.22)';
    ctx.lineWidth = 2;
    roundRect(ctx, 54, 54, W-108, H-108, 34); ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD85B';
    ctx.font = '64px Fredoka One, Arial, sans-serif';
    ctx.fillText('EduVerse', W/2, 120);
    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font = '25px Nunito, Arial, sans-serif';
    ctx.fillText(cardText('tagline'), W/2, 158);

    ctx.fillStyle = 'rgba(255,255,255,.94)';
    roundRect(ctx, 76, 205, W-152, 680, 38); ctx.fill();
    ctx.fillStyle = 'rgba(108,53,216,.08)';
    roundRect(ctx, 104, 232, W-208, 626, 30); ctx.fill();

    drawBadge(ctx, W/2, 300);

    ctx.fillStyle = '#6c35d8';
    ctx.font = '42px Fredoka One, Arial, sans-serif';
    ctx.fillText(cardText('badge'), W/2, 430);

    ctx.fillStyle = '#20233d';
    ctx.font = '48px Fredoka One, Arial, sans-serif';
    drawCentered(ctx, name, W/2, 505, W-230, 54);

    var chipG = ctx.createLinearGradient(160,560,W-160,690);
    chipG.addColorStop(0,'#ffed81');
    chipG.addColorStop(1,'#ff9b42');
    ctx.fillStyle = chipG;
    roundRect(ctx, 155, 585, W-310, 132, 34); ctx.fill();
    ctx.fillStyle = '#512800';
    ctx.font = '78px Fredoka One, Arial, sans-serif';
    ctx.fillText(score, W/2, 672);
    ctx.font = '28px Nunito, Arial, sans-serif';
    ctx.fillText(cardText('stars'), W/2, 704);

    ctx.fillStyle = '#6c35d8';
    ctx.font = '32px Fredoka One, Arial, sans-serif';
    drawCentered(ctx, levelText(level), W/2, 785, W-270, 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = '38px Fredoka One, Arial, sans-serif';
    ctx.fillText(cardText('success'), W/2, 960);

    ctx.fillStyle = 'rgba(255,255,255,.14)';
    roundRect(ctx, 118, 1008, W-236, 88, 26); ctx.fill();
    ctx.fillStyle = '#FFD85B';
    ctx.font = '28px Fredoka One, Arial, sans-serif';
    ctx.fillText('eduverse.club', W/2, 1045);
    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font = '24px Nunito, Arial, sans-serif';
    ctx.fillText(date, W/2, 1080);

    ctx.fillStyle = '#FFD85B';
    ctx.font = '64px Arial, sans-serif';
    ctx.fillText('★ ★ ★', W/2, 1145);
  }

  function refreshShareLang(){
    var btn=$('ev-share-btn'); if(btn) btn.textContent=tr('Kart');
    var title=document.querySelector('.ev-share-title'); if(title) title.textContent=cardText('title');
    var close=$('ev-share-close'); if(close) close.textContent=tr('Kapat');
    var download=$('ev-share-download'); if(download) download.textContent=tr('Indir');
    var send=$('ev-share-send'); if(send) send.textContent=tr('Paylas');
  }

  function openShareCard(){
    ensureUi();
    $('ev-share-ov').classList.add('show');
    renderCard();
  }

  function closeShareCard(){
    var ov = $('ev-share-ov');
    if (ov) ov.classList.remove('show');
  }

  function canvasToBlob(){
    return new Promise(function(resolve){ $('ev-share-canvas').toBlob(resolve, 'image/png'); });
  }

  async function shareCard(){
    renderCard();
    var blob = await canvasToBlob();
    var file = new File([blob], 'eduverse-basari-karti.png', {type:'image/png'});
    if (navigator.canShare && navigator.canShare({files:[file]})) {
      await navigator.share({title:tr('EduVerse Basari Kartim'), text:tr('EduVerse basari kartim'), files:[file]});
      return;
    }
    downloadCard();
  }

  function downloadCard(){
    renderCard();
    var a = document.createElement('a');
    a.download = isGermanValues()?'eduverse-erfolgskarte.png':'eduverse-basari-karti.png';
    a.href = $('ev-share-canvas').toDataURL('image/png');
    a.click();
  }

  window.eduverseOpenShareCard = openShareCard;
  window.eduverseRefreshShareLang = refreshShareLang;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureUi);
  else ensureUi();
  setInterval(function(){ if(window.eduverseValuesOn && window.eduverseValuesOn()) refreshShareLang(); }, 1200);
})();






