(function(){
  var selectedRating = 0;
  var selectedMood = '';
  var drag = { active:false, moved:false, startX:0, startY:0, btnX:0, btnY:0 };
  var adminTaps = [];

  var I18N = {
    normal:{
      btn:'Gorus', title:'Oyunu begendin mi?', sub:'1 ile 5 arasinda puan ver', note:'Kisa not yazabilirsin', close:'Kapat', send:'Gonder', thanks:'Tesekkurler! Gorusun kaydedildi.',
      moods:{very_good:'Bu oda cok iyi', good_game:'Oyunu begendim', missing:'Bir sey eksik', not_good:'Begenmedim'},
      adminTitle:'Yorumlar', adminSub:'Bu cihazda kaydedilen gorusler', clear:'Yorumlari temizle', empty:'Henuz yorum yok.', noNote:'Not yazilmadi', confirmClear:'Bu cihazdaki yorumlar silinsin mi?'
    },
    tr:{
      btn:'Gorus', title:'Deneyimi nasil buldun?', sub:'1 ile 5 arasinda puan ver', note:'Kisa not yazabilirsin', close:'Kapat', send:'Gonder', thanks:'Tesekkurler! Gorusun kaydedildi.',
      moods:{very_good:'Bu bolum cok iyi', good_game:'Oyunu begendim', missing:'Bir sey eksik', not_good:'Bana uygun degil'},
      adminTitle:'Gorusler', adminSub:'Bu cihazda kaydedilen global mod gorusleri', clear:'Gorusleri temizle', empty:'Henuz gorus yok.', noNote:'Not yazilmadi', confirmClear:'Bu cihazdaki gorusler silinsin mi?'
    },
    en:{
      btn:'Feedback', title:'How was your experience?', sub:'Rate it from 1 to 5', note:'You can write a short note', close:'Close', send:'Send', thanks:'Thank you! Your feedback was saved.',
      moods:{very_good:'This room is great', good_game:'I like the game', missing:'Something is missing', not_good:'Not for me'},
      adminTitle:'Feedback', adminSub:'Saved feedback on this device', clear:'Clear feedback', empty:'No feedback yet.', noNote:'No note', confirmClear:'Clear feedback on this device?'
    },
    de:{
      btn:'Feedback', title:'Wie war dein Erlebnis?', sub:'Bewerte es von 1 bis 5', note:'Du kannst eine kurze Notiz schreiben', close:'Schliessen', send:'Senden', thanks:'Danke! Dein Feedback wurde gespeichert.',
      moods:{very_good:'Dieser Raum ist sehr gut', good_game:'Ich mag das Spiel', missing:'Etwas fehlt', not_good:'Nicht fuer mich'},
      adminTitle:'Feedback', adminSub:'Gespeichertes Feedback auf diesem Geraet', clear:'Feedback loeschen', empty:'Noch kein Feedback.', noNote:'Keine Notiz', confirmClear:'Feedback auf diesem Geraet loeschen?'
    },
    ar:{
      btn:'رأي', title:'كيف كانت التجربة؟', sub:'قيّم من 1 إلى 5', note:'يمكنك كتابة ملاحظة قصيرة', close:'إغلاق', send:'إرسال', thanks:'شكراً! تم حفظ رأيك.',
      moods:{very_good:'هذه الغرفة رائعة', good_game:'أعجبني اللعب', missing:'هناك شيء ناقص', not_good:'ليست مناسبة لي'},
      adminTitle:'الآراء', adminSub:'الآراء المحفوظة على هذا الجهاز', clear:'حذف الآراء', empty:'لا توجد آراء بعد.', noNote:'لا توجد ملاحظة', confirmClear:'هل تريد حذف الآراء على هذا الجهاز؟'
    }
  };

  var moodIds = ['very_good','good_game','missing','not_good'];

  function $(id){ return document.getElementById(id); }
  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
  function valuesOn(){ try { return localStorage.getItem('eduverse_values_mode') === '1' || window._valuesMode === true; } catch(e) { return false; } }
  function currentLang(){ var l='en'; try { l = localStorage.getItem('ev_values_lang') || 'en'; } catch(e) {} return I18N[l] ? l : 'en'; }
  function T(){ return valuesOn() ? I18N[currentLang()] : I18N.normal; }
  function isRtl(){ return valuesOn() && currentLang() === 'ar'; }

  function placeButton(btn){
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem('eduverse_feedback_btn_pos') || 'null'); } catch(e) {}
    var w = btn.offsetWidth || 74;
    var h = btn.offsetHeight || 40;
    var x = saved && typeof saved.x === 'number' ? saved.x : 14;
    var y = saved && typeof saved.y === 'number' ? saved.y : Math.max(80, window.innerHeight - h - 86);
    x = clamp(x, 8, window.innerWidth - w - 8);
    y = clamp(y, 8, window.innerHeight - h - 8);
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
  }

  function saveButtonPos(btn){
    try { localStorage.setItem('eduverse_feedback_btn_pos', JSON.stringify({x:parseInt(btn.style.left,10)||14,y:parseInt(btn.style.top,10)||80})); } catch(e) {}
  }

  function makeButtonDraggable(btn){
    placeButton(btn);
    btn.addEventListener('pointerdown', function(e){
      drag.active = true; drag.moved = false; drag.startX = e.clientX; drag.startY = e.clientY;
      drag.btnX = parseInt(btn.style.left, 10) || btn.getBoundingClientRect().left;
      drag.btnY = parseInt(btn.style.top, 10) || btn.getBoundingClientRect().top;
      btn.classList.add('dragging');
      try { btn.setPointerCapture(e.pointerId); } catch(ex) {}
    });
    btn.addEventListener('pointermove', function(e){
      if (!drag.active) return;
      var dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
      if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
      if (!drag.moved) return;
      e.preventDefault();
      var w = btn.offsetWidth || 74, h = btn.offsetHeight || 40;
      btn.style.left = clamp(drag.btnX + dx, 8, window.innerWidth - w - 8) + 'px';
      btn.style.top = clamp(drag.btnY + dy, 8, window.innerHeight - h - 8) + 'px';
    });
    btn.addEventListener('pointerup', function(e){
      if (!drag.active) return;
      try { btn.releasePointerCapture(e.pointerId); } catch(ex) {}
      btn.classList.remove('dragging'); drag.active = false;
      if (drag.moved) { saveButtonPos(btn); return; }
      handleFeedbackButtonTap();
    });
    btn.addEventListener('pointercancel', function(e){ try { btn.releasePointerCapture(e.pointerId); } catch(ex) {} btn.classList.remove('dragging'); drag.active=false; });
    window.addEventListener('resize', function(){ placeButton(btn); saveButtonPos(btn); });
  }

  function handleFeedbackButtonTap(){
    var now = Date.now();
    adminTaps = adminTaps.filter(function(t){ return now - t < 1800; });
    adminTaps.push(now);
    if (adminTaps.length >= 5) { adminTaps = []; openFeedbackAdmin(); return; }
    setTimeout(function(){ if (adminTaps.length === 1 && Date.now() - adminTaps[0] >= 260) { adminTaps = []; openFeedback(); } }, 280);
  }

  function moodLabel(id){ return T().moods[id] || id || '-'; }
  function readFeedbackItems(){ try { return JSON.parse(localStorage.getItem('eduverse_feedback') || '[]'); } catch(e) { return []; } }
  function escapeHtml(s){ return String(s || '').replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function applyText(){
    var t = T();
    var btn = $('ev-feedback-btn'); if (btn) { btn.textContent = t.btn; btn.setAttribute('aria-label', t.btn); btn.title = t.btn; }
    var ov = $('ev-feedback-ov'); if (ov) ov.dir = isRtl() ? 'rtl' : 'ltr';
    var title = document.querySelector('.ev-feedback-title'); if (title) title.textContent = t.title;
    var sub = document.querySelector('.ev-feedback-sub'); if (sub) sub.textContent = t.sub;
    var note = $('ev-feedback-note'); if (note) note.placeholder = t.note;
    var close = $('ev-fb-close'); if (close) close.textContent = t.close;
    var send = $('ev-fb-send'); if (send) send.textContent = t.send;
    var thanks = document.querySelector('.ev-feedback-thanks'); if (thanks) thanks.textContent = t.thanks;
    renderMoods();
    updateState();
    var admin = $('ev-feedback-admin-ov'); if (admin) {
      admin.dir = isRtl() ? 'rtl' : 'ltr';
      var at = admin.querySelector('.ev-admin-title'); if (at) at.textContent = t.adminTitle;
      var as = admin.querySelector('.ev-admin-sub'); if (as) as.textContent = t.adminSub;
      var ac = $('ev-admin-close'); if (ac) ac.textContent = t.close;
      var cl = $('ev-admin-clear'); if (cl) cl.textContent = t.clear;
    }
  }

  function ensureAdminUi(){
    if ($('ev-feedback-admin-ov')) { applyText(); return; }
    var ov = document.createElement('div');
    ov.id = 'ev-feedback-admin-ov';
    ov.innerHTML = '<div class="ev-feedback-admin-card" role="dialog" aria-modal="true"><div class="ev-admin-head"><div><div class="ev-admin-title"></div><div class="ev-admin-sub"></div></div><button type="button" id="ev-admin-close"></button></div><div id="ev-feedback-list"></div><button type="button" id="ev-admin-clear"></button></div>';
    document.body.appendChild(ov);
    $('ev-admin-close').onclick = closeFeedbackAdmin;
    $('ev-admin-clear').onclick = function(){ if (!confirm(T().confirmClear)) return; try { localStorage.removeItem('eduverse_feedback'); } catch(e) {} renderFeedbackAdmin(); };
    ov.addEventListener('click', function(e){ if(e.target === ov) closeFeedbackAdmin(); });
    applyText();
  }

  function renderFeedbackAdmin(){
    var list = $('ev-feedback-list');
    if (!list) return;
    var t = T();
    var items = readFeedbackItems().slice().reverse();
    if (!items.length) { list.innerHTML = '<div class="ev-admin-empty">' + escapeHtml(t.empty) + '</div>'; return; }
    list.innerHTML = items.map(function(it){
      var dt = it.date ? new Date(it.date) : null;
      var dateText = dt && !isNaN(dt.getTime()) ? dt.toLocaleString(isRtl() ? 'ar' : currentLang() === 'de' ? 'de-DE' : currentLang() === 'en' ? 'en-US' : 'tr-TR') : '';
      return '<div class="ev-admin-item"><div class="ev-admin-score">' + escapeHtml(it.rating) + '/5</div><div class="ev-admin-body"><div class="ev-admin-mood">' + escapeHtml(moodLabel(it.mood)) + '</div><div class="ev-admin-note">' + (it.note ? escapeHtml(it.note) : '<em>' + escapeHtml(t.noNote) + '</em>') + '</div><div class="ev-admin-date">' + escapeHtml(dateText) + '</div></div></div>';
    }).join('');
  }

  function openFeedbackAdmin(){ ensureAdminUi(); renderFeedbackAdmin(); $('ev-feedback-admin-ov').classList.add('show'); }
  function closeFeedbackAdmin(){ var ov = $('ev-feedback-admin-ov'); if (ov) ov.classList.remove('show'); }

  function ensureUi(){
    if ($('ev-feedback-btn')) { applyText(); return; }
    var btn = document.createElement('button');
    btn.id = 'ev-feedback-btn'; btn.type = 'button'; btn.textContent = T().btn;
    document.body.appendChild(btn); makeButtonDraggable(btn);
    var ov = document.createElement('div');
    ov.id = 'ev-feedback-ov';
    ov.innerHTML = '<div class="ev-feedback-card" role="dialog" aria-modal="true"><div class="ev-feedback-form"><div class="ev-feedback-title"></div><div class="ev-feedback-sub"></div><div class="ev-rating-row" id="ev-rating-row"></div><div class="ev-mood-row" id="ev-mood-row"></div><textarea id="ev-feedback-note" maxlength="180"></textarea><div class="ev-feedback-actions"><button class="ev-fb-close" type="button" id="ev-fb-close"></button><button class="ev-fb-send" type="button" id="ev-fb-send" disabled></button></div></div><div class="ev-feedback-thanks"></div></div>';
    document.body.appendChild(ov);
    renderRatings(); renderMoods(); applyText();
    $('ev-fb-close').onclick = closeFeedback;
    $('ev-fb-send').onclick = submitFeedback;
    ov.addEventListener('click', function(e){ if(e.target === ov) closeFeedback(); });
  }

  function renderRatings(){
    var row = $('ev-rating-row'); if (!row) return;
    row.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ev-rate'; b.textContent = String(i);
      b.onclick = (function(n){ return function(){ selectedRating = n; updateState(); }; })(i);
      row.appendChild(b);
    }
  }

  function renderMoods(){
    var row = $('ev-mood-row'); if (!row) return;
    row.innerHTML = '';
    moodIds.forEach(function(id){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ev-mood'; b.textContent = moodLabel(id);
      b.onclick = function(){ selectedMood = id; updateState(); };
      row.appendChild(b);
    });
  }

  function updateState(){
    var rates = document.querySelectorAll('.ev-rate');
    for (var i = 0; i < rates.length; i++) rates[i].classList.toggle('active', i + 1 === selectedRating);
    var moodButtons = document.querySelectorAll('.ev-mood');
    moodIds.forEach(function(id, i){ if (moodButtons[i]) moodButtons[i].classList.toggle('active', id === selectedMood); });
    var send = $('ev-fb-send'); if (send) send.disabled = !(selectedRating && selectedMood);
  }

  function openFeedback(){ ensureUi(); applyText(); var card = document.querySelector('.ev-feedback-card'); if (card) card.classList.remove('sent'); $('ev-feedback-ov').classList.add('show'); updateState(); }
  function closeFeedback(){ var ov = $('ev-feedback-ov'); if (ov) ov.classList.remove('show'); }

  function submitFeedback(){
    if (!selectedRating || !selectedMood) return;
    var note = $('ev-feedback-note').value.trim();
    var item = {rating:selectedRating, mood:selectedMood, note:note, lang:valuesOn()?currentLang():'normal', valuesMode:valuesOn(), page:location.pathname, date:new Date().toISOString()};
    try { var all = JSON.parse(localStorage.getItem('eduverse_feedback') || '[]'); all.push(item); localStorage.setItem('eduverse_feedback', JSON.stringify(all.slice(-50))); } catch(e) {}
    if (typeof window.gtag === 'function') window.gtag('event','feedback_submit',{rating:selectedRating,mood:selectedMood,note_length:note.length,page_path:location.pathname,values_mode:valuesOn()?'1':'0',values_lang:valuesOn()?currentLang():'normal'});
    var card = document.querySelector('.ev-feedback-card'); if (card) card.classList.add('sent');
    setTimeout(closeFeedback, 1300);
  }

  window.eduverseOpenFeedback = openFeedback;
  window.eduverseOpenFeedbackAdmin = openFeedbackAdmin;
  window.eduverseRefreshFeedbackLang = function(){ ensureUi(); applyText(); renderFeedbackAdmin(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureUi); else ensureUi();
  window.addEventListener('storage', function(){ applyText(); });
  setInterval(function(){ if (valuesOn()) applyText(); }, 2500);
})();