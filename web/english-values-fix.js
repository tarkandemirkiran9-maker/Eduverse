(function(){
  'use strict';
  function isValuesEn(){ try{return !!(window.evValuesOn&&evValuesOn()&&window.evValuesLang&&evValuesLang()==='en');}catch(e){return false;} }
  function isValuesDe(){ try{return !!(window.evValuesOn&&evValuesOn()&&window.evValuesLang&&evValuesLang()==='de');}catch(e){return false;} }
  function cleanText(text){
    text = text == null ? '' : String(text);
    if(window.eduverseEnglishClean){ try{text = window.eduverseEnglishClean(text);}catch(e){} }
    var pairs = [
      [/Bismillahirrahmanirrahim|Bismillah|Allahu Akbar|Allahu Nurus Semavat|Alhamdulillah|Subhanallah|La ilahe|Ya Rabbi|Rahim|Kerim|Zikir|Salat|Namaz|Dua/gi,'Reflection'],

      [/BEBEK/g,'BABY'],[/Bebek/g,'Baby'],[/bebek/g,'baby'],
      [/GELECEK/g,'FUTURE'],[/Gelecek/g,'Future'],[/gelecek/g,'future'],
      [/\u00d6\u011eREN|OGREN|O\u011eREN/g,'LEARN'],[/\u00d6\u011fren|Ogren|O\u011fren/g,'Learn'],[/\u00f6\u011fren|ogren/g,'learn'],
      [/B\u00dcY\u00dc|BUYU/g,'GROW'],[/B\u00fcy\u00fc|Buyu/g,'Grow'],
      [/KE\u015eFET|KESFET/g,'DISCOVER'],[/Ke\u015ffet|Kesfet/g,'Discover'],
      [/\u00d6\u011eREN\s*[\u00b7\-]\s*B\u00dcY\u00dc\s*[\u00b7\-]\s*KE\u015eFET|OGREN\s*[\u00b7\-]\s*BUYU\s*[\u00b7\-]\s*KESFET/g,'LEARN - GROW - DISCOVER'],
      [/g\u00fcn serisi|gun serisi|G\u00fcn Serisi|Gun Serisi|G\u00dcN SER\u0130S\u0130|GUN SERISI/g,'day streak'],
      [/g\u00fcnler|gunler|G\u00fcnler|Gunler|G\u00dcNLER|GUNLER/g,'Days'],
      [/g\u00fcn|gun|G\u00fcn|Gun/g,'day'],
      [/iki g\u00fcn kald\u0131|iki gun kaldi|\u0130ki g\u00fcn kald\u0131|Iki gun kaldi|2 g\u00fcn kald\u0131|2 gun kaldi/g,'2 days left'],
      [/HADI BASLIYALIM|HADI BASLAYALIM|Hadi basliyalim|Hadi baslayalim|Hadi ba\u015flayal\u0131m/g,"LET'S START"],

      [/EduVerse\s*\u00d6\u011fren|EduVerse\s*Ogren/g,'EduVerse Learn'],[/\u00d6\u011fren\s*EduVerse|Ogren\s*EduVerse/g,'Learn EduVerse'],
      [/Bebek Oki\u015fi|Bebek Okisi|Bebek Oki/g,'Baby Oki'],[/BABY\s+OKI\u015eI|BEBEK\s+OKI\u015eI/g,'BABY OKI'],
      [/\u0130ki\s+day|Iki\s+day|iki\s+day/g,'2 days'],[/2\s+day\s+left/g,'2 days left'],[/day\s+kald\u0131|day\s+kaldi/g,'days left'],
      [/En iyi/g,'Best'],[/A\u00c7ILDI|A\u00e7\u0131ld\u0131|Acildi/g,'OPEN'],[/Seri/g,'Streak'],[/seri/g,'streak'],
      [/Dua Evi/g,'Values House'],[/Dua Odas\u0131|Dua Odasi/g,'Reflection Room'],[/Dua et/g,'Reflect'],
      [/Bugun|Bug\u00fcn/g,'Today'],[/Henuz|Hen\u00fcz/g,'Not yet'],[/Gorevler|G\u00f6revler/g,'Tasks'],[/Gorev|G\u00f6rev/g,'Task'],
      [/Kelimeler/g,'Words'],[/Kelime/g,'Word'],[/kelime/g,'word'],[/ogrenildi/g,'learned'],[/Ogren/g,'Learn'],
      [/Dukkan|D\u00fckkan|Laden/g,'Shop'],[/Giyili/g,'Wearing'],[/Giy/g,'Wear'],[/Cikar|\u00c7\u0131kar|Ausziehen/g,'Take off'],[/Sahip/g,'Owned'],[/Yok|Nichts/g,'Nothing'],
      [/\b(?:Tamam|Fertig)\b/g,'Done'],[/\bKapat\b/g,'Close'],[/\b(?:Ac|A\u00e7|Oeffnen)\b/g,'Open'],[/\bGeri\b/g,'Back'],[/\bDevam\b/g,'Continue'],
      [/Paylas|Payla\u015f|Teilen/g,'Share'],[/Rapor|Bericht|Fortschritt|Lernbericht|Elternbericht/g,'Report'],[/Ebeveyn/g,'Parent'],
      [/Bugun:|Bug\u00fcn:/g,'Today:'],[/hak kaldi|hak kald\u0131/g,'tries left'],[/parca|par\u00e7a|Teile/g,'pieces'],[/16 parca|16 par\u00e7a/g,'16 pieces'],
      [/Nefes Al/gi,'Breathe in'],[/Nefes Ver/gi,'Breathe out'],[/Nefes/g,'Breathing'],[/Tut/g,'Hold'],[/Dinlen/g,'Rest'],
      [/Tikla|T\u0131kla|Dokun/g,'Tap'],[/Puan Kazan/g,'Collect points'],[/Bombaya dokun/g,'Tap bombs'],[/Yildizdan kac|Y\u0131ld\u0131zdan ka\u00e7/g,'Avoid stars'],[/En buyuk daireye dokun|En b\u00fcy\u00fck daireye dokun/g,'Tap the biggest circle'],
      [/Isik/g,'Light'],[/Renk/g,'Color'],[/Hayvan/g,'Target'],[/Sira/g,'Sequence'],[/Kaybolan/g,'Disappearing'],[/Bomba/g,'Bomb'],[/Buyuk|B\u00fcy\u00fck/g,'Biggest'],
      [/\bBorsa\b/g,'Market'],[/\bTimsah\b/g,'Crocodile'],[/\b(?:Yilan|Y\u0131lan)\b/g,'Snake'],[/\b(?:Tavsan|Tav\u015fan)\b/g,'Rabbit'],[/\bAt\b/g,'Horse'],
      [/Hazir misin|Haz\u0131r m\u0131s\u0131n/g,'Are you ready'],[/Hadi baslayalim|Hadi ba\u015flayal\u0131m/g,"Let's start"],[/Bunu biliyor musun/g,'Did you know'],
      [/Harika/g,'Great'],[/Super|S\u00fcper/g,'Super'],[/Dogru|Do\u011fru/g,'Correct'],[/Yanlis|Yanl\u0131\u015f/g,'Wrong'],[/Devam et/g,'Keep going'],
      [/\bPortakal\b/g,'orange'],[/\bElma\b/g,'apple'],[/\bMuz\b/g,'banana'],[/\bSu\b/g,'water'],[/\b(?:Sut|S\u00fct)\b/g,'milk']
    ];
    pairs.forEach(function(p){ text = text.replace(p[0],p[1]); });
    return text;
  }
  window.eduverseValuesEnglishPostClean = function(root){
    if(!isValuesEn()) return;
    root = root || document.body;
    // Hafif hedefli temizlik: tum 37 MB oyun DOM'unu surekli tarama, sadece gorunen kucuk alanlar.
    var zones=[];
    ['ns','streak-ov','pz-daily','refleks-talimat','refleks-bitis','shop-ov'].forEach(function(id){var el=document.getElementById(id); if(el) zones.push(el);});
    zones.forEach(function(zone){
      if(zone.nodeType===3){ zone.nodeValue=cleanText(zone.nodeValue); return; }
      if(!zone.querySelectorAll) return;
      zone.querySelectorAll('div,span,p,button,h1,h2,h3,label').forEach(function(el){
        if(el.childNodes.length===1 && el.firstChild.nodeType===3){ var c=cleanText(el.textContent); if(c!==el.textContent) el.textContent=c; }
      });
    });
    fixKnownWidgets();
  };
  function fixKnownWidgets(){
    if(!isValuesEn()) return;
    var set=function(id,t){var el=document.getElementById(id); if(el && t) el.textContent=t;};
    set('ev-login-motto','LEARN - GROW - DISCOVER');
    set('ev-login-baby','BABY');
    set('ev-login-student','STUDENT');
    set('ev-login-future','FUTURE');
    set('pz-daily',(function(){var el=document.getElementById('pz-daily'); return el?cleanText(el.textContent):'';})());
    set('rh-mod',(function(){var el=document.getElementById('rh-mod'); return el?cleanText(el.textContent):'';})());
    var wt=document.getElementById('shop-wearing-txt'); if(wt && (!wt.textContent || /Yok|Nichts|Nothing/.test(wt.textContent))) wt.textContent='Nothing';
    var qt=document.getElementById('qr-title'); if(qt) qt.textContent='Parent Report';
    var qs=document.getElementById('qr-sub'); if(qs) qs.textContent='Daily learning summary';

    var best=document.getElementById('streak-best');
    if(best){
      var n=(best.textContent.match(/\d+/)||['0'])[0];
      best.textContent='Best streak: '+n+' '+(n==='1'?'day':'days');
    }
    var goal=document.getElementById('streak-goal-txt');
    if(goal){
      var m=(goal.textContent.match(/\d+/)||[])[0];
      goal.textContent=/A?ILDI|ACILDI|OPEN|Offen/i.test(goal.textContent)?'Open!':((m||'2')+' days left');
    }
    var msg=document.getElementById('streak-msg-ov')||document.getElementById('streak-msg');
    var countEl=document.getElementById('streak-count');
    var count=countEl && countEl.textContent && /^\d+$/.test(countEl.textContent)?parseInt(countEl.textContent,10):0;
    if(msg){
      var map={1:'Welcome! Your streak starts now!',2:'2 days in a row! Great progress!',3:'3 days in a row! A strong habit is forming!',5:'5 days! You are truly determined!',7:'A full week! Amazing!'};
      msg.textContent=map[count] || (count>0 ? count+' days in a row! Keep going!' : 'Start your streak today!');
    }
    var cal=document.getElementById('streak-cal');
    if(cal){
      var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      Array.prototype.forEach.call(cal.children,function(dot,i){ if(dot && dot.textContent !== '??') dot.textContent=days[i%7]; });
    }
  }
  function wrap(name, after){
    var old=window[name]; if(typeof old!=='function' || old.__enFixWrapped) return;
    var fn=function(){ var r=old.apply(this,arguments); try{ after&&after.apply(this,arguments); window.eduverseValuesEnglishPostClean(document.body); }catch(e){} return r; };
    fn.__enFixWrapped=true; window[name]=fn;
  }
  function install(){
    wrap('evText', function(){});
    var oldEvText=window.evText;
    if(typeof oldEvText==='function' && !oldEvText.__enCleanCore){
      var nt=function(t){ var out=oldEvText.apply(this,arguments); return isValuesEn()?cleanText(out):out; };
      nt.__enCleanCore=true; window.evText=nt;
    }
    ['showTasks','updateDailyStrip','showKelime','showReport','showShare','showDua','showPuzzle','puzzleRenderCats','shopRenderItems','shopUpdateWearing','rBasla','rBitis','rYeniRenkSoru','rBombaBasla','rBuyukBasla','showStreakOverlay','openRoom','showRoomQuestion'].forEach(function(n){wrap(n);});
    if(!window.__enValuesObserver){
      window.__enValuesObserver = new MutationObserver(function(muts){ if(!isValuesEn()) return; clearTimeout(window.__enValuesCleanTimer); window.__enValuesCleanTimer=setTimeout(function(){window.eduverseValuesEnglishPostClean(document.body);},80); });
      window.__enValuesObserver.observe(document.documentElement,{childList:true,subtree:true});
    }
    setInterval(function(){ if(isValuesEn()) window.eduverseValuesEnglishPostClean(document.body); },1200);
    [0,120,500,1200].forEach(function(ms){setTimeout(function(){window.eduverseValuesEnglishPostClean(document.body);},ms);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();
