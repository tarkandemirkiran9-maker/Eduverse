(function(){
  var opened = false;
  var lastReward = null;

  var I18N = {
    normal:{
      btn:'Sandik', title:'Surpriz Sandik', readyName:'Sandigi ac', readySub:'Bugunun hediyesi seni bekliyor.', open:'Ac', opened:'Acildi', close:'Kapat', note:'Test surumu: istersen her acista deneyebilirsin.',
      rewards:[
        {type:'stars', amount:25, name:'+25 Yildiz', sub:'Bugunun sandigindan ekstra yildiz cikti.'},
        {type:'stars', amount:50, name:'+50 Yildiz', sub:'Sansli sandik! Yildizlar hesabina eklendi.'},
        {type:'badge', id:'cesur_kasif', name:'Cesur Kasif Rozeti', sub:'Yeni rozet koleksiyona eklendi.'},
        {type:'badge', id:'super_ogrenen', name:'Super Ogrenen Rozeti', sub:'Ogrenme yolunda parlak bir rozet.'},
        {type:'theme', id:'uzay', name:'Uzay Kart Temasi', sub:'Basari kartlari icin uzay havasi acildi.'},
        {type:'theme', id:'altin', name:'Altin Kart Temasi', sub:'Basari kartlari icin altin parlaklik acildi.'},
        {type:'message', name:'Gizli Mesaj', sub:'Bugun kucuk bir adim attin, yarin buyuk bir basari olur.'},
        {type:'message', name:'Oki Mesaji', sub:'Oki diyor ki: Harika gidiyorsun, devam et!'}
      ]
    },
    tr:{
      btn:'Sandik', title:'Surpriz Sandik', readyName:'Sandigi ac', readySub:'Bugunun deger hediyesi seni bekliyor.', open:'Ac', opened:'Acildi', close:'Kapat', note:'Test surumu: istersen her acista deneyebilirsin.',
      rewards:[
        {type:'stars', amount:25, name:'+25 Yildiz', sub:'Caban icin ekstra yildiz kazandin.'},
        {type:'stars', amount:50, name:'+50 Yildiz', sub:'Harika! Deger yolculuguna yildiz eklendi.'},
        {type:'badge', id:'kindness', name:'Nezaket Rozeti', sub:'Nazik davranislar koleksiyonuna eklendi.'},
        {type:'badge', id:'helper', name:'Yardimsever Rozeti', sub:'Birine yardim etmek buyuk bir guc.'},
        {type:'theme', id:'forest', name:'Orman Kart Temasi', sub:'Basari kartlari icin doga temasi acildi.'},
        {type:'theme', id:'gold', name:'Altin Kart Temasi', sub:'Basari kartlari icin parlak tema acildi.'},
        {type:'message', name:'Deger Mesaji', sub:'Bugun kucuk bir iyilik yarin buyuk bir iz birakir.'},
        {type:'message', name:'Oki Mesaji', sub:'Oki diyor ki: Nazik, cesur ve merakli kal!'}
      ]
    },
    en:{
      btn:'Chest', title:'Surprise Chest', readyName:'Open the chest', readySub:'Your values reward is waiting.', open:'Open', opened:'Opened', close:'Close', note:'',
      rewards:[
        {type:'stars', amount:25, name:'+25 Stars', sub:'Extra stars for your effort today.'},
        {type:'stars', amount:50, name:'+50 Stars', sub:'Great! Your values journey gained more stars.'},
        {type:'badge', id:'kindness', name:'Kindness Badge', sub:'A bright badge for kind choices.'},
        {type:'badge', id:'helper', name:'Helper Badge', sub:'Helping others is a real strength.'},
        {type:'theme', id:'forest', name:'Forest Card Theme', sub:'A nature theme unlocked for achievement cards.'},
        {type:'theme', id:'gold', name:'Golden Card Theme', sub:'A shiny card theme has been unlocked.'},
        {type:'message', name:'Value Message', sub:'One small act of kindness can leave a big mark.'},
        {type:'message', name:'Oki Message', sub:'Oki says: Stay kind, brave, and curious!'}
      ]
    },
    de:{
      btn:'Truhe', title:'Ueberraschungs-Truhe', readyName:'Truhe oeffnen', readySub:'Deine Werte-Belohnung wartet.', open:'Oeffnen', opened:'Geoeffnet', close:'Schliessen', note:'',
      rewards:[
        {type:'stars', amount:25, name:'+25 Sterne', sub:'Extra Sterne fuer deine Muehe heute.'},
        {type:'stars', amount:50, name:'+50 Sterne', sub:'Super! Deine Werte-Reise bekommt mehr Sterne.'},
        {type:'badge', id:'kindness', name:'Freundlichkeits-Abzeichen', sub:'Ein helles Abzeichen fuer freundliche Entscheidungen.'},
        {type:'badge', id:'helper', name:'Helfer-Abzeichen', sub:'Anderen zu helfen ist eine echte Staerke.'},
        {type:'theme', id:'forest', name:'Wald-Kartendesign', sub:'Ein Naturdesign fuer Erfolgskarten wurde freigeschaltet.'},
        {type:'theme', id:'gold', name:'Goldenes Kartendesign', sub:'Ein glaenzendes Kartendesign wurde freigeschaltet.'},
        {type:'message', name:'Werte-Nachricht', sub:'Eine kleine Freundlichkeit kann eine grosse Spur hinterlassen.'},
        {type:'message', name:'Oki-Nachricht', sub:'Oki sagt: Bleib freundlich, mutig und neugierig!'}
      ]
    },
    ar:{
      btn:'صندوق', title:'صندوق المفاجأة', readyName:'افتح الصندوق', readySub:'مكافأة القيم تنتظرك.', open:'افتح', opened:'تم الفتح', close:'اغلاق', note:'',
      rewards:[
        {type:'stars', amount:25, name:'+25 نجمة', sub:'نجوم اضافية لجهدك اليوم.'},
        {type:'stars', amount:50, name:'+50 نجمة', sub:'رائع! رحلة القيم حصلت على نجوم اكثر.'},
        {type:'badge', id:'kindness', name:'شارة اللطف', sub:'شارة جميلة للاختيارات اللطيفة.'},
        {type:'badge', id:'helper', name:'شارة المساعدة', sub:'مساعدة الاخرين قوة حقيقية.'},
        {type:'theme', id:'forest', name:'تصميم بطاقة الغابة', sub:'تم فتح تصميم طبيعي لبطاقات الانجاز.'},
        {type:'theme', id:'gold', name:'تصميم البطاقة الذهبية', sub:'تم فتح تصميم لامع للبطاقات.'},
        {type:'message', name:'رسالة قيمة', sub:'فعل لطيف صغير يمكن ان يترك اثرا كبيرا.'},
        {type:'message', name:'رسالة اوكي', sub:'اوكي يقول: كن لطيفا وشجاعا وفضوليا!'}
      ]
    }
  };

  function $(id){ return document.getElementById(id); }
  function valuesOn(){ try { return localStorage.getItem('eduverse_values_mode') === '1' || window._valuesMode === true; } catch(e) { return false; } }
  function currentLang(){ var l='en'; try { l=localStorage.getItem('ev_values_lang')||'en'; } catch(e) {} return I18N[l] ? l : 'en'; }
  function T(){ return valuesOn() ? I18N[currentLang()] : I18N.normal; }
  function isRtl(){ return valuesOn() && currentLang()==='ar'; }

  function getPlayerName(){
    try { return (localStorage.getItem('dei_lastplayer') || 'kahraman').trim() || 'kahraman'; } catch(e) {}
    return 'kahraman';
  }

  function applyText(){
    var t=T();
    var btn=$('ev-chest-btn'); if(btn){ btn.textContent=t.btn; btn.setAttribute('aria-label',t.btn); btn.title=t.btn; }
    var ov=$('ev-chest-ov'); if(ov) ov.dir=isRtl()?'rtl':'ltr';
    var title=document.querySelector('.ev-chest-title'); if(title) title.textContent=t.title;
    var open=$('ev-chest-open'); if(open && !opened) open.textContent=t.open;
    var close=$('ev-chest-close'); if(close) close.textContent=t.close;
    var note=document.querySelector('.ev-chest-note'); if(note) note.textContent=t.note;
    if(!opened){
      var name=$('ev-chest-name'); if(name) name.textContent=t.readyName;
      var sub=$('ev-chest-sub'); if(sub) sub.textContent=t.readySub;
    } else if(lastReward){
      var translated = findRewardByKey(lastReward);
      if(translated){ $('ev-chest-name').textContent=translated.name; $('ev-chest-sub').textContent=translated.sub; }
    }
  }

  function rewardKey(r){ return r.type + ':' + (r.id || r.amount || r.name); }
  function findRewardByKey(oldReward){
    var key=rewardKey(oldReward), list=T().rewards;
    for(var i=0;i<list.length;i++) if(rewardKey(list[i])===key) return list[i];
    return null;
  }

  function ensureUi(){
    if ($('ev-chest-btn')) { applyText(); return; }
    var btn = document.createElement('button');
    btn.id = 'ev-chest-btn';
    btn.type = 'button';
    btn.textContent = T().btn;
    btn.onclick = openChest;
    document.body.appendChild(btn);

    var ov = document.createElement('div');
    ov.id = 'ev-chest-ov';
    ov.innerHTML =
      '<div class="ev-chest-card" role="dialog" aria-modal="true">' +
        '<div class="ev-chest-inner">' +
          '<div class="ev-chest-title"></div>' +
          '<div class="ev-chest-box" id="ev-chest-box">🎁</div>' +
          '<div class="ev-chest-reward">' +
            '<div class="ev-chest-reward-name" id="ev-chest-name"></div>' +
            '<div class="ev-chest-reward-sub" id="ev-chest-sub"></div>' +
          '</div>' +
          '<div class="ev-chest-actions">' +
            '<button type="button" id="ev-chest-open"></button>' +
            '<button type="button" id="ev-chest-close"></button>' +
          '</div>' +
          '<div class="ev-chest-note"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    $('ev-chest-close').onclick = closeChest;
    $('ev-chest-open').onclick = revealReward;
    ov.addEventListener('click', function(e){ if(e.target === ov) closeChest(); });
    applyText();
  }

  function openChest(){
    ensureUi();
    opened = false;
    lastReward = null;
    $('ev-chest-box').textContent = '🎁';
    $('ev-chest-box').className = 'ev-chest-box';
    $('ev-chest-open').disabled = false;
    applyText();
    $('ev-chest-ov').classList.add('show');
  }

  function closeChest(){ var ov = $('ev-chest-ov'); if (ov) ov.classList.remove('show'); }

  function saveCollection(kind, value){
    try {
      var key = 'eduverse_' + kind + '_' + getPlayerName();
      var arr = JSON.parse(localStorage.getItem(key) || '[]');
      if (arr.indexOf(value) < 0) arr.push(value);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch(e) {}
  }

  function addStars(n){
    try {
      if (typeof window.totalScore === 'number') window.totalScore += n;
      var hsc = $('hsc');
      if (hsc) hsc.textContent = String(parseInt(hsc.textContent || '0',10) + n);
      if (typeof window.savePlayerData === 'function') window.savePlayerData();
    } catch(e) {}
  }

  function revealReward(){
    if (opened) return;
    opened = true;
    var t=T();
    $('ev-chest-open').disabled = true;
    $('ev-chest-open').textContent = t.opened;
    var box = $('ev-chest-box');
    box.classList.add('shake');
    setTimeout(function(){
      var list=T().rewards;
      var reward = list[Math.floor(Math.random() * list.length)];
      lastReward = reward;
      box.textContent = reward.type === 'stars' ? '⭐' : reward.type === 'badge' ? '🏅' : reward.type === 'theme' ? '🎨' : '✨';
      box.className = 'ev-chest-box open';
      $('ev-chest-name').textContent = reward.name;
      $('ev-chest-sub').textContent = reward.sub;
      if (reward.type === 'stars') addStars(reward.amount);
      if (reward.type === 'badge') saveCollection('badges', reward.id);
      if (reward.type === 'theme') saveCollection('card_themes', reward.id);
      try {
        var logKey = 'eduverse_chest_log_' + getPlayerName();
        var log = JSON.parse(localStorage.getItem(logKey) || '[]');
        log.push({date:new Date().toISOString(), reward:reward.name, type:reward.type, lang:valuesOn()?currentLang():'normal'});
        localStorage.setItem(logKey, JSON.stringify(log.slice(-30)));
      } catch(e) {}
    }, 650);
  }

  window.eduverseOpenChest = openChest;
  window.eduverseRefreshChestLang = applyText;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureUi);
  else ensureUi();
  setInterval(function(){ if(valuesOn()) applyText(); }, 2500);
})();