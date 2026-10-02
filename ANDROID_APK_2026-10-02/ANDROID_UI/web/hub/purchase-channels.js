(function(w,d){
  'use strict';
  if(w.EDUVERSE_PURCHASE_CHANNELS && w.EDUVERSE_PURCHASE_CHANNELS.__v1){return;}

  function config(){
    var c=w.EDUVERSE_PURCHASE_CONFIG||{};
    c.mode=String(c.mode||'stores');
    c.paidSalesEnabled=c.paidSalesEnabled===true;
    c.channels=c.channels||{};
    c.prices=c.prices||{};
    return c;
  }

  function channelVisible(name,c){
    var x=(c.channels&&c.channels[name])||{};
    if(x.visible!==true){return false;}
    if(c.mode==='stores'){return name==='android';}
    if(c.mode==='direct'){return name==='direct';}
    if(c.mode==='hybrid'){return true;}
    return false;
  }

  function labelFor(name,x,plan){
    if(name==='android'){
      return plan==='free'
        ? 'ANDROID • Google Play • 5 Ücretsiz Oda'
        : 'ANDROID • Google Play';
    }
    if(name==='ios'){
      return x.enabled===true
        ? 'iOS • App Store'
        : 'iOS • App Store • Çok Yakında';
    }
    return x.label || 'EduVerse • Doğrudan Satın Al';
  }

  function hrefFor(name,x,plan,c){
    if(name==='direct'){
      if(c.paidSalesEnabled!==true || x.enabled!==true){return '';}
      return String(x.url||'');
    }
    if(x.enabled!==true){return '';}
    return String(x.url||'');
  }

  function purchaseNote(plan,c){
    if(plan==='free'){
      if(c.mode==='direct'){
        return 'EduVerse web erişimi doğrudan kullanılabilir.';
      }
      return 'Bu cihazda EduVerse Android uygulamasını kullanıyorsunuz.';
    }

    if(c.mode==='direct'){
      return 'Ödeme EduVerse üzerinden güvenli şekilde tamamlanır.';
    }

    if(c.mode==='hybrid'){
      return 'Android uygulama içi ödeme seçeneğini kullanabilirsiniz.';
    }

    return 'Satın alma uygulama içinde Google Play üzerinden tamamlanır.';
  }
  function applyPrice(card,plan,c){
    var priceNode=card.querySelector('.price b');
    if(!priceNode){return;}
    var p=c.prices[plan]||{};
    var value='';
    if(c.mode==='direct' && p.direct){value=String(p.direct);}
    else if(c.mode==='hybrid' && p.hybrid){value=String(p.hybrid);}
    else if(p.store){value=String(p.store);}
    if(value){priceNode.textContent=value;}
  }

  function makeButton(name,x,plan,c){
    var a=d.createElement('a');
    a.className='ev-buy-channel ev-buy-'+name;
    a.setAttribute('data-channel',name);
    a.setAttribute('data-plan',plan);
    a.textContent=labelFor(name,x,plan);

    var href=hrefFor(name,x,plan,c);
    if(href){
      a.href=href;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.setAttribute('aria-disabled','false');
    }else{
      a.href='#';
      a.classList.add('is-disabled');
      a.setAttribute('aria-disabled','true');
      a.addEventListener('click',function(e){
        e.preventDefault();
        try{
          if(typeof w.showToast==='function'){
            if(name==='ios') w.showToast('iOS sürümü çok yakında.');
            else if(name==='direct') w.showToast('EduVerse doğrudan ödeme henüz aktif değil.');
            else w.showToast('Bu mağaza bağlantısı henüz aktif değil.');
          }
        }catch(err){}
      });
    }

    return a;
  }

  function apply(){
    var c=config();

    d.querySelectorAll('.price-card').forEach(function(card){
      var old=card.querySelector('.price-btn[data-plan]');
      if(!old){return;}

      var plan=String(old.getAttribute('data-plan')||'');
      if(!plan){return;}

      applyPrice(card,plan,c);

      var host=card.querySelector('.ev-buy-channels');
      if(!host){
        host=d.createElement('div');
        host.className='ev-buy-channels';
        old.insertAdjacentElement('afterend',host);
      }
      host.innerHTML='';

      ['android','ios','direct'].forEach(function(name){
        var x=(c.channels&&c.channels[name])||{};
        if(channelVisible(name,c)){
          host.appendChild(makeButton(name,x,plan,c));
        }
      });

      var note=card.querySelector('.ev-buy-note');
      if(!note){
        note=d.createElement('div');
        note.className='ev-buy-note';
        host.insertAdjacentElement('afterend',note);
      }
      note.textContent=purchaseNote(plan,c);
      old.style.display='none';
      old.setAttribute('aria-hidden','true');
    });

    try{
      d.documentElement.setAttribute('data-purchase-mode',c.mode);
      d.documentElement.setAttribute('data-direct-sales',c.paidSalesEnabled===true?'on':'off');
    }catch(e){}

    return c;
  }

  w.EDUVERSE_PURCHASE_CHANNELS={
    __v1:true,
    apply:apply,
    get:config
  };

  if(d.readyState==='loading'){
    d.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }
})(window,document);


