/* EDUVERSE_HARD_LANGUAGE_V1 */
(() => {
"use strict";

if (window.__EDUVERSE_HARD_LANGUAGE_V1__) return;
window.__EDUVERSE_HARD_LANGUAGE_V1__ = true;

const LANGS = ["tr","en","de","fr","ar"];
const I = window.EDUVERSE_I18N = window.EDUVERSE_I18N || {};
I.locales = I.locales || {tr:"tr-TR",en:"en-US",de:"de-DE",fr:"fr-FR",ar:"ar"};

const T = {
  tr: {
    eyebrow:"EDUVERSE DÜNYA MERKEZİ",
    brand:"EduVerse Dünya",
    globeKicker:"DÜNYA KÜRESİ",
    slogan:"Dünyada kaç aileye ulaştığımız kadar, o ailelerle neyi değiştirdiğimiz de önemli.",
    plus:"+1 Aile",
    leaderChange:"Lider Değişimi",
    theme:"Tema",
    leaderLabel:"LİDER",
    leaderNow:"Şu an",
    newLeader:"YENİ LİDER",
    league:"DÜNYA LİGİ",
    today:"Bugün",
    live:"CANLI",
    lastEvent:"SON OLAY",
    leads:"Dünya Ligi'nde lider.",
    familyUnit:"aile",
    fundTitle:"İyilik Fonu",
    fundLive:"Gerçek mevcut tutar",
    method:"Hesaplama yöntemi",
    period:"Dönem",
    verified:"Doğrulanmış projeler",
    p1:"Eğitim / burs / materyal",
    p2:"Çocuk sağlığı",
    p3:"Okul / kütüphane / teknoloji desteği",
    vote:"Topluluk oy sonucu",
    proof:"Ödeme / tamamlanma kanıtı",
    archive:"Geçmiş projeler arşivi",
    langAria:"Dil seçimi",
    globeAria:"EduVerse dünya küresi",
    pageTitle:"EduVerse • Dünya Merkezi"
  },
  en: {
    eyebrow:"EDUVERSE WORLD HUB",
    brand:"EduVerse World",
    globeKicker:"WORLD GLOBE",
    slogan:"How many families we reach around the world matters — and so does what we change together with them.",
    plus:"+1 Family",
    leaderChange:"Leader Change",
    theme:"Theme",
    leaderLabel:"LEADER",
    leaderNow:"Now",
    newLeader:"NEW LEADER",
    league:"WORLD LEAGUE",
    today:"Today",
    live:"LIVE",
    lastEvent:"LATEST EVENT",
    leads:"leads the World League.",
    familyUnit:"families",
    fundTitle:"Goodness Fund",
    fundLive:"Current live amount",
    method:"Calculation method",
    period:"Period",
    verified:"Verified projects",
    p1:"Education / scholarship / materials",
    p2:"Child health",
    p3:"School / library / technology support",
    vote:"Community vote result",
    proof:"Payment / completion proof",
    archive:"Past projects archive",
    langAria:"Language selector",
    globeAria:"EduVerse world globe",
    pageTitle:"EduVerse • World Hub"
  },
  de: {
    eyebrow:"EDUVERSE WELTZENTRUM",
    brand:"EduVerse Welt",
    globeKicker:"WELTKUGEL",
    slogan:"Es zählt, wie viele Familien wir weltweit erreichen – und ebenso, was wir gemeinsam mit ihnen verändern.",
    plus:"+1 Familie",
    leaderChange:"Führungswechsel",
    theme:"Thema",
    leaderLabel:"SPITZENREITER",
    leaderNow:"Aktuell",
    newLeader:"NEUER SPITZENREITER",
    league:"WELTLIGA",
    today:"Heute",
    live:"LIVE",
    lastEvent:"LETZTES EREIGNIS",
    leads:"führt die Weltliga an.",
    familyUnit:"Familien",
    fundTitle:"Hilfsfonds",
    fundLive:"Aktueller Betrag",
    method:"Berechnungsmethode",
    period:"Zeitraum",
    verified:"Verifizierte Projekte",
    p1:"Bildung / Stipendien / Materialien",
    p2:"Kindergesundheit",
    p3:"Schule / Bibliothek / Technologiehilfe",
    vote:"Ergebnis der Community-Abstimmung",
    proof:"Zahlungs- / Abschlussnachweis",
    archive:"Archiv früherer Projekte",
    langAria:"Sprachauswahl",
    globeAria:"EduVerse Weltkugel",
    pageTitle:"EduVerse • Weltzentrum"
  },
  fr: {
    eyebrow:"EDUVERSE CENTRE DU MONDE",
    brand:"EduVerse Monde",
    globeKicker:"GLOBE MONDIAL",
    slogan:"Le nombre de familles que nous touchons dans le monde compte – tout autant que ce que nous changeons avec elles.",
    plus:"+1 Famille",
    leaderChange:"Changement de leader",
    theme:"Thème",
    leaderLabel:"EN TÊTE",
    leaderNow:"Actuellement",
    newLeader:"NOUVEAU LEADER",
    league:"LIGUE MONDIALE",
    today:"Aujourd’hui",
    live:"EN DIRECT",
    lastEvent:"DERNIER ÉVÉNEMENT",
    leads:"est en tête de la Ligue mondiale.",
    familyUnit:"familles",
    fundTitle:"Fonds solidaire",
    fundLive:"Montant actuel",
    method:"Méthode de calcul",
    period:"Période",
    verified:"Projets vérifiés",
    p1:"Éducation / bourses / matériel",
    p2:"Santé des enfants",
    p3:"École / bibliothèque / soutien technologique",
    vote:"Résultat du vote de la communauté",
    proof:"Preuve de paiement / d’achèvement",
    archive:"Archive des projets passés",
    langAria:"Sélection de la langue",
    globeAria:"Globe mondial EduVerse",
    pageTitle:"EduVerse • Monde"
  },
  ar: {
    eyebrow:"EDUVERSE مركز العالم",
    brand:"EduVerse العالم",
    globeKicker:"الكرة الأرضية",
    slogan:"عدد العائلات التي نصل إليها حول العالم مهم، وكذلك ما نغيّره معهم.",
    plus:"+1 عائلة",
    leaderChange:"تغيير المتصدر",
    theme:"السمة",
    leaderLabel:"المتصدر",
    leaderNow:"الآن",
    newLeader:"متصدر جديد",
    league:"الدوري العالمي",
    today:"اليوم",
    live:"مباشر",
    lastEvent:"آخر حدث",
    leads:"في صدارة الدوري العالمي.",
    familyUnit:"عائلة",
    fundTitle:"صندوق الخير",
    fundLive:"المبلغ الحالي",
    method:"طريقة الحساب",
    period:"الفترة",
    verified:"المشاريع الموثقة",
    p1:"التعليم / المنح / المواد",
    p2:"صحة الأطفال",
    p3:"المدرسة / المكتبة / دعم التكنولوجيا",
    vote:"نتيجة تصويت المجتمع",
    proof:"إثبات الدفع / الاكتمال",
    archive:"أرشيف المشاريع السابقة",
    langAria:"اختيار اللغة",
    globeAria:"الكرة الأرضية EduVerse",
    pageTitle:"EduVerse • مركز العالم"
  }
};

const q = (s, r=document) => r.querySelector(s);
const qa = (s, r=document) => [...r.querySelectorAll(s)];
const norm = s => String(s || "").replace(/\s+/g, " ").trim();
const numberIn = s => {
  const m = String(s || "").match(/\d+/);
  return m ? m[0] : "";
};

function countryName(code, fallback="") {
  try {
    const locale = I.locales[I.lang] || I.locales.tr;
    const dn = new Intl.DisplayNames([locale], {type:"region"});
    return dn.of(String(code || "").toUpperCase()) || fallback || code;
  } catch (e) {
    return fallback || code;
  }
}

function setText(el, value) {
  if (el && norm(el.textContent) !== value) el.textContent = value;
}

function setFamilyText(el, t) {
  if (!el) return;
  const n = numberIn(el.textContent);
  if (n) setText(el, `${n} ${t.familyUnit}`);
}

function countryCodeFrom(root) {
  if (!root) return "";
  const ds = String(root.dataset?.countryId || root.dataset?.country || "").toLowerCase();
  if (/^[a-z]{2}$/.test(ds)) return ds;
  const img = root.querySelector?.("img");
  if (img) {
    const src = String(img.getAttribute("src") || img.src || "");
    const m = src.match(/flagcdn\.com\/(?:w\d+\/)?([a-z]{2})\.(?:png|webp|jpg|jpeg|svg)/i);
    if (m) return m[1].toLowerCase();
  }
  return "";
}

function ensureSelector() {
  let box = document.getElementById("worldLanguageSelector");
  if (!box) {
    const row = q(".event-row");
    if (!row) return null;
    box = document.createElement("div");
    box.id = "worldLanguageSelector";
    box.className = "world-language-selector";
    box.innerHTML = LANGS.map(l =>
      `<button type="button" class="world-lang-btn" data-lang="${l}" aria-pressed="false">${l.toUpperCase()}</button>`
    ).join("");
    row.appendChild(box);
  }
  return box;
}

function translateCountries(t) {
  qa(".leaderboard li[data-country-id]").forEach(li => {
    const code = String(li.dataset.countryId || "").toLowerCase();
    if (!code) return;
    setText(q(".country-name", li), countryName(code, norm(q(".country-name", li)?.textContent)));
    setFamilyText(q(".country-votes", li), t);
  });

  const leader = q(".leader-card");
  const leaderCode = countryCodeFrom(leader);
  if (leaderCode) setText(document.getElementById("leaderTitle"), countryName(leaderCode, ""));
  setFamilyText(document.getElementById("leaderVotes"), t);

  const focus = document.getElementById("focusCard");
  const focusCode = countryCodeFrom(focus);
  if (focusCode) setText(document.getElementById("focusName"), countryName(focusCode, ""));
  setFamilyText(document.getElementById("focusMeta"), t);

  const burstName = document.getElementById("leaderBurstName");
  const burstCode = leaderCode || focusCode;
  if (burstName && burstCode) setText(burstName, countryName(burstCode, norm(burstName.textContent)));
}

function translateFund(t) {
  const fund = document.getElementById("goodnessFund");
  if (!fund) return;

  qa(".goodness-lang", fund).forEach(el => el.remove());

  setText(document.getElementById("goodnessFundTitle"), t.fundTitle);
  setText(q(".fund-core span", fund), t.fundLive);

  const meta = qa(".fund-meta-card span", fund);
  if (meta[0]) setText(meta[0], t.method);
  if (meta[1]) setText(meta[1], t.period);

  setText(q(".fund-section-title", fund), t.verified);

  const projects = qa(".project-card strong", fund);
  if (projects[0]) setText(projects[0], t.p1);
  if (projects[1]) setText(projects[1], t.p2);
  if (projects[2]) setText(projects[2], t.p3);

  const proof = qa(".proof-row span", fund);
  if (proof[0]) setText(proof[0], t.vote);
  if (proof[1]) setText(proof[1], t.proof);
  if (proof[2]) setText(proof[2], t.archive);

  fund.lang = I.lang;
  fund.dir = "ltr";
}

function translateStatic(t) {
  setText(q(".topbar .eyebrow"), t.eyebrow);
  setText(q(".topbar h1"), t.brand);
  setText(q(".globe-panel .kicker"), t.globeKicker);
  setText(q(".globe-panel .panel-head h2"), t.slogan);
  setText(q("#eduverseMissionSlogan .eduverse-mission-slogan__text"), t.slogan);

  setText(document.getElementById("demoEventBtn"), t.plus);
  setText(document.getElementById("leaderDemoBtn"), t.leaderChange);
  setText(document.getElementById("themeCycleBtn"), t.theme);

  setText(q(".leader-card .section-label"), t.leaderLabel);
  setText(q(".leader-card .leader-copy p"), t.leaderNow);
  setText(q(".leader-burst span"), t.newLeader);

  setText(q(".league-card .section-label"), t.league);
  setText(q(".league-card .league-head h3"), t.today);

  const live = q(".live-dot");
  if (live) {
    const textNode = [...live.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = ` ${t.live}`;
    else live.appendChild(document.createTextNode(` ${t.live}`));
  }

  setText(q(".signal-card .section-label"), t.lastEvent);

  const leader = q(".leader-card");
  const leaderCode = countryCodeFrom(leader);
  const leaderName = leaderCode ? countryName(leaderCode, "") : norm(document.getElementById("leaderTitle")?.textContent);
  const eventText = document.getElementById("eventText");
  if (eventText && leaderName) {
    if (I.lang === "tr") setText(eventText, `${leaderName} ${t.leads}`);
    else if (I.lang === "ar") setText(eventText, `${leaderName} ${t.leads}`);
    else setText(eventText, `${leaderName} ${t.leads}`);
  }

  const globe = document.getElementById("globe");
  if (globe) globe.setAttribute("aria-label", t.globeAria);

  const selector = ensureSelector();
  if (selector) selector.setAttribute("aria-label", t.langAria);

  document.title = t.pageTitle;
}

function refreshDynamic() {
  const t = T[I.lang] || T.tr;
  translateCountries(t);
}

function applyLanguage(lang, persist=true) {
  if (!T[lang]) lang = "tr";
  I.lang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = "ltr";
  document.body.dataset.eduLang = lang;

  const t = T[lang];
  translateStatic(t);
  translateCountries(t);
  translateFund(t);

  qa(".world-lang-btn").forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (persist) {
    try { localStorage.setItem("eduverse-world-language", lang); } catch (e) {}
  }

  let marker = document.getElementById("eduverseLangState");
  if (!marker) {
    marker = document.createElement("span");
    marker.id = "eduverseLangState";
    marker.hidden = true;
    document.body.appendChild(marker);
  }
  marker.dataset.lang = lang;
  marker.dataset.status = "applied";
}

window.EDUVERSE_SET_LANGUAGE = lang => applyLanguage(lang, true);
window.EDUVERSE_REFRESH_LANGUAGE = refreshDynamic;

document.addEventListener("click", e => {
  const btn = e.target.closest?.(".world-lang-btn[data-lang]");
  if (!btn) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  applyLanguage(btn.dataset.lang, true);
}, true);

function boot() {
  ensureSelector();

  let initial = "tr";
  try {
    const saved = localStorage.getItem("eduverse-world-language");
    if (saved && T[saved]) initial = saved;
  } catch (e) {}

  applyLanguage(initial, false);

  // Dynamic app actions can redraw country/family text. Re-assert only language text,
  // never globe rendering, texture, theme, rotation or background-stream geometry.
  document.addEventListener("click", e => {
    if (e.target.closest?.("#demoEventBtn,#leaderDemoBtn,.leaderboard li,.leader-card")) {
      setTimeout(refreshDynamic, 0);
    }
  }, false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, {once:true});
} else {
  boot();
}
})();
