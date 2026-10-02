(() => {
"use strict";

const SLOGANS = {"tr":"Dünyada kaç aileye ulaştığımız kadar, o ailelerle neyi değiştirdiğimiz de önemli.","en":"How many families we reach around the world matters — and so does what we change together with them.","de":"Es zählt, wie viele Familien wir weltweit erreichen – und ebenso, was wir gemeinsam mit ihnen verändern.","fr":"Le nombre de familles que nous touchons dans le monde compte – tout autant que ce que nous changeons avec elles.","ar":"عدد العائلات التي نصل إليها حول العالم مهم، وكذلك ما نغيّره معهم."};
const LANGS = new Set(["tr","en","de","fr","ar"]);

function norm(value){
  return (value || "").replace(/\s+/g," ").trim();
}

function detectLanguage(){
  const htmlLang = (document.documentElement.lang || "").toLowerCase().slice(0,2);
  if (LANGS.has(htmlLang)) return htmlLang;

  const buttons = [...document.querySelectorAll("button,a,[role='button']")];
  for (const el of buttons){
    const code = norm(el.textContent).toLowerCase();
    if (!LANGS.has(code)) continue;

    const cls = (el.className || "").toString().toLowerCase();
    const isActive =
      cls.includes("active") ||
      cls.includes("selected") ||
      cls.includes("current") ||
      el.getAttribute("aria-pressed") === "true" ||
      el.getAttribute("aria-selected") === "true";

    if (isActive) return code;
  }

  return "tr";
}

function showLanguage(lang){
  if (!LANGS.has(lang)) lang = "tr";

  const box = document.getElementById("eduverseMissionSlogan");
  if (!box) return;

  const text = box.querySelector(".eduverse-mission-slogan__text");
  if (!text) return;

  text.textContent = SLOGANS[lang];
  box.lang = lang;
  box.dir = lang === "ar" ? "rtl" : "ltr";
}

function init(){
  showLanguage(detectLanguage());

  document.addEventListener("click", (event) => {
    const control = event.target.closest("button,a,[role='button']");
    if (!control) return;

    const code = norm(control.textContent).toLowerCase();
    if (!LANGS.has(code)) return;

    window.setTimeout(() => showLanguage(code), 0);
  });
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init, { once:true });
}else{
  init();
}
})();