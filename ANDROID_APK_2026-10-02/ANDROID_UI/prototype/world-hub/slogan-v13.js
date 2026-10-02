(() => {
"use strict";

const SLOGANS = {"tr":"Dünyada kaç aileye ulaştığımız kadar, o ailelerle neyi değiştirdiğimiz de önemli.","en":"How many families we reach around the world matters — and so does what we change together with them.","de":"Es zählt, wie viele Familien wir weltweit erreichen – und ebenso, was wir gemeinsam mit ihnen verändern.","fr":"Le nombre de familles que nous touchons dans le monde compte – tout autant que ce que nous changeons avec elles.","ar":"عدد العائلات التي نصل إليها حول العالم مهم، وكذلك ما نغيّره معهم."};
const LANGS = new Set(["tr","en","de","fr","ar"]);
let currentLang = "tr";
let observerBusy = false;

function norm(s){
  return (s || "").replace(/\s+/g," ").trim();
}

function isOldSloganText(t){
  const s = norm(t).toLocaleLowerCase("tr-TR");
  return (
    (s.includes("tek dünya") && s.includes("eduverse")) ||
    s === "dünya tek bir sahnede." ||
    s === "dünya tek bir sahnede"
  );
}

function hideOldSlogans(){
  const nodes = document.querySelectorAll("button,a,[role='button'],span,div,p,strong");
  nodes.forEach(el => {
    if (el.id === "eduverseMissionSlogan" || el.closest("#eduverseMissionSlogan")) return;
    if (!isOldSloganText(el.textContent)) return;

    let target = el;
    while (
      target.parentElement &&
      norm(target.parentElement.textContent) === norm(target.textContent) &&
      !target.parentElement.matches(".globe-panel,.event-row,body")
    ){
      target = target.parentElement;
    }

    if (!target.closest("#eduverseMissionSlogan")) {
      target.style.setProperty("display","none","important");
      target.setAttribute("aria-hidden","true");
    }
  });
}

function activeLanguage(){
  const htmlLang=(document.documentElement.lang||"").toLowerCase().slice(0,2);
  if(LANGS.has(htmlLang)) return htmlLang;

  const candidates=[...document.querySelectorAll("button,a,[role='button']")];
  for(const el of candidates){
    const code=norm(el.textContent).toLowerCase();
    if(!LANGS.has(code)) continue;
    const cls=(el.className||"").toString().toLowerCase();
    const active=
      cls.includes("active") ||
      cls.includes("selected") ||
      cls.includes("current") ||
      el.getAttribute("aria-pressed")==="true" ||
      el.getAttribute("aria-selected")==="true";
    if(active) return code;
  }
  return currentLang;
}

function ensureSlogan(){
  const panel=document.querySelector(".globe-panel");
  if(!panel) return null;

  let wrap=document.getElementById("eduverseMissionSlogan");
  if(!wrap){
    wrap=document.createElement("div");
    wrap.id="eduverseMissionSlogan";
    wrap.className="eduverse-mission-slogan";
    wrap.setAttribute("role","note");

    const text=document.createElement("p");
    text.className="eduverse-mission-slogan__text";
    wrap.appendChild(text);

    const eventRow=panel.querySelector(".event-row");
    const stage=panel.querySelector(".globe-stage");
    if(eventRow){
      panel.insertBefore(wrap,eventRow);
    }else if(stage && stage.nextSibling){
      panel.insertBefore(wrap,stage.nextSibling);
    }else{
      panel.appendChild(wrap);
    }
  }
  return wrap;
}

function render(lang){
  if(!LANGS.has(lang)) lang="tr";
  currentLang=lang;
  const wrap=ensureSlogan();
  if(!wrap) return;
  const p=wrap.querySelector(".eduverse-mission-slogan__text");
  p.textContent=SLOGANS[lang];
  wrap.lang=lang;
  wrap.dir=lang==="ar" ? "rtl" : "ltr";
}

function bindLanguageButtons(){
  document.querySelectorAll("button,a,[role='button']").forEach(el=>{
    const code=norm(el.textContent).toLowerCase();
    if(!LANGS.has(code) || el.dataset.eduverseSloganBound==="1") return;
    el.dataset.eduverseSloganBound="1";
    el.addEventListener("click",()=>setTimeout(()=>{
      currentLang=code;
      render(code);
      hideOldSlogans();
    },0));
  });
}

function refresh(){
  if(observerBusy) return;
  observerBusy=true;
  hideOldSlogans();
  bindLanguageButtons();
  render(activeLanguage());
  observerBusy=false;
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",refresh,{once:true});
}else{
  refresh();
}

const observer=new MutationObserver(()=>refresh());
observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class","aria-pressed","aria-selected","lang"]});
})();