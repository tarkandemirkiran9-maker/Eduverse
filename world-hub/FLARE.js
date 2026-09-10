(function(){
"use strict";

const CSS=`
#ev-ref-flare-field{
 position:fixed;
 inset:0;
 overflow:hidden;
 pointer-events:none;
 z-index:2147482000;
}

/* Atmosfer: filtre değil, çok düşük yoğunluklu optik ışık */
#ev-ref-atmosphere{
 position:fixed;
 inset:0;
 pointer-events:none;
 z-index:1;
 background:
  radial-gradient(ellipse at 48% 4%,
   rgba(33,151,224,.075) 0%,
   rgba(15,104,190,.035) 32%,
   transparent 62%),
  linear-gradient(180deg,
   rgba(20,111,194,.035),
   transparent 46%);
 mix-blend-mode:screen;
}

.ev-flare{
 --rot:45deg;
 --long:100px;
 --short:28px;
 --core:3px;
 --power:1;
 position:absolute;
 width:1px;
 height:1px;
 opacity:0;
 transform:translate(-50%,-50%) rotate(var(--rot));
 will-change:opacity,transform,filter;
}

/* BEYAZ, COK KUCUK CEKIRDEK */
.ev-flare .core{
 position:absolute;
 left:50%;
 top:50%;
 width:var(--core);
 height:var(--core);
 transform:translate(-50%,-50%);
 border-radius:50%;
 background:rgba(255,255,255,1);
 box-shadow:
  0 0 2px rgba(255,255,255,1),
  0 0 5px rgba(209,248,255,.95),
  0 0 9px rgba(65,194,255,.52);
}

/* REFERANSTAKI UZUN X ISINLARI */
.ev-flare .rayA,
.ev-flare .rayB{
 position:absolute;
 left:50%;
 top:50%;
 width:var(--long);
 height:2px;
 transform-origin:center;
}

/* merkezden dışarı cyan -> blue -> transparan */
.ev-flare .rayA{
 transform:translate(-50%,-50%);
 background:
 linear-gradient(90deg,
  transparent 0%,
  rgba(20,137,220,.02) 9%,
  rgba(41,177,240,.10) 25%,
  rgba(120,224,255,.38) 42%,
  rgba(240,253,255,.98) 49%,
  #fff 50%,
  rgba(240,253,255,.98) 51%,
  rgba(120,224,255,.38) 58%,
  rgba(41,177,240,.10) 75%,
  rgba(20,137,220,.02) 91%,
  transparent 100%);
 filter:
  drop-shadow(0 0 2px rgba(164,237,255,.70))
  drop-shadow(0 0 5px rgba(28,159,235,.34));
}

.ev-flare .rayB{
 transform:translate(-50%,-50%) rotate(90deg);
 background:
 linear-gradient(90deg,
  transparent 0%,
  rgba(20,137,220,.02) 9%,
  rgba(41,177,240,.10) 25%,
  rgba(120,224,255,.38) 42%,
  rgba(240,253,255,.98) 49%,
  #fff 50%,
  rgba(240,253,255,.98) 51%,
  rgba(120,224,255,.38) 58%,
  rgba(41,177,240,.10) 75%,
  rgba(20,137,220,.02) 91%,
  transparent 100%);
 filter:
  drop-shadow(0 0 2px rgba(164,237,255,.70))
  drop-shadow(0 0 5px rgba(28,159,235,.30));
}

/* bazı parlamalardaki daha kısa ikincil kırınım */
.ev-flare .rayC,
.ev-flare .rayD{
 position:absolute;
 left:50%;
 top:50%;
 width:var(--short);
 height:1px;
 transform-origin:center;
 opacity:.46;
 background:
 linear-gradient(90deg,
  transparent,
  rgba(127,226,255,.22),
  rgba(255,255,255,.92),
  rgba(127,226,255,.22),
  transparent);
}

.ev-flare .rayC{
 transform:translate(-50%,-50%) rotate(45deg);
}

.ev-flare .rayD{
 transform:translate(-50%,-50%) rotate(-45deg);
}

/* yuvarlak halo YOK */

@media(prefers-reduced-motion:reduce){
 #ev-ref-flare-field{display:none!important}
}
`;

const style=document.createElement("style");
style.textContent=CSS;
document.head.appendChild(style);

const atmosphere=document.createElement("div");
atmosphere.id="ev-ref-atmosphere";
atmosphere.setAttribute("aria-hidden","true");
document.body.appendChild(atmosphere);

const field=document.createElement("div");
field.id="ev-ref-flare-field";
field.setAttribute("aria-hidden","true");
document.body.appendChild(field);

/*
 Referansa gore:
 buyuk = seyrek
 orta = ana doku
 mikro = ara parilti
 grid yok
*/
const SPEC=[
 {x:8, y:12,type:"big", rot:44},
 {x:18,y:25,type:"big", rot:43},
 {x:91,y:14,type:"mid", rot:46},

 {x:35,y:31,type:"mid", rot:45},
 {x:67,y:38,type:"micro",rot:44},
 {x:11,y:52,type:"mid",rot:46},
 {x:23,y:61,type:"micro",rot:43},

 {x:89,y:55,type:"mid",rot:45},
 {x:31,y:73,type:"mid",rot:44},
 {x:52,y:68,type:"micro",rot:46},
 {x:74,y:78,type:"mid",rot:43},

 {x:9,y:88,type:"big",rot:45},
 {x:48,y:89,type:"micro",rot:44},
 {x:87,y:91,type:"big",rot:46}
];

function geometry(type){
 if(type==="big"){
  return {
   long:125+Math.random()*35,
   short:32+Math.random()*13,
   core:3.2+Math.random()*1.3,
   peak:.88+Math.random()*.12
  };
 }
 if(type==="mid"){
  return {
   long:62+Math.random()*27,
   short:20+Math.random()*10,
   core:2.4+Math.random()*.9,
   peak:.66+Math.random()*.22
  };
 }
 return {
  long:25+Math.random()*18,
  short:10+Math.random()*8,
  core:1.8+Math.random()*.7,
  peak:.42+Math.random()*.20
 };
}

const items=SPEC.map(s=>{
 const g=geometry(s.type);
 const e=document.createElement("div");
 e.className="ev-flare";
 e.dataset.type=s.type;
 e.style.left=s.x+"%";
 e.style.top=s.y+"%";
 e.style.setProperty("--rot",s.rot+"deg");
 e.style.setProperty("--long",g.long+"px");
 e.style.setProperty("--short",g.short+"px");
 e.style.setProperty("--core",g.core+"px");
 e.dataset.peak=g.peak;
 e.innerHTML=
  '<i class="rayA"></i>'+
  '<i class="rayB"></i>'+
  '<i class="rayC"></i>'+
  '<i class="rayD"></i>'+
  '<i class="core"></i>';
 field.appendChild(e);
 return e;
});

function fire(e){
 const type=e.dataset.type;
 const peak=parseFloat(e.dataset.peak);

 let duration;
 if(type==="big") duration=1500+Math.random()*550;
 else if(type==="mid") duration=1100+Math.random()*450;
 else duration=750+Math.random()*350;

 /*
  Referans ritmi:
  once ince iz belirir
  merkez cok kisa sure peak yapar
  isin genisler
  sonra hizla enerji kaybeder
 */
 e.animate([
  {
   opacity:0,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.20)",
   filter:"brightness(.75)",
   offset:0
  },
  {
   opacity:.12,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.46)",
   filter:"brightness(.90)",
   offset:.18
  },
  {
   opacity:peak*.62,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.83)",
   filter:"brightness(1.12)",
   offset:.36
  },
  {
   opacity:peak,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(1.08)",
   filter:"brightness(1.48)",
   offset:.48
  },
  {
   opacity:peak*.55,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.94)",
   filter:"brightness(1.12)",
   offset:.65
  },
  {
   opacity:.10,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.72)",
   filter:"brightness(.90)",
   offset:.84
  },
  {
   opacity:0,
   transform:
    "translate(-50%,-50%) rotate(var(--rot)) scale(.48)",
   filter:"brightness(.75)",
   offset:1
  }
 ],{
  duration:duration,
  easing:"cubic-bezier(.18,.70,.20,1)",
  fill:"none"
 });
}

function nextDelay(type){
 if(type==="big") return 4800+Math.random()*6500;
 if(type==="mid") return 2600+Math.random()*4600;
 return 1500+Math.random()*3300;
}

function cycle(e){
 setTimeout(()=>{
  fire(e);
  cycle(e);
 },nextDelay(e.dataset.type));
}

/* baslangicta hepsinin ayni anda yanmasini engelle */
items.forEach((e,i)=>{
 setTimeout(()=>cycle(e),350+i*170+Math.random()*1500);
});

})();