(function(w,d){
'use strict';
var state={period:'TODAY',busy:false,timer:0};

var U={
 tr:{family:'aile',none:'Henüz lider yok'},
 en:{family:'families',none:'No leader yet'},
 de:{family:'Familien',none:'Noch kein Spitzenreiter'},
 fr:{family:'familles',none:'Aucun leader pour le moment'},
 ar:{family:'أسرة',none:'لا يوجد متصدر بعد'}
};
function lang(){
 var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';
 x=String(x).toLowerCase().slice(0,2);return U[x]?x:'tr';
}
function unit(n){return String(Number(n||0))+' '+U[lang()].family;}
function norm(s){
 return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
}
function detectPeriod(text){
 var s=norm(text);
 if(/tüm zamanlar|tum zamanlar|all time|gesamt|toujours|كل الوقت/.test(s))return 'ALL_TIME';
 if(/bu hafta|hafta|week|woche|semaine|الأسبوع/.test(s))return 'WEEK';
 if(/bu ay|\bay\b|month|monat|mois|الشهر/.test(s))return 'MONTH';
 if(/bugün|bugun|today|heute|aujourd|اليوم/.test(s))return 'TODAY';
 return null;
}
function data(){
 try{return w.EDUVERSE_LEAGUE2&&w.EDUVERSE_LEAGUE2.data?w.EDUVERSE_LEAGUE2.data():null;}catch(e){return null;}
}
function votesMap(x){
 var m=new Map();
 (x.countries||[]).forEach(function(c){
  m.set(String(c.code||'').toLowerCase(),Number(c.votes&&c.votes[state.period]||0));
 });
 return m;
}
function apply(){
 if(state.busy)return;
 var x=data(),card=d.querySelector('.league-card'),list=d.getElementById('leaderboard');
 if(!x||x.mode!=='LIVE'||!card||!list)return;
 state.busy=true;
 try{
  d.documentElement.setAttribute('data-league-live3','1');
  card.setAttribute('data-live3-period',state.period);

  ['demoEventBtn','leaderDemoBtn','themeCycleBtn'].forEach(function(id){
   var b=d.getElementById(id);
   if(b)b.setAttribute('data-live3-hidden','1');
  });

  var vm=votesMap(x);
  var rows=Array.prototype.slice.call(list.querySelectorAll('li'));
  rows.forEach(function(li){
   var id=String(li.dataset.countryId||'').toLowerCase();
   var v=vm.has(id)?vm.get(id):0;
   li.setAttribute('data-live3-votes',String(v));
   var ve=li.querySelector('.country-votes');
   if(ve)ve.textContent=unit(v);
  });

  var allZero=rows.every(function(li){return Number(li.getAttribute('data-live3-votes')||0)===0;});
  card.setAttribute('data-league-empty',allZero?'1':'0');

  rows.sort(function(a,b){
   var av=Number(a.getAttribute('data-live3-votes')||0),bv=Number(b.getAttribute('data-live3-votes')||0);
   if(!allZero&&bv!==av)return bv-av;
   var an=(a.querySelector('.country-name')||{}).textContent||'';
   var bn=(b.querySelector('.country-name')||{}).textContent||'';
   return an.localeCompare(bn,lang());
  });
  rows.forEach(function(li){list.appendChild(li);});

  var prevVote=null,rank=0;
  rows.forEach(function(li,i){
   var v=Number(li.getAttribute('data-live3-votes')||0);
   var r=li.querySelector('.rank');
   li.classList.remove('is-leader');
   if(allZero||v===0){
    if(r){r.textContent='—';r.setAttribute('data-live3-empty-rank','1');}
   }else{
    if(v!==prevVote)rank=i+1;
    if(r){r.textContent=String(rank).padStart(3,'0');r.removeAttribute('data-live3-empty-rank');}
    if(i===0)li.classList.add('is-leader');
   }
   prevVote=v;
  });

  var title=d.getElementById('leaderTitle'),meta=d.getElementById('leaderVotes'),flag=d.getElementById('championFlag');
  if(allZero){
   if(title)title.textContent=U[lang()].none;
   if(meta)meta.textContent=unit(0);
   if(flag)flag.innerHTML='';
  }else if(rows[0]){
   var n=rows[0].querySelector('.country-name'),img=rows[0].querySelector('img');
   if(title&&n)title.textContent=n.textContent;
   if(meta)meta.textContent=unit(Number(rows[0].getAttribute('data-live3-votes')||0));
   if(flag&&img){var c=img.cloneNode(true);c.className='champion-flag-img';flag.innerHTML='';flag.appendChild(c);}
  }

  var selected=list.querySelector('li.is-selected'),focus=d.getElementById('focusMeta');
  if(selected&&focus)focus.textContent=unit(Number(selected.getAttribute('data-live3-votes')||0));

  d.documentElement.setAttribute('data-live3-ready','1');
 }finally{state.busy=false;}
}
function schedule(ms){
 clearTimeout(state.timer);state.timer=setTimeout(apply,ms==null?40:ms);
}
d.addEventListener('click',function(e){
 var b=e.target&&e.target.closest?e.target.closest('button'):null;
 if(!b)return;
 var p=detectPeriod(b.textContent);
 if(p){state.period=p;d.documentElement.setAttribute('data-live3-period',p);schedule(120);}
 else schedule(100);
},true);

function boot(){
 schedule(100);
 var card=d.querySelector('.league-card');
 if(card)new MutationObserver(function(){schedule(50);}).observe(card,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(function(){schedule(60);}).observe(d.documentElement,{attributes:true,subtree:true,attributeFilter:['data-edu-lang','lang']});
w.EDUVERSE_LEAGUE3={apply:apply,period:function(){return state.period;},version:'1.0'};
})(window,document);