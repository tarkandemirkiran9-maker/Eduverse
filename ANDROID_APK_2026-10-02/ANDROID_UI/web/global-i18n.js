/* EDUVERSE_GLOBAL_I18N_CONTROLLER_V3_1_DOMSAFE */
(() => {
  const bootEduVerseI18n = () => {
/* EDUVERSE_GLOBAL_I18N_CONTROLLER_V3 */
(() => {
"use strict";

if(window.__EDUVERSE_GLOBAL_I18N_CONTROLLER_V3__) return;
window.__EDUVERSE_GLOBAL_I18N_CONTROLLER_V3__=true;

let qaMarker=document.getElementById("eduverseI18nQa");
if(!qaMarker){qaMarker=document.createElement("div");qaMarker.id="eduverseI18nQa";qaMarker.hidden=true;document.body.appendChild(qaMarker);}
qaMarker.dataset.status="booting";qaMarker.dataset.errors="controller-started";
window.addEventListener("error",event=>{
  qaMarker.dataset.status="failed";
  qaMarker.dataset.errors=("runtime:"+(event.message||"unknown")).slice(0,2000);
});

const I18N=window.EDUVERSE_I18N=window.EDUVERSE_I18N||{};
I18N.locales=I18N.locales||{tr:"tr-TR",en:"en-US",de:"de-DE",fr:"fr-FR",ar:"ar"};

const TEXTS={
  tr:{
    htmlLang:"tr",dir:"ltr",title:"EduVerse Dünya Merkezi",selector:"Dil seçimi",
    league:"DÜNYA LİGİ",today:"Bugün",familyCount:"aile",familyStream:"Aile",
    plus:"+1 Aile",leaderChange:"Lider Değişimi",theme:"Tema",mission:"Tek Dünya • Tek EduVerse Ailesi",
    fundTitle:"İyilik Fonu",live:"Gerçek mevcut tutar",method:"Hesaplama yöntemi",period:"Dönem",
    verified:"Doğrulanmış projeler",p1:"Eğitim / burs / materyal",p2:"Çocuk sağlığı",p3:"Okul / kütüphane / teknoloji desteği",
    vote:"Topluluk oy sonucu",proof:"Ödeme / tamamlanma kanıtı",archive:"Geçmiş projeler arşivi",
    eventPlus:(name)=>`${name} +1 yeni aile kazandı.`,eventLeader:(name)=>`${name} liderliği aldı.`
  },
  en:{
    htmlLang:"en",dir:"ltr",title:"EduVerse World Hub",selector:"Language selection",
    league:"WORLD LEAGUE",today:"Today",familyCount:"families",familyStream:"Family",
    plus:"+1 Family",leaderChange:"Leader Change",theme:"Theme",mission:"One World • One EduVerse Family",
    fundTitle:"Goodness Fund",live:"Current live amount",method:"Calculation method",period:"Period",
    verified:"Verified projects",p1:"Education / scholarship / materials",p2:"Child health",p3:"School / library / technology support",
    vote:"Community vote result",proof:"Payment / completion proof",archive:"Past projects archive",
    eventPlus:(name)=>`${name} gained +1 new family.`,eventLeader:(name)=>`${name} took the lead.`
  },
  de:{
    htmlLang:"de",dir:"ltr",title:"EduVerse Weltzentrum",selector:"Sprachauswahl",
    league:"WELTLIGA",today:"Heute",familyCount:"Familien",familyStream:"Familie",
    plus:"+1 Familie",leaderChange:"Führungswechsel",theme:"Thema",mission:"Eine Welt • Eine EduVerse-Familie",
    fundTitle:"Hilfsfonds",live:"Aktueller Betrag",method:"Berechnungsmethode",period:"Zeitraum",
    verified:"Verifizierte Projekte",p1:"Bildung / Stipendien / Materialien",p2:"Kindergesundheit",p3:"Schule / Bibliothek / Technologiehilfe",
    vote:"Ergebnis der Community-Abstimmung",proof:"Zahlungs- / Abschlussnachweis",archive:"Archiv früherer Projekte",
    eventPlus:(name)=>`${name} hat +1 neue Familie gewonnen.`,eventLeader:(name)=>`${name} hat die Führung übernommen.`
  },
  fr:{
    htmlLang:"fr",dir:"ltr",title:"EduVerse Monde",selector:"Choix de la langue",
    league:"LIGUE MONDIALE",today:"Aujourd’hui",familyCount:"familles",familyStream:"Famille",
    plus:"+1 Famille",leaderChange:"Changement de leader",theme:"Thème",mission:"Un monde • Une famille EduVerse",
    fundTitle:"Fonds solidaire",live:"Montant actuel",method:"Méthode de calcul",period:"Période",
    verified:"Projets vérifiés",p1:"Éducation / bourses / matériel",p2:"Santé des enfants",p3:"École / bibliothèque / soutien technologique",
    vote:"Résultat du vote de la communauté",proof:"Preuve de paiement / d’achèvement",archive:"Archive des projets passés",
    eventPlus:(name)=>`${name} a gagné +1 nouvelle famille.`,eventLeader:(name)=>`${name} prend la tête.`
  },
  ar:{
    htmlLang:"ar",dir:"rtl",title:"مركز EduVerse العالمي",selector:"اختيار اللغة",
    league:"الدوري العالمي",today:"اليوم",familyCount:"عائلة",familyStream:"عائلة",
    plus:"+1 عائلة",leaderChange:"تغيير المتصدر",theme:"السمة",mission:"عالم واحد • عائلة EduVerse واحدة",
    fundTitle:"صندوق الخير",live:"المبلغ الحالي",method:"طريقة الحساب",period:"الفترة",
    verified:"المشاريع الموثقة",p1:"التعليم / المنح / المواد",p2:"صحة الأطفال",p3:"المدرسة / المكتبة / دعم التكنولوجيا",
    vote:"نتيجة تصويت المجتمع",proof:"إثبات الدفع / الاكتمال",archive:"أرشيف المشاريع السابقة",
    eventPlus:(name)=>`${name} حصلت على عائلة جديدة +1.`,eventLeader:(name)=>`${name} تصدرت الترتيب.`
  }
};

const LANGUAGE_NAMES={tr:"Türkçe",en:"English",de:"Deutsch",fr:"Français",ar:"العربية"};
const LANGS=Object.keys(TEXTS);
const originalRowNames=new Map();
let applying=false;

function textOf(el){return (el?.textContent||"").trim();}
function setText(el,value){if(el && textOf(el)!==String(value)) el.textContent=String(value);}
function esc(value){return String(value??"").trim();}
function digits(value){const m=String(value||"").match(/\d+/);return m?m[0]:"";}
function norm(value){return String(value||"").trim().toLocaleLowerCase("tr-TR").replace(/[’']/g,"'").replace(/\s+/g," ");}

I18N.countryName=function(code,fallback){
  try{
    const locale=I18N.locales[I18N.lang]||I18N.locales.tr;
    const dn=new Intl.DisplayNames([locale],{type:"region"});
    return dn.of(String(code||"").toUpperCase())||fallback;
  }catch(e){return fallback;}
};
I18N.familyWord=function(){return (TEXTS[I18N.lang]||TEXTS.tr).familyStream;};

function rows(){return [...document.querySelectorAll(".leaderboard li[data-country-id]")];}
function rememberOriginalRows(){
  rows().forEach(li=>{
    const code=esc(li.dataset.countryId).toLowerCase();
    const name=esc(li.querySelector(".country-name")?.textContent);
    if(code && name && !originalRowNames.has(code)) originalRowNames.set(code,name);
  });
}

function countryName(code,fallback){return I18N.countryName(code,fallback||originalRowNames.get(code)||String(code||"").toUpperCase());}

function codeFromFlag(root){
  const img=root?.querySelector?.("img");
  const src=img?.getAttribute?.("src")||img?.src||"";
  if(!src) return null;
  const candidates=[
    /(?:^|\/)([a-z]{2})(?:\.(?:png|svg|webp|jpg|jpeg))(?:\?|$)/i,
    /(?:flag|flags|country|countries)[_\/-]([a-z]{2})(?:[_\/.?-]|$)/i,
    /\/([a-z]{2})(?:\?|$)/i
  ];
  for(const re of candidates){const m=src.match(re);if(m)return m[1].toLowerCase();}
  return null;
}

function buildKnownNameMap(){
  const map=new Map();
  for(const li of rows()){
    const code=esc(li.dataset.countryId).toLowerCase();
    if(!code) continue;
    const original=originalRowNames.get(code);
    if(original) map.set(norm(original),code);
    for(const lang of LANGS){
      try{
        const dn=new Intl.DisplayNames([I18N.locales[lang]],{type:"region"});
        const n=dn.of(code.toUpperCase());
        if(n) map.set(norm(n),code);
      }catch(e){}
    }
  }
  return map;
}

function codeFromDisplayedName(root){
  const candidates=[
    root?.querySelector?.("#leaderTitle"),root?.querySelector?.("#focusName"),
    root?.querySelector?.(".leader-copy h3"),root?.querySelector?.(".focus-name"),
    root?.querySelector?.("h3"),root?.querySelector?.("strong")
  ].filter(Boolean);
  const known=buildKnownNameMap();
  for(const el of candidates){const code=known.get(norm(textOf(el)));if(code)return code;}
  return null;
}

function resolveLeaderCode(){
  const leaderCard=document.querySelector(".leader-card");
  return esc(leaderCard?.dataset?.countryId).toLowerCase() || codeFromFlag(leaderCard) || esc(rows()[0]?.dataset?.countryId).toLowerCase() || codeFromDisplayedName(leaderCard);
}

function resolveFocusCode(){
  const focus=document.getElementById("focusCard")||document.querySelector(".focus-card");
  return esc(focus?.dataset?.countryId).toLowerCase() || codeFromFlag(focus) || codeFromDisplayedName(focus);
}

function ensureSelector(t){
  let wrap=document.getElementById("worldLanguageSelector");
  const row=document.querySelector(".event-row");
  if(!row) return null;
  if(!wrap){
    wrap=document.createElement("div");
    wrap.id="worldLanguageSelector";
    wrap.className="world-language-selector";
    wrap.innerHTML=LANGS.map(lang=>`<button type="button" class="world-lang-btn" data-lang="${lang}" title="${LANGUAGE_NAMES[lang]}">${lang.toUpperCase()}</button>`).join("");
    const mission=document.getElementById("missionChip");
    if(mission && mission.parentElement===row) row.insertBefore(wrap,mission); else row.appendChild(wrap);
    wrap.querySelectorAll(".world-lang-btn").forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang,true)));
  }
  wrap.setAttribute("aria-label",t.selector);
  wrap.querySelectorAll(".world-lang-btn").forEach(btn=>{
    btn.classList.toggle("is-active",btn.dataset.lang===I18N.lang);
    btn.setAttribute("aria-pressed",btn.dataset.lang===I18N.lang?"true":"false");
  });
  return wrap;
}

function translateLeaderboard(t){
  for(const li of rows()){
    const code=esc(li.dataset.countryId).toLowerCase();
    const nameEl=li.querySelector(".country-name");
    const votesEl=li.querySelector(".country-votes");
    if(code && nameEl) setText(nameEl,countryName(code,textOf(nameEl)));
    const n=digits(textOf(votesEl));
    if(votesEl && n) setText(votesEl,`${n} ${t.familyCount}`);
  }
}

function translateLeader(t){
  const card=document.querySelector(".leader-card");
  if(!card) return;
  const code=resolveLeaderCode();
  const name=document.getElementById("leaderTitle")||card.querySelector(".leader-copy h3")||card.querySelector("h3");
  const votes=document.getElementById("leaderVotes")||document.getElementById("leaderMeta")||card.querySelector(".leader-copy strong")||[...card.querySelectorAll("*")].find(el=>el.children.length===0 && /\d/.test(textOf(el)));
  if(code && name) setText(name,countryName(code,textOf(name)));
  const n=digits(textOf(votes));
  if(votes && n) setText(votes,`${n} ${t.familyCount}`);
}

function translateFocus(t){
  const card=document.getElementById("focusCard")||document.querySelector(".focus-card");
  if(!card) return;
  const code=resolveFocusCode();
  const name=document.getElementById("focusName")||card.querySelector(".focus-name")||card.querySelector("strong");
  const meta=document.getElementById("focusMeta")||document.getElementById("focusVotes")||card.querySelector(".focus-meta")||[...card.querySelectorAll("*")].find(el=>el.children.length===0 && /\d/.test(textOf(el)));
  if(code && name) setText(name,countryName(code,textOf(name)));
  const n=digits(textOf(meta));
  if(meta && n) setText(meta,`${n} ${t.familyCount}`);
}

function translateFund(t){
  const fund=document.getElementById("goodnessFund");
  if(!fund) return;
  document.querySelectorAll(".goodness-lang").forEach(el=>el.remove());
  const meta=[...fund.querySelectorAll(".fund-meta-card span")];
  const projects=[...fund.querySelectorAll(".project-card strong")];
  const proofs=[...fund.querySelectorAll(".proof-row span")];
  setText(document.getElementById("goodnessFundTitle"),t.fundTitle);
  setText(fund.querySelector(".fund-core span"),t.live);
  setText(meta[0],t.method);setText(meta[1],t.period);
  setText(fund.querySelector(".fund-section-title"),t.verified);
  setText(projects[0],t.p1);setText(projects[1],t.p2);setText(projects[2],t.p3);
  setText(proofs[0],t.vote);setText(proofs[1],t.proof);setText(proofs[2],t.archive);
  fund.setAttribute("lang",t.htmlLang);fund.setAttribute("dir",t.dir);
}

function translateStatic(t){
  document.title=t.title;
  document.documentElement.lang=t.htmlLang;
  document.documentElement.dir="ltr";
  document.body.setAttribute("data-edu-lang",I18N.lang);
  setText(document.querySelector(".league-card .section-label"),t.league);
  setText(document.querySelector(".league-card .league-head h3"),t.today);
  setText(document.getElementById("demoEventBtn"),t.plus);
  setText(document.getElementById("leaderDemoBtn"),t.leaderChange);
  setText(document.getElementById("themeCycleBtn"),t.theme);
  setText(document.getElementById("missionChip"),t.mission);
  ensureSelector(t);
  translateFund(t);
}

function translateEvent(t){
  const el=document.getElementById("eventText");
  if(!el || !textOf(el)) return;
  const raw=textOf(el);
  const known=buildKnownNameMap();
  let matchedCode=null;
  for(const [name,code] of known.entries()){
    if(norm(raw).startsWith(name+" ")){matchedCode=code;break;}
  }
  if(!matchedCode) return;
  const name=countryName(matchedCode,originalRowNames.get(matchedCode));
  if(/\+1/.test(raw)) setText(el,t.eventPlus(name));
  else if(/lider|lead|führung|tête|تصدر|leader/i.test(raw)) setText(el,t.eventLeader(name));
}

function getExpectedCountry(code,lang){
  try{const dn=new Intl.DisplayNames([I18N.locales[lang]],{type:"region"});return dn.of(code.toUpperCase());}catch(e){return originalRowNames.get(code)||code.toUpperCase();}
}

function verifyCurrentLanguage(){
  const t=TEXTS[I18N.lang]||TEXTS.tr;
  const errors=[];
  const check=(label,actual,expected)=>{if(esc(actual)!==esc(expected))errors.push(`${label}: ${esc(actual)} != ${esc(expected)}`);};

  if(typeof Intl.DisplayNames!=="function") errors.push("Intl.DisplayNames unavailable");
  const rowList=rows();
  if(rowList.length!==195) errors.push(`countryRowCount:${rowList.length} != 195`);

  check("league",textOf(document.querySelector(".league-card .section-label")),t.league);
  check("today",textOf(document.querySelector(".league-card .league-head h3")),t.today);
  check("plus",textOf(document.getElementById("demoEventBtn")),t.plus);
  check("leaderChange",textOf(document.getElementById("leaderDemoBtn")),t.leaderChange);
  check("theme",textOf(document.getElementById("themeCycleBtn")),t.theme);
  check("mission",textOf(document.getElementById("missionChip")),t.mission);

  const selector=document.getElementById("worldLanguageSelector");
  if(!selector) errors.push("languageSelector missing");
  else{
    const langButtons=[...selector.querySelectorAll(".world-lang-btn")];
    if(langButtons.length!==5) errors.push(`languageButtonCount:${langButtons.length} != 5`);
    const active=selector.querySelector(".world-lang-btn.is-active")?.dataset?.lang;
    if(active!==I18N.lang) errors.push(`activeLanguage:${active||"none"} != ${I18N.lang}`);
  }

  if(document.getElementById("goodnessFund")){
    check("fundTitle",textOf(document.getElementById("goodnessFundTitle")),t.fundTitle);
    check("fundLive",textOf(document.querySelector("#goodnessFund .fund-core span")),t.live);
    const fund=document.getElementById("goodnessFund");
    const meta=[...fund.querySelectorAll(".fund-meta-card span")];
    const projects=[...fund.querySelectorAll(".project-card strong")];
    const proof=[...fund.querySelectorAll(".proof-row span")];
    check("fundMethod",textOf(meta[0]),t.method);check("fundPeriod",textOf(meta[1]),t.period);
    check("fundVerified",textOf(fund.querySelector(".fund-section-title")),t.verified);
    check("fundP1",textOf(projects[0]),t.p1);check("fundP2",textOf(projects[1]),t.p2);check("fundP3",textOf(projects[2]),t.p3);
    check("fundVote",textOf(proof[0]),t.vote);check("fundProof",textOf(proof[1]),t.proof);check("fundArchive",textOf(proof[2]),t.archive);
    if(document.querySelector(".goodness-lang")) errors.push("duplicate goodness language selector");
  }else errors.push("goodnessFund missing");

  for(const li of rowList){
    const code=esc(li.dataset.countryId).toLowerCase();
    if(!code){errors.push("country row without code");continue;}
    const expected=getExpectedCountry(code,I18N.lang);
    check(`country:${code}`,textOf(li.querySelector(".country-name")),expected);
    const vote=textOf(li.querySelector(".country-votes"));
    if(!vote) errors.push(`countMissing:${code}`);
    else if(!vote.endsWith(` ${t.familyCount}`)) errors.push(`count:${code}: ${vote}`);
  }

  const leaderCard=document.querySelector(".leader-card");
  if(!leaderCard) errors.push("leaderCard missing");
  else{
    const leaderCode=resolveLeaderCode();
    if(!leaderCode) errors.push("leaderCode unresolved");
    else{
      const leaderName=document.getElementById("leaderTitle")||leaderCard.querySelector(".leader-copy h3")||leaderCard.querySelector("h3");
      check("leaderCountry",textOf(leaderName),getExpectedCountry(leaderCode,I18N.lang));
      const leaderVotes=document.getElementById("leaderVotes")||document.getElementById("leaderMeta")||leaderCard.querySelector(".leader-copy strong")||[...leaderCard.querySelectorAll("*")].find(el=>el.children.length===0 && /\d/.test(textOf(el)));
      if(!leaderVotes) errors.push("leaderCount missing");
      else if(!textOf(leaderVotes).endsWith(` ${t.familyCount}`)) errors.push(`leaderCount:${textOf(leaderVotes)}`);
    }
  }

  const focusCard=document.getElementById("focusCard")||document.querySelector(".focus-card");
  if(!focusCard) errors.push("focusCard missing");
  else{
    const focusCode=resolveFocusCode();
    if(!focusCode) errors.push("focusCode unresolved");
    else{
      const focusName=document.getElementById("focusName")||focusCard.querySelector(".focus-name")||focusCard.querySelector("strong");
      check("focusCountry",textOf(focusName),getExpectedCountry(focusCode,I18N.lang));
      const focusVotes=document.getElementById("focusMeta")||document.getElementById("focusVotes")||focusCard.querySelector(".focus-meta")||[...focusCard.querySelectorAll("*")].find(el=>el.children.length===0 && /\d/.test(textOf(el)));
      if(!focusVotes) errors.push("focusCount missing");
      else if(!textOf(focusVotes).endsWith(` ${t.familyCount}`)) errors.push(`focusCount:${textOf(focusVotes)}`);
    }
  }

  if(I18N.familyWord()!==t.familyStream) errors.push(`familyStreamWord:${I18N.familyWord()} != ${t.familyStream}`);

  if(innerWidth>=1400){
    const plus=document.getElementById("demoEventBtn");
    const mission=document.getElementById("missionChip");
    const selectorEl=document.getElementById("worldLanguageSelector");
    if(plus&&mission&&selectorEl){
      const p=plus.getBoundingClientRect(),m=mission.getBoundingClientRect(),l=selectorEl.getBoundingClientRect();
      if(Math.abs(p.top-m.top)>14 || Math.abs(p.top-l.top)>14) errors.push(`desktopBottomRowWrapped:${Math.round(p.top)},${Math.round(l.top)},${Math.round(m.top)}`);
    }
  }

  qaMarker.dataset.lang=I18N.lang;
  qaMarker.dataset.status=errors.length?"failed":"passed";
  qaMarker.dataset.errors=(errors.length?errors.join(" | "):"NONE").slice(0,4000);
  qaMarker.dataset.rows=String(rowList.length);
  return {lang:I18N.lang,status:qaMarker.dataset.status,errors};
}

function applyAll(){
  if(applying) return;
  applying=true;
  try{
    rememberOriginalRows();
    const t=TEXTS[I18N.lang]||TEXTS.tr;
    translateStatic(t);
    translateLeaderboard(t);
    translateLeader(t);
    translateFocus(t);
    translateEvent(t);
    ensureSelector(t);
    verifyCurrentLanguage();
  }finally{applying=false;}
}

function setLanguage(lang,persist){
  if(!TEXTS[lang]) return;
  I18N.lang=lang;
  if(persist!==false){try{localStorage.setItem("eduverse-world-language",lang);}catch(e){}}
  applyAll();
}

const queryLang=new URLSearchParams(location.search).get("qa_lang");
if(queryLang && TEXTS[queryLang]) I18N.lang=queryLang;
else {
  try{
    const saved=localStorage.getItem("eduverse-world-language");
    if(saved && TEXTS[saved]) I18N.lang=saved;
    else if(!TEXTS[I18N.lang]) I18N.lang="tr";
  }catch(e){if(!TEXTS[I18N.lang])I18N.lang="tr";}
}

window.EDUVERSE_SET_LANGUAGE=(lang)=>setLanguage(lang,true);
window.EDUVERSE_I18N_QA={run:verifyCurrentLanguage,apply:applyAll,texts:TEXTS};

let queued=false;
const observer=new MutationObserver(()=>{
  if(applying || queued) return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;applyAll();});
});
observer.observe(document.body,{childList:true,subtree:true,characterData:true});

function qaReady(){
  return rows().length>=190 && document.querySelector(".leader-card") && (document.getElementById("focusCard")||document.querySelector(".focus-card")) && document.getElementById("goodnessFund") && document.getElementById("themeCycleBtn");
}

function runQaWhenReady(attempt=0){
  if(!queryLang) return;
  if(qaReady() || attempt>=24){
    setLanguage(queryLang,false);
    requestAnimationFrame(()=>requestAnimationFrame(()=>verifyCurrentLanguage()));
    return;
  }
  qaMarker.dataset.lang=queryLang;
  qaMarker.dataset.status="waiting";
  qaMarker.dataset.errors=`waiting-for-page:${attempt}`;
  setTimeout(()=>runQaWhenReady(attempt+1),250);
}

applyAll();
if(queryLang) runQaWhenReady();
})();

  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootEduVerseI18n, { once: true });
  } else {
    bootEduVerseI18n();
  }
})();
