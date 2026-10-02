(function(){
  "use strict";
  var toast=document.getElementById("toast");
  function showToast(message){
    if(!toast) return;
    toast.textContent=message;
    toast.classList.add("show");
    clearTimeout(window.__evStoreToastTimer);
    window.__evStoreToastTimer=setTimeout(function(){toast.classList.remove("show");},2600);
  }
  var buttons=document.querySelectorAll(".purchase");
  for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",function(){
      var plan=String(this.getAttribute("data-plan")||"");
      showToast("Seçilen paket: "+plan+" — Web ödeme altyapısı tamamlanınca etkinleştirilecek.");
    });
  }
})();