(function(){
  var siteUrl = 'https://eduverse.club';

  function $(id){ return document.getElementById(id); }
  function tr(text){ return (window.eduverseValuesOn && window.eduverseValuesOn() && window.eduverseValuesText) ? window.eduverseValuesText(text) : text; }
  function safeText(v, fallback){ v = String(v || '').trim(); return v || fallback; }

  function getPlayerName(){
    try { return safeText(localStorage.getItem('dei_lastplayer'), tr('Bir EduVerse kahramani')); } catch(e) {}
    var input = $('ni');
    return safeText(input && input.value, tr('Bir EduVerse kahramani'));
  }

  function getScore(){
    var el = $('hsc');
    if (el && el.textContent) return safeText(el.textContent, '0');
    return '0';
  }

  function inviteText(){
    var name = getPlayerName();
    var score = getScore();
    return name + tr(' EduVerse oynuyor ve ') + score + tr(' yildiz kazandi. Sen de dene: ') + siteUrl;
  }

  function ensureUi(){
    if ($('ev-invite-btn')) { refreshInviteLang(); return; }
    var btn = document.createElement('button');
    btn.id = 'ev-invite-btn';
    btn.type = 'button';
    btn.onclick = openInvite;
    document.body.appendChild(btn);

    var ov = document.createElement('div');
    ov.id = 'ev-invite-ov';
    ov.innerHTML =
      '<div class="ev-invite-card" role="dialog" aria-modal="true">' +
        '<div class="ev-invite-inner">' +
          '<div class="ev-invite-logo">EduVerse</div>' +
          '<div class="ev-invite-title"></div>' +
          '<div class="ev-invite-text" id="ev-invite-text"></div>' +
          '<div class="ev-invite-link">' + siteUrl + '</div>' +
          '<div class="ev-invite-actions">' +
            '<button type="button" id="ev-invite-share"></button>' +
            '<button type="button" id="ev-invite-copy"></button>' +
            '<button type="button" id="ev-invite-card-btn"></button>' +
            '<button type="button" id="ev-invite-close"></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);

    var toast = document.createElement('div');
    toast.id = 'ev-invite-toast';
    document.body.appendChild(toast);

    $('ev-invite-close').onclick = closeInvite;
    $('ev-invite-copy').onclick = copyInvite;
    $('ev-invite-share').onclick = shareInvite;
    $('ev-invite-card-btn').onclick = function(){
      closeInvite();
      if (typeof window.eduverseOpenShareCard === 'function') window.eduverseOpenShareCard();
    };
    ov.addEventListener('click', function(e){ if(e.target === ov) closeInvite(); });
    refreshInviteLang();
  }

  function refreshInviteLang(){
    var btn=$('ev-invite-btn'); if(btn) btn.textContent=tr('Davet');
    var title=document.querySelector('.ev-invite-title'); if(title) title.textContent=tr('Arkadasini davet et');
    var share=$('ev-invite-share'); if(share) share.textContent='WhatsApp / '+tr('Paylas');
    var copy=$('ev-invite-copy'); if(copy) copy.textContent=tr('Linki kopyala');
    var card=$('ev-invite-card-btn'); if(card) card.textContent=tr('Basari kartini ac');
    var close=$('ev-invite-close'); if(close) close.textContent=tr('Kapat');
    var toast=$('ev-invite-toast'); if(toast && !toast.classList.contains('show')) toast.textContent=tr('Kopyalandi');
    var text=$('ev-invite-text'); if(text) text.textContent=inviteText();
  }

  function showToast(text){
    var t = $('ev-invite-toast');
    if (!t) return;
    t.textContent = text;
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, 1400);
  }

  function openInvite(){
    ensureUi();
    refreshInviteLang();
    $('ev-invite-text').textContent = inviteText();
    $('ev-invite-ov').classList.add('show');
  }

  function closeInvite(){
    var ov = $('ev-invite-ov');
    if (ov) ov.classList.remove('show');
  }

  async function copyInvite(){
    var text = inviteText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
      else throw new Error('clipboard yok');
      showToast(tr('Davet metni kopyalandi'));
    } catch(e) {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(tr('Davet metni kopyalandi'));
    }
  }

  async function shareInvite(){
    var text = inviteText();
    if (navigator.share) {
      try { await navigator.share({title:'EduVerse', text:text, url:siteUrl}); return; } catch(e) {}
    }
    var wa = 'https://wa.me/?text=' + encodeURIComponent(text);
    window.open(wa, '_blank');
  }

  window.eduverseOpenInvite = openInvite;
  window.eduverseRefreshInviteLang = refreshInviteLang;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureUi);
  else ensureUi();
  setInterval(function(){ if(window.eduverseValuesOn && window.eduverseValuesOn()) refreshInviteLang(); }, 1200);
})();

/* EV_INVITE_OFFICIAL_URL_V1 */
