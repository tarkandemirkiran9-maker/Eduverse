(function(w,d){
'use strict';

var DATA_URL='./data/goodness.json';
var state={data:null};

var T={
 tr:{
  kicker:'GERÇEK VERİ',title:'İyilik, ancak doğrulanırsa görünür.',copy:'Fon alanı yalnız gerçek ve doğrulanmış veriyi gösterir.',
  noData:'Henüz doğrulanmış veri yok',balance:'Fon Bakiyesi',period:'Bu Dönem Ayrılan',projects:'Tamamlanan Projeler',proof:'Şeffaflık',
  zeroNote:'Gerçek veri bekleniyor',proofNote:'Kanıtlı kayıtlar',projectsBtn:'PROJELERİ GÖR',ledgerBtn:'ŞEFFAFLIK DEFTERİ',
  rule:'Fon oranı henüz belirlenmedi.',projectsTitle:'Doğrulanmış Projeler',projectsLead:'Yalnız doğrulanmış proje ve kurum kayıtları burada görünür.',
  ledgerTitle:'Şeffaflık Defteri',ledgerLead:'Gelen, ayrılan, ödenen ve kalan tutarlar doğrulanmış kayıtlarla gösterilir.',
  emptyProject:'Henüz doğrulanmış proje yok.',emptyProject2:'Proje eklenene kadar örnek veya uydurma proje gösterilmeyecek.',
  emptyLedger:'Henüz doğrulanmış finansal hareket yok.',emptyLedger2:'Gerçek hareket oluşana kadar defter 0 ve boş kalır.',
  calc:'Hesaplama kuralı',calcUnset:'Henüz belirlenmedi · Owner/finans gate',periodLabel:'Dönem',periodUnset:'Henüz belirlenmedi',
  vote:'Topluluk oyu',voteSeparate:'Dünya Ligi’nden tamamen ayrı',evidence:'Kanıt modeli',evidenceReady:'Makbuz / fatura / kurum teyidi / tamamlanma kanıtı hazır',
  foot:'Çocuk kimliği, banka verisi veya hassas kişisel bilgi kamuya açılmaz. Sahte tutar ve sahte proje kullanılmaz.'
 },
 en:{
  kicker:'VERIFIED DATA',title:'Goodness appears only when it is verified.',copy:'The fund area shows only real and verified data.',
  noData:'No verified data yet',balance:'Fund Balance',period:'Allocated This Period',projects:'Completed Projects',proof:'Transparency',
  zeroNote:'Waiting for real data',proofNote:'Verified records',projectsBtn:'VIEW PROJECTS',ledgerBtn:'TRANSPARENCY LEDGER',
  rule:'The fund allocation rule has not been set yet.',projectsTitle:'Verified Projects',projectsLead:'Only verified project and institution records appear here.',
  ledgerTitle:'Transparency Ledger',ledgerLead:'Incoming, allocated, paid and remaining amounts are shown from verified records.',
  emptyProject:'No verified project yet.',emptyProject2:'No sample or invented project will be shown before a real project exists.',
  emptyLedger:'No verified financial movement yet.',emptyLedger2:'The ledger remains zero and empty until a real movement exists.',
  calc:'Calculation rule',calcUnset:'Not set yet · Owner/finance gate',periodLabel:'Period',periodUnset:'Not set yet',
  vote:'Community vote',voteSeparate:'Completely separate from World League',evidence:'Evidence model',evidenceReady:'Receipt / invoice / institution confirmation / completion proof ready',
  foot:'Child identity, bank data and sensitive personal information are not published. No fake amount or fake project is used.'
 },
 de:{
  kicker:'VERIFIZIERTE DATEN',title:'Gutes wird nur sichtbar, wenn es verifiziert ist.',copy:'Der Fonds zeigt ausschließlich echte und verifizierte Daten.',
  noData:'Noch keine verifizierten Daten',balance:'Fondsbestand',period:'In diesem Zeitraum zugewiesen',projects:'Abgeschlossene Projekte',proof:'Transparenz',
  zeroNote:'Echte Daten ausstehend',proofNote:'Verifizierte Einträge',projectsBtn:'PROJEKTE ANZEIGEN',ledgerBtn:'TRANSPARENZ-REGISTER',
  rule:'Die Fondsregel ist noch nicht festgelegt.',projectsTitle:'Verifizierte Projekte',projectsLead:'Nur verifizierte Projekt- und Institutionsdaten werden hier angezeigt.',
  ledgerTitle:'Transparenz-Register',ledgerLead:'Eingang, Zuweisung, Zahlung und Restbetrag werden aus verifizierten Einträgen gezeigt.',
  emptyProject:'Noch kein verifiziertes Projekt.',emptyProject2:'Bis ein echtes Projekt existiert, werden keine Beispielprojekte angezeigt.',
  emptyLedger:'Noch keine verifizierte Finanzbewegung.',emptyLedger2:'Das Register bleibt bei 0 und leer, bis echte Bewegungen vorliegen.',
  calc:'Berechnungsregel',calcUnset:'Noch nicht festgelegt · Owner/Finanz-Gate',periodLabel:'Zeitraum',periodUnset:'Noch nicht festgelegt',
  vote:'Community-Abstimmung',voteSeparate:'Vollständig getrennt von der Weltliga',evidence:'Nachweismodell',evidenceReady:'Beleg / Rechnung / Institutionsbestätigung / Abschlussnachweis vorbereitet',
  foot:'Kinderidentität, Bankdaten und sensible persönliche Informationen werden nicht veröffentlicht. Keine erfundenen Beträge oder Projekte.'
 },
 fr:{
  kicker:'DONNÉES VÉRIFIÉES',title:'La solidarité n’apparaît que lorsqu’elle est vérifiée.',copy:'Le fonds affiche uniquement des données réelles et vérifiées.',
  noData:'Aucune donnée vérifiée pour le moment',balance:'Solde du Fonds',period:'Alloué sur cette période',projects:'Projets terminés',proof:'Transparence',
  zeroNote:'En attente de données réelles',proofNote:'Registres vérifiés',projectsBtn:'VOIR LES PROJETS',ledgerBtn:'REGISTRE DE TRANSPARENCE',
  rule:'La règle d’affectation du fonds n’est pas encore définie.',projectsTitle:'Projets vérifiés',projectsLead:'Seuls les projets et organismes vérifiés apparaissent ici.',
  ledgerTitle:'Registre de transparence',ledgerLead:'Entrées, affectations, paiements et solde sont affichés à partir de données vérifiées.',
  emptyProject:'Aucun projet vérifié pour le moment.',emptyProject2:'Aucun projet fictif ou d’exemple ne sera affiché avant un vrai projet.',
  emptyLedger:'Aucun mouvement financier vérifié.',emptyLedger2:'Le registre reste à 0 et vide jusqu’à un mouvement réel.',
  calc:'Règle de calcul',calcUnset:'Non définie · Validation propriétaire/finance',periodLabel:'Période',periodUnset:'Non définie',
  vote:'Vote communautaire',voteSeparate:'Totalement séparé de la Ligue mondiale',evidence:'Modèle de preuve',evidenceReady:'Reçu / facture / confirmation d’organisme / preuve d’achèvement prêts',
  foot:'L’identité des enfants, les données bancaires et les informations personnelles sensibles ne sont pas publiées. Aucun montant ou projet fictif.'
 },
 ar:{
  kicker:'بيانات موثقة',title:'لا يظهر أثر الخير إلا عندما يكون موثقاً.',copy:'يعرض الصندوق البيانات الحقيقية والموثقة فقط.',
  noData:'لا توجد بيانات موثقة بعد',balance:'رصيد الصندوق',period:'المخصص لهذه الفترة',projects:'المشاريع المكتملة',proof:'الشفافية',
  zeroNote:'بانتظار بيانات حقيقية',proofNote:'سجلات موثقة',projectsBtn:'عرض المشاريع',ledgerBtn:'سجل الشفافية',
  rule:'لم يتم تحديد قاعدة تخصيص الصندوق بعد.',projectsTitle:'المشاريع الموثقة',projectsLead:'تظهر هنا فقط بيانات المشاريع والمؤسسات الموثقة.',
  ledgerTitle:'سجل الشفافية',ledgerLead:'تظهر المبالغ الواردة والمخصصة والمدفوعة والمتبقية من سجلات موثقة.',
  emptyProject:'لا يوجد مشروع موثق بعد.',emptyProject2:'لن يتم عرض مشروع تجريبي أو وهمي قبل وجود مشروع حقيقي.',
  emptyLedger:'لا توجد حركة مالية موثقة بعد.',emptyLedger2:'يبقى السجل صفراً وفارغاً حتى توجد حركة حقيقية.',
  calc:'قاعدة الحساب',calcUnset:'لم تُحدد بعد · موافقة المالك/المالية',periodLabel:'الفترة',periodUnset:'لم تُحدد بعد',
  vote:'تصويت المجتمع',voteSeparate:'منفصل تماماً عن دوري العالم',evidence:'نموذج الإثبات',evidenceReady:'إيصال / فاتورة / تأكيد مؤسسة / إثبات إنجاز جاهز',
  foot:'لا يتم نشر هوية الطفل أو البيانات البنكية أو المعلومات الشخصية الحساسة. لا مبالغ أو مشاريع وهمية.'
 }
};

function lang(){
 var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';
 x=String(x).toLowerCase().slice(0,2);
 return T[x]?x:'tr';
}
function money(v,c){
 var n=Number(v||0);
 try{return new Intl.NumberFormat(lang()==='tr'?'tr-TR':lang()==='de'?'de-DE':lang()==='fr'?'fr-FR':lang()==='ar'?'ar':'en-US',{style:'currency',currency:c||'EUR',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);}
 catch(e){return n.toFixed(2)+' €';}
}
function safeData(x){
 return x&&x.summary&&Array.isArray(x.projects)&&Array.isArray(x.ledger)&&x.votes&&Array.isArray(x.evidence);
}
function ensureModal(){
 var m=d.getElementById('fund2Modal');
 if(m)return m;
 m=d.createElement('div');m.id='fund2Modal';m.className='fund2-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
 m.innerHTML='<div class="fund2-dialog"><button type="button" class="fund2-close" aria-label="Close">×</button><p class="fund2-dialog__kicker">EDUVERSE</p><h3></h3><p class="fund2-dialog__lead"></p><div class="fund2-dialog__body"></div><div class="fund2-dialog__foot"></div></div>';
 d.body.appendChild(m);
 m.addEventListener('click',function(e){if(e.target===m||e.target.closest('.fund2-close'))closeModal();});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('is-open'))closeModal();});
 return m;
}
function closeModal(){var m=d.getElementById('fund2Modal');if(m)m.classList.remove('is-open');d.documentElement.style.overflow='';}
function emptyBlock(a,b){return '<div class="fund2-empty"><strong>'+a+'</strong><span>'+b+'</span></div>';}
function openProjects(){
 var t=T[lang()],m=ensureModal(),x=state.data,body=m.querySelector('.fund2-dialog__body');
 m.dir=lang()==='ar'?'rtl':'ltr';m.querySelector('h3').textContent=t.projectsTitle;m.querySelector('.fund2-dialog__lead').textContent=t.projectsLead;
 if(!x||!x.projects.length){body.innerHTML=emptyBlock(t.emptyProject,t.emptyProject2);}
 else{
  body.innerHTML='<div class="fund2-ledger">'+x.projects.map(function(p){return '<div class="fund2-ledger-row"><span>'+String(p.countryCode||'')+'</span><b>'+String(p.title||'')+'</b></div>';}).join('')+'</div>';
 }
 m.querySelector('.fund2-dialog__foot').textContent=t.foot;m.classList.add('is-open');d.documentElement.style.overflow='hidden';
}
function openLedger(){
 var t=T[lang()],m=ensureModal(),x=state.data,body=m.querySelector('.fund2-dialog__body');
 m.dir=lang()==='ar'?'rtl':'ltr';m.querySelector('h3').textContent=t.ledgerTitle;m.querySelector('.fund2-dialog__lead').textContent=t.ledgerLead;
 var rows='<div class="fund2-ledger">'+
  '<div class="fund2-ledger-row"><span>'+t.calc+'</span><b>'+t.calcUnset+'</b></div>'+
  '<div class="fund2-ledger-row"><span>'+t.periodLabel+'</span><b>'+t.periodUnset+'</b></div>'+
  '<div class="fund2-ledger-row"><span>'+t.vote+'</span><b>'+t.voteSeparate+'</b></div>'+
  '<div class="fund2-ledger-row"><span>'+t.evidence+'</span><b>'+t.evidenceReady+'</b></div>'+
  '</div>';
 body.innerHTML=rows+((!x||!x.ledger.length)?emptyBlock(t.emptyLedger,t.emptyLedger2):'');
 m.querySelector('.fund2-dialog__foot').textContent=t.foot;m.classList.add('is-open');d.documentElement.style.overflow='hidden';
}
function hideLegacy(root,panel){
 Array.prototype.forEach.call(root.children,function(ch){
  if(ch===panel)return;
  if(ch.id==='goodnessFundTitle'||(ch.querySelector&&ch.querySelector('#goodnessFundTitle')))return;
  ch.classList.add('fund2-legacy-block-hidden');
 });
}
function render(){
 var root=d.getElementById('goodnessFund');if(!root||!state.data)return false;
 var t=T[lang()],x=state.data,panel=d.getElementById('fund2Panel');
 if(!panel){
  panel=d.createElement('div');panel.id='fund2Panel';panel.className='fund2-panel';
  panel.setAttribute('data-vitrin-module','goodness');
  panel.innerHTML='<div class="fund2-head"><div><p class="fund2-kicker"></p><h3 class="fund2-title"></h3><p class="fund2-copy"></p></div><span class="fund2-state"></span></div><div class="fund2-stats"><div class="fund2-stat"><span data-k="balance"></span><strong data-v="balance"></strong><small data-n="balance"></small></div><div class="fund2-stat"><span data-k="period"></span><strong data-v="period"></strong><small data-n="period"></small></div><div class="fund2-stat"><span data-k="projects"></span><strong data-v="projects"></strong><small data-n="projects"></small></div><div class="fund2-stat"><span data-k="proof"></span><strong data-v="proof">—</strong><small data-n="proof"></small></div></div><div class="fund2-actions"><button type="button" class="fund2-btn fund2-projects"></button><button type="button" class="fund2-btn fund2-btn--gold fund2-ledger-btn"></button><span class="fund2-rule"></span></div>';
  root.appendChild(panel);
  panel.querySelector('.fund2-projects').addEventListener('click',openProjects);
  panel.querySelector('.fund2-ledger-btn').addEventListener('click',openLedger);
  hideLegacy(root,panel);
 }
 root.setAttribute('data-fund2','1');
 root.setAttribute('data-fund2-ready','1');
 root.setAttribute('data-public-state',String(x.publicState||''));
 panel.dir=lang()==='ar'?'rtl':'ltr';
 panel.querySelector('.fund2-kicker').textContent=t.kicker;
 panel.querySelector('.fund2-title').textContent=t.title;
 panel.querySelector('.fund2-copy').textContent=t.copy;
 panel.querySelector('.fund2-state').textContent=t.noData;
 panel.querySelector('[data-k="balance"]').textContent=t.balance;
 panel.querySelector('[data-v="balance"]').textContent=money(x.summary.balance,x.currency);
 panel.querySelector('[data-n="balance"]').textContent=t.zeroNote;
 panel.querySelector('[data-k="period"]').textContent=t.period;
 panel.querySelector('[data-v="period"]').textContent=money(x.summary.allocatedThisPeriod,x.currency);
 panel.querySelector('[data-n="period"]').textContent=t.zeroNote;
 panel.querySelector('[data-k="projects"]').textContent=t.projects;
 panel.querySelector('[data-v="projects"]').textContent=String(x.summary.completedProjects||0);
 panel.querySelector('[data-n="projects"]').textContent=t.zeroNote;
 panel.querySelector('[data-k="proof"]').textContent=t.proof;
 panel.querySelector('[data-v="proof"]').textContent=x.evidence.length?String(x.evidence.length):'0';
 panel.querySelector('[data-n="proof"]').textContent=t.proofNote;
 panel.querySelector('.fund2-projects').textContent=t.projectsBtn;
 panel.querySelector('.fund2-ledger-btn').textContent=t.ledgerBtn;
 panel.querySelector('.fund2-rule').textContent=t.rule;
 return true;
}
async function load(){
 try{
  var r=await fetch(DATA_URL,{cache:'no-store'});
  if(!r.ok)throw new Error('http_'+r.status);
  var x=await r.json();
  if(!safeData(x))throw new Error('invalid_data');
  state.data=x;render();
 }catch(e){
  state.data={currency:'EUR',publicState:'NO_VERIFIED_DATA',summary:{balance:0,allocatedThisPeriod:0,paidTotal:0,completedProjects:0},projects:[],ledger:[],votes:{separateFromWorldLeague:true},evidence:[]};
  render();
 }
}
function boot(){ensureModal();load();}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'){render();break;}}}).observe(d.documentElement,{attributes:true,subtree:true,attributeFilter:['data-edu-lang','lang']});
w.EDUVERSE_GOODNESS2={render:render,projects:openProjects,ledger:openLedger,data:function(){return state.data;},version:'1.0'};
})(window,document);