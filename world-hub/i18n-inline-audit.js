/* EDUVERSE_GLOBAL_I18N_INLINE_V4 */
(() => {
"use strict";

const LANGS=["tr","en","de","fr","ar"];
const I=window.EDUVERSE_I18N;
if(!I) return;

const T={
 tr:{league:"DÜNYA LİGİ",today:"Bugün",familyUnit:"aile",familyWord:"Aile",plus:"+1 Aile",leaderChange:"Lider Değişimi",theme:"Tema",mission:"Tek Dünya • Tek EduVerse Ailesi",fundTitle:"İyilik Fonu",live:"Gerçek mevcut tutar",method:"Hesaplama yöntemi",period:"Dönem",verified:"Doğrulanmış projeler",p1:"Eğitim / burs / materyal",p2:"Çocuk sağlığı",p3:"Okul / kütüphane / teknoloji desteği",vote:"Topluluk oy sonucu",proof:"Ödeme / tamamlanma kanıtı",archive:"Geçmiş projeler arşivi"},
 en:{league:"WORLD LEAGUE",today:"Today",familyUnit:"families",familyWord:"Family",plus:"+1 Family",leaderChange:"Leader Change",theme:"Theme",mission:"One World • One EduVerse Family",fundTitle:"Goodness Fund",live:"Current live amount",method:"Calculation method",period:"Period",verified:"Verified projects",p1:"Education / scholarship / materials",p2:"Child health",p3:"School / library / technology support",vote:"Community vote result",proof:"Payment / completion proof",archive:"Past projects archive"},
 de:{league:"WELTLIGA",today:"Heute",familyUnit:"Familien",familyWord:"Familie",plus:"+1 Familie",leaderChange:"Führungswechsel",theme:"Thema",mission:"Eine Welt • Eine EduVerse-Familie",fundTitle:"Hilfsfonds",live:"Aktueller Betrag",method:"Berechnungsmethode",period:"Zeitraum",verified:"Verifizierte Projekte",p1:"Bildung / Stipendien / Materialien",p2:"Kindergesundheit",p3:"Schule / Bibliothek / Technologiehilfe",vote:"Ergebnis der Community-Abstimmung",proof:"Zahlungs- / Abschlussnachweis",archive:"Archiv früherer Projekte"},
 fr:{league:"LIGUE MONDIALE",today:"Aujourd’hui",familyUnit:"familles",familyWord:"Famille",plus:"+1 Famille",leaderChange:"Changement de leader",theme:"Thème",mission:"Un monde • Une famille EduVerse",fundTitle:"Fonds solidaire",live:"Montant actuel",method:"Méthode de calcul",period:"Période",verified:"Projets vérifiés",p1:"Éducation / bourses / matériel",p2:"Santé des enfants",p3:"École / bibliothèque / soutien technologique",vote:"Résultat du vote de la communauté",proof:"Preuve de paiement / d’achèvement",archive:"Archive des projets passés"},
 ar:{league:"الدوري العالمي",today:"اليوم",familyUnit:"عائلة",familyWord:"عائلة",plus:"+1 عائلة",leaderChange:"تغيير المتصدر",theme:"السمة",mission:"عالم واحد • عائلة EduVerse واحدة",fundTitle:"صندوق الخير",live:"المبلغ الحالي",method:"طريقة الحساب",period:"الفترة",verified:"المشاريع الموثقة",p1:"التعليم / المنح / المواد",p2:"صحة الأطفال",p3:"المدرسة / المكتبة / دعم التكنولوجيا",vote:"نتيجة تصويت المجتمع",proof:"إثبات الدفع / الاكتمال",archive:"أرشيف المشاريع السابقة"}
};

const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>(s||"").replace(/\s+/g," ").trim();
const numFrom=s=>{const m=String(s||"").match(/\d+/);return m?m[0]:"";};
const aliasKey=s=>norm(s).toLocaleLowerCase("en-US").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"'").replace(/[‐‑‒–—]/g,"-");

const originalByCode=new Map();
const codeByAlias=new Map();

function seedCountries(){
 qa(".leaderboard li[data-country-id]").forEach(li=>{
   const code=(li.dataset.countryId||"").toLowerCase();
   const name=norm(q(".country-name",li)?.textContent);
   if(code&&name&&!originalByCode.has(code)) originalByCode.set(code,name);
 });
 for(const [code,orig] of originalByCode){
   codeByAlias.set(aliasKey(orig),code);
   for(const lang of LANGS){
     try{
       const dn=new Intl.DisplayNames([I.locales[lang]],{type:"region"});
       const n=dn.of(code.toUpperCase());
       if(n) codeByAlias.set(aliasKey(n),code);
     }catch(e){}
   }
 }
}

function countryName(code,lang=I.lang,fallback=""){
 try{
  const dn=new Intl.DisplayNames([I.locales[lang]],{type:"region"});
  return dn.of(String(code).toUpperCase())||fallback||originalByCode.get(code)||code;
 }catch(e){return fallback||originalByCode.get(code)||code;}
}

function codeFromFlag(root){
 const img=root?.querySelector?.("img");
 if(!img) return "";
 const src=String(img.getAttribute("src")||img.src||"");
 let m=src.match(/flagcdn\.com\/(?:w\d+\/)?([a-z]{2})\.(?:png|webp|jpg|jpeg|svg)/i);
 if(m) return m[1].toLowerCase();
 m=src.match(/\/flags?\/([a-z]{2})(?:[-_.\/]|$)/i);
 return m?m[1].toLowerCase():"";
}
function codeFromName(text){return codeByAlias.get(aliasKey(text))||"";}
function cardCode(card,nameEl){
 if(!card) return "";
 const ds=(card.dataset?.countryId||card.dataset?.country||"").toLowerCase();
 if(/^[a-z]{2}$/.test(ds)) return ds;
 const f=codeFromFlag(card); if(f) return f;
 return codeFromName(nameEl?.textContent||"");
}
function setText(el,text){if(el&&norm(el.textContent)!==text) el.textContent=text;}

function translateLeaderboard(t){
 seedCountries();
 qa(".leaderboard li[data-country-id]").forEach(li=>{
   const code=(li.dataset.countryId||"").toLowerCase();
   const nameEl=q(".country-name",li), votesEl=q(".country-votes",li);
   if(code&&nameEl) setText(nameEl,countryName(code,I.lang,norm(nameEl.textContent)));
   if(votesEl){const n=numFrom(votesEl.textContent);if(n)setText(votesEl,`${n} ${t.familyUnit}`);}
 });
}

function translateCountryCard(card,nameSelectors,voteSelectors,t){
 if(!card) return;
 let nameEl=null; for(const s of nameSelectors){nameEl=q(s,card)||document.querySelector(s);if(nameEl)break;}
 let voteEl=null; for(const s of voteSelectors){voteEl=q(s,card)||document.querySelector(s);if(voteEl)break;}
 const code=cardCode(card,nameEl);
 if(code&&nameEl)setText(nameEl,countryName(code,I.lang,norm(nameEl.textContent)));
 if(voteEl){const n=numFrom(voteEl.textContent);if(n)setText(voteEl,`${n} ${t.familyUnit}`);}
}

function translateCards(t){
 translateCountryCard(q(".leader-card"),["#leaderTitle",".leader-copy h3",".leader-copy h2","h3","h2"],["#leaderVotes",".leader-copy strong",".leader-votes","strong"],t);
 translateCountryCard(document.getElementById("focusCard")||q(".focus-card"),["#focusName",".focus-name","strong","h3","h2"],["#focusMeta",".focus-meta","small",".country-votes"],t);
}

function translateStatic(t){
 setText(q(".league-card .section-label"),t.league);
 setText(q(".league-card .league-head h3"),t.today);
 setText(document.getElementById("demoEventBtn"),t.plus);
 setText(document.getElementById("leaderDemoBtn"),t.leaderChange);
 setText(document.getElementById("themeCycleBtn"),t.theme);
 setText(document.getElementById("missionChip"),t.mission);
}

function translateFund(t){
 const fund=document.getElementById("goodnessFund"); if(!fund)return;
 qa(".goodness-lang",fund).forEach(el=>el.remove());
 setText(document.getElementById("goodnessFundTitle"),t.fundTitle);
 setText(q(".fund-core span",fund),t.live);
 const meta=qa(".fund-meta-card span",fund); if(meta[0])setText(meta[0],t.method); if(meta[1])setText(meta[1],t.period);
 setText(q(".fund-section-title",fund),t.verified);
 const projects=qa(".project-card strong",fund);
 if(projects[0])setText(projects[0],t.p1); if(projects[1])setText(projects[1],t.p2); if(projects[2])setText(projects[2],t.p3);
 const proof=qa(".proof-row span",fund);
 if(proof[0])setText(proof[0],t.vote); if(proof[1])setText(proof[1],t.proof); if(proof[2])setText(proof[2],t.archive);
 fund.lang=I.lang; fund.dir=I.lang==="ar"?"rtl":"ltr";
}

function createSelector(){
 let box=document.getElementById("worldLanguageSelector"); if(box)return box;
 const row=q(".event-row"); if(!row)return null;
 box=document.createElement("div"); box.id="worldLanguageSelector"; box.className="world-language-selector";
 box.innerHTML=LANGS.map(l=>`<button type="button" class="world-lang-btn" data-lang="${l}">${l.toUpperCase()}</button>`).join("");
 const mission=document.getElementById("missionChip");
 if(mission&&mission.parentElement===row)row.insertBefore(box,mission);else row.appendChild(box);
 qa(".world-lang-btn",box).forEach(btn=>btn.addEventListener("click",()=>applyLanguage(btn.dataset.lang,true)));
 return box;
}

let applying=false;
function applyLanguage(lang,persist=false){
 if(!T[lang])lang="tr";
 applying=true; I.lang=lang;
 I.familyWords={tr:"Aile",en:"Family",de:"Familie",fr:"Famille",ar:"عائلة"};
 I.familyWord=()=>I.familyWords[I.lang]||"Aile";
 document.documentElement.lang=lang; document.body.dataset.eduLang=lang;
 createSelector(); translateStatic(T[lang]); translateLeaderboard(T[lang]); translateCards(T[lang]); translateFund(T[lang]);
 qa(".world-lang-btn").forEach(btn=>btn.classList.toggle("is-active",btn.dataset.lang===lang));
 if(persist){try{localStorage.setItem("eduverse-world-language",lang);}catch(e){}}
 requestAnimationFrame(()=>{applying=false;});
}
window.EDUVERSE_SET_LANGUAGE=(lang)=>applyLanguage(lang,true);

let scheduled=false;
new MutationObserver(()=>{
 if(applying||scheduled)return;
 scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;applyLanguage(I.lang,false);});
}).observe(document.body,{subtree:true,childList:true,characterData:true});

function cardErrors(card,nameSelectors,voteSelectors,t,prefix){
 const e=[]; if(!card){e.push(prefix+"_missing");return e;}
 let nameEl=null; for(const s of nameSelectors){nameEl=q(s,card)||document.querySelector(s);if(nameEl)break;}
 let voteEl=null; for(const s of voteSelectors){voteEl=q(s,card)||document.querySelector(s);if(voteEl)break;}
 const code=cardCode(card,nameEl); if(!code){e.push(prefix+"_country_code");return e;}
 if(!nameEl||norm(nameEl.textContent)!==countryName(code,I.lang,norm(nameEl?.textContent)))e.push(prefix+"_country_name");
 const n=numFrom(voteEl?.textContent);
 if(!voteEl||!n||norm(voteEl.textContent)!==`${n} ${t.familyUnit}`)e.push(prefix+"_family_unit");
 return e;
}

function qaCurrent(lang){
 const e=[],t=T[lang];
 const exact=[
  [q(".league-card .section-label"),t.league,"league"],[q(".league-card .league-head h3"),t.today,"today"],
  [document.getElementById("demoEventBtn"),t.plus,"plus"],[document.getElementById("leaderDemoBtn"),t.leaderChange,"leader_change"],
  [document.getElementById("themeCycleBtn"),t.theme,"theme"],[document.getElementById("missionChip"),t.mission,"mission"]
 ];
 for(const [el,exp,key] of exact){if(!el||norm(el.textContent)!==exp)e.push(key);}

 const rows=qa(".leaderboard li[data-country-id]");
 if(rows.length!==195)e.push("country_rows_"+rows.length);
 for(const li of rows){
   const code=(li.dataset.countryId||"").toLowerCase(),nEl=q(".country-name",li),vEl=q(".country-votes",li);
   if(!code||!nEl||norm(nEl.textContent)!==countryName(code,lang,norm(nEl?.textContent))){e.push("country_name_"+(code||"unknown"));break;}
   const n=numFrom(vEl?.textContent); if(!vEl||!n||norm(vEl.textContent)!==`${n} ${t.familyUnit}`){e.push("country_family_"+(code||"unknown"));break;}
 }

 e.push(...cardErrors(q(".leader-card"),["#leaderTitle",".leader-copy h3",".leader-copy h2","h3","h2"],["#leaderVotes",".leader-copy strong",".leader-votes","strong"],t,"leader"));
 e.push(...cardErrors(document.getElementById("focusCard")||q(".focus-card"),["#focusName",".focus-name","strong","h3","h2"],["#focusMeta",".focus-meta","small",".country-votes"],t,"focus"));

 const fund=document.getElementById("goodnessFund");
 if(!fund)e.push("fund_missing");
 else{
  const checks=[
   [document.getElementById("goodnessFundTitle"),t.fundTitle,"fund_title"],[q(".fund-core span",fund),t.live,"fund_live"],
   [qa(".fund-meta-card span",fund)[0],t.method,"fund_method"],[qa(".fund-meta-card span",fund)[1],t.period,"fund_period"],
   [q(".fund-section-title",fund),t.verified,"fund_verified"],[qa(".project-card strong",fund)[0],t.p1,"fund_p1"],
   [qa(".project-card strong",fund)[1],t.p2,"fund_p2"],[qa(".project-card strong",fund)[2],t.p3,"fund_p3"],
   [qa(".proof-row span",fund)[0],t.vote,"fund_vote"],[qa(".proof-row span",fund)[1],t.proof,"fund_proof"],
   [qa(".proof-row span",fund)[2],t.archive,"fund_archive"]
  ];
  for(const [el,exp,key] of checks){if(!el||norm(el.textContent)!==exp)e.push(key);}
  if(q(".goodness-lang",fund))e.push("fund_local_selector");
 }

 const buttons=qa(".world-lang-btn"),active=buttons.filter(b=>b.classList.contains("is-active"));
 if(buttons.length!==5)e.push("language_buttons_"+buttons.length);
 if(active.length!==1||active[0]?.dataset.lang!==lang)e.push("language_active");
 if(document.documentElement.lang!==lang)e.push("html_lang");
 if(document.body.dataset.eduLang!==lang)e.push("body_lang");
 if(I.familyWord()!==t.familyWord)e.push("stream_family_word");

 if(innerWidth>=1200){
  const plus=document.getElementById("demoEventBtn"),mission=document.getElementById("missionChip"),selector=document.getElementById("worldLanguageSelector");
  if(plus&&mission&&selector){
   const top=plus.getBoundingClientRect().top;
   if(Math.abs(mission.getBoundingClientRect().top-top)>10)e.push("mission_wrapped");
   if(Math.abs(selector.getBoundingClientRect().top-top)>10)e.push("selector_wrapped");
  }
 }
 return [...new Set(e)];
}

async function runAllQa(){
 let marker=document.getElementById("eduverseI18nQa");
 if(!marker){marker=document.createElement("div");marker.id="eduverseI18nQa";marker.hidden=true;document.body.appendChild(marker);}
 marker.dataset.status="running";
 const original=I.lang,results={},errors=[];
 for(const lang of LANGS){
  applyLanguage(lang,false);
  await new Promise(r=>setTimeout(r,160));
  const e=qaCurrent(lang);
  results[lang]=e.length?"failed":"passed";
  if(e.length)errors.push(lang+":"+e.join(","));
 }
 applyLanguage(original,false);
 for(const lang of LANGS)marker.dataset[lang]=results[lang];
 marker.dataset.errors=errors.join(";");
 marker.dataset.status=errors.length?"failed":"passed";
}

function boot(){
 seedCountries();
 const qs=new URLSearchParams(location.search);
 const requested=qs.get("lang");
 applyLanguage(T[requested]?requested:(T[I.lang]?I.lang:"tr"),false);
 if(qs.get("qa_all")==="1")setTimeout(runAllQa,500);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
