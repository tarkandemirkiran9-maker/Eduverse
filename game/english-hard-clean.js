(function(){
  'use strict';
  function isEnglishValues(){ try{return localStorage.getItem('eduverse_values_mode')==='1' && localStorage.getItem('ev_values_lang')==='en';}catch(e){return false;} }

var replacements = [
    [/GÃƒÅ“N SERÃ„Â°SÃ„Â°|GÃœN SERÄ°SÄ°|GÜN SERİSİ|GUN SERISI|Gün Serisi|Gun Serisi/gi,'DAY STREAK'],
    [/BugÃƒÂ¼nÃƒÂ¼n GÃƒÂ¶revleri|BugÃ¼nÃ¼n GÃ¶revleri|Bugünün Görevleri|Bugunun Gorevleri/gi,'Today Tasks'],
    [/BugÃƒÂ¼n|BugÃ¼n|Bugün|Bugun/gi,'Today'],
    [/GÃƒÂ¼nlÃƒÂ¼k Rapor|GÃ¼nlÃ¼k Rapor|Günlük Rapor|Gunluk Rapor/gi,'Daily Report'],
    [/GÃƒÂ¼nlÃƒÂ¼k|GÃ¼nlÃ¼k|Günlük|Gunluk/gi,'Daily'],
    [/GÃƒÂ¶revler|GÃ¶revler|Görevler|Gorevler/gi,'Tasks'],
    [/GÃƒÂ¶rev|GÃ¶rev|Görev|Gorev/gi,'Task'],
    [/YÃƒÂ¼kleniyor|YÃ¼kleniyor|Yükleniyor|Yukleniyor/gi,'Loading'],
    [/Bebek OkiÃ…Å¸i|Bebek Okişi|Bebek Okisi|Bebek Oki/gi,'Baby Oki'],
    [/BEBEK|Bebek/gi,'BABY'],
    [/Ã–ÄRENCÄ°|ÖĞRENCİ|Ogrenci|Öğrenci/gi,'STUDENT'],
    [/GELECEK|Gelecek/gi,'FUTURE'],
    [/Ã¢Å“Â¦ Ãƒâ€“Ã„ÂREN Ã‚Â· BÃƒÅ“YÃƒÅ“ Ã‚Â· KEÃ…ÂFET Ã¢Å“Â¦|ÖĞREN · BÜYÜ · KEŞFET|OGREN · BUYU · KESFET/gi,'LEARN - GROW - DISCOVER'],
    [/AdÃ„Â±nÃ„Â± yaz, galaksiye gir!?|Adını yaz, galaksiye gir!?|Adini yaz, galaksiye gir!?/gi,'Write your name and enter the galaxy!'],
    [/KARAKTERÃ„Â°NÃ„Â° SEÃƒâ€¡|KARAKTERİNİ SEÇ|KARAKTERINI SEC/gi,'CHOOSE YOUR CHARACTER'],
    [/AdÃ„Â±n nedir\?|Adın nedir\?|Adin nedir\?/gi,'What is your name?'],
    [/Eve Gir!?|Hadi Başlayalım|Hadi Baslayalim|Hadi Başlıyalım|Hadi Basliyalim/gi,'Enter EduVerse'],
    [/Dua Evi|Dua OdasÄ±|Dua Odası|Dua Odasi/gi,'Reflection Room'],
    [/DualarÃ„Â±m|Dualarım|Dualarim|Duam/gi,'Reflections'],
    [/Allaha dua et.*?ÅÃƒÂ¼kÃƒÂ¼r|Allaha dua et.*?Şükür/gi,'Write, seal, and send your reflection to the sky'],
    [/BÃ„Â°LÃ„Â°YOR MUSUN\?|BİLİYOR MUSUN\?|Biliyor musun\?/gi,'DID YOU KNOW?'],
    [/Soru yÃƒÂ¼kleniyor|Soru yükleniyor|Soru yukleniyor/gi,'Loading question'],
    [/Odaya Gir|Odaya gir/gi,'Enter Room'],
    [/Bilmiyorum, geÃƒÂ§|Bilmiyorum, geç|Bilmiyorum, gec/gi,'I do not know, skip'],
    [/Yemek Ver!?|Yemek ver!?/gi,'Feed Oki'],
    [/BaÅŸlangÄ±Ã§|Başlangıç|Baslangic/gi,'Beginner'],
    [/YÄ±ldÄ±z|Yıldız|Yildiz/gi,'Stars'],
    [/\bPara\b/gi,'Coins'],
    [/DÃƒÂ¼kkan|Dükkan|Dukkan|Laden/gi,'Shop'],
    [/Kelimeler|Wörter|Woerter/gi,'Words'],
    [/ÅÂampiyona|Şampiyona|Sampiyona/gi,'Championship'],
    [/\bTema\b/gi,'Theme'],
    [/Rapor|Bericht|Fortschritt|Lernbericht|Elternbericht/gi,'Report'],
    [/PaylaÅŸ|Paylaş|Paylas|Teilen/gi,'Share'],
    [/Kapat|Schliessen|Schließen/gi,'Close'],
    [/Geri DÃ¶n|Geri Don|Geri dön|Zurueck/gi,'Back'],
    [/Devam|Weiter/gi,'Continue'],
    [/En iyi|Beste|Bestes/gi,'Best'],
    [/gÃƒÂ¼n kaldÄ±|gün kaldı|gun kaldi|Tage/gi,'days left'],
    [/Ãƒâ€“dÃƒÂ¼l|Ödül|Odul/gi,'Reward'],
    [/Mutluluk ParasÃ„Â±|Mutluluk Parası/gi,'Joy Coins'],
    [/Yumurta Oki.*/gi,'Egg Oki'],
    [/Ebeveyn ger.*?evirebilir/gi,'Parent can turn this into a real reward'],
    [/KazanÃ„Â±lan|Kazanılan|Kazanilan/gi,'Earned'],
    [/kazandÃ„Â±n|kazandın|kazandin/gi,'earned'],
    [/Son 7 gÃƒÂ¼n|Son 7 gün|Son 7 gun/gi,'Last 7 days'],
    [/7 gÃƒÂ¼nlÃƒÂ¼k|7 günlük|7 gunluk/gi,'7 days'],
    [/Puzzle tamamlandÄ±|Puzzle tamamlandı|Puzzle tamamlandi/gi,'Puzzle completed'],
    [/Boyama OdasÄ±|Boyama Odası|Boyama Odasi/gi,'Coloring Room'],
    [/Refleks Odasi|Refleks Odası/gi,'Reflex Room'],
    [/MOD SEC|MOD SEÇ/gi,'CHOOSE MODE'],
    [/Isik Vur|Işık Vur/gi,'Hit the Light'],
    [/Dogr[uğ] Rengi Bul|Doğru Rengi Bul/gi,'Find the Right Color'],
    [/Hayvan Yakala/gi,'Catch the Animal'],
    [/Sira Takip Et|Sıra Takip Et/gi,'Follow the Sequence'],
    [/Kaybolan/gi,'Disappearing'],
    [/Bombayi Patlat|Bombayı Patlat/gi,'Defuse the Bomb'],
    [/Buyugu Bul|Büyüğü Bul/gi,'Find the Biggest'],
    [/Cakan daireye hizlica dokun|Çakan daireye hızlıca dokun/gi,'Tap the flashing circle quickly'],
    [/Sorulan renke dokun.*?hiz|Sorulan renge dokun.*?hız/gi,'Tap the requested color - focus and speed'],
    [/TRoomy Tasks|Roomy Tasks/g,'Daily Tasks'],
    [/TRoomy|tRoomy/g,'Today'],
    [/CHOOSE YOUR CHAROpenTER/g,'CHOOSE YOUR CHARACTER'],
    [/CharOpenter/g,'Character'],
    [/eOpenh/g,'each'],
    [/plOpene/g,'place'],
    [/Open Openhievement card/g,'Open Achievement card'],
    [/Openhievement/g,'Achievement'],
    [/- CharOpenter Room/g,'- Character Room'],
    [/NEMA RoomSI/g,'Breathing Room'],
    [/nmek istiyor musun\?/g,'Would you like to learn?'],
    [/renilen Words/g,'Learned Words'],
    [/ngilizce/g,'English'],
    [/ampiyona/g,'Championship'],
    [/Namaz vakti geldi/gi,'Mindful moment'],
    [/Fidan oldun!|FIDAN OLDUN!|Buyuyorum!|Harika!/g,'You grew!'],
    [/ANI DEFTERIM/g,'MEMORY BOOK'],
    [/Ana Sayfaya Don/g,'Back to Home'],
    [/\bFidan\b/g,'Sapling'],
    [/FIDAN OLDUN!/g,'YOU GREW!'],
    [/Islamic Soft/g,'Calm Focus'],
    [/Good job\. Keep going!!/g,'Good job. Keep going!'],
    [/\bnamaz\b/gi,'reflections']
  ];

  function clean(s){
    if(!s) return s;
    if(!isEnglishValues()) return s;
    var out=String(s);
    replacements.forEach(function(pair){ out=out.replace(pair[0],pair[1]); });
    return out;
  }
  window.eduverseInvestorHardCleanText = clean;
  function cleanVisibleMojibake(value){
    var s=clean(value);
    if(!/[\u00C2\u00C3\u00C4\u00C5]/.test(s)) return s;
    var parts=s.match(/[A-Za-z0-9][A-Za-z0-9 .,!?+:'"()\/-]{2,}/g)||[];
    parts=parts.map(function(x){return x.trim();}).filter(function(x){return x.length>2;});
    parts.sort(function(a,b){return b.length-a.length;});
    return parts[0]||'';
  }
  window.eduverseCleanVisibleMojibake = cleanVisibleMojibake;

  function shouldSkip(node){
    var p=node.parentElement;
    if(!p) return true;
    var tag=p.tagName;
    return tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='CODE'||tag==='PRE';
  }
  function cleanNode(root){
    if(!isEnglishValues()) return;
    root=root||document.body;
    if(!root) return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(node){
      if(shouldSkip(node)) return NodeFilter.FILTER_REJECT;
      return /[ÃÄÅ]|BEBEK|GELECEK|Bug|Gün|Gun|Dua|Rapor|Payla|Kapat|Eve Gir|Hadi|Laden|Bericht|Tage|Roomy|Openhievement|OpenTER|CharOpenter|eOpenh|plOpene|NEMA|Namaz|Fidan|FIDAN|Islamic Soft|Harika|ANI DEFTER|Ana Sayfaya|ampiyona|ngilizce|renilen/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }});
    var nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(n){ var c=cleanVisibleMojibake(n.nodeValue); if(c!==n.nodeValue) n.nodeValue=c; });
    var name=document.getElementById('ni'); if(name) name.placeholder='What is your name?';
    var motto=document.getElementById('ev-login-motto'); if(motto) motto.textContent='LEARN - GROW - DISCOVER';
    var baby=document.getElementById('ev-login-baby'); if(baby) baby.textContent='BABY';
    var student=document.getElementById('ev-login-student'); if(student) student.textContent='STUDENT';
    var future=document.getElementById('ev-login-future'); if(future) future.textContent='FUTURE';
    var sq=document.getElementById('sq2-next'); if(sq) sq.textContent='Enter Room';
    var skip=document.querySelector('.sq2-skip'); if(skip) skip.textContent='I do not know, skip';
    var streakTitle=document.querySelector('#streak-ov div[style*="letter-spacing:3px"]'); if(streakTitle) streakTitle.textContent='DAY STREAK';
    var best=document.getElementById('streak-best'); if(best){ var n=(best.textContent.match(/\d+/)||['0'])[0]; best.textContent='Best streak: '+n+' '+(n==='1'?'day':'days'); }
    var goal=document.getElementById('streak-goal-txt'); if(goal) goal.textContent=clean(goal.textContent);
    var ada=document.getElementById('ada-bubble'); if(ada && /[ÃƒÃ„Ã…Ã¢ğŸ]|\u2759/.test(ada.textContent)) ada.textContent=String.fromCodePoint(0x1F3B5);
    var ap=document.getElementById('adaPlayBtn'); if(ap && /[ÃÄÅâ]/.test(ap.textContent)) ap.textContent=String.fromCharCode(9654);
    var track=document.getElementById('ada-track-name'); if(track && /[ÃÄÅâ]|Muzik|Müzik/.test(track.textContent)) track.textContent=String.fromCodePoint(0x1F3B5)+' Music';
    var ge=document.getElementById('growth-stage-emoji'); if(ge && /[ÃÄÅâ]/.test(ge.textContent)) ge.textContent=String.fromCodePoint(0x1F331);
    var on=document.getElementById('oki-name'); if(on && /[ÃÄÅ]|Tohum|Fidan|Aga|AÄ/.test(on.textContent)) on.textContent=on.textContent.replace(/^[^()]*/, 'Baby Oki ');
    var ob=document.getElementById('oki-bubble'); if(ob && /Bugun|yedim|Yarin|tok|Sut|Süt/.test(ob.textContent)) ob.textContent=clean(ob.textContent).replace(/Bugun zaten (.*?) yedim! Yarin gel!/i,'I already ate today. Come back tomorrow!').replace(/(.*?) yedim! \+20/i,'Yum! I ate today! +20 stars');
    if(ob && /OkiWelcome|Great to see you here|Welcome ay|[\u00C2\u00C3\u00C4\u00C5]/.test(ob.textContent)) ob.textContent='Welcome! Great to see you here.';
  }
  function run(){ cleanNode(document.body); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  setTimeout(run,80); setTimeout(run,300); setTimeout(run,900); setInterval(run,1000);
  try{ new MutationObserver(function(){ clearTimeout(window.__evHardCleanT); window.__evHardCleanT=setTimeout(run,50); }).observe(document.documentElement,{childList:true,subtree:true,characterData:true}); }catch(e){}
})();
