(function(){
  "use strict";

  var year = document.getElementById("year");
  if(year){ year.textContent = String(new Date().getFullYear()); }

  var note = document.getElementById("payment-note");
  var buttons = document.querySelectorAll(".purchase");

  for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", function(){
      var plan = String(this.getAttribute("data-plan") || "");
      if(note){
        note.textContent =
          "Seçilen ürün: " + plan +
          ". Bu yerel V2 tasarımı gerçek ödeme başlatmaz. Ödeme katmanı yalnız sunucu tarafı doğrulama hazır olduğunda etkinleştirilecektir.";
      }
    });
  }
})();