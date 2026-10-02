(function(){
  "use strict";

  var year = document.getElementById("year");
  if(year){ year.textContent = String(new Date().getFullYear()); }

  var buttons = document.querySelectorAll(".purchase-button");
  var note = document.getElementById("payment-note");

  for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", function(){
      var plan = String(this.getAttribute("data-plan") || "");
      if(note){
        note.textContent =
          "SeÃ§ilen paket: " + plan +
          ". Bu Phase 1 sÃ¼rÃ¼mÃ¼ gerÃ§ek Ã¶deme baÅŸlatmaz; Ã¶deme saÄŸlayÄ±cÄ±sÄ± ve sunucu tarafÄ± satÄ±n alma hakkÄ± doÄŸrulamasÄ± sonraki fazda baÄŸlanacaktÄ±r.";
      }
    });
  }
})();
