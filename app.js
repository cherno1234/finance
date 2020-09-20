//Delgetstei ajillakh Controller
var uiController = (function() {})();

//Sankhvvtei ajillakh Controller
var financeController = (function() {})();

//Programmin holbogch Controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Oruulakh ogogdliig delgetsees olj awna
    console.log("Delgetsees ogogdol awakh heseg ");
    //2. Olj awsan ogogdluude sankhuugiin conrollert damjuuulj hadgalna.
    //3.Olj awsan ogogdlvvdiig web dre tohirokh hesegy gargana
    //4. Toswiig tootsoolno
    //5. Etsiin uldegdel, tootsoog delgetsend gargana .
  };

  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
