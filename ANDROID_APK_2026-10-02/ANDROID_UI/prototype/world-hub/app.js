/* EDUVERSE_GLOBAL_I18N_BOOTSTRAP_V5 */
(() => {
  const I = window.EDUVERSE_I18N = window.EDUVERSE_I18N || {};
  I.locales = {tr:"tr-TR",en:"en-US",de:"de-DE",fr:"fr-FR",ar:"ar"};
  I.lang = I.lang || "tr";
  I.familyWords = {tr:"Aile",en:"Family",de:"Familie",fr:"Famille",ar:"عائلة"};
  I.familyUnits = {tr:"aile",en:"families",de:"Familien",fr:"familles",ar:"عائلة"};
  I.countryName = function(code,fallback){
    try{
      const locale=this.locales[this.lang]||this.locales.tr;
      const dn=new Intl.DisplayNames([locale],{type:"region"});
      return dn.of(String(code||"").toUpperCase()) || fallback || code;
    }catch(e){ return fallback || code; }
  };
  I.familyWord = function(){ return this.familyWords[this.lang] || this.familyWords.tr; };
  I.familyUnit = function(){ return this.familyUnits[this.lang] || this.familyUnits.tr; };
  I.missions = {
    tr:"Tek Dünya • Tek EduVerse Ailesi",
    en:"One World • One EduVerse Family",
    de:"Eine Welt • Eine EduVerse-Familie",
    fr:"Un monde • Une famille EduVerse",
    ar:"عالم واحد • عائلة EduVerse واحدة"
  };
  I.mission = function(){ return this.missions[this.lang] || this.missions.tr; };
  I.flagAlt = function(name){
    const map={
      tr:name+" bayrağı",
      en:name+" flag",
      de:"Flagge von "+name,
      fr:"Drapeau de "+name,
      ar:"علم "+name
    };
    return map[this.lang] || map.tr;
  };
  I.eventPlus = function(name){
    const map={
      tr:name+" +1 yeni aile kazandı.",
      en:name+" gained +1 new family.",
      de:name+" hat +1 neue Familie gewonnen.",
      fr:name+" a gagné +1 nouvelle famille.",
      ar:"تمت إضافة عائلة جديدة إلى "+name+"."
    };
    return map[this.lang] || map.tr;
  };
  I.eventLeader = function(name){
    const map={
      tr:name+" liderliği aldı.",
      en:name+" took the lead.",
      de:name+" hat die Führung übernommen.",
      fr:name+" prend la tête.",
      ar:name+" أصبحت في الصدارة."
    };
    return map[this.lang] || map.tr;
  };
  try{
    const qs=new URLSearchParams(location.search);
    const q=qs.get("lang");
    const saved=localStorage.getItem("eduverse-world-language");
    if(q && I.locales[q]) I.lang=q;
    else if(saved && I.locales[saved]) I.lang=saved;
  }catch(e){}
})();

(() => {
"use strict";

const canvas=document.getElementById("globe");
const ctx=canvas.getContext("2d",{alpha:true});
const focusCard=document.getElementById("focusCard");
const focusFlag=document.getElementById("focusFlag");
const focusName=document.getElementById("focusName");
const focusMeta=document.getElementById("focusMeta");
const leaderBurst=document.getElementById("leaderBurst");
const leaderBurstName=document.getElementById("leaderBurstName");
const leaderboard=document.getElementById("leaderboard");
const championFlag=document.getElementById("championFlag");
const leaderTitle=document.getElementById("leaderTitle");
const leaderVotes=document.getElementById("leaderVotes");
const eventText=document.getElementById("eventText");
const demoEventBtn=document.getElementById("demoEventBtn");
const leaderDemoBtn=document.getElementById("leaderDemoBtn");
const missionChip=document.getElementById("missionChip");
if(missionChip) missionChip.textContent=window.EDUVERSE_I18N?.mission?.()||"Tek Dünya • Tek EduVerse Ailesi";

const countries=[{"id":"af","name":"Afganistan","code":"AF","votes":8},{"id":"al","name":"Arnavutluk","code":"AL","votes":37},{"id":"dz","name":"Cezayir","code":"DZ","votes":66},{"id":"ad","name":"Andorra","code":"AD","votes":95},{"id":"ao","name":"Angola","code":"AO","votes":124},{"id":"ag","name":"Antigua ve Barbuda","code":"AG","votes":32},{"id":"ar","name":"Arjantin","code":"AR","votes":61},{"id":"am","name":"Ermenistan","code":"AM","votes":90},{"id":"au","name":"Avustralya","code":"AU","votes":102},{"id":"at","name":"Avusturya","code":"AT","votes":27},{"id":"az","name":"Azerbaycan","code":"AZ","votes":56},{"id":"bs","name":"Bahamalar","code":"BS","votes":85},{"id":"bh","name":"Bahreyn","code":"BH","votes":114},{"id":"bd","name":"Bangladeş","code":"BD","votes":22},{"id":"bb","name":"Barbados","code":"BB","votes":51},{"id":"by","name":"Belarus","code":"BY","votes":80},{"id":"be","name":"Belçika","code":"BE","votes":109},{"id":"bz","name":"Belize","code":"BZ","votes":17},{"id":"bj","name":"Benin","code":"BJ","votes":46},{"id":"bt","name":"Butan","code":"BT","votes":75},{"id":"bo","name":"Bolivya","code":"BO","votes":104},{"id":"ba","name":"Bosna-Hersek","code":"BA","votes":12},{"id":"bw","name":"Botsvana","code":"BW","votes":41},{"id":"br","name":"Brezilya","code":"BR","votes":111},{"id":"bn","name":"Brunei","code":"BN","votes":99},{"id":"bg","name":"Bulgaristan","code":"BG","votes":128},{"id":"bf","name":"Burkina Faso","code":"BF","votes":36},{"id":"bi","name":"Burundi","code":"BI","votes":65},{"id":"cv","name":"Cabo Verde","code":"CV","votes":94},{"id":"kh","name":"Kamboçya","code":"KH","votes":123},{"id":"cm","name":"Kamerun","code":"CM","votes":31},{"id":"ca","name":"Kanada","code":"CA","votes":105},{"id":"cf","name":"Orta Afrika Cumhuriyeti","code":"CF","votes":89},{"id":"td","name":"Çad","code":"TD","votes":118},{"id":"cl","name":"Şili","code":"CL","votes":26},{"id":"cn","name":"Çin","code":"CN","votes":55},{"id":"co","name":"Kolombiya","code":"CO","votes":84},{"id":"km","name":"Komorlar","code":"KM","votes":113},{"id":"cg","name":"Kongo Cumhuriyeti","code":"CG","votes":21},{"id":"cd","name":"Kongo Demokratik Cumhuriyeti","code":"CD","votes":50},{"id":"cr","name":"Kosta Rika","code":"CR","votes":79},{"id":"ci","name":"Fildişi Sahili","code":"CI","votes":108},{"id":"hr","name":"Hırvatistan","code":"HR","votes":16},{"id":"cu","name":"Küba","code":"CU","votes":45},{"id":"cy","name":"Kıbrıs","code":"CY","votes":74},{"id":"cz","name":"Çekya","code":"CZ","votes":103},{"id":"dk","name":"Danimarka","code":"DK","votes":11},{"id":"dj","name":"Cibuti","code":"DJ","votes":40},{"id":"dm","name":"Dominika","code":"DM","votes":69},{"id":"do","name":"Dominik Cumhuriyeti","code":"DO","votes":98},{"id":"ec","name":"Ekvador","code":"EC","votes":127},{"id":"eg","name":"Mısır","code":"EG","votes":35},{"id":"sv","name":"El Salvador","code":"SV","votes":64},{"id":"gq","name":"Ekvator Ginesi","code":"GQ","votes":93},{"id":"er","name":"Eritre","code":"ER","votes":122},{"id":"ee","name":"Estonya","code":"EE","votes":30},{"id":"sz","name":"Esvatini","code":"SZ","votes":59},{"id":"et","name":"Etiyopya","code":"ET","votes":88},{"id":"fj","name":"Fiji","code":"FJ","votes":117},{"id":"fi","name":"Finlandiya","code":"FI","votes":25},{"id":"fr","name":"Fransa","code":"FR","votes":125},{"id":"ga","name":"Gabon","code":"GA","votes":83},{"id":"gm","name":"Gambiya","code":"GM","votes":112},{"id":"ge","name":"Gürcistan","code":"GE","votes":20},{"id":"de","name":"Almanya","code":"DE","votes":130},{"id":"gh","name":"Gana","code":"GH","votes":78},{"id":"gr","name":"Yunanistan","code":"GR","votes":107},{"id":"gd","name":"Grenada","code":"GD","votes":15},{"id":"gt","name":"Guatemala","code":"GT","votes":44},{"id":"gn","name":"Gine","code":"GN","votes":73},{"id":"gw","name":"Gine-Bissau","code":"GW","votes":102},{"id":"gy","name":"Guyana","code":"GY","votes":10},{"id":"ht","name":"Haiti","code":"HT","votes":39},{"id":"hn","name":"Honduras","code":"HN","votes":68},{"id":"hu","name":"Macaristan","code":"HU","votes":97},{"id":"is","name":"İzlanda","code":"IS","votes":126},{"id":"in","name":"Hindistan","code":"IN","votes":34},{"id":"id","name":"Endonezya","code":"ID","votes":63},{"id":"ir","name":"İran","code":"IR","votes":92},{"id":"iq","name":"Irak","code":"IQ","votes":121},{"id":"ie","name":"İrlanda","code":"IE","votes":29},{"id":"il","name":"İsrail","code":"IL","votes":96},{"id":"it","name":"İtalya","code":"IT","votes":107},{"id":"jm","name":"Jamaika","code":"JM","votes":116},{"id":"jp","name":"Japonya","code":"JP","votes":122},{"id":"jo","name":"Ürdün","code":"JO","votes":53},{"id":"kz","name":"Kazakistan","code":"KZ","votes":82},{"id":"ke","name":"Kenya","code":"KE","votes":111},{"id":"ki","name":"Kiribati","code":"KI","votes":19},{"id":"kp","name":"Kuzey Kore","code":"KP","votes":48},{"id":"kr","name":"Güney Kore","code":"KR","votes":77},{"id":"kw","name":"Kuveyt","code":"KW","votes":106},{"id":"kg","name":"Kırgızistan","code":"KG","votes":14},{"id":"la","name":"Laos","code":"LA","votes":43},{"id":"lv","name":"Letonya","code":"LV","votes":72},{"id":"lb","name":"Lübnan","code":"LB","votes":101},{"id":"ls","name":"Lesotho","code":"LS","votes":9},{"id":"lr","name":"Liberya","code":"LR","votes":38},{"id":"ly","name":"Libya","code":"LY","votes":67},{"id":"li","name":"Lihtenştayn","code":"LI","votes":96},{"id":"lt","name":"Litvanya","code":"LT","votes":125},{"id":"lu","name":"Lüksemburg","code":"LU","votes":33},{"id":"mg","name":"Madagaskar","code":"MG","votes":62},{"id":"mw","name":"Malavi","code":"MW","votes":91},{"id":"my","name":"Malezya","code":"MY","votes":120},{"id":"mv","name":"Maldivler","code":"MV","votes":28},{"id":"ml","name":"Mali","code":"ML","votes":57},{"id":"mt","name":"Malta","code":"MT","votes":86},{"id":"mh","name":"Marshall Adaları","code":"MH","votes":115},{"id":"mr","name":"Moritanya","code":"MR","votes":23},{"id":"mu","name":"Mauritius","code":"MU","votes":52},{"id":"mx","name":"Meksika","code":"MX","votes":81},{"id":"fm","name":"Mikronezya","code":"FM","votes":110},{"id":"md","name":"Moldova","code":"MD","votes":18},{"id":"mc","name":"Monako","code":"MC","votes":47},{"id":"mn","name":"Moğolistan","code":"MN","votes":76},{"id":"me","name":"Karadağ","code":"ME","votes":105},{"id":"ma","name":"Fas","code":"MA","votes":13},{"id":"mz","name":"Mozambik","code":"MZ","votes":42},{"id":"mm","name":"Myanmar","code":"MM","votes":71},{"id":"na","name":"Namibya","code":"NA","votes":100},{"id":"nr","name":"Nauru","code":"NR","votes":8},{"id":"np","name":"Nepal","code":"NP","votes":37},{"id":"nl","name":"Hollanda","code":"NL","votes":66},{"id":"nz","name":"Yeni Zelanda","code":"NZ","votes":95},{"id":"ni","name":"Nikaragua","code":"NI","votes":124},{"id":"ne","name":"Nijer","code":"NE","votes":32},{"id":"ng","name":"Nijerya","code":"NG","votes":61},{"id":"mk","name":"Kuzey Makedonya","code":"MK","votes":90},{"id":"no","name":"Norveç","code":"NO","votes":119},{"id":"om","name":"Umman","code":"OM","votes":27},{"id":"pk","name":"Pakistan","code":"PK","votes":56},{"id":"pw","name":"Palau","code":"PW","votes":85},{"id":"pa","name":"Panama","code":"PA","votes":114},{"id":"pg","name":"Papua Yeni Gine","code":"PG","votes":22},{"id":"py","name":"Paraguay","code":"PY","votes":51},{"id":"pe","name":"Peru","code":"PE","votes":80},{"id":"ph","name":"Filipinler","code":"PH","votes":109},{"id":"pl","name":"Polonya","code":"PL","votes":17},{"id":"pt","name":"Portekiz","code":"PT","votes":46},{"id":"qa","name":"Katar","code":"QA","votes":75},{"id":"ro","name":"Romanya","code":"RO","votes":104},{"id":"ru","name":"Rusya","code":"RU","votes":12},{"id":"rw","name":"Ruanda","code":"RW","votes":41},{"id":"kn","name":"Saint Kitts ve Nevis","code":"KN","votes":70},{"id":"lc","name":"Saint Lucia","code":"LC","votes":99},{"id":"vc","name":"Saint Vincent ve Grenadinler","code":"VC","votes":128},{"id":"ws","name":"Samoa","code":"WS","votes":36},{"id":"sm","name":"San Marino","code":"SM","votes":65},{"id":"st","name":"São Tomé ve Príncipe","code":"ST","votes":94},{"id":"sa","name":"Suudi Arabistan","code":"SA","votes":123},{"id":"sn","name":"Senegal","code":"SN","votes":31},{"id":"rs","name":"Sırbistan","code":"RS","votes":60},{"id":"sc","name":"Seyşeller","code":"SC","votes":89},{"id":"sl","name":"Sierra Leone","code":"SL","votes":118},{"id":"sg","name":"Singapur","code":"SG","votes":26},{"id":"sk","name":"Slovakya","code":"SK","votes":55},{"id":"si","name":"Slovenya","code":"SI","votes":84},{"id":"sb","name":"Solomon Adaları","code":"SB","votes":113},{"id":"so","name":"Somali","code":"SO","votes":21},{"id":"za","name":"Güney Afrika","code":"ZA","votes":50},{"id":"ss","name":"Güney Sudan","code":"SS","votes":79},{"id":"es","name":"İspanya","code":"ES","votes":109},{"id":"lk","name":"Sri Lanka","code":"LK","votes":16},{"id":"sd","name":"Sudan","code":"SD","votes":45},{"id":"sr","name":"Surinam","code":"SR","votes":74},{"id":"se","name":"İsveç","code":"SE","votes":103},{"id":"ch","name":"İsviçre","code":"CH","votes":11},{"id":"sy","name":"Suriye","code":"SY","votes":40},{"id":"tj","name":"Tacikistan","code":"TJ","votes":69},{"id":"tz","name":"Tanzanya","code":"TZ","votes":98},{"id":"th","name":"Tayland","code":"TH","votes":127},{"id":"tl","name":"Doğu Timor","code":"TL","votes":35},{"id":"tg","name":"Togo","code":"TG","votes":64},{"id":"to","name":"Tonga","code":"TO","votes":93},{"id":"tt","name":"Trinidad ve Tobago","code":"TT","votes":122},{"id":"tn","name":"Tunus","code":"TN","votes":30},{"id":"tr","name":"Türkiye","code":"TR","votes":129},{"id":"tm","name":"Türkmenistan","code":"TM","votes":88},{"id":"tv","name":"Tuvalu","code":"TV","votes":117},{"id":"ug","name":"Uganda","code":"UG","votes":25},{"id":"ua","name":"Ukrayna","code":"UA","votes":54},{"id":"ae","name":"Birleşik Arap Emirlikleri","code":"AE","votes":83},{"id":"gb","name":"Birleşik Krallık","code":"GB","votes":119},{"id":"us","name":"Amerika Birleşik Devletleri","code":"US","votes":117},{"id":"uy","name":"Uruguay","code":"UY","votes":49},{"id":"uz","name":"Özbekistan","code":"UZ","votes":78},{"id":"vu","name":"Vanuatu","code":"VU","votes":107},{"id":"va","name":"Vatikan","code":"VA","votes":15},{"id":"ve","name":"Venezuela","code":"VE","votes":44},{"id":"vn","name":"Vietnam","code":"VN","votes":73},{"id":"ye","name":"Yemen","code":"YE","votes":102},{"id":"zm","name":"Zambiya","code":"ZM","votes":10},{"id":"zw","name":"Zimbabve","code":"ZW","votes":39},{"id":"ps","name":"Filistin","code":"PS","votes":98}];
const countryById=new Map(countries.map(c=>[c.id,c]));
const geometry=window.EDUVERSE_COUNTRIES_GEOJSON||{features:[]};

let yaw=-(20*Math.PI/180);
let pitch=0;
let targetYaw=yaw;
let targetPitch=pitch;
let dragVelocityX=0;
let dragVelocityY=0;
let dragging=false;
let dragLastX=0;
let dragLastY=0;
let dragDistance=0;
let focusPulse=0;
let focusHoldUntil=0;
let lastTime=performance.now();

const texture=new Image();
let texturePixels=null,textureW=0,textureH=0;
texture.onload=()=>{
  try{
    const tc=document.createElement("canvas");
    tc.width=texture.naturalWidth;tc.height=texture.naturalHeight;
    const tctx=tc.getContext("2d",{willReadFrequently:true});
    tctx.drawImage(texture,0,0);
    texturePixels=tctx.getImageData(0,0,tc.width,tc.height).data;
    textureW=tc.width;textureH=tc.height;
  }catch(e){texturePixels=null;}
};
texture.src=window.EDUVERSE_WORLD_TEXTURE_DATA||"./assets/world_texture_v2.png";

function featureCode(f){
  const p=f?.properties||{};
  for(const v of [p.ISO_A2,p.ISO_A2_EH,p.WB_A2]){
    if(typeof v==="string"&&/^[A-Z]{2}$/.test(v))return v.toLowerCase();
  }
  const fb={"France":"fr","Norway":"no","Palestine":"ps","Israel":"il"};
  for(const n of [p.NAME_EN,p.ADMIN,p.NAME]) if(fb[n]) return fb[n];
  return null;
}
const featureByCountryId=new Map();
for(const f of geometry.features||[]){
  const id=featureCode(f);
  if(id&&countryById.has(id)&&!featureByCountryId.has(id)){
    featureByCountryId.set(id,f);
    const c=countryById.get(id),p=f.properties||{};
    if(Number.isFinite(Number(p.LABEL_Y)))c.lat=Number(p.LABEL_Y);
    if(Number.isFinite(Number(p.LABEL_X)))c.lon=Number(p.LABEL_X);
  }
}
const fallbackGeo={
tr:[39,35],de:[51.1,10.4],fr:[46.2,2.2],jp:[36.2,138.2],gb:[55.3,-3.4],us:[38,-97],br:[-10,-55],es:[40,-4],
it:[42.8,12.8],ca:[56,-106],au:[-25,133],ps:[31.9,35.2],il:[31.5,34.8],in:[21,78],cn:[35,103],ru:[60,90],
za:[-29,24],eg:[27,30],sa:[24,45],mx:[23,-102],ar:[-34,-64],kr:[36,128],id:[-2,118],ng:[9,8],se:[62,15]
};
countries.forEach((c,i)=>{
  if(!Number.isFinite(c.lat)||!Number.isFinite(c.lon)){
    const g=fallbackGeo[c.id];
    c.lat=g?g[0]:-52+((i*31)%104);
    c.lon=g?g[1]:-178+((i*53)%356);
  }
});
let focusedCountry=countryById.get("tr")||countries[0];

const stars=Array.from({length:330},(_,i)=>({
  a:((i*37)%337)/337,b:((i*61)%311)/311,
  r:.22+((i*17)%12)/10,p:(i%17)/17
}));

function flagUrl(c){return `https://flagcdn.com/w80/${c.id}.png`;}
function localizedCountryName(c){return window.EDUVERSE_I18N?.countryName?.(c.id,c.name)||c.name;}
function localizedFamilyUnit(){return window.EDUVERSE_I18N?.familyUnit?.()||"aile";}
function flagMarkup(c,cls=""){const n=localizedCountryName(c);const alt=window.EDUVERSE_I18N?.flagAlt?.(n)||`${n} bayrağı`;return `<img class="${cls}" src="${flagUrl(c)}" alt="${alt}" loading="lazy">`;}
function sortedCountries(){const locale=window.EDUVERSE_I18N?.locales?.[window.EDUVERSE_I18N?.lang]||"tr-TR";return [...countries].sort((a,b)=>b.votes-a.votes||localizedCountryName(a).localeCompare(localizedCountryName(b),locale));}
function leader(){return sortedCountries()[0];}

function renderLeaderboard(){
  const list=sortedCountries();
  leaderboard.innerHTML="";
  list.forEach((c,i)=>{
    const li=document.createElement("li");
    li.dataset.countryId=c.id;
    if(i===0)li.classList.add("is-leader");
    if(focusedCountry?.id===c.id)li.classList.add("is-selected");
    li.innerHTML=`<span class="rank">${String(i+1).padStart(3,"0")}</span><span class="country-flag">${flagMarkup(c,"flag-img")}</span><span class="country-name">${localizedCountryName(c)}</span><span class="country-votes">${c.votes} ${localizedFamilyUnit()}</span>`;
    li.addEventListener("click",()=>focusCountry(c,true));
    leaderboard.appendChild(li);
  });
  const top=list[0];
  championFlag.innerHTML=flagMarkup(top,"champion-flag-img");
  const leaderCard=document.querySelector(".leader-card");if(leaderCard)leaderCard.dataset.countryId=top.id;
  leaderTitle.textContent=localizedCountryName(top);
  leaderVotes.textContent=`${top.votes} ${localizedFamilyUnit()}`;
}
const leaderCardEl=document.querySelector(".leader-card");
if(leaderCardEl){
  leaderCardEl.style.cursor="pointer";
  leaderCardEl.tabIndex=0;
  leaderCardEl.setAttribute("role","button");
  leaderCardEl.setAttribute("aria-label","Lider ulkeyi dunyada goster");
  const openLeaderOnGlobe=()=>{
    const c=countryById.get(leaderCardEl.dataset.countryId);
    if(c)focusCountry(c,true);
  };
  leaderCardEl.addEventListener("click",openLeaderOnGlobe);
  leaderCardEl.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      openLeaderOnGlobe();
    }
  });
}
function focusCountry(c,center=true){
  focusedCountry=c;
  if(center&&Number.isFinite(c.lon)&&Number.isFinite(c.lat)){
    targetYaw=-(c.lon*Math.PI/180);
    const latRad=c.lat*Math.PI/180;
    targetPitch=Math.max(-1.05,Math.min(1.05,-latRad*.85));
    focusHoldUntil=performance.now()+4200;
  }
  focusPulse=1;
  focusCard.dataset.countryId=c.id;
  focusFlag.innerHTML=flagMarkup(c,"focus-flag-img");
  focusName.textContent=localizedCountryName(c);
  focusMeta.textContent=`${c.votes} ${localizedFamilyUnit()}`;
  focusCard.classList.remove("pulse");void focusCard.offsetWidth;focusCard.classList.add("pulse");
  leaderboard.querySelectorAll("li").forEach(li=>li.classList.toggle("is-selected",li.dataset.countryId===c.id));
}
function showLeaderChange(c){
  leaderBurstName.textContent=localizedCountryName(c);
  leaderBurst.classList.remove("show");void leaderBurst.offsetWidth;leaderBurst.classList.add("show");
}
function applyPlusOne(c){
  const before=leader().id;c.votes+=1;focusCountry(c,true);renderLeaderboard();
  const after=leader().id;eventText.textContent=window.EDUVERSE_I18N?.eventPlus?.(localizedCountryName(c))||`${localizedCountryName(c)} +1 yeni aile kazandı.`;
  if(after!==before){const top=leader();showLeaderChange(top);eventText.textContent=window.EDUVERSE_I18N?.eventLeader?.(localizedCountryName(top))||`${localizedCountryName(top)} liderliği aldı.`;}
}
demoEventBtn?.addEventListener("click",()=>applyPlusOne(sortedCountries()[Math.floor(Date.now()/1000)%Math.min(40,countries.length)]));
leaderDemoBtn?.addEventListener("click",()=>{
  const list=sortedCountries(),c=list[1];c.votes=list[0].votes+1;focusCountry(c,true);renderLeaderboard();showLeaderChange(c);
  eventText.textContent=window.EDUVERSE_I18N?.eventLeader?.(localizedCountryName(c))||`${localizedCountryName(c)} liderliği aldı.`;
});

function normalizeAngle(v){const tau=Math.PI*2;v%=tau;if(v>Math.PI)v-=tau;if(v<-Math.PI)v+=tau;return v;}
function resizeCanvas(){
  const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  const w=Math.max(1,Math.floor(rect.width*dpr)),h=Math.max(1,Math.floor(rect.height*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;ctx.setTransform(dpr,0,0,dpr,0,0);}
}
function worldVector(lat,lon){
  const a=lat*Math.PI/180,b=lon*Math.PI/180+yaw;
  const x=Math.cos(a)*Math.sin(b),y=-Math.sin(a),z=Math.cos(a)*Math.cos(b);
  const cp=Math.cos(pitch),sp=Math.sin(pitch);
  return {x,y:y*cp-z*sp,z:y*sp+z*cp};
}
function project(lat,lon,r,cx,cy){
  const v=worldVector(lat,lon);
  return {x:cx+v.x*r,y:cy+v.y*r,z:v.z,visible:v.z>.025};
}
function screenToLonLat(x,y,r,cx,cy){
  const sx=(x-cx)/r,sy=(y-cy)/r,d2=sx*sx+sy*sy;
  if(d2>1)return null;
  const sz=Math.sqrt(Math.max(0,1-d2)),cp=Math.cos(pitch),sp=Math.sin(pitch);
  const wy=sy*cp+sz*sp,wz=-sy*sp+sz*cp,wx=sx;
  const lat=-Math.asin(Math.max(-1,Math.min(1,wy)))*180/Math.PI;
  let lon=(Math.atan2(wx,wz)-yaw)*180/Math.PI;
  while(lon>180)lon-=360;while(lon<-180)lon+=360;
  return {lon,lat};
}
function ringContains(lon,lat,ring){
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    let xi=ring[i][0],yi=ring[i][1],xj=ring[j][0],yj=ring[j][1];
    while(xi-lon>180)xi-=360;while(xi-lon<-180)xi+=360;
    while(xj-lon>180)xj-=360;while(xj-lon<-180)xj+=360;
    const hit=((yi>lat)!==(yj>lat))&&(lon<(xj-xi)*(lat-yi)/((yj-yi)||1e-9)+xi);
    if(hit)inside=!inside;
  }
  return inside;
}
function polygonContains(lon,lat,p){
  if(!p?.length||!ringContains(lon,lat,p[0]))return false;
  for(let i=1;i<p.length;i++)if(ringContains(lon,lat,p[i]))return false;
  return true;
}
function featureContains(f,lon,lat){
  const g=f?.geometry;if(!g)return false;
  if(g.type==="Polygon")return polygonContains(lon,lat,g.coordinates);
  if(g.type==="MultiPolygon")return g.coordinates.some(p=>polygonContains(lon,lat,p));
  return false;
}
function countryAtLonLat(lon,lat){
  for(const [id,f] of featureByCountryId) if(featureContains(f,lon,lat)) return countryById.get(id)||null;
  return null;
}

canvas.addEventListener("pointerdown",e=>{
  focusHoldUntil=0;
  dragging=true;dragLastX=e.clientX;dragLastY=e.clientY;dragDistance=0;dragVelocityX=0;dragVelocityY=0;
  canvas.setPointerCapture?.(e.pointerId);canvas.classList.add("dragging");
});
canvas.addEventListener("pointermove",e=>{
  if(!dragging)return;
  const dx=e.clientX-dragLastX,dy=e.clientY-dragLastY;
  dragLastX=e.clientX;dragLastY=e.clientY;dragDistance+=Math.abs(dx)+Math.abs(dy);
  yaw=normalizeAngle(yaw+dx*.0065);pitch=normalizeAngle(pitch+dy*.0065);
  targetYaw=yaw;targetPitch=pitch;dragVelocityX=dx*.012;dragVelocityY=dy*.012;
});
function endPointer(e){
  const click=dragging&&dragDistance<7;dragging=false;canvas.releasePointerCapture?.(e.pointerId);canvas.classList.remove("dragging");
  if(click){
    const rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height,cx=w*.515,cy=h*.47,r=Math.min(w*.365,h*.435);
    const ll=screenToLonLat(e.clientX-rect.left,e.clientY-rect.top,r,cx,cy);
    if(ll){const c=countryAtLonLat(ll.lon,ll.lat);if(c)focusCountry(c,true);}
  }
}
canvas.addEventListener("pointerup",endPointer);
canvas.addEventListener("pointercancel",endPointer);

let sphereCanvas=document.createElement("canvas"),sphereCtx=sphereCanvas.getContext("2d");
let sphereImage=null,sphereSize=0;
function ensureSphereBuffer(size){
  size=Math.max(200,Math.min(320,Math.round(size)));
  if(size!==sphereSize){sphereSize=size;sphereCanvas.width=size;sphereCanvas.height=size;sphereImage=sphereCtx.createImageData(size,size);}
}
function renderSphereTexture(cx,cy,r){
  if(!texturePixels||!textureW||!textureH)return false;
  ensureSphereBuffer(r*1.28);
  const size=sphereSize,half=size/2,data=sphereImage.data,cp=Math.cos(pitch),sp=Math.sin(pitch);
  for(let py=0;py<size;py++){
    const sy=(py+.5-half)/half;
    for(let px=0;px<size;px++){
      const sx=(px+.5-half)/half,idx=(py*size+px)*4,d2=sx*sx+sy*sy;
      if(d2>1){data[idx+3]=0;continue;}
      const sz=Math.sqrt(Math.max(0,1-d2)),wy=sy*cp+sz*sp,wz=-sy*sp+sz*cp,wx=sx;
      const lat=-Math.asin(Math.max(-1,Math.min(1,wy)));
      let lon=Math.atan2(wx,wz)-yaw;
      while(lon>Math.PI)lon-=Math.PI*2;while(lon<-Math.PI)lon+=Math.PI*2;
      let tx=Math.floor(((lon+Math.PI)/(Math.PI*2))*textureW),ty=Math.floor(((Math.PI/2-lat)/Math.PI)*textureH);
      tx=((tx%textureW)+textureW)%textureW;ty=Math.max(0,Math.min(textureH-1,ty));
      const si=(ty*textureW+tx)*4;
      data[idx]=Math.min(255,texturePixels[si]*1.08);
      data[idx+1]=Math.min(255,texturePixels[si+1]*1.16);
      data[idx+2]=Math.min(255,texturePixels[si+2]*1.20);
      data[idx+3]=255;
    }
  }
  sphereCtx.putImageData(sphereImage,0,0);
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();ctx.imageSmoothingEnabled=true;
  ctx.drawImage(sphereCanvas,cx-r,cy-r,r*2,r*2);

  ctx.globalCompositeOperation="screen";
  const light=ctx.createRadialGradient(cx-r*.33,cy-r*.39,r*.02,cx+r*.08,cy+r*.08,r*1.08);
  light.addColorStop(0,"rgba(158,247,255,.36)");
  light.addColorStop(.28,"rgba(59,202,241,.20)");
  light.addColorStop(.70,"rgba(13,126,205,.12)");
  light.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=light;ctx.fillRect(cx-r,cy-r,r*2,r*2);
  ctx.globalCompositeOperation="source-over";

  const shade=ctx.createRadialGradient(cx-r*.36,cy-r*.39,r*.02,cx+r*.17,cy+r*.10,r*1.07);
  shade.addColorStop(0,"rgba(255,255,255,.03)");
  shade.addColorStop(.58,"rgba(0,0,0,0)");
  shade.addColorStop(1,"rgba(0,3,12,.28)");
  ctx.fillStyle=shade;ctx.fillRect(cx-r,cy-r,r*2,r*2);
  ctx.restore();
  return true;
}

function forEachRing(feature,fn){
  const g=feature?.geometry;if(!g)return;
  if(g.type==="Polygon")g.coordinates.forEach(fn);
  else if(g.type==="MultiPolygon")g.coordinates.forEach(p=>p.forEach(fn));
}
function drawCountries(cx,cy,r){
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
  for(const [id,f] of featureByCountryId){
    const selected=focusedCountry?.id===id;
    ctx.beginPath();
    forEachRing(f,ring=>{
      let drawing=false;
      for(const c of ring){
        const p=project(c[1],c[0],r,cx,cy);
        if(p.visible){if(!drawing){ctx.moveTo(p.x,p.y);drawing=true}else ctx.lineTo(p.x,p.y);} else drawing=false;
      }
    });
    if(selected){
      ctx.fillStyle="rgba(255,201,54,.30)";
      ctx.shadowColor="rgba(255,205,72,.86)";ctx.shadowBlur=24;ctx.fill();
      ctx.strokeStyle="rgba(255,226,118,.98)";ctx.lineWidth=2.8;ctx.stroke();ctx.shadowBlur=0;
    }else{
      ctx.strokeStyle="rgba(182,239,255,.29)";ctx.lineWidth=.78;ctx.stroke();
    }
  }
  ctx.restore();
}
function drawFocusedCountryBeacon(cx,cy,r,t){
  const c=focusedCountry;
  if(!c||!Number.isFinite(c.lat)||!Number.isFinite(c.lon))return;
  const p=project(c.lat,c.lon,r,cx,cy);
  if(!p.visible)return;

  const pulse=.5+.5*Math.sin(t*.007);

  ctx.save();
  ctx.shadowColor="rgba(255,207,70,.90)";
  ctx.shadowBlur=18+10*pulse;
  ctx.fillStyle="rgba(255,215,91,.95)";
  ctx.beginPath();
  ctx.arc(p.x,p.y,4.5+2*pulse,0,Math.PI*2);
  ctx.fill();

  ctx.shadowBlur=0;
  ctx.strokeStyle=`rgba(255,222,110,${.42+.28*pulse})`;
  ctx.lineWidth=1.5;
  ctx.beginPath();
  ctx.arc(p.x,p.y,10+7*pulse,0,Math.PI*2);
  ctx.stroke();

  const label=localizedCountryName(c);
  const fs=Math.max(12,Math.min(16,r*.055));
  ctx.font=`800 ${fs}px Inter,Segoe UI,Arial,sans-serif`;

  const tw=ctx.measureText(label).width;
  const boxW=tw+24;
  const boxH=30;

  let bx=p.x+14;
  let by=p.y-42;

  if(bx+boxW>cx+r-6)bx=p.x-boxW-14;
  by=Math.max(cy-r+8,Math.min(by,cy+r-boxH-8));

  ctx.fillStyle="rgba(3,14,27,.90)";
  ctx.strokeStyle="rgba(255,213,82,.78)";
  ctx.lineWidth=1;

  ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(bx,by,boxW,boxH,10);
  else ctx.rect(bx,by,boxW,boxH);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle="rgba(255,225,132,.98)";
  ctx.textBaseline="middle";
  ctx.fillText(label,bx+12,by+boxH/2+.5);

  ctx.restore();
}

function buildFamilyStreamPool(){
  return countries.map((country,index)=>({
    countryId:country.id,
    get label(){return `${window.EDUVERSE_I18N?.familyWord?.()||"Aile"} • ${window.EDUVERSE_I18N?.countryName?.(country.id,country.name)||country.name}`;},
    side:index%2===0?"left":"right",
    lane:index%4,
    tint:index%6
  }));
}
const familyStreamPool=buildFamilyStreamPool();

function streamColor(item,alpha){
  const palette=[
    `rgba(214,238,255,${alpha})`,
    `rgba(129,224,255,${alpha})`,
    `rgba(255,213,127,${alpha})`,
    `rgba(222,169,255,${alpha})`,
    `rgba(160,247,227,${alpha})`,
    `rgba(240,240,255,${alpha})`
  ];
  return palette[item.tint%palette.length];
}

function drawFamilyStreams(w,h,t,cx,cy,r){
  ctx.save();
  ctx.textBaseline="middle";

  const visibleCount=16;
  const stepMs=2800;
  const head=Math.floor(t/stepMs)%familyStreamPool.length;
  const frac=(t%stepMs)/stepMs;

  for(let slot=0;slot<visibleCount;slot++){
    const index=(head-slot+familyStreamPool.length)%familyStreamPool.length;
    const item=familyStreamPool[index];
    const progress=(slot+frac)/visibleCount;
    const y=-24+progress*(h+48);
    const fade=Math.sin(Math.PI*Math.max(0,Math.min(1,progress)));
    const alpha=.035+fade*.115;

    const fontSize=11.2+(item.lane%2)*.7;
    ctx.font=`600 ${fontSize}px "Segoe UI", Inter, Arial, sans-serif`;
    const width=Math.min(220,ctx.measureText(item.label).width);
    const laneShift=(item.lane%2)*14;
    const x=item.side==="left" ? 24+laneShift : w-24-laneShift;

    const centerX=item.side==="left" ? x+width*.5 : x-width*.5;
    const dx=centerX-cx;
    const dy=y-cy;

    if(dx*dx+dy*dy < (r*1.18)*(r*1.18)) continue;

    const leftBoundary=cx-r-22;
    const rightBoundary=cx+r+22;
    if(item.side==="left" && x+width>leftBoundary) continue;
    if(item.side==="right" && x-width<rightBoundary) continue;

    ctx.save();
    ctx.textAlign=item.side==="left"?"left":"right";
    ctx.fillStyle=streamColor(item,alpha);

    if(slot%5===0){
      ctx.shadowBlur=8;
      ctx.shadowColor="rgba(144,218,255,.12)";
    }

    ctx.fillText(item.label,x,y);
    ctx.restore();
  }

  ctx.restore();
}

function drawSpace(w,h,t,cx,cy,r){
  const n1=ctx.createRadialGradient(w*.10,h*.15,0,w*.10,h*.15,w*.42);
  n1.addColorStop(0,"rgba(29,142,255,.16)");
  n1.addColorStop(.40,"rgba(31,69,180,.065)");
  n1.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=n1;ctx.fillRect(0,0,w,h);

  const n2=ctx.createRadialGradient(w*.90,h*.25,0,w*.90,h*.25,w*.38);
  n2.addColorStop(0,"rgba(213,73,255,.145)");
  n2.addColorStop(.42,"rgba(91,52,165,.065)");
  n2.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=n2;ctx.fillRect(0,0,w,h);

  const n3=ctx.createRadialGradient(w*.78,h*.82,0,w*.78,h*.82,w*.31);
  n3.addColorStop(0,"rgba(45,226,207,.085)");
  n3.addColorStop(.52,"rgba(24,103,157,.042)");
  n3.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=n3;ctx.fillRect(0,0,w,h);

  stars.forEach(s=>{
    const x=s.a*w,y=s.b*h,dx=x-cx,dy=y-cy;
    if(dx*dx+dy*dy<r*r*.93)return;
    const tw=.48+.52*Math.sin(t*.00145+s.p*8.6);
    ctx.fillStyle=`rgba(224,240,255,${.04+s.r*.12*tw})`;
    ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();
  });

  ctx.save();
  ctx.translate(w*.24,h*.76);
  ctx.rotate(-.19);
  const bw=w*.72,bh=h*.18;
  const band=ctx.createLinearGradient(-bw/2,0,bw/2,0);
  band.addColorStop(0,"rgba(0,0,0,0)");
  band.addColorStop(.13,"rgba(48,105,255,.025)");
  band.addColorStop(.33,"rgba(96,155,255,.055)");
  band.addColorStop(.50,"rgba(218,235,255,.125)");
  band.addColorStop(.64,"rgba(224,98,255,.085)");
  band.addColorStop(.82,"rgba(96,72,220,.04)");
  band.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=band;
  ctx.filter="blur(22px)";
  ctx.fillRect(-bw/2,-bh/2,bw,bh);
  ctx.filter="none";

  for(let i=0;i<120;i++){
    const u=i/119;
    const x=(u-.5)*bw;
    const wave=Math.sin(u*Math.PI*3.5+t*.00012)*bh*.055;
    const spread=((((i*47)%101)/100)-.5)*bh*.72;
    const y=wave+spread;
    const alpha=.018+.045*(1-Math.min(1,Math.abs(spread)/(bh*.36)));
    ctx.fillStyle=`rgba(220,233,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(x,y,.35+((i*13)%7)*.12,0,Math.PI*2);
    ctx.fill();
  }
  ctx.restore();

  for(let i=0;i<18;i++){
    const a=i*2.399+t*.00003;
    const rr=Math.min(w,h)*(.36+((i*17)%9)*.018);
    const x=cx+Math.cos(a)*rr;
    const y=cy+Math.sin(a*.91)*rr*.64;
    const g=ctx.createRadialGradient(x,y,0,x,y,8+(i%4)*3);
    g.addColorStop(0,i%5===0?"rgba(255,218,128,.34)":"rgba(108,220,255,.28)");
    g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=g;
    ctx.beginPath();ctx.arc(x,y,10+(i%4)*3,0,Math.PI*2);ctx.fill();
  }

  drawFamilyStreams(w,h,t,cx,cy,r);
}

function networkCountries(){
  return sortedCountries()
    .filter(c=>Number.isFinite(c.lat)&&Number.isFinite(c.lon))
    .slice(0,72);
}
function quadPoint(a,c,b,t){
  const m=1-t;return{x:m*m*a.x+2*m*t*c.x+t*t*b.x,y:m*m*a.y+2*m*t*c.y+t*t*b.y};
}
function drawNetwork(cx,cy,r,t){
  const visible=networkCountries()
    .map(c=>({c,p:project(c.lat,c.lon,r,cx,cy)}))
    .filter(n=>n.p.visible)
    .sort((a,b)=>b.p.z-a.p.z)
    .slice(0,48);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx,cy,r*1.11,0,Math.PI*2);
  ctx.clip();

  const pairs=[];
  for(let i=0;i<visible.length;i++){
    if(i+2<visible.length)pairs.push([i,i+2]);
    if(i+4<visible.length)pairs.push([i,i+4]);
    if(i%2===0&&i+7<visible.length)pairs.push([i,i+7]);
    if(i%4===0&&i+11<visible.length)pairs.push([i,i+11]);
  }

  pairs.slice(0,78).forEach(([ia,ib],i)=>{
    const a=visible[ia],b=visible[ib];
    const mx=(a.p.x+b.p.x)/2;
    const lift=r*(.045+.045*Math.sin(i*.57+t*.00024));
    const my=(a.p.y+b.p.y)/2-lift;
    const ctrl={x:mx,y:my};

    const hot=(i%8===0)||(a.c.id===leader().id)||(b.c.id===leader().id);

    ctx.strokeStyle=hot?"rgba(255,211,111,.30)":"rgba(65,211,255,.24)";
    ctx.lineWidth=hot?1.30:.95;
    ctx.beginPath();
    ctx.moveTo(a.p.x,a.p.y);
    ctx.quadraticCurveTo(ctrl.x,ctrl.y,b.p.x,b.p.y);
    ctx.stroke();

    ctx.strokeStyle=hot?"rgba(255,205,92,.08)":"rgba(70,183,255,.075)";
    ctx.lineWidth=hot?4.0:3.0;
    ctx.beginPath();
    ctx.moveTo(a.p.x,a.p.y);
    ctx.quadraticCurveTo(ctrl.x,ctrl.y,b.p.x,b.p.y);
    ctx.stroke();

    const p1=(t*.00023+i*.067)%1;
    const p2=(p1+.46)%1;
    [p1,p2].forEach((pp,j)=>{
      const q=quadPoint(a.p,ctrl,b.p,pp);
      const rad=hot?(j===0?12:8):(j===0?9:6);
      const glow=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,rad);
      glow.addColorStop(0,hot?"rgba(255,246,203,.98)":"rgba(255,255,255,.96)");
      glow.addColorStop(.22,hot?"rgba(255,204,92,.82)":"rgba(91,229,255,.84)");
      glow.addColorStop(.58,hot?"rgba(255,185,56,.25)":"rgba(55,195,255,.22)");
      glow.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=glow;
      ctx.beginPath();
      ctx.arc(q.x,q.y,rad,0,Math.PI*2);
      ctx.fill();
    });
  });

  visible.forEach((n,i)=>{
    const rank=sortedCountries().findIndex(c=>c.id===n.c.id);
    const hot=rank<10;
    const pulse=.70+.30*Math.sin(t*.00235+i*.61);
    const rad=hot?20:14;

    const glow=ctx.createRadialGradient(n.p.x,n.p.y,0,n.p.x,n.p.y,rad);
    glow.addColorStop(0,hot?"rgba(255,224,132,.70)":"rgba(104,232,255,.64)");
    glow.addColorStop(.24,hot?"rgba(255,205,78,.28)":"rgba(64,207,255,.26)");
    glow.addColorStop(.65,hot?"rgba(255,182,48,.07)":"rgba(55,180,255,.06)");
    glow.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=glow;
    ctx.beginPath();
    ctx.arc(n.p.x,n.p.y,rad*pulse,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle=hot?"#ffdc7a":"#79ebff";
    ctx.beginPath();
    ctx.arc(n.p.x,n.p.y,hot?4.4:3.0,0,Math.PI*2);
    ctx.fill();
  });

  ctx.restore();
}
function drawOrbitVeins(cx,cy,r,t){
  ctx.save();
  const configs=[
    [1.13,.44,-.19,"rgba(71,211,255,.17)"],
    [1.19,.58,.13,"rgba(84,171,255,.13)"],
    [1.09,.88,.84,"rgba(115,101,255,.10)"],
    [1.23,.31,.34,"rgba(255,192,86,.09)"],
    [1.17,.70,-.60,"rgba(68,223,246,.08)"]
  ];
  configs.forEach((o,i)=>{
    ctx.strokeStyle=o[3];
    ctx.lineWidth=i===0?1.05:.82;
    ctx.beginPath();
    ctx.ellipse(cx,cy,r*o[0],r*o[1],o[2]+Math.sin(t*.00014+i)*.024,0,Math.PI*2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawGlobe(w,h,t){
  const cx=w*.515,cy=h*.47,r=Math.min(w*.37,h*.445);
  drawSpace(w,h,t,cx,cy,r);

  const outer=ctx.createRadialGradient(cx,cy,r*.72,cx,cy,r*1.38);
  outer.addColorStop(0,"rgba(0,0,0,0)");outer.addColorStop(.68,"rgba(32,181,255,.07)");
  outer.addColorStop(.84,"rgba(50,95,255,.045)");outer.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=outer;ctx.beginPath();ctx.arc(cx,cy,r*1.38,0,Math.PI*2);ctx.fill();

  const base=ctx.createRadialGradient(cx-r*.28,cy-r*.30,r*.05,cx,cy,r);
  base.addColorStop(0,"#3aa3c8");base.addColorStop(.36,"#1f7297");base.addColorStop(.68,"#0f4c70");base.addColorStop(1,"#082d46");
  ctx.fillStyle=base;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();

  renderSphereTexture(cx,cy,r);
  drawCountries(cx,cy,r);
  drawOrbitVeins(cx,cy,r,t);
  drawNetwork(cx,cy,r,t);
  drawFocusedCountryBeacon(cx,cy,r,t);

  ctx.strokeStyle="rgba(174,239,255,.46)";
  ctx.lineWidth=1.35;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();

  ctx.strokeStyle="rgba(52,191,255,.10)";
  ctx.lineWidth=10;ctx.beginPath();ctx.arc(cx,cy,r+4,0,Math.PI*2);ctx.stroke();
}

function frame(now){
  resizeCanvas();
  const rect=canvas.getBoundingClientRect(),dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
  if(!dragging){
    const dyaw=normalizeAngle(targetYaw-yaw),dpitch=normalizeAngle(targetPitch-pitch);
    const focusEase=now<focusHoldUntil?5.8:2.4;
    if(Math.abs(dyaw)>.008)yaw=normalizeAngle(yaw+dyaw*Math.min(1,dt*focusEase));
    if(Math.abs(dpitch)>.008)pitch=normalizeAngle(pitch+dpitch*Math.min(1,dt*focusEase));
    if(now>focusHoldUntil)yaw=normalizeAngle(yaw+dt*.075);

    if(Math.abs(dragVelocityX)>.0001||Math.abs(dragVelocityY)>.0001){
      yaw=normalizeAngle(yaw+dragVelocityX*dt);
      pitch=normalizeAngle(pitch+dragVelocityY*dt);
      dragVelocityX*=Math.pow(.90,dt*60);
      dragVelocityY*=Math.pow(.90,dt*60);
      targetYaw=yaw;targetPitch=pitch;
    }
  }

  focusPulse=Math.max(0,focusPulse-dt*.85);
  ctx.clearRect(0,0,rect.width,rect.height);
  drawGlobe(rect.width,rect.height,now);
  requestAnimationFrame(frame);
}

renderLeaderboard();
focusCountry(focusedCountry,false);
requestAnimationFrame(frame);
})();


(() => {
"use strict";

const btn=document.getElementById("themeCycleBtn");
const globe=document.getElementById("globe");
if(!btn||!globe)return;

const themes=[
  {id:"ocean", filter:"none"},
  {id:"sunset", filter:"hue-rotate(210deg) saturate(1.24) brightness(1.08)"},
  {id:"solar", filter:"sepia(.28) hue-rotate(332deg) saturate(1.42) brightness(1.13)"},
  {id:"emerald", filter:"hue-rotate(300deg) saturate(1.20) brightness(1.08)"},
  {id:"rose", filter:"hue-rotate(130deg) saturate(1.26) brightness(1.08)"}
];

let index=0;
try{
  const saved=localStorage.getItem("eduverse-world-theme");
  const found=themes.findIndex(t=>t.id===saved);
  if(found>=0) index=found;
}catch(e){}

function applyTheme(){
  const theme=themes[index];
  document.body.setAttribute("data-edu-theme",theme.id);
  globe.style.filter=theme.filter;
  try{localStorage.setItem("eduverse-world-theme",theme.id);}catch(e){}
}

btn.addEventListener("click",()=>{
  index=(index+1)%themes.length;
  applyTheme();
});

applyTheme();
})();


(() => {
"use strict";

if (window.__EDUVERSE_GOODNESS_LANG_V2__) return;
window.__EDUVERSE_GOODNESS_LANG_V2__ = true;

const root = document.getElementById("goodnessFund");
if (!root) return;

const head = root.querySelector(".goodness-head");
if (!head) return;

let langBox = document.getElementById("goodnessLang");
if (!langBox) {
  langBox = document.createElement("div");
  langBox.className = "goodness-lang";
  langBox.id = "goodnessLang";
  langBox.setAttribute("aria-label", "Language selector");
  langBox.innerHTML = `
    <button class="goodness-lang-btn" type="button" data-lang="tr">TR</button>
    <button class="goodness-lang-btn" type="button" data-lang="en">EN</button>
    <button class="goodness-lang-btn" type="button" data-lang="de">DE</button>
    <button class="goodness-lang-btn" type="button" data-lang="fr">FR</button>
    <button class="goodness-lang-btn" type="button" data-lang="ar">AR</button>
  `;
  head.appendChild(langBox);
}

const title = document.getElementById("goodnessFundTitle");
const live = root.querySelector(".fund-core span");
const meta = [...root.querySelectorAll(".fund-meta-card span")];
const projectsTitle = root.querySelector(".fund-section-title");
const projects = [...root.querySelectorAll(".project-card strong")];
const proofs = [...root.querySelectorAll(".proof-row span")];
const buttons = [...langBox.querySelectorAll(".goodness-lang-btn")];

const texts = {
  tr: {
    title: "İyilik Fonu",
    live: "Gerçek mevcut tutar",
    method: "Hesaplama yöntemi",
    period: "Dönem",
    projects: "Doğrulanmış projeler",
    project1: "Eğitim / burs / materyal",
    project2: "Çocuk sağlığı",
    project3: "Okul / kütüphane / teknoloji desteği",
    vote: "Topluluk oy sonucu",
    proof: "Ödeme / tamamlanma kanıtı",
    archive: "Geçmiş projeler arşivi",
    dir: "ltr"
  },
  en: {
    title: "Goodness Fund",
    live: "Current live amount",
    method: "Calculation method",
    period: "Period",
    projects: "Verified projects",
    project1: "Education / scholarship / materials",
    project2: "Child health",
    project3: "School / library / technology support",
    vote: "Community vote result",
    proof: "Payment / completion proof",
    archive: "Past projects archive",
    dir: "ltr"
  },
  de: {
    title: "Hilfsfonds",
    live: "Aktueller Betrag",
    method: "Berechnungsmethode",
    period: "Zeitraum",
    projects: "Verifizierte Projekte",
    project1: "Bildung / Stipendien / Materialien",
    project2: "Kindergesundheit",
    project3: "Schule / Bibliothek / Technologiehilfe",
    vote: "Ergebnis der Community-Abstimmung",
    proof: "Zahlungs- / Abschlussnachweis",
    archive: "Archiv früherer Projekte",
    dir: "ltr"
  },
  fr: {
    title: "Fonds solidaire",
    live: "Montant actuel",
    method: "Méthode de calcul",
    period: "Période",
    projects: "Projets vérifiés",
    project1: "Éducation / bourses / matériel",
    project2: "Santé des enfants",
    project3: "École / bibliothèque / soutien technologique",
    vote: "Résultat du vote de la communauté",
    proof: "Preuve de paiement / d'achèvement",
    archive: "Archive des projets passés",
    dir: "ltr"
  },
  ar: {
    title: "صندوق الخير",
    live: "المبلغ الحالي",
    method: "طريقة الحساب",
    period: "الفترة",
    projects: "المشاريع الموثقة",
    project1: "التعليم / المنح / المواد",
    project2: "صحة الأطفال",
    project3: "المدرسة / المكتبة / دعم التكنولوجيا",
    vote: "نتيجة تصويت المجتمع",
    proof: "إثبات الدفع / الاكتمال",
    archive: "أرشيف المشاريع السابقة",
    dir: "rtl"
  }
};

function apply(lang) {
  const t = texts[lang] || texts.tr;

  root.setAttribute("lang", lang);
  root.setAttribute("dir", t.dir);

  if (title) title.textContent = t.title;
  if (live) live.textContent = t.live;
  if (meta[0]) meta[0].textContent = t.method;
  if (meta[1]) meta[1].textContent = t.period;
  if (projectsTitle) projectsTitle.textContent = t.projects;
  if (projects[0]) projects[0].textContent = t.project1;
  if (projects[1]) projects[1].textContent = t.project2;
  if (projects[2]) projects[2].textContent = t.project3;
  if (proofs[0]) proofs[0].textContent = t.vote;
  if (proofs[1]) proofs[1].textContent = t.proof;
  if (proofs[2]) proofs[2].textContent = t.archive;

  buttons.forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  try {
    localStorage.setItem("eduverse-goodness-lang", lang);
  } catch (e) {}
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => apply(btn.dataset.lang));
});

let initial = "tr";
try {
  const saved = localStorage.getItem("eduverse-goodness-lang");
  if (saved && texts[saved]) {
    initial = saved;
  } else {
    const browser = (navigator.language || "tr").slice(0, 2).toLowerCase();
    if (texts[browser]) initial = browser;
  }
} catch (e) {}

apply(initial);
})();