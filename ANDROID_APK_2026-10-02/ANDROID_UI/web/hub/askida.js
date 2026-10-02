(function(w,d){
'use strict';

var T={
 tr:{normal:'KENDİM İÇİN',gift:'ASKIDA · YAKINDA',info:'Askıda nasıl çalışır?',normalTitle:'Normal Tam Erişim',normalLead:'Bu seçenek kendi aile hesabınız için EduVerse Tam Erişim satın alma yoludur.',normalFoot:'Android satın alma seçenekleri Google Play üzerinden sunulur.',title:'Askıda EduVerse nasıl çalışır?',lead:'Başka bir çocuk için bırakılan Tam Erişim, ebeveyn veya yasal vasi üzerinden teslim edilir.',steps:[['1','Ayrı ödeme','Askıda etkinleştirildiğinde 6,99 € Tam Erişim hediyesi Google Play üzerinden ayrı olarak onaylanır.'],['2','Tek erişim hakkı','Doğrulanmış işlem bir çocuk için bir Tam Erişim hakkına dönüşür.'],['3','Ebeveyne davet','Tek kullanımlık bağlantı veya QR ebeveyne gider. Çocuğun ayrı e-postası gerekmez.'],['4','Tam Erişim açılır','Ebeveyn kabul edince hak aile hesabına bağlanır.']],foot:'Askıda teslimi, aile hesabı ve güvenli doğrulama altyapısı tamamlandığında etkinleştirilecektir. Yalnız doğrulanmış erişimler gösterilecektir.',demo:'ASKIDA YAKINDA',share:'BİR AİLEYE GÖNDER',pool:'ASKIDA HAVUZUNA BIRAK',created:'QR ve tek kullanımlık davet hazır.',assigned:'Davet aileye gönderilmek üzere atandı.',pooled:'Hak Askıda havuzuna bırakıldı.',copied:'Davet bağlantısı kopyalandı.'},
 en:{normal:'FOR MY FAMILY',gift:'SUSPENDED · COMING SOON',info:'How does it work?',normalTitle:'Normal Full Access',normalLead:'This option is the Full Access purchase path for your own family account.',normalFoot:'Android purchase options are provided through Google Play.',title:'How does Suspended EduVerse work?',lead:'Full Access left for another child is delivered through a parent or legal guardian.',steps:[['1','Separate payment','When enabled, the €6.99 Full Access gift will be approved separately through Google Play.'],['2','One access right','The verified transaction becomes one Full Access right for one child.'],['3','Parent invitation','A one-time link or QR goes to the parent. No separate child email is required.'],['4','Full Access opens','After acceptance, the right is linked to the family account.']],foot:'Gift delivery will be enabled after the family account and secure verification infrastructure are ready. Only verified access will be shown.',demo:'COMING SOON',share:'SEND TO A FAMILY',pool:'LEAVE IN SUSPENDED POOL',created:'QR and one-time invitation are ready.',assigned:'Invitation assigned for family delivery.',pooled:'Access left in the suspended pool.',copied:'Invitation link copied.'},
 de:{normal:'FÜR MEINE FAMILIE',gift:'ASKIDA · BALD',info:'Wie funktioniert Askıda?',normalTitle:'Normaler Vollzugang',normalLead:'Diese Option ist der Vollzugang-Kaufweg für Ihr eigenes Familienkonto.',normalFoot:'Android-Kaufoptionen werden über Google Play angeboten.',title:'Wie funktioniert Askıda EduVerse?',lead:'Der Vollzugang für ein anderes Kind wird über Eltern oder Erziehungsberechtigte übergeben.',steps:[['1','Separate Zahlung','Nach Aktivierung wird das Vollzugang-Geschenk für 6,99 € separat über Google Play bestätigt.'],['2','Ein Zugangsrecht','Der bestätigte Vorgang wird zu einem Vollzugang für ein Kind.'],['3','Einladung an Eltern','Ein einmaliger Link oder QR geht an die Eltern. Keine eigene Kinder-E-Mail nötig.'],['4','Vollzugang öffnet sich','Nach Annahme wird der Zugang dem Familienkonto zugeordnet.']],foot:'Die Geschenkübergabe wird aktiviert, sobald Familienkonto und sichere Verifizierung bereit sind. Es werden nur verifizierte Zugänge angezeigt.',demo:'BALD',share:'AN EINE FAMILIE SENDEN',pool:'IN ASKIDA-POOL LASSEN',created:'QR und einmalige Einladung sind bereit.',assigned:'Einladung wurde für die Familie zugewiesen.',pooled:'Zugang wurde im Askıda-Pool hinterlegt.',copied:'Einladungslink kopiert.'},
 fr:{normal:'POUR MA FAMILLE',gift:'ASKIDA · BIENTÔT',info:'Comment fonctionne Askıda ?',normalTitle:'Accès complet normal',normalLead:'Cette option est le parcours d’achat de l’Accès complet pour votre propre compte familial.',normalFoot:'Les options d’achat Android sont proposées via Google Play.',title:'Comment fonctionne Askıda EduVerse ?',lead:'L’Accès complet destiné à un autre enfant est remis via un parent ou représentant légal.',steps:[['1','Paiement séparé','Après activation, le cadeau Accès complet de 6,99 € sera validé séparément via Google Play.'],['2','Un droit d’accès','La transaction vérifiée devient un Accès complet pour un enfant.'],['3','Invitation au parent','Un lien ou QR à usage unique est remis au parent. Aucun e-mail enfant séparé.'],['4','Accès complet activé','Après acceptation, le droit est lié au compte familial.']],foot:'La remise du cadeau sera activée lorsque le compte familial et la vérification sécurisée seront prêts. Seuls les accès vérifiés seront affichés.',demo:'BIENTÔT',share:'ENVOYER À UNE FAMILLE',pool:'LAISSER DANS LE POOL ASKIDA',created:'QR et invitation à usage unique prêts.',assigned:'Invitation attribuée à une famille.',pooled:'Accès laissé dans le pool Askıda.',copied:'Lien d’invitation copié.'},
 ar:{normal:'لأسرتي',gift:'ASKIDA · قريباً',info:'كيف يعمل Askıda؟',normalTitle:'الوصول الكامل العادي',normalLead:'هذا الخيار هو مسار شراء الوصول الكامل لحساب أسرتك.',normalFoot:'تُقدَّم خيارات الشراء على Android عبر Google Play.',title:'كيف يعمل EduVerse المُعلّق؟',lead:'الوصول الكامل لطفل آخر يُسلّم عبر الوالد أو الوصي القانوني.',steps:[['1','دفعة منفصلة','عند تفعيل Askıda سيتم تأكيد هدية الوصول الكامل بقيمة 6.99 € بشكل منفصل عبر Google Play.'],['2','حق وصول واحد','تتحول العملية الموثقة إلى وصول كامل لطفل واحد.'],['3','دعوة ولي الأمر','يصل رابط أو QR لمرة واحدة إلى ولي الأمر. لا يحتاج الطفل إلى بريد منفصل.'],['4','فتح الوصول الكامل','بعد القبول يرتبط الحق بحساب الأسرة.']],foot:'سيتم تفعيل تسليم الهدية بعد اكتمال حساب الأسرة والبنية الآمنة للتحقق. لن تظهر إلا عمليات الوصول الموثقة.',demo:'قريباً',share:'إرسال إلى أسرة',pool:'تركه في مخزون ASKIDA',created:'أصبح QR والدعوة لمرة واحدة جاهزين.',assigned:'تم تخصيص الدعوة لإرسالها إلى الأسرة.',pooled:'تم ترك الوصول في مخزون Askıda.',copied:'تم نسخ رابط الدعوة.'}
};

function lang(){var x=(d.body&&d.body.dataset&&d.body.dataset.eduLang)||d.documentElement.lang||'tr';x=String(x).toLowerCase().slice(0,2);return T[x]?x:'tr';}
function isLocal(){return false;}
function findFullCard(){
 var bridge=d.getElementById('eduverseStoreBridge');if(!bridge)return null;
 var featured=bridge.querySelector('.hub-pricing .price-card.featured,.pricing-grid .price-card.featured');if(featured)return featured;
 var cards=bridge.querySelectorAll('.hub-pricing .price-card,.pricing-grid .price-card,.price-card');
 var names=['tam erişim','full access','vollzugang','accès complet','الوصول الكامل'];
 for(var i=0;i<cards.length;i++){var tx=(cards[i].textContent||'').toLowerCase();if((tx.indexOf('6,99')>=0||tx.indexOf('6.99')>=0)&&names.some(function(n){return tx.indexOf(n)>=0;}))return cards[i];}
 return null;
}
function findPrimaryAction(card,root){
 var actions=card.querySelectorAll('a,button');
 for(var i=0;i<actions.length;i++){var el=actions[i];if(root&&root.contains(el))continue;var tx=(el.textContent||'').toLowerCase();if(tx.indexOf('android')>=0||tx.indexOf('google play')>=0)return el;}
 return null;
}
function hidePlatformArea(card,root){
 var primary=findPrimaryAction(card,root),actions=card.querySelectorAll('a,button');
 for(var i=0;i<actions.length;i++){var el=actions[i];if(root&&root.contains(el))continue;var tx=(el.textContent||'').toLowerCase();if(tx.indexOf('android')>=0||tx.indexOf('google play')>=0||tx.indexOf('ios')>=0||tx.indexOf('app store')>=0)el.classList.add('askida-platform-hidden');}
 var all=card.querySelectorAll('p,small,div');
 for(var j=0;j<all.length;j++){var node=all[j];if(root&&root.contains(node))continue;if(node.children.length>0)continue;var t=(node.textContent||'').toLowerCase();if((t.indexOf('google play')>=0&&t.indexOf('ios')>=0)||(t.indexOf('android')>=0&&t.indexOf('google play')>=0))node.classList.add('askida-platform-note-hidden');}
 return primary;
}
function ensureModal(){
 var m=d.getElementById('askidaModal');if(m)return m;
 m=d.createElement('div');m.id='askidaModal';m.className='askida-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
 m.innerHTML='<div class="askida-dialog"><button type="button" class="askida-dialog-close" aria-label="Close">×</button><p class="askida-dialog__kicker">ASKIDA EDUVERSE</p><h3></h3><p class="askida-dialog__lead"></p><div class="askida-dialog__steps"></div><div class="askida-dialog__foot"></div><button type="button" class="askida-demo-create"></button><div class="askida-qrbox"><div class="askida-qrgrid"><div class="askida-qrimg"><img alt="Askıda QR"></div><div><div class="askida-qrlink"></div><div class="askida-qrstatus"></div><div class="askida-qractions"><button type="button" class="askida-share"></button><button type="button" class="askida-pool"></button></div></div></div></div></div>';
 d.body.appendChild(m);
 m.addEventListener('click',function(e){if(e.target===m||e.target.closest('.askida-dialog-close'))closeModal();});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('is-open'))closeModal();});
 m.querySelector('.askida-demo-create').addEventListener('click',createGiftDemo);
 m.querySelector('.askida-share').addEventListener('click',shareGift);
 m.querySelector('.askida-pool').addEventListener('click',poolGift);
 return m;
}
function resetQr(m){m.__gift=null;m.querySelector('.askida-qrbox').classList.remove('is-open');m.querySelector('.askida-qrimg img').removeAttribute('src');m.querySelector('.askida-qrlink').textContent='';m.querySelector('.askida-qrstatus').textContent='';}
function fillModal(kind){
 var l=lang(),t=T[l],m=ensureModal(),steps=m.querySelector('.askida-dialog__steps'),demo=m.querySelector('.askida-demo-create');
 m.dir=l==='ar'?'rtl':'ltr';resetQr(m);
 if(kind==='normal'){m.querySelector('h3').textContent=t.normalTitle;m.querySelector('.askida-dialog__lead').textContent=t.normalLead;steps.innerHTML='';m.querySelector('.askida-dialog__foot').textContent=t.normalFoot;demo.classList.remove('is-local');}
 else{
  m.querySelector('h3').textContent=t.title;m.querySelector('.askida-dialog__lead').textContent=t.lead;m.querySelector('.askida-dialog__foot').textContent=t.foot;steps.innerHTML='';
  t.steps.forEach(function(s){var r=d.createElement('div');r.className='askida-dialog__step';r.innerHTML='<span></span><div><b></b><p></p></div>';r.querySelector('span').textContent=s[0];r.querySelector('b').textContent=s[1];r.querySelector('p').textContent=s[2];steps.appendChild(r);});
  demo.textContent=t.demo;if(isLocal())demo.classList.add('is-local');else demo.classList.remove('is-local');
 }
 m.classList.add('is-open');d.documentElement.style.overflow='hidden';
}
function closeModal(){var m=d.getElementById('askidaModal');if(m)m.classList.remove('is-open');d.documentElement.style.overflow='';}
async function createGiftDemo(){return;}
async function shareGift(){return;}
async function poolGift(){return;}
function activateNormal(root){
 var action=root.__originalAction;
 if(action){var wasHidden=action.classList.contains('askida-platform-hidden'),wasDisabled=!!action.disabled;try{action.classList.remove('askida-platform-hidden');if('disabled' in action)action.disabled=false;action.click();}catch(e){}if(wasHidden)action.classList.add('askida-platform-hidden');if('disabled' in action)action.disabled=wasDisabled;}
 setTimeout(function(){var m=d.getElementById('askidaModal');if(!m||!m.classList.contains('is-open'))fillModal('normal');},60);
}
function render(){
 var card=findFullCard();if(!card)return false;
 var t=T[lang()],root=d.getElementById('askidaEduverse');
 if(!root){root=d.createElement('div');root.id='askidaEduverse';root.className='askida-compact';root.setAttribute('data-vitrin-module','askida');root.innerHTML='<div class="askida-compact__actions"><button type="button" class="askida-compact__btn askida-normal"></button><button type="button" class="askida-compact__btn askida-gift"></button></div><button type="button" class="askida-compact__info"></button>';card.appendChild(root);}
 root.__originalAction=hidePlatformArea(card,root)||root.__originalAction;root.dir=lang()==='ar'?'rtl':'ltr';root.querySelector('.askida-normal').textContent=t.normal;root.querySelector('.askida-gift').textContent=t.gift;root.querySelector('.askida-compact__info').textContent=t.info;return true;
}
d.addEventListener('click',function(e){
 var normal=e.target.closest&&e.target.closest('#askidaEduverse .askida-normal'),gift=e.target.closest&&e.target.closest('#askidaEduverse .askida-gift'),info=e.target.closest&&e.target.closest('#askidaEduverse .askida-compact__info');
 if(normal){e.preventDefault();e.stopPropagation();activateNormal(normal.closest('#askidaEduverse'));return;}
 if(gift){e.preventDefault();e.stopPropagation();fillModal('gift');return;}
 if(info){e.preventDefault();e.stopPropagation();fillModal('gift');return;}
},true);
function boot(){ensureModal();var n=0,t=setInterval(function(){n++;if(render()||n>40)clearInterval(t);},120);}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'){render();break;}}}).observe(d.documentElement,{attributes:true,subtree:true,attributeFilter:['data-edu-lang','lang']});
w.EDUVERSE_ASKIDA={render:render,open:function(){fillModal('gift');},close:closeModal,version:'6.0'};
})(window,document);