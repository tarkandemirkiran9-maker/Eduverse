(() => {
"use strict";
const VARIANTS = new Set(["Tek Dünya • Tek EduVerse Ailesi", "Tek Dünya · Tek EduVerse Ailesi", "Tek Dünya, Tek EduVerse Ailesi", "Tek dünya • Tek EduVerse ailesi", "Tek dünya · Tek EduVerse ailesi", "Tek dünya, tek EduVerse ailesi", "One World • One EduVerse Family", "One World · One EduVerse Family", "One World, One EduVerse Family", "One world • One EduVerse family", "One world · One EduVerse family", "One world, one EduVerse family"].map(v => v.replace(/\s+/g," ").trim().toLowerCase()));
function norm(v){ return (v || "").replace(/\s+/g," ").trim().toLowerCase(); }

function isOld(text){
  return VARIANTS.has(norm(text));
}

function removeOldSloganElements(){
  const nodes = [...document.querySelectorAll("button,a,span,div,p,strong")];
  nodes.forEach((el) => {
    if (el.id === "eduverseMissionSlogan" || el.closest("#eduverseMissionSlogan")) return;
    const text = norm(el.textContent);
    if (!isOld(text)) return;

    let target = el;
    while (
      target.parentElement &&
      norm(target.parentElement.textContent) === text &&
      !target.parentElement.matches("body,.event-row,.globe-panel,.shell")
    ){
      target = target.parentElement;
    }

    target.remove();
  });
}

function init(){
  removeOldSloganElements();

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("button,a,[role='button']");
    if (!btn) return;
    const code = norm(btn.textContent);
    if (!["tr","en","de","fr","ar"].includes(code)) return;
    window.setTimeout(removeOldSloganElements, 0);
  });
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init, {once:true});
} else {
  init();
}
})();