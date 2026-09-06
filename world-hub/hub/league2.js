(function(w,d){
'use strict';

var qs=new URLSearchParams(location.search);
var local=(location.hostname==='127.0.0.1'||location.hostname==='localhost');
var wantDemo=(qs.get('league_demo')==='1');
var DATA_URL=(wantDemo&&local)?'./data/league-demo.json':'./data/league-live.json';
var state={data:null,mode:'LIVE',guard:false,timer:0};

var T={
 tr:{real:'GERÇEK AİLE VERİSİ',demo:'DEMO VERİSİ',today:'Bugün',week:'Hafta',month:'Ay',all:'Tüm Zamanlar',family:'aile',countries:'195 ülke',how:'Nasıl hesaplanır?',noLeader:'Henüz lider yok',title:'Dünya Ligi nasıl hesaplanır?',lead:'Dünya Ligi satın alma miktarını değil, doğrulanmış benzersiz aileleri temsil eder.',rules:[
  ['1','Bir aile = bir oy','Doğrulanmış ücretli aile seçtiği ülke için yalnız bir kez sayılır.'],
  ['2','Paket fiyatı oy sayısını değiştirmez','2,99 € paket ve 6,99 € Tam Erişim aynı şekilde bir aile oyu üretir. Upgrade ikinci oy üretmez.'],
  ['3','İade oyunu geri alır','Satın alma iade edilirse önceki oy silinmez; ters kayıtla geri alınır.'],
  ['4','Askıda ayrı davranır','Askıda bırakan kişi ek oy almaz. Hakkı teslim alan yeni aile doğrulanınca kendi ülkesinde bir kez sayılabilir.'],
  ['5','Çocuk verisi kullanılmaz','Ülke yetişkin Family Account seçiminden gelir. Çocuk kimliği veya IP konum takibi lig hesabında kullanılmaz.']
 ],foot:'Demo verisi yalnız localhost üzerinde açıkça DEMO olarak çalışabilir. LIVE modunda doğrulanmış oy yoksa bütün ülkeler 0 aile gösterir.'},
 en:{real:'REAL FAMILY DATA',demo:'DEMO DATA',today:'Today',week:'Week',month:'Month',all:'All Time',family:'families',countries:'195 countries',how:'How is it counted?',noLeader:'No leader yet',title:'How is World League counted?',lead:'World League represents unique verified families, not spending volume.',rules:[
  ['1','One family = one vote','A verified paid family is counted once for its selected country.'],
  ['2','Price does not change the vote','The €2.99 pack and €6.99 Full Access each represent one family vote. Upgrade adds no second vote.'],
  ['3','Refund reverses the vote','A refund creates a reversal record instead of silently deleting history.'],
  ['4','Suspended access is separate','The donor gets no extra vote. A verified recipient family may count once in its own country.'],
  ['5','No child identity data','Country comes from the adult Family Account selection. Child identity and IP geolocation are not used for league counting.']
 ],foot:'Demo data can run only on localhost and must be labeled DEMO. In LIVE mode, if there are no verified votes, every country shows 0 families.'},
 de:{real:'ECHTE FAMILIENDATEN',demo:'DEMO-DATEN',today:'Heute',week:'Woche',month:'Monat',all:'Gesamt',family:'Familien',countries:'195 Länder',how:'Wie wird gezählt?',noLeader:'Noch kein Spitzenreiter',title:'Wie wird die Weltliga berechnet?',lead:'Die Weltliga steht für eindeutig verifizierte Familien, nicht für die Höhe der Ausgaben.',rules:[
  ['1','Eine Familie = eine Stimme','Eine verifizierte zahlende Familie wird für ihr gewähltes Land nur einmal gezählt.'],
  ['2','Der Preis ändert die Stimme nicht','2,99-€-Paket und 6,99-€-Vollzugang ergeben jeweils eine Familienstimme. Ein Upgrade gibt keine zweite Stimme.'],
  ['3','Rückerstattung nimmt die Stimme zurück','Bei einer Erstattung wird eine Gegenbuchung erstellt; die Historie wird nicht still gelöscht.'],
  ['4','Askıda bleibt getrennt','Der Spender erhält keine zusätzliche Stimme. Eine verifizierte Empfängerfamilie kann einmal für ihr Land zählen.'],
  ['5','Keine Kinderdaten','Das Land stammt aus der Auswahl im Erwachsenen-Familienkonto. Kinderidentität und IP-Ortung werden nicht verwendet.']
 ],foot:'Demo-Daten laufen nur auf localhost und müssen als DEMO markiert sein. Im LIVE-Modus zeigen alle Länder 0 Familien, solange keine verifizierten Stimmen existieren.'},
 fr:{real:'DONNÉES FAMILLES RÉELLES',demo:'DONNÉES DÉMO',today:'Aujourd’hui',week:'Semaine',month:'Mois',all:'Toujours',family:'familles',countries:'195 pays',how:'Comment est-ce calculé ?',noLeader:'Aucun leader pour le moment',title:'Comment la Ligue mondiale est-elle calculée ?',lead:'La Ligue mondiale représente des familles vérifiées uniques, pas le montant dépensé.',rules:[
  ['1','Une famille = une voix','Une famille payante vérifiée est comptée une seule fois pour le pays choisi.'],
  ['2','Le prix ne change pas la voix','Le pack à 2,99 € et l’Accès complet à 6,99 € valent chacun une voix famille. L’upgrade ne donne pas une deuxième voix.'],
  ['3','Un remboursement annule la voix','Un remboursement crée une écriture inverse au lieu de supprimer silencieusement l’historique.'],
  ['4','Askıda reste séparé','Le donateur n’obtient pas de voix supplémentaire. Une famille bénéficiaire vérifiée peut compter une fois dans son pays.'],
  ['5','Aucune identité enfant','Le pays vient du choix du compte familial adulte. L’identité de l’enfant et la géolocalisation IP ne sont pas utilisées.']
 ],foot:'Les données démo ne fonctionnent que sur localhost avec le libellé DÉMO. En mode LIVE, sans voix vérifiée, tous les pays affichent 0 famille.'},
 ar:{real:'بيانات أسر حقيقية',demo:'بيانات تجريبية',today:'اليوم',week:'الأسبوع',month:'الشهر',all:'كل الوقت',family:'أسرة',countries:'195 دولة',how:'كيف يتم الحساب؟',noLeader:'لا يوجد متصدر بعد',title:'كيف يتم حساب دوري العالم؟',lead:'يمثل دوري العالم الأسر الموثقة الفريدة وليس حجم الإنفاق.',rules:[
  ['1','أسرة واحدة = صوت واحد','تُحسب الأسرة المدفوعة والموثقة مرة واحدة فقط للدولة التي اختارتها.'],
  ['2','السعر لا يغيّر عدد الأصوات','حزمة 2.99 € والوصول الكامل 6.99 € يمثل كل منهما صوت أسرة واحداً. الترقية لا تضيف صوتاً ثانياً.'],
  ['3','الاسترداد يعكس الصوت','عند الاسترداد يتم إنشاء سجل عكسي بدلاً من حذف التاريخ بصمت.'],
  ['4','Askıda منفصل','لا يحصل المانح على صوت إضافي. الأسرة المستفيدة الموثقة يمكن أن تُحسب مرة واحدة لدولتها.'],
  ['5','لا تُستخدم هوية الطفل','تأتي الدولة من اختيار حساب الأسرة للبالغ. لا تُستخدم هوية الطفل أو تحديد الموقع عبر IP.']
 ],foot:'تعمل بيانات العرض فقط على localhost مع علامة DEMO. في وضع LIVE، إذا لم توجد أصوات موثقة، تعرض كل الدول 0 أسرة.'}
};

function lang(){
 var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';
 x=String(x).toLowerCase().slice(0,2);return T[x]?x:'tr';
}
function unit(n){var t=T[lang()];return String(n)+' '+t.family;}
function periodTotals(x){
 var out={TODAY:0,WEEK:0,MONTH:0,ALL_TIME:0};
 (x.countries||[]).forEach(function(c){
  Object.keys(out).forEach(function(k){out[k]+=Number((c.votes&&c.votes[k])||0);});
 });
 return out;
}
function mapVotes(x,period){
 var m=new Map();
 (x.countries||[]).forEach(function(c){m.set(String(c.code||'').toLowerCase(),Number((c.votes&&c.votes[period])||0));});
 return m;
}
function ensureModal(){
 var m=d.getElementById('league2Modal');if(m)return m;
 m=d.createElement('div');m.id='league2Modal';m.className='league2-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
 m.innerHTML='<div class="league2-dialog"><button type="button" class="league2-close" aria-label="Close">×</button><p class="league2-kicker">EDUVERSE</p><h3></h3><p class="league2-lead"></p><div class="league2-rules"></div><div class="league2-foot"></div></div>';
 d.body.appendChild(m);
 m.addEventListener('click',function(e){if(e.target===m||e.target.closest('.league2-close'))closeModal();});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('is-open'))closeModal();});
 return m;
}
function openModal(){
 var t=T[lang()],m=ensureModal(),r=m.querySelector('.league2-rules');
 m.dir=lang()==='ar'?'rtl':'ltr';m.querySelector('h3').textContent=t.title;m.querySelector('.league2-lead').textContent=t.lead;m.querySelector('.league2-foot').textContent=t.foot;r.innerHTML='';
 t.rules.forEach(function(x){var row=d.createElement('div');row.className='league2-rule';row.innerHTML='<span></span><div><b></b><p></p></div>';row.querySelector('span').textContent=x[0];row.querySelector('b').textContent=x[1];row.querySelector('p').textContent=x[2];r.appendChild(row);});
 m.classList.add('is-open');d.documentElement.style.overflow='hidden';
}
function closeModal(){var m=d.getElementById('league2Modal');if(m)m.classList.remove('is-open');d.documentElement.style.overflow='';}
function ensureBar(card){
 var bar=d.getElementById('league2Bar');if(bar)return bar;
 bar=d.createElement('div');bar.id='league2Bar';bar.className='league2-bar';bar.innerHTML='<i class="league2-dot"></i><span class="league2-label"></span><span class="league2-metric" data-p="TODAY"></span><span class="league2-metric" data-p="WEEK"></span><span class="league2-metric" data-p="MONTH"></span><span class="league2-metric" data-p="ALL_TIME"></span><span class="league2-metric league2-country-count"></span><button type="button" class="league2-how"></button>';
 var head=card.querySelector('.league-head');
 if(head&&head.nextSibling)head.parentNode.insertBefore(bar,head.nextSibling);else card.insertBefore(bar,card.firstChild);
 bar.querySelector('.league2-how').addEventListener('click',openModal);
 return bar;
}
function activePeriod(){
 /* Native period controls are retained; live-zero safety does not depend on them. */
 return 'TODAY';
}
function enforce(){
 if(state.guard||!state.data)return;
 state.guard=true;
 try{
  var card=d.querySelector('.league-card'),list=d.getElementById('leaderboard');if(!card||!list)return;
  var x=state.data,t=T[lang()],mode=String(x.mode||'LIVE'),bar=ensureBar(card),tot=periodTotals(x);
  card.setAttribute('data-league2-ready','1');card.setAttribute('data-league-mode',mode);
  card.setAttribute('data-league-empty',tot.ALL_TIME===0?'1':'0');
  bar.querySelector('.league2-label').textContent=(mode==='DEMO'?t.demo:t.real);
  bar.querySelector('[data-p="TODAY"]').innerHTML=t.today+': <b>'+tot.TODAY+'</b>';
  bar.querySelector('[data-p="WEEK"]').innerHTML=t.week+': <b>'+tot.WEEK+'</b>';
  bar.querySelector('[data-p="MONTH"]').innerHTML=t.month+': <b>'+tot.MONTH+'</b>';
  bar.querySelector('[data-p="ALL_TIME"]').innerHTML=t.all+': <b>'+tot.ALL_TIME+'</b>';
  bar.querySelector('.league2-country-count').textContent=t.countries;
  bar.querySelector('.league2-how').textContent=t.how;

  var votes=mapVotes(x,activePeriod()),items=list.querySelectorAll('li');
  items.forEach(function(li){
    var id=String(li.dataset.countryId||'').toLowerCase(),v=votes.has(id)?votes.get(id):0,ve=li.querySelector('.country-votes');
    if(ve&&ve.textContent!==unit(v))ve.textContent=unit(v);
    if(ve)ve.setAttribute('data-league2-zero',v===0?'1':'0');
  });

  var leaderVotes=d.getElementById('leaderVotes');
  var leaderTitle=d.getElementById('leaderTitle');
  if(tot.ALL_TIME===0){
    if(leaderVotes)leaderVotes.textContent=unit(0);
    if(leaderVotes)leaderVotes.setAttribute('data-league2-zero','1');
    if(leaderTitle)leaderTitle.textContent=t.noLeader;
  }

  var focusMeta=d.getElementById('focusMeta');
  if(focusMeta){
    var selected=list.querySelector('li.is-selected');
    var sid=selected?String(selected.dataset.countryId||'').toLowerCase():'';
    var fv=votes.has(sid)?votes.get(sid):0;
    focusMeta.textContent=unit(fv);focusMeta.setAttribute('data-league2-zero',fv===0?'1':'0');
  }

  var demo1=d.getElementById('demoEventBtn'),demo2=d.getElementById('leaderDemoBtn');
  if(mode==='LIVE'){
    if(demo1)demo1.setAttribute('data-live-hidden','1');
    if(demo2)demo2.setAttribute('data-live-hidden','1');
  }
 } finally {state.guard=false;}
}
function schedule(){clearTimeout(state.timer);state.timer=setTimeout(enforce,25);}
async function load(){
 try{
  var r=await fetch(DATA_URL,{cache:'no-store'});if(!r.ok)throw new Error('http_'+r.status);
  var x=await r.json();
  if(!x||!Array.isArray(x.countries)||x.countries.length!==195)throw new Error('invalid_country_count');
  if(x.mode==='DEMO'&&!local)throw new Error('demo_not_local');
  state.data=x;state.mode=x.mode;enforce();
 }catch(e){
  /* fail closed: LIVE with no verified votes */
  state.data={mode:'LIVE',countries:[],countryUniverse:{count:195},periods:['TODAY','WEEK','MONTH','ALL_TIME']};
  enforce();
 }
}
function boot(){
 ensureModal();load();
 var root=d.querySelector('.league-card');
 if(root)new MutationObserver(schedule).observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','data-country-id']});
 d.addEventListener('click',function(){setTimeout(schedule,0);setTimeout(schedule,80);},true);
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'){schedule();break;}}}).observe(d.documentElement,{attributes:true,subtree:true,attributeFilter:['data-edu-lang','lang']});
w.EDUVERSE_LEAGUE2={enforce:enforce,how:openModal,mode:function(){return state.mode;},data:function(){return state.data;},version:'1.0'};
})(window,document);