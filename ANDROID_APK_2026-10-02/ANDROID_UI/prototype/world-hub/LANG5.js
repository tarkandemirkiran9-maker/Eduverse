/* EDUVERSE_HARD_LANGUAGE_V2 */
(() => {
"use strict";

if (window.__EDUVERSE_HARD_LANGUAGE_V2__) return;
window.__EDUVERSE_HARD_LANGUAGE_V2__ = true;

const I = window.EDUVERSE_I18N = window.EDUVERSE_I18N || {};
I.locales = {tr:"tr-TR",en:"en-US",de:"de-DE",fr:"fr-FR",ar:"ar"};
I.familyWords = {tr:"Aile",en:"Family",de:"Familie",fr:"Famille",ar:"عائلة"};
I.familyUnits = {tr:"aile",en:"families",de:"Familien",fr:"familles",ar:"عائلة"};

const LANGS = ["tr","en","de","fr","ar"];
const T = {
  tr:{eyebrow:"EDUVERSE DÜNYA MERKEZİ",brand:"EduVerse Dünya",globeKicker:"DÜNYA KÜRESİ",slogan:"Dünyada kaç aileye ulaştığımız kadar, o ailelerle neyi değiştirdiğimiz de önemli.",plus:"+1 Aile",leaderChange:"Lider Değişimi",theme:"Tema",leaderLabel:"LİDER",leaderNow:"Şu an",newLeader:"YENİ LİDER",league:"DÜNYA LİGİ",today:"Bugün",live:"CANLI",lastEvent:"SON OLAY",leads:"Dünya Ligi'nde lider.",familyUnit:"aile",fundTitle:"İyilik Fonu",fundLive:"Gerçek mevcut tutar",method:"Hesaplama yöntemi",period:"Dönem",verified:"Doğrulanmış projeler",p1:"Eğitim / burs / materyal",p2:"Çocuk sağlığı",p3:"Okul / kütüphane / teknoloji desteği",vote:"Topluluk oy sonucu",proof:"Ödeme / tamamlanma kanıtı",archive:"Geçmiş projeler arşivi",langAria:"Dil seçimi",globeAria:"EduVerse dünya küresi",pageTitle:"EduVerse • Dünya Merkezi"},
  en:{eyebrow:"EDUVERSE WORLD HUB",brand:"EduVerse World",globeKicker:"WORLD GLOBE",slogan:"How many families we reach around the world matters — and so does what we change together with them.",plus:"+1 Family",leaderChange:"Leader Change",theme:"Theme",leaderLabel:"LEADER",leaderNow:"Now",newLeader:"NEW LEADER",league:"WORLD LEAGUE",today:"Today",live:"LIVE",lastEvent:"LATEST EVENT",leads:"leads the World League.",familyUnit:"families",fundTitle:"Goodness Fund",fundLive:"Current live amount",method:"Calculation method",period:"Period",verified:"Verified projects",p1:"Education / scholarship / materials",p2:"Child health",p3:"School / library / technology support",vote:"Community vote result",proof:"Payment / completion proof",archive:"Past projects archive",langAria:"Language selector",globeAria:"EduVerse world globe",pageTitle:"EduVerse • World Hub"},
  de:{eyebrow:"EDUVERSE WELTZENTRUM",brand:"EduVerse Welt",globeKicker:"WELTKUGEL",slogan:"Es zählt, wie viele Familien wir weltweit erreichen – und ebenso, was wir gemeinsam mit ihnen verändern.",plus:"+1 Familie",leaderChange:"Führungswechsel",theme:"Thema",leaderLabel:"SPITZENREITER",leaderNow:"Aktuell",newLeader:"NEUER SPITZENREITER",league:"WELTLIGA",today:"Heute",live:"LIVE",lastEvent:"LETZTES EREIGNIS",leads:"führt die Weltliga an.",familyUnit:"Familien",fundTitle:"Hilfsfonds",fundLive:"Aktueller Betrag",method:"Berechnungsmethode",period:"Zeitraum",verified:"Verifizierte Projekte",p1:"Bildung / Stipendien / Materialien",p2:"Kindergesundheit",p3:"Schule / Bibliothek / Technologiehilfe",vote:"Ergebnis der Community-Abstimmung",proof:"Zahlungs- / Abschlussnachweis",archive:"Archiv früherer Projekte",langAria:"Sprachauswahl",globeAria:"EduVerse Weltkugel",pageTitle:"EduVerse • Weltzentrum"},
  fr:{eyebrow:"EDUVERSE CENTRE DU MONDE",brand:"EduVerse Monde",globeKicker:"GLOBE MONDIAL",slogan:"Le nombre de familles que nous touchons dans le monde compte – tout autant que ce que nous changeons avec elles.",plus:"+1 Famille",leaderChange:"Changement de leader",theme:"Thème",leaderLabel:"EN TÊTE",leaderNow:"Actuellement",newLeader:"NOUVEAU LEADER",league:"LIGUE MONDIALE",today:"Aujourd’hui",live:"EN DIRECT",lastEvent:"DERNIER ÉVÉNEMENT",leads:"est en tête de la Ligue mondiale.",familyUnit:"familles",fundTitle:"Fonds solidaire",fundLive:"Montant actuel",method:"Méthode de calcul",period:"Période",verified:"Projets vérifiés",p1:"Éducation / bourses / matériel",p2:"Santé des enfants",p3:"École / bibliothèque / soutien technologique",vote:"Résultat du vote de la communauté",proof:"Preuve de paiement / d’achèvement",archive:"Archive des projets passés",langAria:"Sélection de la langue",globeAria:"Globe mondial EduVerse",pageTitle:"EduVerse • Monde"},
  ar:{eyebrow:"EDUVERSE مركز العالم",brand:"EduVerse العالم",globeKicker:"الكرة الأرضية",slogan:"عدد العائلات التي نصل إليها حول العالم مهم، وكذلك ما نغيّره معهم.",plus:"+1 عائلة",leaderChange:"تغيير المتصدر",theme:"السمة",leaderLabel:"المتصدر",leaderNow:"الآن",newLeader:"متصدر جديد",league:"الدوري العالمي",today:"اليوم",live:"مباشر",lastEvent:"آخر حدث",leads:"في صدارة الدوري العالمي.",familyUnit:"عائلة",fundTitle:"صندوق الخير",fundLive:"المبلغ الحالي",method:"طريقة الحساب",period:"الفترة",verified:"المشاريع الموثقة",p1:"التعليم / المنح / المواد",p2:"صحة الأطفال",p3:"المدرسة / المكتبة / دعم التكنولوجيا",vote:"نتيجة تصويت المجتمع",proof:"إثبات الدفع / الاكتمال",archive:"أرشيف المشاريع السابقة",langAria:"اختيار اللغة",globeAria:"الكرة الأرضية EduVerse",pageTitle:"EduVerse • مركز العالم"}
};

const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||"").replace(/\s+/g," ").trim();
const num=s=>{const m=String(s||"").match(/\d+/); return m?m[0]:"";};

function countryName(code,fallback=""){
  try{
    const dn=new Intl.DisplayNames([I.locales[I.lang]||I.locales.tr],{type:"region"});
    return dn.of(String(code||"").toUpperCase())||fallback||code;
  }catch(e){return fallback||code;}
}
I.countryName=(code,fallback)=>countryName(code,fallback);
I.familyWord=()=>I.familyWords[I.lang]||I.familyWords.tr;
I.familyUnit=()=>I.familyUnits[I.lang]||I.familyUnits.tr;

function setText(el,text){ if(el && norm(el.textContent)!==text) el.textContent=text; }
function setFamily(el,t){ if(!el)return; const n=num(el.textContent); if(n)setText(el,`${n} ${t.familyUnit}`); }

function codeOf(root){
  if(!root)return "";
  const ds=String(root.dataset?.countryId||root.dataset?.country||"").toLowerCase();
  if(/^[a-z]{2}$/.test(ds))return ds;
  const img=root.querySelector?.("img");
  if(img){
    const src=String(img.getAttribute("src")||img.src||"");
    const m=src.match(/flagcdn\.com\/(?:w\d+\/)?([a-z]{2})\.(?:png|webp|jpg|jpeg|svg)/i);
    if(m)return m[1].toLowerCase();
  }
  return "";
}

function styleSelector(box){
  if(!box)return;
  box.style.position="relative";
  box.style.zIndex="80";
  box.style.pointerEvents="auto";
  box.style.isolation="isolate";
  box.style.touchAction="manipulation";
  qa(".world-lang-btn",box).forEach(btn=>{
    btn.style.pointerEvents="auto";
    btn.style.touchAction="manipulation";
    btn.style.position="relative";
    btn.style.zIndex="81";
    btn.style.minWidth="42px";
    btn.style.height="38px";
    btn.style.transform="none";
    btn.style.transition="background .16s ease,color .16s ease,box-shadow .16s ease";
    btn.style.userSelect="none";
  });
}

function ensureSelector(){
  let box=document.getElementById("worldLanguageSelector");
  if(!box){
    const row=q(".event-row");
    if(!row)return null;
    box=document.createElement("div");
    box.id="worldLanguageSelector";
    box.className="world-language-selector";
    box.innerHTML=LANGS.map(l=>`<button type="button" class="world-lang-btn" data-lang="${l}" aria-pressed="false">${l.toUpperCase()}</button>`).join("");
    row.appendChild(box);
  }
  styleSelector(box);
  return box;
}

function countries(t){
  qa(".leaderboard li[data-country-id]").forEach(li=>{
    const code=String(li.dataset.countryId||"").toLowerCase();
    setText(q(".country-name",li),countryName(code,norm(q(".country-name",li)?.textContent)));
    setFamily(q(".country-votes",li),t);
  });
  const leader=q(".leader-card"),lc=codeOf(leader);
  if(lc)setText(document.getElementById("leaderTitle"),countryName(lc,""));
  setFamily(document.getElementById("leaderVotes"),t);

  const focus=document.getElementById("focusCard"),fc=codeOf(focus);
  if(fc)setText(document.getElementById("focusName"),countryName(fc,""));
  setFamily(document.getElementById("focusMeta"),t);

  const burst=document.getElementById("leaderBurstName");
  if(burst && (lc||fc))setText(burst,countryName(lc||fc,norm(burst.textContent)));
}

function fund(t){
  const root=document.getElementById("goodnessFund");
  if(!root)return;
  qa(".goodness-lang",root).forEach(el=>el.remove());
  setText(document.getElementById("goodnessFundTitle"),t.fundTitle);
  setText(q(".fund-core span",root),t.fundLive);
  const meta=qa(".fund-meta-card span",root);
  if(meta[0])setText(meta[0],t.method);
  if(meta[1])setText(meta[1],t.period);
  setText(q(".fund-section-title",root),t.verified);
  const projects=qa(".project-card strong",root);
  if(projects[0])setText(projects[0],t.p1);
  if(projects[1])setText(projects[1],t.p2);
  if(projects[2])setText(projects[2],t.p3);
  const proof=qa(".proof-row span",root);
  if(proof[0])setText(proof[0],t.vote);
  if(proof[1])setText(proof[1],t.proof);
  if(proof[2])setText(proof[2],t.archive);
  root.lang=I.lang;
  root.dir="ltr";
}

function staticText(t){
  setText(q(".topbar .eyebrow"),t.eyebrow);
  setText(q(".topbar h1"),t.brand);
  setText(q(".globe-panel .kicker"),t.globeKicker);
  setText(q(".globe-panel .panel-head h2"),t.slogan);
  setText(q("#eduverseMissionSlogan .eduverse-mission-slogan__text"),t.slogan);
  setText(document.getElementById("demoEventBtn"),t.plus);
  setText(document.getElementById("leaderDemoBtn"),t.leaderChange);
  setText(document.getElementById("themeCycleBtn"),t.theme);
  setText(q(".leader-card .section-label"),t.leaderLabel);
  setText(q(".leader-card .leader-copy p"),t.leaderNow);
  setText(q(".leader-burst span"),t.newLeader);
  setText(q(".league-card .section-label"),t.league);
  setText(q(".league-card .league-head h3"),t.today);
  setText(q(".signal-card .section-label"),t.lastEvent);

  const live=q(".live-dot");
  if(live){
    const tn=[...live.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
    if(tn)tn.nodeValue=` ${t.live}`; else live.appendChild(document.createTextNode(` ${t.live}`));
  }

  const leader=q(".leader-card"),lc=codeOf(leader);
  const leaderName=lc?countryName(lc,""):norm(document.getElementById("leaderTitle")?.textContent);
  if(leaderName)setText(document.getElementById("eventText"),`${leaderName} ${t.leads}`);

  const globe=document.getElementById("globe");
  if(globe)globe.setAttribute("aria-label",t.globeAria);
  const selector=ensureSelector();
  if(selector)selector.setAttribute("aria-label",t.langAria);
  document.title=t.pageTitle;
}

function render(lang,persist){
  if(!T[lang])lang="tr";
  I.lang=lang;
  document.documentElement.lang=lang;
  document.documentElement.dir="ltr";
  document.body.dataset.eduLang=lang;

  const t=T[lang];
  staticText(t);
  countries(t);
  fund(t);

  qa(".world-lang-btn").forEach(btn=>{
    const on=btn.dataset.lang===lang;
    btn.classList.toggle("is-active",on);
    btn.setAttribute("aria-pressed",on?"true":"false");
  });

  if(persist){try{localStorage.setItem("eduverse-world-language",lang);}catch(e){}}

  let m=document.getElementById("eduverseLangState");
  if(!m){m=document.createElement("span");m.id="eduverseLangState";m.hidden=true;document.body.appendChild(m);}
  m.dataset.lang=lang;
  m.dataset.status="applied";
}

let burstTimer1=0,burstTimer2=0;
function hardSwitch(lang,persist=true){
  clearTimeout(burstTimer1); clearTimeout(burstTimer2);
  render(lang,persist);
  requestAnimationFrame(()=>render(lang,false));
  burstTimer1=setTimeout(()=>render(lang,false),40);
  burstTimer2=setTimeout(()=>render(lang,false),120);
}

function bindButtons(){
  const box=ensureSelector();
  if(!box)return;
  qa(".world-lang-btn",box).forEach(btn=>{
    if(btn.dataset.hardBound==="1")return;
    btn.dataset.hardBound="1";

    btn.addEventListener("pointerdown",e=>{
      if(e.pointerType==="mouse" && e.button!==0)return;
      e.preventDefault();
      e.stopPropagation();
      hardSwitch(btn.dataset.lang,true);
    },{passive:false});

    btn.addEventListener("click",e=>{
      e.preventDefault();
      e.stopPropagation();
      hardSwitch(btn.dataset.lang,true);
    });

    btn.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        hardSwitch(btn.dataset.lang,true);
      }
    });
  });
}

window.EDUVERSE_SET_LANGUAGE=lang=>hardSwitch(lang,true);
window.EDUVERSE_REFRESH_LANGUAGE=()=>render(I.lang,false);

function boot(){
  bindButtons();
  let initial="tr";
  try{
    const saved=localStorage.getItem("eduverse-world-language");
    if(saved&&T[saved])initial=saved;
  }catch(e){}
  hardSwitch(initial,false);

  // Dynamic league actions may redraw names/votes. Re-assert text only.
  document.addEventListener("click",e=>{
    if(e.target.closest?.("#demoEventBtn,#leaderDemoBtn,.leaderboard li,.leader-card")){
      setTimeout(()=>render(I.lang,false),0);
    }
  });
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
else boot();
})();