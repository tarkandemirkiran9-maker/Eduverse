(function(w,d){
  'use strict';

  var root=null,left=null,right=null,lastLang='';

  var DATA={
    tr:{
      photos:[
        ['İlk Oki','Karakterin ilk dönemlerinden biri.'],
        ['Karakter Arayışı','Farklı karakter ve dünya denemeleri.'],
        ['İlk Ekranlar','Oda ve arayüzün erken dönemi.'],
        ['Mini Oyunlar','Oyun tarafının büyümeye başladığı dönem.'],
        ['Robot Oki','Bugünkü robot diline geçiş.'],
        ['Dünya Merkezi','EduVerse’in ortak dünya merkezine uzanan dönem.']
      ],
      notes:[
        '“Bunu nereye yapıştıracağım?”',
        '“Bir şey çalışmadı.”',
        '“Telefon süper.”',
        '“Aynı şeyi tekrar yamalama.”',
        '“Sök-tak olsun.”',
        '“Telefon güzel ama tamamı görünmüyor.”',
        '“Bir dakika, ben yanlış yere mi koydum?”',
        '“Bunu bozma; burası güzel oldu.”',
        '“Bu sefer oldu.”',
        '“Telefon muhteşem.”',
        '“Önce bir kopyasını al.”',
        '“Güzel, hepsi oturmuş.”',
        '“Hayır, yine aynı şeyi yaptın.”',
        '“Telefonu bozma.”'
      ]
    },
    en:{
      photos:[
        ['First Oki','One of the earliest character periods.'],
        ['Character Search','Different character and world experiments.'],
        ['First Screens','The early room and interface period.'],
        ['Mini Games','When the game side began to expand.'],
        ['Robot Oki','The transition toward today’s robot language.'],
        ['World Hub','The period that led to EduVerse’s shared world center.']
      ],
      notes:[
        '“Where do I paste this?”','“Something did not work.”','“The phone is great.”','“Do not patch the same thing again.”','“Make it plug-and-play.”','“The phone looks good, but not all of it is visible.”','“Wait, did I put this in the wrong place?”','“Do not break this; this part is good.”','“This time it worked.”','“The phone is magnificent.”','“Take a copy first.”','“Good, everything fits now.”','“No, you did the same thing again.”','“Do not change the phone.”'
      ]
    },
    de:{
      photos:[
        ['Erster Oki','Eine der frühesten Phasen der Figur.'],['Charaktersuche','Verschiedene Charakter- und Weltversuche.'],['Erste Bildschirme','Die frühe Phase von Räumen und Oberfläche.'],['Mini-Spiele','Als der Spielbereich zu wachsen begann.'],['Robot Oki','Der Übergang zur heutigen Robotersprache.'],['Weltzentrum','Der Weg zum gemeinsamen EduVerse-Weltzentrum.']
      ],
      notes:[
        '„Wo füge ich das ein?“','„Etwas hat nicht funktioniert.“','„Das Telefon ist super.“','„Nicht wieder dasselbe flicken.“','„Es soll modular ein- und ausbaubar sein.“','„Das Telefon ist gut, aber nicht vollständig sichtbar.“','„Moment, habe ich das an die falsche Stelle gesetzt?“','„Das nicht kaputtmachen; dieser Teil ist gut.“','„Diesmal hat es funktioniert.“','„Das Telefon ist großartig.“','„Zuerst eine Kopie machen.“','„Gut, jetzt sitzt alles.“','„Nein, du hast wieder dasselbe gemacht.“','„Das Telefon nicht verändern.“'
      ]
    },
    fr:{
      photos:[
        ['Premier Oki','Une des premières périodes du personnage.'],['Recherche du personnage','Différents essais de personnages et d’univers.'],['Premiers écrans','La première période des pièces et de l’interface.'],['Mini-jeux','Quand la partie jeu a commencé à grandir.'],['Robot Oki','Le passage vers le langage robotique actuel.'],['Centre du monde','Le chemin vers le centre mondial commun d’EduVerse.']
      ],
      notes:[
        '« Où est-ce que je colle ça ? »','« Quelque chose n’a pas fonctionné. »','« Le téléphone est super. »','« Ne corrige pas encore la même chose. »','« Il faut que ce soit modulaire. »','« Le téléphone est beau, mais on ne le voit pas en entier. »','« Attends, est-ce que je l’ai mis au mauvais endroit ? »','« Ne casse pas ça ; cette partie est bien. »','« Cette fois, ça a marché. »','« Le téléphone est magnifique. »','« Fais d’abord une copie. »','« Bien, maintenant tout est en place. »','« Non, tu as encore fait la même chose. »','« Ne touche pas au téléphone. »'
      ]
    },
    ar:{
      photos:[
        ['أول Oki','إحدى المراحل الأولى للشخصية.'],['البحث عن الشخصية','تجارب مختلفة للشخصيات والعالم.'],['الشاشات الأولى','المرحلة المبكرة للغرف والواجهة.'],['الألعاب المصغرة','عندما بدأ جانب الألعاب بالتوسع.'],['Robot Oki','الانتقال إلى لغة الروبوت الحالية.'],['مركز العالم','الطريق إلى مركز EduVerse العالمي المشترك.']
      ],
      notes:[
        '«أين ألصق هذا؟»','«شيء ما لم يعمل.»','«الهاتف رائع.»','«لا تكرر نفس التصحيح مرة أخرى.»','«اجعله قابلاً للفك والتركيب.»','«الهاتف جميل، لكن لا يظهر بالكامل.»','«لحظة، هل وضعته في المكان الخطأ؟»','«لا تفسد هذا؛ هذا الجزء جيد.»','«هذه المرة نجح.»','«الهاتف مذهل.»','«خذ نسخة أولاً.»','«جميل، الآن كل شيء في مكانه.»','«لا، لقد فعلت الشيء نفسه مرة أخرى.»','«لا تغيّر الهاتف.»'
      ]
    }
  };

  function lang(){
    var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';
    return DATA[x]?x:'tr';
  }

  function esc(s){
    return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }

  function photo(i,p,cls){
    return '<figure class="k6r5-card k6r5-photo '+cls+'">'
      +'<span class="k6r5-tape" aria-hidden="true"></span>'
      +'<img src="./hub/assets/story_history_'+i+'.webp" alt="">'
      +'<figcaption><strong>'+esc(p[0])+'</strong><span>'+esc(p[1])+'</span></figcaption>'
      +'</figure>';
  }
  function paper(s,cls){return '<blockquote class="k6r5-card k6r5-paper '+cls+'">'+esc(s)+'</blockquote>';}
  function chat(s,cls){return '<div class="k6r5-card k6r5-chat '+cls+'">'+esc(s)+'</div>';}
  function memo(s,cls){return '<div class="k6r5-card k6r5-memo '+cls+'"><small>NOT</small><span>'+esc(s)+'</span></div>';}
  function ticket(s,cls){return '<div class="k6r5-card k6r5-ticket '+cls+'"><small>READ_ONLY</small><b>PHONE_LOCK=PASS</b><span>'+esc(s)+'</span></div>';}
  function code(cls){return '<pre class="k6r5-card k6r5-code '+cls+'"><code>const source = "W5_K6P";\nconst phoneLocked = true;\nconst bigPanels = false;\nconst archive = "clippings";\nif (phoneLocked) renderArchive();\n// telefon merkezi korunur</code></pre>';}
  function tarkan(cls){return '<pre class="k6r5-card k6r5-terminal '+cls+'"><code>===== TARKAN_BASLANGIC =====\nISLEM=KURUCU_HIKAYESI\nSOURCE=W5_K6P\nRESULT=FAILED\nTEKRAR_DENE=1\nRESULT=PASSED\n===== TARKAN_BITIS =====</code></pre>';}
  function status(cls){return '<pre class="k6r5-card k6r5-status '+cls+'"><code>K6J = DOGRU_YON\nK6K = PASS / KILIT\nK6P = EN_IYI_REFERANS\nK6Q = RED\nK6R = ARSIV_HEDEFI</code></pre>';}

  function render(){
    if(!root||!left||!right)return;
    var l=lang(),x=DATA[l]||DATA.tr,p=x.photos,n=x.notes;
    lastLang=l;

    left.innerHTML='<div class="k6r5-cloud k6r5-cloud--left">'
      +photo(1,p[0],'k6r5-a1')
      +paper(n[0],'k6r5-a2')
      +memo(n[1],'k6r5-a3')
      +photo(3,p[2],'k6r5-a4')
      +ticket(n[2],'k6r5-a5')
      +code('k6r5-a6')
      +photo(5,p[4],'k6r5-a7')
      +chat(n[7],'k6r5-a8')
      +paper(n[8],'k6r5-a9')
      +memo(n[11],'k6r5-a10')
      +'</div>';

    right.innerHTML='<div class="k6r5-cloud k6r5-cloud--right">'
      +photo(2,p[1],'k6r5-b1')
      +paper(n[3],'k6r5-b2')
      +chat(n[4],'k6r5-b3')
      +photo(4,p[3],'k6r5-b4')
      +status('k6r5-b5')
      +tarkan('k6r5-b6')
      +photo(6,p[5],'k6r5-b7')
      +memo(n[5],'k6r5-b8')
      +paper(n[10],'k6r5-b9')
      +chat(n[13],'k6r5-b10')
      +'</div>';
  }

  function mount(){
    root=d.getElementById('founderStory');
    if(!root)return false;
    left=root.querySelector('.story-history-slot--left');
    right=root.querySelector('.story-history-slot--right');
    if(!left||!right)return false;
    root.classList.add('k6r5-archive');
    left.setAttribute('aria-label','EduVerse archive');
    right.setAttribute('aria-label','EduVerse archive');
    render();
    return true;
  }

  function init(){
    var tries=0;
    function go(){
      tries++;
      if(mount())return;
      if(tries<40)w.setTimeout(go,50);
    }
    go();
    if(d.body)new MutationObserver(function(){
      var l=lang();
      if(root&&l!==lastLang)render();
    }).observe(d.body,{attributes:true,attributeFilter:['data-edu-lang']});
  }

  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
