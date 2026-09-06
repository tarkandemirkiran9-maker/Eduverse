/* EDUVERSE_LEAGUE_PERIODS_V1 */
(() => {
"use strict";

if (window.__EDUVERSE_LEAGUE_PERIODS_V1__) return;
window.__EDUVERSE_LEAGUE_PERIODS_V1__ = true;

const board = document.getElementById("leaderboard");
const leagueCard = document.querySelector(".league-card");
const leagueHead = leagueCard?.querySelector(".league-head");
const leagueTitle = document.getElementById("leagueTitle");

if (!board || !leagueCard || !leagueHead || !leagueTitle) return;

const PERIODS = ["today","week","month","all"];
const LABELS = {
  tr:{today:"Bugün",week:"Bu Hafta",month:"Bu Ay",all:"Tüm Zamanlar",search:"Ülke ara",empty:"Ülke bulunamadı"},
  en:{today:"Today",week:"This Week",month:"This Month",all:"All Time",search:"Search country",empty:"No country found"},
  de:{today:"Heute",week:"Diese Woche",month:"Dieser Monat",all:"Gesamt",search:"Land suchen",empty:"Kein Land gefunden"},
  fr:{today:"Aujourd’hui",week:"Cette semaine",month:"Ce mois-ci",all:"Depuis toujours",search:"Rechercher un pays",empty:"Aucun pays trouvé"},
  ar:{today:"اليوم",week:"هذا الأسبوع",month:"هذا الشهر",all:"كل الأوقات",search:"ابحث عن دولة",empty:"لم يتم العثور على دولة"}
};

const STYLE = `
.league-period-tabs{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:7px;
  margin:12px 0 10px;
}
.league-period-btn{
  min-width:0;
  min-height:38px;
  border:1px solid rgba(139,233,255,.15);
  border-radius:12px;
  background:linear-gradient(180deg,rgba(18,43,68,.82),rgba(8,24,42,.82));
  color:#a9c0d4;
  font:800 .70rem/1.15 Inter,Segoe UI,Arial,sans-serif;
  letter-spacing:.01em;
  padding:8px 9px;
  cursor:pointer;
  touch-action:manipulation;
  user-select:none;
  transition:border-color .16s ease,background .16s ease,color .16s ease,box-shadow .16s ease;
}
.league-period-btn:hover{
  border-color:rgba(139,233,255,.32);
  color:#eefaff;
}
.league-period-btn.is-active{
  border-color:rgba(247,217,138,.48);
  background:linear-gradient(135deg,rgba(247,217,138,.16),rgba(81,194,255,.12));
  color:#ffe7a3;
  box-shadow:0 0 0 1px rgba(247,217,138,.06) inset,0 8px 24px rgba(0,0,0,.18);
}
.league-period-btn:focus-visible{
  outline:2px solid rgba(139,233,255,.72);
  outline-offset:2px;
}
@media (max-width:650px){
  .league-period-tabs{grid-template-columns:1fr 1fr;}
  .league-period-btn{font-size:.68rem;}
}
.league-search-wrap{
  position:relative;
  margin:0 0 10px;
}
.league-search{
  width:100%;
  min-height:42px;
  box-sizing:border-box;
  border:1px solid rgba(139,233,255,.16);
  border-radius:12px;
  background:rgba(4,20,36,.72);
  color:#eefaff;
  font:700 .78rem/1.2 Inter,Segoe UI,Arial,sans-serif;
  padding:10px 38px 10px 13px;
  outline:none;
}
.league-search::placeholder{color:#7892a8;}
.league-search:focus{
  border-color:rgba(139,233,255,.48);
  box-shadow:0 0 0 2px rgba(139,233,255,.08);
}
.league-search-clear{
  position:absolute;
  right:5px;
  top:50%;
  transform:translateY(-50%);
  width:32px;
  height:32px;
  border:0;
  border-radius:9px;
  background:transparent;
  color:#9fb5c8;
  font:900 1rem/1 Inter,Segoe UI,Arial,sans-serif;
  cursor:pointer;
  touch-action:manipulation;
}
.league-search-clear:hover{background:rgba(139,233,255,.08);color:#eefaff;}
.league-empty{
  display:none;
  padding:14px 10px;
  color:#8fa8bc;
  font:700 .75rem/1.3 Inter,Segoe UI,Arial,sans-serif;
  text-align:center;
}
.league-empty.is-visible{display:block;}
@media (prefers-reduced-motion:reduce){
  .league-period-btn{transition:none;}
}`;

const styleEl = document.createElement("style");
styleEl.id = "eduverseLeague7Style";
styleEl.textContent = STYLE;
document.head.appendChild(styleEl);

const tabs = document.createElement("div");
tabs.id = "leaguePeriodTabs";
tabs.className = "league-period-tabs";
tabs.setAttribute("role","group");
tabs.setAttribute("aria-label","League period");
tabs.innerHTML = PERIODS.map(p =>
  `<button type="button" class="league-period-btn" data-period="${p}" aria-pressed="false"></button>`
).join("");
leagueHead.insertAdjacentElement("afterend", tabs);

const searchWrap = document.createElement("div");
searchWrap.className = "league-search-wrap";
searchWrap.innerHTML = `
  <input id="leagueCountrySearch" class="league-search" type="search" autocomplete="off" spellcheck="false">
  <button id="leagueSearchClear" class="league-search-clear" type="button" aria-label="Clear">×</button>
`;
tabs.insertAdjacentElement("afterend", searchWrap);

const searchInput = searchWrap.querySelector("#leagueCountrySearch");
const searchClear = searchWrap.querySelector("#leagueSearchClear");

const emptyState = document.createElement("div");
emptyState.id = "leagueSearchEmpty";
emptyState.className = "league-empty";
board.insertAdjacentElement("afterend", emptyState);

const baseVotes = new Map();
let activePeriod = "today";
try {
  const saved = localStorage.getItem("eduverse-league-period");
  if (PERIODS.includes(saved)) activePeriod = saved;
} catch(e){}

function currentLang(){
  const raw = String(document.body?.dataset?.eduLang || window.EDUVERSE_I18N?.lang || document.documentElement.lang || "tr").toLowerCase();
  return LABELS[raw] ? raw : "tr";
}
function familyUnit(){
  try {
    if (typeof window.EDUVERSE_I18N?.familyUnit === "function") return window.EDUVERSE_I18N.familyUnit();
  } catch(e){}
  return {tr:"aile",en:"families",de:"Familien",fr:"familles",ar:"عائلة"}[currentLang()] || "aile";
}
function parseVote(text){
  const m = String(text || "").replace(/[.,\s]/g,"").match(/\d+/);
  return m ? Number(m[0]) : 0;
}
function seedFor(code){
  let h = 2166136261;
  for (const ch of String(code || "")) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h,16777619);
  }
  return h >>> 0;
}

/*
  Prototype-only period simulation.
  "today" preserves the existing page values exactly.
  Other periods are deterministic views so the UX can be tested before a real
  paid-family history source exists. Production must replace this score source.
*/
function scoreFor(code, base, period){
  if (period === "today") return base;
  const s = seedFor(code);
  if (period === "week")  return base * 5  + (s % 181);
  if (period === "month") return base * 18 + ((s >>> 3) % 601);
  return base * 60 + ((s >>> 5) % 2201);
}

function captureBaseFromFreshBoard(){
  [...board.children].forEach(li => {
    const code = String(li.dataset.countryId || "").toLowerCase();
    const voteEl = li.querySelector(".country-votes");
    if (!code || !voteEl) return;
    const n = parseVote(voteEl.textContent);
    if (Number.isFinite(n)) baseVotes.set(code,n);
  });
}

function normalizeSearch(value){
  return String(value || "")
    .toLocaleLowerCase(currentLang())
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^\p{L}\p{N}]+/gu," ")
    .trim();
}

function applySearch(){
  const query = normalizeSearch(searchInput?.value || "");
  let visible = 0;

  [...board.children].forEach(li => {
    const code = String(li.dataset.countryId || "").toLowerCase();
    const visibleName = li.querySelector(".country-name")?.textContent || "";
    const aliases = [visibleName,code];

    for (const lang of Object.keys(LABELS)) {
      try {
        const dn = new Intl.DisplayNames([window.EDUVERSE_I18N?.locales?.[lang] || lang],{type:"region"});
        aliases.push(dn.of(code.toUpperCase()) || "");
      } catch(e){}
    }

    const haystack = normalizeSearch(aliases.join(" "));
    const match = !query || haystack.includes(query);
    li.hidden = !match;
    if (match) visible++;
  });

  if (emptyState) {
    emptyState.classList.toggle("is-visible",visible===0);
    emptyState.textContent = LABELS[currentLang()].empty;
  }
}

function updateSearchLanguage(){
  const labels = LABELS[currentLang()];
  if (searchInput) {
    searchInput.placeholder = labels.search;
    searchInput.setAttribute("aria-label",labels.search);
  }
  if (searchClear) searchClear.setAttribute("aria-label",labels.search);
  if (emptyState) emptyState.textContent = labels.empty;
}

function localizedCountry(code,fallback){
  try {
    if (typeof window.EDUVERSE_I18N?.countryName === "function") {
      return window.EDUVERSE_I18N.countryName(code,fallback) || fallback;
    }
  } catch(e){}
  return fallback;
}

function setChampionFromRow(row){
  const champion = document.getElementById("championFlag");
  if (!champion || !row) return;
  const img = row.querySelector(".country-flag img");
  if (img) {
    champion.innerHTML = "";
    const copy = document.createElement("img");
    copy.src = img.src;
    copy.alt = "";
    copy.className = "champion-flag-img";
    champion.appendChild(copy);
  } else {
    const flag = row.querySelector(".country-flag");
    champion.textContent = flag ? flag.textContent : "";
  }
}

function focusTopOnGlobe(top,unit){
  if (!top) return;
  const leaderCard = document.querySelector(".leader-card");
  if (!leaderCard) return;

  leaderCard.dataset.countryId = top.code;

  // Reuse the locked W2 country-focus engine from app.js instead of creating
  // a second globe controller. The leader-card click is already wired there.
  leaderCard.click();

  const rowName = top.li.querySelector(".country-name")?.textContent || "";
  const focusName = document.getElementById("focusName");
  const focusMeta = document.getElementById("focusMeta");

  if (focusName) focusName.textContent = localizedCountry(top.code,rowName);
  if (focusMeta) focusMeta.textContent = `${top.score} ${unit}`;
}

function translateTabs(){
  const lang = currentLang();
  const labels = LABELS[lang];
  [...tabs.querySelectorAll(".league-period-btn")].forEach(btn => {
    btn.textContent = labels[btn.dataset.period];
    const on = btn.dataset.period === activePeriod;
    btn.classList.toggle("is-active",on);
    btn.setAttribute("aria-pressed",on ? "true" : "false");
  });
  leagueTitle.textContent = labels[activePeriod];
  tabs.setAttribute("aria-label", labels[activePeriod]);
  updateSearchLanguage();
  applySearch();
}

let boardObserver = null;

function observeBoard(){
  if (!boardObserver) {
    boardObserver = new MutationObserver(() => {
      boardObserver.disconnect();
      captureBaseFromFreshBoard();
      applyPeriod(activePeriod,false);
      observeBoard();
    });
  }
  boardObserver.observe(board,{childList:true});
}

function applyPeriod(period,persist=true,focusGlobe=false){
  if (!PERIODS.includes(period)) period = "today";
  activePeriod = period;

  if (boardObserver) boardObserver.disconnect();

  const rows = [...board.children];
  const unit = familyUnit();

  const scored = rows.map(li => {
    const code = String(li.dataset.countryId || "").toLowerCase();
    const base = baseVotes.has(code) ? baseVotes.get(code) : parseVote(li.querySelector(".country-votes")?.textContent);
    const score = scoreFor(code,base,period);
    return {li,code,base,score};
  });

  scored.sort((a,b) => b.score - a.score || a.code.localeCompare(b.code));

  scored.forEach((item,i) => {
    const voteEl = item.li.querySelector(".country-votes");
    const rankEl = item.li.querySelector(".rank");
    if (rankEl) rankEl.textContent = String(i+1).padStart(3,"0");
    if (voteEl) voteEl.textContent = `${item.score} ${unit}`;
    item.li.classList.toggle("is-leader",i===0);
    board.appendChild(item.li);
  });

  const top = scored[0];
  if (top) {
    const leaderCard = document.querySelector(".leader-card");
    const leaderTitleEl = document.getElementById("leaderTitle");
    const leaderVotesEl = document.getElementById("leaderVotes");
    if (leaderCard) leaderCard.dataset.countryId = top.code;
    if (leaderTitleEl) {
      const rowName = top.li.querySelector(".country-name")?.textContent || leaderTitleEl.textContent;
      leaderTitleEl.textContent = localizedCountry(top.code,rowName);
    }
    if (leaderVotesEl) leaderVotesEl.textContent = `${top.score} ${unit}`;
    setChampionFromRow(top.li);
  }

  translateTabs();

  if (persist) {
    try { localStorage.setItem("eduverse-league-period",activePeriod); } catch(e){}
  }

  if (focusGlobe && top) focusTopOnGlobe(top,unit);

  applySearch();
  observeBoard();
}

searchInput?.addEventListener("input",applySearch);
searchInput?.addEventListener("keydown",e=>{
  if (e.key === "Escape") {
    searchInput.value = "";
    applySearch();
    searchInput.blur();
  }
});
searchClear?.addEventListener("pointerdown",e=>{
  if (e.pointerType === "mouse" && e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  searchInput.value = "";
  applySearch();
  searchInput.focus();
},{passive:false});
searchClear?.addEventListener("click",e=>{
  e.preventDefault();
  e.stopPropagation();
  searchInput.value = "";
  applySearch();
  searchInput.focus();
});

tabs.querySelectorAll(".league-period-btn").forEach(btn => {
  let lastPointerSwitch = 0;

  btn.addEventListener("pointerdown",e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    lastPointerSwitch = performance.now();
    applyPeriod(btn.dataset.period,true,true);
  },{passive:false});

  btn.addEventListener("click",e => {
    e.preventDefault();
    e.stopPropagation();
    // A pointer activation already switched the period; do not run it twice.
    if (performance.now() - lastPointerSwitch < 500) return;
    applyPeriod(btn.dataset.period,true,true);
  });

  btn.addEventListener("keydown",e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      applyPeriod(btn.dataset.period,true,true);
    }
  });
});

const langObserver = new MutationObserver(() => {
  translateTabs();
  applyPeriod(activePeriod,false);
});
langObserver.observe(document.body,{attributes:true,attributeFilter:["data-edu-lang"]});

captureBaseFromFreshBoard();
applyPeriod(activePeriod,false);

window.EDUVERSE_SET_LEAGUE_PERIOD = p => applyPeriod(p,true);
})();