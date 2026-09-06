(function(w,d){
  'use strict';

  var root=null,book=null,viewport=null,roll=null,toggle=null,rewind=null,stage=null,fitShell=null,leftSlot=null,rightSlot=null,sectionHeader=null,raf=0,last=0,playing=false,reduced=false,stateLang='',dots=[],fitScale=1;

  var TEXT={
    tr:{
      kicker:'KURUCU HİKÂYESİ',title:'EduVerse’in hikâyesi nasıl başladı?',lead:'Başlangıçtan misyona uzanan gerçek hikâye.',
      play:'BAŞLAT',pause:'DURDUR',rewind:'BAŞA DÖN',phonePill:'EduVerse • Kurucu Hikâyesi',phoneLabel:'HİKÂYE AKIŞI',
      chapter1K:'01 · BAŞLANGIÇ',chapter1T:'Her şey bir gün, bir düşünce ve bir ihtiyaçla başladı.',chapter1D:'Gerçek hikâye, kurucunun kendi sözleriyle burada yerini alacak.',
      chapter2K:'02 · HAYATIMDA DEĞİŞENLER',chapter2T:'Bazı yaşananlar insanın yönünü sonsuza kadar değiştirir.',chapter2D:'Hayatınızda iz bırakan dönüm noktaları, yalnızca sizin onayladığınız anlatımla burada akacak.',
      chapter3K:'03 · KIZIM',chapter3T:'Kalpte kalan bazı bağlar, bir fikri bir amaca dönüştürür.',chapter3D:'Bu bölüm, kızınızla ilgili anlatmak istediğiniz duyguyu ve anlamı taşıyacak.',
      chapter4K:'04 · EDUVERSE NEDEN DOĞDU?',chapter4T:'EduVerse yalnızca yapılmış bir ürün değil; hissedilmiş bir ihtiyaçtır.',chapter4D:'Fikrin gerçek doğuş sebebi, sizin kelimelerinizle burada yer alacak.',
      chapter5K:'05 · MİSYON',chapter5T:'Amaç, çocuklar ve aileler için daha güvenli ve umut veren bir alan kurmaktı.',chapter5D:'EduVerse’in neyi değiştirmek istediği bu bölümde netleşecek.',
      chapter6K:'06 · GELECEK',chapter6T:'Hikâye, geleceğe bırakılmak istenen izle tamamlanacak.',chapter6D:'Nihai metin, sizin açık onayınızla bu akışın son kartına yerleşecek.',
      note:'Kartlar telefonun içinde akıyor; üstteki EduVerse alanı sabit kalıyor.'
    },
    en:{
      kicker:'FOUNDER STORY',title:'How did the EduVerse story begin?',lead:'The real story, from the beginning to the mission.',
      play:'START',pause:'PAUSE',rewind:'REWIND',phonePill:'EduVerse • Founder Story',phoneLabel:'STORY FLOW',
      chapter1K:'01 · BEGINNING',chapter1T:'Everything began with a day, an idea, and a need.',chapter1D:'The real story will appear here in the founder’s own words.',
      chapter2K:'02 · WHAT CHANGED IN MY LIFE',chapter2T:'Some experiences change a person’s direction forever.',chapter2D:'The turning points that shaped your life will flow here only in wording you approve.',
      chapter3K:'03 · MY DAUGHTER',chapter3T:'Some bonds that remain in the heart turn an idea into a purpose.',chapter3D:'This section will carry the feeling and meaning you want to tell about your daughter.',
      chapter4K:'04 · WHY WAS EDUVERSE BORN?',chapter4T:'EduVerse is not only a product that was built; it is a need that was deeply felt.',chapter4D:'The true reason behind the idea will appear here in your own words.',
      chapter5K:'05 · MISSION',chapter5T:'The goal was to build a safer and more hopeful space for children and families.',chapter5D:'What EduVerse wants to change will become clear in this section.',
      chapter6K:'06 · FUTURE',chapter6T:'The story will end with the mark you want to leave for the future.',chapter6D:'The final text will take its place in the last card with your explicit approval.',
      note:'The cards move inside the phone while the EduVerse header stays fixed.'
    },
    de:{
      kicker:'GRÜNDERGESCHICHTE',title:'Wie begann die Geschichte von EduVerse?',lead:'Die echte Geschichte vom Anfang bis zur Mission.',
      play:'START',pause:'PAUSE',rewind:'ZUM ANFANG',phonePill:'EduVerse • Gründergeschichte',phoneLabel:'GESCHICHTE',
      chapter1K:'01 · ANFANG',chapter1T:'Alles begann mit einem Tag, einer Idee und einem Bedarf.',chapter1D:'Die echte Geschichte wird hier in den eigenen Worten des Gründers erscheinen.',
      chapter2K:'02 · WAS SICH IN MEINEM LEBEN VERÄNDERTE',chapter2T:'Manche Erlebnisse verändern die Richtung eines Menschen für immer.',chapter2D:'Die Wendepunkte Ihres Lebens werden hier nur in einer von Ihnen freigegebenen Formulierung fließen.',
      chapter3K:'03 · MEINE TOCHTER',chapter3T:'Manche Bindungen, die im Herzen bleiben, verwandeln eine Idee in einen Zweck.',chapter3D:'Dieser Abschnitt wird das Gefühl und die Bedeutung tragen, die Sie über Ihre Tochter erzählen möchten.',
      chapter4K:'04 · WARUM WURDE EDUVERSE GEBOREN?',chapter4T:'EduVerse ist nicht nur ein gebautes Produkt, sondern ein tief empfundenes Bedürfnis.',chapter4D:'Der wahre Grund hinter der Idee wird hier in Ihren eigenen Worten erscheinen.',
      chapter5K:'05 · MISSION',chapter5T:'Das Ziel war, einen sichereren und hoffnungsvolleren Raum für Kinder und Familien zu schaffen.',chapter5D:'Was EduVerse verändern möchte, wird in diesem Abschnitt klar.',
      chapter6K:'06 · ZUKUNFT',chapter6T:'Die Geschichte endet mit der Spur, die Sie für die Zukunft hinterlassen möchten.',chapter6D:'Der endgültige Text wird mit Ihrer ausdrücklichen Freigabe in der letzten Karte erscheinen.',
      note:'Die Karten laufen im Telefon; der EduVerse-Kopf bleibt oben stehen.'
    },
    fr:{
      kicker:'HISTOIRE DU FONDATEUR',title:'Comment l’histoire d’EduVerse a-t-elle commencé ?',lead:'La véritable histoire, du début à la mission.',
      play:'LANCER',pause:'PAUSE',rewind:'REVENIR AU DÉBUT',phonePill:'EduVerse • Histoire du fondateur',phoneLabel:'RÉCIT',
      chapter1K:'01 · DÉBUT',chapter1T:'Tout a commencé par un jour, une idée et un besoin.',chapter1D:'La véritable histoire apparaîtra ici avec les propres mots du fondateur.',
      chapter2K:'02 · CE QUI A CHANGÉ DANS MA VIE',chapter2T:'Certaines expériences changent pour toujours la direction d’une vie.',chapter2D:'Les tournants de votre vie apparaîtront ici uniquement dans une formulation que vous approuvez.',
      chapter3K:'03 · MA FILLE',chapter3T:'Certains liens qui restent dans le cœur transforment une idée en mission.',chapter3D:'Cette partie portera l’émotion et le sens que vous souhaitez raconter au sujet de votre fille.',
      chapter4K:'04 · POURQUOI EDUVERSE EST-IL NÉ ?',chapter4T:'EduVerse n’est pas seulement un produit créé ; c’est un besoin profondément ressenti.',chapter4D:'La vraie raison derrière l’idée apparaîtra ici avec vos propres mots.',
      chapter5K:'05 · MISSION',chapter5T:'Le but était de créer un espace plus sûr et plus porteur d’espoir pour les enfants et les familles.',chapter5D:'Ce qu’EduVerse veut changer deviendra clair dans cette section.',
      chapter6K:'06 · AVENIR',chapter6T:'L’histoire se terminera par la trace que vous souhaitez laisser à l’avenir.',chapter6D:'Le texte final prendra sa place dans la dernière carte avec votre accord explicite.',
      note:'Les cartes défilent dans le téléphone tandis que l’en-tête EduVerse reste fixe.'
    },
    ar:{
      kicker:'قصة المؤسس',title:'كيف بدأت قصة EduVerse؟',lead:'القصة الحقيقية من البداية إلى الرسالة.',
      play:'ابدأ',pause:'إيقاف',rewind:'العودة للبداية',phonePill:'EduVerse • قصة المؤسس',phoneLabel:'تدفق القصة',
      chapter1K:'01 · البداية',chapter1T:'بدأ كل شيء بيوم وفكرة وحاجة.',chapter1D:'ستظهر القصة الحقيقية هنا بكلمات المؤسس نفسه.',
      chapter2K:'02 · ما الذي تغير في حياتي',chapter2T:'بعض التجارب تغيّر اتجاه الإنسان إلى الأبد.',chapter2D:'ستتدفق نقاط التحول في حياتك هنا فقط بصياغة توافق عليها.',
      chapter3K:'03 · ابنتي',chapter3T:'بعض الروابط التي تبقى في القلب تحوّل الفكرة إلى رسالة.',chapter3D:'سيحمل هذا القسم الشعور والمعنى الذي تريد قوله عن ابنتك.',
      chapter4K:'04 · لماذا وُلد EduVerse؟',chapter4T:'EduVerse ليس مجرد منتج صُنِع؛ بل حاجة شُعرت بعمق.',chapter4D:'سيظهر السبب الحقيقي وراء الفكرة هنا بكلماتك أنت.',
      chapter5K:'05 · الرسالة',chapter5T:'كان الهدف بناء مساحة أكثر أماناً وأملاً للأطفال والعائلات.',chapter5D:'ما الذي يريد EduVerse تغييره سيتضح في هذا القسم.',
      chapter6K:'06 · المستقبل',chapter6T:'ستكتمل القصة بالأثر الذي تريد تركه للمستقبل.',chapter6D:'سيأخذ النص النهائي مكانه في البطاقة الأخيرة بعد موافقتك الصريحة.',
      note:'تتحرك البطاقات داخل الهاتف بينما يبقى رأس EduVerse ثابتاً.'
    }
  };


  var SIDE={
    tr:{
      pageKicker:'KURUCU HİKÂYESİ',pageTitle:'EduVerse’in Doğuşu',pageSubtitle:'Bir fikir, bir tutku, bir evren.',
      evoTitle:'Dünden Bugüne EduVerse',evoSubtitle:'Bir fikrin büyüyen yolculuğu',
      evo1T:'İlk Oki',evo1D:'Her şey küçük bir selamla başladı.',
      evo2T:'Karakter Arayışı',evo2D:'Oki’nin dünyası yavaş yavaş şekillendi.',
      evo3T:'İlk Ekranlar',evo3D:'İlk arayüzler, ilk adımlar, ilk heyecan.',
      evo4T:'Mini Oyun',evo4D:'Deneye deneye oyun dünyası büyüdü.',
      evo5T:'Robot Oki',evo5D:'Karakter, bugünkü yol arkadaşına dönüştü.',
      evo6T:'Dünya Merkezi',evo6D:'EduVerse daha güçlü ve ortak bir merkeze kavuştu.',
      notesTitle:'Atölye Notları',notesSubtitle:'Perde Arkası',notesTag:'Komik, düşündürücü, gerçek.',
      note1:'Bu port yine dolu mu? 😅',note2:'Sök-tak kalsın. 🔧',note3:'Telefon güzel ama ekrana sığmıyor. 😅',
      note4:'Önce düşün, sonra yerleştir. 💡',note5:'Ölç, hizala, test et. ✅',note6:'Bu komutu nereye yapıştıracağım? 🤔',
      note7:'Yapay zekâ fikir verir; son dokunuş insana aittir. ♥',note8:'Sabır + Deneme = Mucize ✨'
    },
    en:{
      pageKicker:'FOUNDER STORY',pageTitle:'The Birth of EduVerse',pageSubtitle:'An idea, a passion, a universe.',
      evoTitle:'EduVerse: Then to Now',evoSubtitle:'The growing journey of an idea',
      evo1T:'First Oki',evo1D:'It all began with a small hello.',
      evo2T:'Character Search',evo2D:'Oki’s world slowly began to take shape.',
      evo3T:'First Screens',evo3D:'First interfaces, first steps, first excitement.',
      evo4T:'Mini Game',evo4D:'The game world grew through iteration.',
      evo5T:'Robot Oki',evo5D:'The character became today’s companion.',
      evo6T:'World Hub',evo6D:'EduVerse gained a stronger shared center.',
      notesTitle:'Workshop Notes',notesSubtitle:'Behind the Scenes',notesTag:'Funny, thoughtful, real.',
      note1:'Is this port busy again? 😅',note2:'Keep it modular. 🔧',note3:'The phone looks great, but it does not fit. 😅',
      note4:'Think first, then place it. 💡',note5:'Measure, align, test. ✅',note6:'Where exactly do I paste this command? 🤔',
      note7:'AI can suggest ideas; the final touch is human. ♥',note8:'Patience + Iteration = Magic ✨'
    },
    de:{
      pageKicker:'GRÜNDERGESCHICHTE',pageTitle:'Die Entstehung von EduVerse',pageSubtitle:'Eine Idee, eine Leidenschaft, ein Universum.',
      evoTitle:'EduVerse: Damals bis Heute',evoSubtitle:'Die wachsende Reise einer Idee',
      evo1T:'Der erste Oki',evo1D:'Alles begann mit einem kleinen Hallo.',
      evo2T:'Charaktersuche',evo2D:'Okis Welt nahm langsam Gestalt an.',
      evo3T:'Erste Bildschirme',evo3D:'Erste Oberflächen, erste Schritte, erste Aufregung.',
      evo4T:'Mini-Spiel',evo4D:'Mit jedem Versuch wuchs die Spielwelt.',
      evo5T:'Robot Oki',evo5D:'Die Figur wurde zum heutigen Begleiter.',
      evo6T:'Weltzentrum',evo6D:'EduVerse bekam ein stärkeres gemeinsames Zentrum.',
      notesTitle:'Werkstattnotizen',notesSubtitle:'Hinter den Kulissen',notesTag:'Komisch, nachdenklich, echt.',
      note1:'Ist dieser Port schon wieder belegt? 😅',note2:'Modular lassen. 🔧',note3:'Das Telefon ist schön, passt aber nicht ins Bild. 😅',
      note4:'Erst denken, dann platzieren. 💡',note5:'Messen, ausrichten, testen. ✅',note6:'Wo genau füge ich diesen Befehl ein? 🤔',
      note7:'KI liefert Ideen; der letzte Schliff bleibt menschlich. ♥',note8:'Geduld + Versuche = Magie ✨'
    },
    fr:{
      pageKicker:'HISTOIRE DU FONDATEUR',pageTitle:'La naissance d’EduVerse',pageSubtitle:'Une idée, une passion, un univers.',
      evoTitle:'EduVerse : d’hier à aujourd’hui',evoSubtitle:'Le parcours grandissant d’une idée',
      evo1T:'Premier Oki',evo1D:'Tout a commencé par un petit bonjour.',
      evo2T:'Recherche du personnage',evo2D:'Le monde d’Oki a peu à peu pris forme.',
      evo3T:'Premiers écrans',evo3D:'Premières interfaces, premiers pas, première excitation.',
      evo4T:'Mini-jeu',evo4D:'Le monde du jeu a grandi à force d’essais.',
      evo5T:'Robot Oki',evo5D:'Le personnage est devenu le compagnon actuel.',
      evo6T:'Centre du Monde',evo6D:'EduVerse a trouvé un centre commun plus puissant.',
      notesTitle:'Notes d’atelier',notesSubtitle:'En coulisses',notesTag:'Drôle, réfléchi, réel.',
      note1:'Ce port est encore occupé ? 😅',note2:'Gardons-le modulaire. 🔧',note3:'Le téléphone est beau, mais il ne tient pas à l’écran. 😅',
      note4:'Réfléchis d’abord, place ensuite. 💡',note5:'Mesure, aligne, teste. ✅',note6:'Je colle cette commande où exactement ? 🤔',
      note7:'L’IA propose des idées ; la touche finale reste humaine. ♥',note8:'Patience + Essais = Magie ✨'
    },
    ar:{
      pageKicker:'قصة المؤسس',pageTitle:'ولادة EduVerse',pageSubtitle:'فكرة، شغف، وعالم.',
      evoTitle:'EduVerse من الأمس إلى اليوم',evoSubtitle:'رحلة فكرة تكبر خطوة بعد خطوة',
      evo1T:'أول Oki',evo1D:'بدأ كل شيء بتحية صغيرة.',
      evo2T:'البحث عن الشخصية',evo2D:'بدأ عالم Oki يتشكل ببطء.',
      evo3T:'الشاشات الأولى',evo3D:'واجهات أولى، خطوات أولى، وحماس أول.',
      evo4T:'لعبة مصغرة',evo4D:'كبر عالم اللعب مع كل تجربة.',
      evo5T:'Robot Oki',evo5D:'تحولت الشخصية إلى رفيق اليوم.',
      evo6T:'مركز العالم',evo6D:'حصل EduVerse على مركز مشترك أقوى.',
      notesTitle:'ملاحظات الورشة',notesSubtitle:'خلف الكواليس',notesTag:'مضحك، عميق، وحقيقي.',
      note1:'هل هذا المنفذ مشغول مرة أخرى؟ 😅',note2:'ليظل قابلاً للفك والتركيب. 🔧',note3:'الهاتف جميل لكنه لا يتسع في الشاشة. 😅',
      note4:'فكّر أولاً، ثم ضع العنصر. 💡',note5:'قِس، حاذِ، اختبر. ✅',note6:'أين ألصق هذا الأمر بالضبط؟ 🤔',
      note7:'الذكاء الاصطناعي يقترح أفكاراً؛ اللمسة الأخيرة إنسانية. ♥',note8:'الصبر + التجربة = سحر ✨'
    }
  };

  function lang(){var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';return TEXT[x]?x:'tr';}
  function chapters(){return root?Array.prototype.slice.call(root.querySelectorAll('.founder-story__chapter')):[];}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function maxScroll(){return viewport?Math.max(0,viewport.scrollHeight-viewport.clientHeight):0;}
  function speed(){return (w.innerWidth||1200)<=760?34:38;}

  function ensureChapters(){
    if(!roll)return;
    for(var i=5;i<=6;i++){
      if(root.querySelector('[data-story="chapter'+i+'K"]'))continue;
      var a=d.createElement('article');a.className='founder-story__chapter';
      a.innerHTML='<span data-story="chapter'+i+'K"></span><h3 data-story="chapter'+i+'T"></h3><p data-story="chapter'+i+'D"></p>';
      roll.appendChild(a);
    }
  }

  function ensurePhoneChrome(){
    if(!book||book.querySelector('.story-phone__chrome'))return;

    ['left-top','left-mid','left-low','right'].forEach(function(pos){
      var b=d.createElement('span');b.className='story-phone__button story-phone__button--'+pos;b.setAttribute('aria-hidden','true');book.appendChild(b);
    });

    var chrome=d.createElement('div');chrome.className='story-phone__chrome';
    chrome.innerHTML=''
      +'<div class="story-phone__status"><span data-phone-time>14:30</span><span class="story-phone__island" aria-hidden="true"><i></i></span><span class="story-phone__status-icons"><b></b><i></i><em></em></span></div>'
      +'<div class="story-phone__pill" data-story="phonePill">EduVerse • Kurucu Hikâyesi</div>'
      +'<div class="story-phone__brand">'
      +  '<img src="./hub/assets/oki_answer.jpg" alt="" aria-hidden="true">'
      +  '<div><strong>EduVerse</strong><span data-story="phoneLabel">HİKÂYE AKIŞI</span></div>'
      +'</div>'
      +'<div class="story-phone__progress" aria-hidden="true">'+Array(6).fill(0).map(function(_,i){return '<i data-story-dot="'+i+'"></i>';}).join('')+'</div>';
    viewport.insertBefore(chrome,roll);

    var gesture=d.createElement('div');gesture.className='story-phone__gesture';gesture.setAttribute('aria-hidden','true');viewport.appendChild(gesture);
    dots=Array.prototype.slice.call(chrome.querySelectorAll('[data-story-dot]'));

    var controls=root.querySelector('.founder-story__controls');
    if(controls){controls.classList.add('story-phone__controls');book.appendChild(controls);}
  }


  function sideMarkup(){
    var evo=[1,2,3,4,5,6].map(function(i){
      return '<li class="story-evo__item">'
        +'<div class="story-evo__thumb"><img src="./hub/assets/story_history_'+i+'.webp" alt=""></div>'
        +'<div class="story-evo__rail"><i></i><b>'+String(i).padStart(2,'0')+'</b></div>'
        +'<div class="story-evo__copy"><strong data-side="evo'+i+'T"></strong><span data-side="evo'+i+'D"></span></div>'
        +'</li>';
    }).join('');
    leftSlot.innerHTML='<section class="story-side-panel story-evo" aria-label="EduVerse evolution">'
      +'<header class="story-side-panel__head"><div class="story-side-icon">✦</div><div><h3 data-side="evoTitle"></h3><p data-side="evoSubtitle"></p></div></header>'
      +'<ol class="story-evo__list">'+evo+'</ol></section>';

    rightSlot.innerHTML='<section class="story-side-panel story-notes" aria-label="Workshop notes">'
      +'<header class="story-side-panel__head"><div class="story-side-icon">📝</div><div><h3 data-side="notesTitle"></h3><p data-side="notesSubtitle"></p></div></header>'
      +'<div class="story-notes__tag" data-side="notesTag"></div>'
      +'<div class="story-notes__grid">'
      +'<div class="story-note story-note--purple" data-side="note1"></div>'
      +'<div class="story-note story-note--blue" data-side="note2"></div>'
      +'<div class="story-note story-note--wide story-note--phone" data-side="note3"></div>'
      +'<div class="story-note story-note--purple story-note--wide" data-side="note4"></div>'
      +'<div class="story-note story-note--teal" data-side="note5"></div>'
      +'<div class="story-note story-note--gold" data-side="note6"></div>'
      +'<div class="story-note story-note--deep story-note--wide" data-side="note7"></div>'
      +'<div class="story-sticky" data-side="note8"></div>'
      +'</div></section>';
  }

  function ensureSectionHeader(){
    if(!root)return;
    sectionHeader=root.querySelector('.story-section-header');
    if(sectionHeader)return;
    sectionHeader=d.createElement('header');
    sectionHeader.className='story-section-header';
    sectionHeader.innerHTML='<span data-side="pageKicker"></span><h2 data-side="pageTitle"></h2><p data-side="pageSubtitle"></p>';
    var oldHead=root.querySelector('.founder-story__head');
    if(oldHead) oldHead.insertAdjacentElement('afterend',sectionHeader); else root.insertBefore(sectionHeader,root.firstChild);
  }

  function applySideText(){
    if(!root)return;
    var l=lang(),t=SIDE[l]||SIDE.tr;
    Object.keys(t).forEach(function(k){root.querySelectorAll('[data-side="'+k+'"]').forEach(function(n){n.textContent=t[k];});});
  }


  function ensureFitStage(){
    if(!root||!book)return;
    ensureSectionHeader();
    if(root.querySelector('.story-fit-stage')){
      stage=root.querySelector('.story-fit-stage');
      fitShell=root.querySelector('.story-fit-shell');
      leftSlot=root.querySelector('.story-history-slot--left');
      rightSlot=root.querySelector('.story-history-slot--right');
      if(leftSlot&&!leftSlot.querySelector('.story-side-panel'))sideMarkup();
      return;
    }
    stage=d.createElement('div');stage.className='story-fit-stage';stage.setAttribute('data-story-fit-stage','');
    leftSlot=d.createElement('aside');leftSlot.className='story-history-slot story-history-slot--left';leftSlot.setAttribute('aria-label','EduVerse evolution');
    fitShell=d.createElement('div');fitShell.className='story-fit-shell';
    rightSlot=d.createElement('aside');rightSlot.className='story-history-slot story-history-slot--right';rightSlot.setAttribute('aria-label','Workshop notes');
    var anchor=book.parentNode;
    anchor.insertBefore(stage,book);
    stage.appendChild(leftSlot);stage.appendChild(fitShell);stage.appendChild(rightSlot);
    fitShell.appendChild(book);
    sideMarkup();
  }

  function fitPhoneToViewport(){
    if(!root||!book||!stage||!fitShell)return;
    var vv=w.visualViewport;
    var vhCandidates=[w.innerHeight||0,d.documentElement&&d.documentElement.clientHeight||0,vv&&vv.height||0].filter(function(n){return n>0;});
    var vh=Math.max(520,Math.round(Math.min.apply(Math,vhCandidates)));
    var vwCandidates=[w.innerWidth||0,d.documentElement&&d.documentElement.clientWidth||0,vv&&vv.width||0].filter(function(n){return n>0;});
    var vw=Math.max(320,Math.round(Math.min.apply(Math,vwCandidates)));

    book.style.transform='none';
    fitShell.style.width='auto';fitShell.style.height='auto';

    var naturalW=book.offsetWidth;
    var naturalH=book.offsetHeight;
    if(!naturalW||!naturalH)return;

    var titleH=sectionHeader?Math.ceil(sectionHeader.getBoundingClientRect().height):86;
    var viewportSafe=Math.max(24,Math.min(46,Math.round(vh*.045)));
    var stageH=Math.max(420,Math.min(620,vh-titleH-viewportSafe));
    var safeY=Math.max(8,Math.min(14,Math.round(stageH*.018)));
    var availH=Math.max(390,stageH-(safeY*2)-6);

    var sideReserve=(vw>=1320)?650:(vw>=1120?560:(vw>=990?470:0));
    var gaps=(vw>=1320)?68:(vw>=1120?48:(vw>=990?30:18));
    var availW=Math.max(245,vw-sideReserve-gaps-46);

    fitScale=Math.min(1,availH/naturalH,availW/naturalW);
    fitScale=Math.max(.58,Math.min(1,fitScale));

    var scaledW=Math.round(naturalW*fitScale);
    var scaledH=Math.round(naturalH*fitScale);
    fitShell.style.width=scaledW+'px';
    fitShell.style.height=scaledH+'px';
    book.style.transform='scale('+fitScale.toFixed(4)+')';

    var sideBaseH=620;
    var sideScale=Math.min(1,scaledH/sideBaseH);
    sideScale=Math.max(.76,sideScale);

    root.style.setProperty('--story-fit-stage-h',stageH+'px');
    root.style.setProperty('--story-fit-safe-y',safeY+'px');
    root.style.setProperty('--story-side-h',scaledH+'px');
    root.style.setProperty('--story-side-scale',sideScale.toFixed(4));
    root.style.setProperty('--story-fit-scale',fitScale.toFixed(4));
    root.dataset.phoneFitScale=fitScale.toFixed(4);
    root.dataset.sideFitScale=sideScale.toFixed(4);
    root.dataset.phoneNaturalHeight=String(naturalH);
    root.dataset.phoneScaledHeight=String(scaledH);
    root.dataset.stageHeight=String(stageH);
  }

  function updateTime(){
    var n=root&&root.querySelector('[data-phone-time]');if(!n)return;
    try{n.textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date());}
    catch(e){var x=new Date();n.textContent=String(x.getHours()).padStart(2,'0')+':'+String(x.getMinutes()).padStart(2,'0');}
  }

  function applyText(){
    if(!root)return;
    var l=lang(),t=TEXT[l];stateLang=l;
    Object.keys(t).forEach(function(k){root.querySelectorAll('[data-story="'+k+'"]').forEach(function(n){n.textContent=t[k];});});
    if(toggle){toggle.setAttribute('aria-pressed',playing?'true':'false');var s=toggle.querySelector('[data-story="play"]');if(s)s.textContent=playing?t.pause:t.play;}
    root.dir=(l==='ar')?'rtl':'ltr';
    applySideText();
  }

  function updateFocus(){
    if(!viewport)return;
    var vr=viewport.getBoundingClientRect(),center=vr.top+(vr.height*.62),range=Math.max(110,vr.height*.48),best=null,bestD=Infinity,bestIndex=0;
    chapters().forEach(function(ch,idx){
      var r=ch.getBoundingClientRect(),cc=r.top+(r.height/2),dist=Math.abs(cc-center),focus=clamp(1-(dist/range),0,1);
      ch.style.setProperty('--story-focus',focus.toFixed(3));
      if(dist<bestD){bestD=dist;best=ch;bestIndex=idx;}
    });
    chapters().forEach(function(ch){ch.classList.toggle('is-current',ch===best);});
    dots.forEach(function(dot,i){dot.classList.toggle('is-active',i===bestIndex);});
  }

  function frame(ts){
    if(!playing){raf=0;return;}if(!last)last=ts;
    var dt=Math.min(.05,(ts-last)/1000);last=ts;var max=maxScroll();
    viewport.scrollTop=Math.min(max,viewport.scrollTop+(speed()*dt));updateFocus();
    if(viewport.scrollTop>=max-0.5){playing=false;last=0;applyText();root.classList.remove('is-playing');raf=0;return;}
    raf=w.requestAnimationFrame(frame);
  }
  function setPlaying(on){if(reduced)return;playing=on===true;last=0;applyText();root.classList.toggle('is-playing',playing);if(playing&&!raf)raf=w.requestAnimationFrame(frame);if(!playing&&raf){w.cancelAnimationFrame(raf);raf=0;}}
  function reset(){setPlaying(false);if(viewport)viewport.scrollTop=0;updateFocus();}
  function nudge(delta){if(reduced||!viewport)return;setPlaying(false);viewport.scrollTop=clamp(viewport.scrollTop+delta,0,maxScroll());updateFocus();}

  function init(){
    root=d.getElementById('founderStory');if(!root)return;
    book=root.querySelector('[data-story-book]');viewport=root.querySelector('[data-story-viewport]');roll=root.querySelector('[data-story-roll]');
    toggle=root.querySelector('[data-story-action="toggle"]');rewind=root.querySelector('[data-story-action="rewind"]');if(!book||!viewport||!roll)return;
    reduced=!!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches);
    ensureChapters();ensurePhoneChrome();ensureFitStage();applyText();updateTime();setInterval(updateTime,30000);
    viewport.scrollTop=0;root.classList.add('story-ready');w.requestAnimationFrame(function(){fitPhoneToViewport();viewport.scrollTop=0;updateFocus();});
    if(toggle)toggle.addEventListener('click',function(){setPlaying(!playing);});if(rewind)rewind.addEventListener('click',reset);
    viewport.addEventListener('scroll',updateFocus,{passive:true});
    viewport.addEventListener('wheel',function(e){if(reduced)return;e.preventDefault();nudge(e.deltaY);},{passive:false});
    viewport.addEventListener('keydown',function(e){if(reduced)return;if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();nudge(92);}else if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();nudge(-92);}else if(e.key==='Home'){e.preventDefault();reset();}else if(e.key===' '){e.preventDefault();setPlaying(!playing);}});
    w.addEventListener('resize',function(){fitPhoneToViewport();updateFocus();},{passive:true});if(w.visualViewport)w.visualViewport.addEventListener('resize',function(){fitPhoneToViewport();updateFocus();},{passive:true});
    if(d.body)new MutationObserver(function(){if(lang()!==stateLang){applyText();updateFocus();}}).observe(d.body,{attributes:true,attributeFilter:['data-edu-lang']});
  }

  w.EDUVERSE_STORY={play:function(){setPlaying(true);},pause:function(){setPlaying(false);},rewind:reset,state:function(){return{playing:playing,scrollTop:viewport?Math.round(viewport.scrollTop):0,language:stateLang,reducedMotion:reduced,maxScroll:Math.round(maxScroll()),speedPxPerSecond:speed(),fitScale:fitScale,phoneNaturalHeight:book?book.offsetHeight:0,phoneScaledHeight:fitShell?fitShell.offsetHeight:0};}};
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
