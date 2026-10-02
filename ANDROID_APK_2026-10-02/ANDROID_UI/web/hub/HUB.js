/* EduVerse Store Bridge — multilingual customer-facing layer. */
(() => {
'use strict';
if (window.__EDUVERSE_STORE_BRIDGE_V2__) return;
window.__EDUVERSE_STORE_BRIDGE_V2__ = true;

const root = document.getElementById('eduverseStoreBridge');
if (!root) return;

const T = {
tr:{
  openK:'EDUVERSE',openT:'Bir dünya. Onlarca kapı. Tek merak.',openD:'EduVerse; oyun, keşif, hareket ve öğrenmeyi aynı evrende buluşturur. Çocuklar kendi yolunu keşfederken aileler de güvenli ve anlaşılır bir çerçevede yanında kalır.',f1:'33 oda',f1d:'Farklı ilgi ve beceriler',f2:'5 dil',f2d:'TR · EN · DE · FR · AR',f3:'5 oda ücretsiz',f3d:'Önce dene, sonra karar ver',
  showK:'GERÇEK EDUVERSE',showT:'Nasıl göründüğünü saklamıyoruz.',showD:'Buradaki görüntüler doğrudan EduVerse dünyasından. Oki, oda haritası, karakter, müzik ve hareket alanlarını gerçek ekranlarıyla görün.',sOki:'Oki’ye Sor',sRooms:'33 Oda Dünyası',sChar:'Karakter',sMusic:'Müzik Odası',sGym:'Çaba Odası',altOpen:'EduVerse Oki',altOki:'Oki’ye Sor ekranı',altRooms:'EduVerse oda dünyası',altChar:'EduVerse karakteri',altMusic:'EduVerse Müzik Odası',altGym:'EduVerse Çaba Odası',
  freeK:'ÖNCE ÜCRETSİZ KEŞFET',freeT:'5 oda açık. Kapı burada.',freeD:'Ücretsiz odalarla başlayın. Webde veya Android’de EduVerse dünyasına girin.',r1:'Oki’ye Sor',r2:'Çevre',r3:'Hayvanat',r4:'Boyama',r5:'Bilgi Topları',web:'WEBDE OYNA · 5 ÜCRETSİZ ODA',android:'ANDROID · GOOGLE PLAY',ios:'iOS · APP STORE · YAKINDA',
  famK:'AİLE İÇİN TASARLANDI',famT:'Çocuk keşfeder. Aile yanında kalır.',famD:'Özgür keşif ile aile kontrolü aynı yapıda buluşur.',fam1:'Ebeveyn Kapısı',fam1d:'Satın alma ve hassas işlemlerde aile kontrolü.',fam2:'Aile PDF Raporu',fam2d:'Kullanım özeti aileyle paylaşılabilir.',fam3:'5 Dil',fam3d:'Aynı EduVerse, beş farklı dil.',fam4:'Tek seferlik erişim',fam4d:'Açık ve anlaşılır paket yapısı.',
  priceK:'ERİŞİM SEÇENEKLERİ',priceT:'Basit, net, tek seferlik.',priceD:'Önce ücretsiz başlayın; isterseniz daha sonra erişimi büyütün.',freeC:'ÜCRETSİZ',freePT:'Ücretsiz Başlangıç',freePD:'5 oda hemen açık. Dilek / Dua ve ortak sistemler kullanılabilir.',fiveC:'5 ODA · TEK PAKET',fivePT:'EduVerse 5 Oda Paketi',fivePD:'Bulmaca · Refleks · Teknoloji · Nefes · Sağlık',fullC:'TAM DENEYİM',best:'EN İYİ DEĞER',fullPT:'EduVerse Tam Erişim',fullPD:'Tüm ücretli oda içeriklerini açın ve EduVerse dünyasını bütünüyle keşfedin.',upC:'YÜKSELTME',upPT:'Tam Erişime Geç',upPD:'5 Oda Paketi sahipleri için Tam Erişim yükseltmesi.',once:'tek seferlik',hidden:'Yakında Açılıyor',
  worldK:'DÜNYA AİLESİ',worldT:'Bir aile katılır. Bir ülke daha görünür olur.',worldD:'EduVerse ailesine katılım, Dünya Ligi’nde ülke temsilini büyütür. İyilik Fonu ise ligden ayrı bir sosyal fayda alanı olarak kalır.',node1:'Aile',node2:'Ülke oyu',node3:'Dünya Ligi',leagueBtn:'DÜNYA LİGİNE DÖN',fundBtn:'İYİLİK FONUNU GÖR',
  platK:'HER YERDEN ERİŞİM',platT:'Web bugün. Android bugün. iOS yakında.',platD:'Aynı EduVerse dünyasına uygun cihazdan girin.',
  buyAndroidFree:'ANDROID · Google Play · 5 Ücretsiz Oda',buyAndroid:'ANDROID · Google Play',buyIos:'iOS · App Store · Çok Yakında',webFree:'WEBDE OYNA · 5 ÜCRETSİZ ODA',noteFree:'Webde oynayabilir veya Android uygulamasını Google Play’den indirebilirsiniz. iOS çok yakında.',notePaid:'Satın alma Android uygulamasında Ebeveyn Kapısı ile korunur ve Google Play üzerinden tamamlanır. iOS çok yakında.',toastIos:'iOS sürümü çok yakında.'
},
en:{
  openK:'EDUVERSE',openT:'One world. Dozens of doors. One curiosity.',openD:'EduVerse brings play, discovery, movement and learning into one universe. Children explore their own path while families stay close through a clear and trusted framework.',f1:'33 rooms',f1d:'Different interests and skills',f2:'5 languages',f2d:'TR · EN · DE · FR · AR',f3:'5 rooms free',f3d:'Try first, decide later',
  showK:'REAL EDUVERSE',showT:'We do not hide what it looks like.',showD:'These images come directly from EduVerse. See Oki, the room map, character, music and movement spaces through real product screens.',sOki:'Ask Oki',sRooms:'33-Room World',sChar:'Character',sMusic:'Music Room',sGym:'Effort Room',altOpen:'EduVerse Oki',altOki:'Ask Oki screen',altRooms:'EduVerse room world',altChar:'EduVerse character',altMusic:'EduVerse Music Room',altGym:'EduVerse Effort Room',
  freeK:'EXPLORE FREE FIRST',freeT:'5 rooms are open. Start here.',freeD:'Begin with the free rooms. Enter EduVerse on the web or Android.',r1:'Ask Oki',r2:'Environment',r3:'Animals',r4:'Coloring',r5:'Knowledge Balls',web:'PLAY ON WEB · 5 FREE ROOMS',android:'ANDROID · GOOGLE PLAY',ios:'iOS · APP STORE · SOON',
  famK:'DESIGNED FOR FAMILIES',famT:'Children explore. Families stay close.',famD:'Independent discovery and family control meet in the same experience.',fam1:'Parent Gate',fam1d:'Family control for purchases and sensitive actions.',fam2:'Family PDF Report',fam2d:'A usage summary that can be shared with the family.',fam3:'5 Languages',fam3d:'The same EduVerse in five languages.',fam4:'One-time access',fam4d:'Clear packages without a subscription.',
  priceK:'ACCESS OPTIONS',priceT:'Simple, clear, one-time.',priceD:'Start free and expand access later only if you want to.',freeC:'FREE',freePT:'Free Start',freePD:'5 rooms are open now. Wish / Prayer and shared systems remain available.',fiveC:'5 ROOMS · ONE PACK',fivePT:'EduVerse 5-Room Pack',fivePD:'Puzzle · Reflex · Technology · Breathing · Health',fullC:'FULL EXPERIENCE',best:'BEST VALUE',fullPT:'EduVerse Full Access',fullPD:'Unlock all paid room content and explore the complete EduVerse world.',upC:'UPGRADE',upPT:'Move to Full Access',upPD:'Full Access upgrade for 5-Room Pack owners.',once:'one-time',hidden:'Coming Soon',
  worldK:'WORLD FAMILY',worldT:'One family joins. One country becomes more visible.',worldD:'Joining the EduVerse family grows country representation in the World League. The Goodness Fund remains a separate social-impact area.',node1:'Family',node2:'Country vote',node3:'World League',leagueBtn:'BACK TO WORLD LEAGUE',fundBtn:'VIEW GOODNESS FUND',
  platK:'ACCESS EVERYWHERE',platT:'Web today. Android today. iOS soon.',platD:'Enter the same EduVerse world from the device that fits you.',
  buyAndroidFree:'ANDROID · Google Play · 5 Free Rooms',buyAndroid:'ANDROID · Google Play',buyIos:'iOS · App Store · Coming Soon',webFree:'PLAY ON WEB · 5 FREE ROOMS',noteFree:'Play on the web or download the Android app from Google Play. iOS is coming soon.',notePaid:'Purchases are protected by the Parent Gate in the Android app and completed through Google Play. iOS is coming soon.',toastIos:'The iOS version is coming soon.'
},
de:{
  openK:'EDUVERSE',openT:'Eine Welt. Dutzende Türen. Eine Neugier.',openD:'EduVerse verbindet Spiel, Entdecken, Bewegung und Lernen in einer Welt. Kinder erkunden ihren eigenen Weg, während Familien in einem klaren und sicheren Rahmen an ihrer Seite bleiben.',f1:'33 Räume',f1d:'Verschiedene Interessen und Fähigkeiten',f2:'5 Sprachen',f2d:'TR · EN · DE · FR · AR',f3:'5 Räume kostenlos',f3d:'Erst testen, dann entscheiden',
  showK:'ECHTES EDUVERSE',showT:'Wir zeigen, wie es wirklich aussieht.',showD:'Diese Bilder stammen direkt aus EduVerse. Oki, Raumkarte, Charakter, Musik und Bewegung sehen Sie auf echten Produktbildschirmen.',sOki:'Oki fragen',sRooms:'33-Räume-Welt',sChar:'Charakter',sMusic:'Musikraum',sGym:'Bewegungsraum',altOpen:'EduVerse Oki',altOki:'Oki-fragen-Bildschirm',altRooms:'EduVerse Raumwelt',altChar:'EduVerse Charakter',altMusic:'EduVerse Musikraum',altGym:'EduVerse Bewegungsraum',
  freeK:'ZUERST KOSTENLOS ENTDECKEN',freeT:'5 Räume sind offen. Hier geht es los.',freeD:'Starten Sie mit den kostenlosen Räumen. EduVerse ist im Web und auf Android erreichbar.',r1:'Oki fragen',r2:'Umwelt',r3:'Tiere',r4:'Malen',r5:'Wissensbälle',web:'IM WEB SPIELEN · 5 KOSTENLOSE RÄUME',android:'ANDROID · GOOGLE PLAY',ios:'iOS · APP STORE · BALD',
  famK:'FÜR FAMILIEN ENTWICKELT',famT:'Kinder entdecken. Familien bleiben nah.',famD:'Freies Entdecken und Familienkontrolle gehören zur gleichen Erfahrung.',fam1:'Elternschutz',fam1d:'Familienkontrolle bei Käufen und sensiblen Aktionen.',fam2:'Familien-PDF',fam2d:'Nutzungsübersicht zum Teilen mit der Familie.',fam3:'5 Sprachen',fam3d:'Dasselbe EduVerse in fünf Sprachen.',fam4:'Einmaliger Zugang',fam4d:'Klare Pakete ohne Abo.',
  priceK:'ZUGANGSOPTIONEN',priceT:'Einfach, klar, einmalig.',priceD:'Kostenlos starten und den Zugang später nur bei Bedarf erweitern.',freeC:'KOSTENLOS',freePT:'Kostenloser Start',freePD:'5 Räume sind sofort offen. Wunsch / Gebet und gemeinsame Systeme bleiben verfügbar.',fiveC:'5 RÄUME · EIN PAKET',fivePT:'EduVerse 5-Räume-Paket',fivePD:'Puzzle · Reflex · Technologie · Atmung · Gesundheit',fullC:'VOLLES ERLEBNIS',best:'BESTER WERT',fullPT:'EduVerse Vollzugang',fullPD:'Alle kostenpflichtigen Rauminhalte freischalten und die ganze EduVerse-Welt entdecken.',upC:'UPGRADE',upPT:'Zum Vollzugang',upPD:'Vollzugang-Upgrade für Besitzer des 5-Räume-Pakets.',once:'einmalig',hidden:'Bald verfügbar',
  worldK:'WELTFAMILIE',worldT:'Eine Familie kommt dazu. Ein Land wird sichtbarer.',worldD:'Die Teilnahme an der EduVerse-Familie stärkt die Ländervertretung in der Weltliga. Der Hilfsfonds bleibt ein eigener sozialer Wirkungsbereich.',node1:'Familie',node2:'Länderstimme',node3:'Weltliga',leagueBtn:'ZURÜCK ZUR WELTLIGA',fundBtn:'HILFSFONDS ANSEHEN',
  platK:'ÜBERALL ZUGÄNGLICH',platT:'Web heute. Android heute. iOS bald.',platD:'Öffnen Sie dieselbe EduVerse-Welt auf dem passenden Gerät.',
  buyAndroidFree:'ANDROID · Google Play · 5 kostenlose Räume',buyAndroid:'ANDROID · Google Play',buyIos:'iOS · App Store · Bald',webFree:'IM WEB SPIELEN · 5 KOSTENLOSE RÄUME',noteFree:'Im Web spielen oder die Android-App bei Google Play laden. iOS folgt bald.',notePaid:'Käufe werden in der Android-App durch den Elternschutz geschützt und über Google Play abgeschlossen. iOS folgt bald.',toastIos:'Die iOS-Version folgt bald.'
},
fr:{
  openK:'EDUVERSE',openT:'Un monde. Des dizaines de portes. Une curiosité.',openD:'EduVerse réunit jeu, découverte, mouvement et apprentissage dans un même univers. Les enfants explorent leur propre chemin tandis que les familles restent proches dans un cadre clair et rassurant.',f1:'33 salles',f1d:'Des centres d’intérêt variés',f2:'5 langues',f2d:'TR · EN · DE · FR · AR',f3:'5 salles gratuites',f3d:'Essayer avant de décider',
  showK:'LE VRAI EDUVERSE',showT:'Nous montrons réellement le produit.',showD:'Ces images viennent directement d’EduVerse. Découvrez Oki, la carte des salles, le personnage, la musique et le mouvement sur de vrais écrans.',sOki:'Demander à Oki',sRooms:'Monde de 33 salles',sChar:'Personnage',sMusic:'Salle de musique',sGym:'Salle d’effort',altOpen:'EduVerse Oki',altOki:'Écran Demander à Oki',altRooms:'Univers des salles EduVerse',altChar:'Personnage EduVerse',altMusic:'Salle de musique EduVerse',altGym:'Salle d’effort EduVerse',
  freeK:'D’ABORD DÉCOUVRIR GRATUITEMENT',freeT:'5 salles sont ouvertes. Commencez ici.',freeD:'Commencez avec les salles gratuites. Entrez dans EduVerse sur le Web ou Android.',r1:'Demander à Oki',r2:'Environnement',r3:'Animaux',r4:'Coloriage',r5:'Boules de connaissances',web:'JOUER SUR LE WEB · 5 SALLES GRATUITES',android:'ANDROID · GOOGLE PLAY',ios:'iOS · APP STORE · BIENTÔT',
  famK:'PENSÉ POUR LES FAMILLES',famT:'Les enfants explorent. Les familles restent proches.',famD:'Découverte autonome et contrôle familial dans la même expérience.',fam1:'Contrôle parental',fam1d:'Contrôle familial pour les achats et actions sensibles.',fam2:'Rapport PDF familial',fam2d:'Un résumé d’utilisation partageable avec la famille.',fam3:'5 langues',fam3d:'Le même EduVerse dans cinq langues.',fam4:'Accès en une fois',fam4d:'Des offres claires sans abonnement.',
  priceK:'OPTIONS D’ACCÈS',priceT:'Simple, clair, paiement unique.',priceD:'Commencez gratuitement puis élargissez l’accès seulement si vous le souhaitez.',freeC:'GRATUIT',freePT:'Départ gratuit',freePD:'5 salles sont ouvertes immédiatement. Souhait / Prière et systèmes communs restent disponibles.',fiveC:'5 SALLES · UN PACK',fivePT:'Pack EduVerse 5 salles',fivePD:'Puzzle · Réflexe · Technologie · Respiration · Santé',fullC:'EXPÉRIENCE COMPLÈTE',best:'MEILLEUR CHOIX',fullPT:'Accès complet EduVerse',fullPD:'Débloquez tout le contenu payant et explorez l’univers EduVerse complet.',upC:'MISE À NIVEAU',upPT:'Passer à l’accès complet',upPD:'Mise à niveau pour les détenteurs du pack 5 salles.',once:'paiement unique',hidden:'Bientôt disponible',
  worldK:'FAMILLE MONDIALE',worldT:'Une famille rejoint. Un pays devient plus visible.',worldD:'Rejoindre la famille EduVerse renforce la représentation du pays dans la Ligue mondiale. Le Fonds solidaire reste un espace d’impact social séparé.',node1:'Famille',node2:'Vote du pays',node3:'Ligue mondiale',leagueBtn:'RETOUR À LA LIGUE MONDIALE',fundBtn:'VOIR LE FONDS SOLIDAIRE',
  platK:'ACCÈS PARTOUT',platT:'Web aujourd’hui. Android aujourd’hui. iOS bientôt.',platD:'Entrez dans le même univers EduVerse depuis l’appareil qui vous convient.',
  buyAndroidFree:'ANDROID · Google Play · 5 salles gratuites',buyAndroid:'ANDROID · Google Play',buyIos:'iOS · App Store · Bientôt',webFree:'JOUER SUR LE WEB · 5 SALLES GRATUITES',noteFree:'Jouez sur le Web ou téléchargez l’application Android sur Google Play. iOS arrive bientôt.',notePaid:'Les achats sont protégés par le contrôle parental dans l’application Android et finalisés via Google Play. iOS arrive bientôt.',toastIos:'La version iOS arrive bientôt.'
},
ar:{
  openK:'EDUVERSE',openT:'عالم واحد. أبواب كثيرة. فضول واحد.',openD:'يجمع EduVerse اللعب والاستكشاف والحركة والتعلّم في عالم واحد. يكتشف الأطفال طريقهم بينما تبقى العائلة قريبة ضمن إطار واضح وآمن.',f1:'33 غرفة',f1d:'اهتمامات ومهارات متنوعة',f2:'5 لغات',f2d:'TR · EN · DE · FR · AR',f3:'5 غرف مجانية',f3d:'جرّب أولاً ثم قرر',
  showK:'EDUVERSE الحقيقي',showT:'نُظهر المنتج كما هو.',showD:'هذه الصور مأخوذة مباشرة من EduVerse. شاهد Oki وخريطة الغرف والشخصية والموسيقى والحركة عبر شاشات حقيقية.',sOki:'اسأل Oki',sRooms:'عالم 33 غرفة',sChar:'الشخصية',sMusic:'غرفة الموسيقى',sGym:'غرفة الجهد',altOpen:'Oki من EduVerse',altOki:'شاشة اسأل Oki',altRooms:'عالم غرف EduVerse',altChar:'شخصية EduVerse',altMusic:'غرفة الموسيقى في EduVerse',altGym:'غرفة الجهد في EduVerse',
  freeK:'اكتشف مجانًا أولاً',freeT:'5 غرف مفتوحة. ابدأ من هنا.',freeD:'ابدأ بالغرف المجانية. ادخل إلى EduVerse عبر الويب أو Android.',r1:'اسأل Oki',r2:'البيئة',r3:'الحيوانات',r4:'التلوين',r5:'كرات المعرفة',web:'العب على الويب · 5 غرف مجانية',android:'ANDROID · GOOGLE PLAY',ios:'iOS · APP STORE · قريبًا',
  famK:'مصمم للعائلة',famT:'الأطفال يكتشفون. والعائلة تبقى قريبة.',famD:'الاستكشاف المستقل والتحكم العائلي في تجربة واحدة.',fam1:'بوابة الوالدين',fam1d:'تحكم عائلي في الشراء والإجراءات الحساسة.',fam2:'تقرير PDF للعائلة',fam2d:'ملخص استخدام يمكن مشاركته مع العائلة.',fam3:'5 لغات',fam3d:'نفس EduVerse بخمس لغات.',fam4:'دفع لمرة واحدة',fam4d:'حزم واضحة بلا اشتراك.',
  priceK:'خيارات الوصول',priceT:'بسيط وواضح ولمرة واحدة.',priceD:'ابدأ مجانًا ثم وسّع الوصول لاحقًا إذا أردت.',freeC:'مجاني',freePT:'بداية مجانية',freePD:'5 غرف مفتوحة الآن. تظل الأمنية / الدعاء والأنظمة المشتركة متاحة.',fiveC:'5 غرف · حزمة واحدة',fivePT:'حزمة EduVerse لـ5 غرف',fivePD:'ألغاز · رد فعل · تقنية · تنفس · صحة',fullC:'التجربة الكاملة',best:'أفضل قيمة',fullPT:'الوصول الكامل إلى EduVerse',fullPD:'افتح كل محتوى الغرف المدفوع واستكشف عالم EduVerse بالكامل.',upC:'ترقية',upPT:'الانتقال إلى الوصول الكامل',upPD:'ترقية لأصحاب حزمة 5 غرف.',once:'دفعة واحدة',hidden:'قريبًا',
  worldK:'العائلة العالمية',worldT:'تنضم عائلة. ويصبح بلد أكثر حضورًا.',worldD:'الانضمام إلى عائلة EduVerse يعزز تمثيل البلد في الدوري العالمي. ويبقى صندوق الخير مجالًا اجتماعيًا مستقلًا.',node1:'العائلة',node2:'تصويت البلد',node3:'الدوري العالمي',leagueBtn:'العودة إلى الدوري العالمي',fundBtn:'عرض صندوق الخير',
  platK:'الوصول من كل مكان',platT:'الويب اليوم. Android اليوم. iOS قريبًا.',platD:'ادخل إلى عالم EduVerse نفسه من الجهاز المناسب لك.',
  buyAndroidFree:'ANDROID · Google Play · 5 غرف مجانية',buyAndroid:'ANDROID · Google Play',buyIos:'iOS · App Store · قريبًا',webFree:'العب على الويب · 5 غرف مجانية',noteFree:'العب على الويب أو نزّل تطبيق Android من Google Play. iOS قريبًا.',notePaid:'تتم حماية عمليات الشراء ببوابة الوالدين داخل تطبيق Android وتكتمل عبر Google Play. iOS قريبًا.',toastIos:'إصدار iOS قريبًا.'
}
};

function getLang(){
  const raw=String(document.body?.dataset?.eduLang || window.EDUVERSE_I18N?.lang || document.documentElement.lang || 'tr').toLowerCase();
  return T[raw] ? raw : 'tr';
}
function tx(key){return T[getLang()][key] ?? T.tr[key] ?? '';}
function setStatic(){
  const l=getLang(); root.lang=l; root.dir=l==='ar'?'rtl':'ltr';
  const t=T[l];
  root.querySelectorAll('[data-hub]').forEach(el=>{const key=el.getAttribute('data-hub');const v=t[key];if(v!=null)el.textContent=v;});
  const imgs=root.querySelectorAll('.hub-opening-visual img,.hub-showcase img');
  const alts=[t.altOpen,t.altOki,t.altRooms,t.altChar,t.altMusic,t.altGym];
  imgs.forEach((img,i)=>{if(alts[i])img.setAttribute('alt',alts[i]);});
}
function routeLinks(){
  const cfg=window.EDUVERSE_STORE_LINKS||{};
  const android=String(cfg.android||window.EDUVERSE_PURCHASE_CONFIG?.channels?.android?.url||'');
  const ios=String(cfg.ios||window.EDUVERSE_PURCHASE_CONFIG?.channels?.ios?.url||'');
  let web='./game/index.html?room=okiyesor';
  try{ if(window.EDUVERSE_WEB_ENTRY?.roomUrl) web=window.EDUVERSE_WEB_ENTRY.roomUrl('okiyesor')||web; }catch(e){}
  root.querySelectorAll('[data-hub-link="android"]').forEach(a=>{if(android){a.href=android;a.target='_blank';a.rel='noopener noreferrer';a.classList.remove('is-disabled');}});
  root.querySelectorAll('[data-hub-link="web"]').forEach(a=>{if(web){a.href=web;a.removeAttribute('target');a.removeAttribute('rel');a.classList.remove('is-disabled');}});
  root.querySelectorAll('[data-hub-room]').forEach(a=>{
    const room=a.getAttribute('data-hub-room');
    let url='';
    try{ if(window.EDUVERSE_WEB_ENTRY?.roomUrl) url=window.EDUVERSE_WEB_ENTRY.roomUrl(room)||''; }catch(e){}
    if(!url){url='./game/index.html?room='+encodeURIComponent(room||'okiyesor');}
    a.href=url;a.removeAttribute('target');a.removeAttribute('rel');
  });
  root.querySelectorAll('[data-hub-link="ios"]').forEach(a=>{if(ios){a.href=ios;a.target='_blank';a.rel='noopener noreferrer';a.classList.remove('is-disabled');a.removeAttribute('aria-disabled');}else{a.href='#';a.classList.add('is-disabled');a.setAttribute('aria-disabled','true');}});
}
function localizeGenerated(){
  const l=getLang(), t=T[l];
  root.querySelectorAll('.ev-buy-channel').forEach(a=>{
    const ch=a.getAttribute('data-channel'), plan=a.getAttribute('data-plan');
    if(ch==='android') a.textContent=plan==='free'?t.buyAndroidFree:t.buyAndroid;
    if(ch==='ios') a.textContent=t.buyIos;
  });
  root.querySelectorAll('.ev-web-entry-free').forEach(a=>a.textContent=t.webFree);
  root.querySelectorAll('.ev-buy-note').forEach(n=>{
    const card=n.closest('.price-card'); const plan=card?.querySelector('.price-btn[data-plan]')?.getAttribute('data-plan');
    n.textContent=plan==='free'?t.noteFree:t.notePaid;
  });
}
function syncWorldRow(){
  const hero=document.querySelector('.hero-grid');
  const globe=document.querySelector('.globe-panel');
  const side=document.querySelector('.side-stack');
  if(!hero||!globe||!side)return;
  if(window.matchMedia('(max-width:980px)').matches){side.style.removeProperty('height');side.style.removeProperty('max-height');return;}
  const cs=getComputedStyle(globe);
  let h=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
  [...globe.children].forEach(el=>{
    const s=getComputedStyle(el); if(s.display==='none'||s.position==='absolute')return;
    h+=el.getBoundingClientRect().height+(parseFloat(s.marginTop)||0)+(parseFloat(s.marginBottom)||0);
  });
  h=Math.ceil(h);
  if(h>0){side.style.height=h+'px';side.style.maxHeight=h+'px';}
}
function render(){setStatic();routeLinks();syncWorldRow();setTimeout(()=>{localizeGenerated();syncWorldRow();},0);}

let toastTimer;
window.showToast=function(message){
  const toast=root.querySelector('#hubToast'); if(!toast)return;
  toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800);
};
root.querySelectorAll('[data-hub-link="ios"]').forEach(a=>a.addEventListener('click',e=>{if(a.classList.contains('is-disabled')){e.preventDefault();window.showToast(tx('toastIos'));}}));
root.querySelector('#hubLeague')?.addEventListener('click',()=>document.querySelector('.league-card')?.scrollIntoView({behavior:'smooth',block:'start'}));
root.querySelector('#hubFund')?.addEventListener('click',()=>document.getElementById('goodnessFund')?.scrollIntoView({behavior:'smooth',block:'start'}));

window.addEventListener('resize',()=>requestAnimationFrame(syncWorldRow),{passive:true});
const mo=new MutationObserver(render);mo.observe(document.body,{attributes:true,attributeFilter:['data-edu-lang']});
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0),{once:true}); else setTimeout(render,0);
})();
