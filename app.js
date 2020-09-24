//Delgetstei ajillakh Controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Sankhvvtei ajillakh Controller
var financeController = (function() {
  //private function
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private function
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      //   console.log("item added ....");
      var item, id;
      //identification
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
    },
    seeData: function() {
      return data;
    }
  };
})();

//Programmin holbogch Controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Oruulakh ogogdliig delgetsees olj awna
    var input = uiController.getInput();

    financeController.addItem(input.type, input.description, input.value);
    //2. Olj awsan ogogdluude sankhuugiin conrollert damjuuulj hadgalna.
    //3.Olj awsan ogogdlvvdiig web dre tohirokh hesegy gargana
    //4. Toswiig tootsoolno
    //5. Etsiin uldegdel, tootsoog delgetsend gargana .
    //5. Etsiin uldegdel, tootsoog delgetsend gargana .
  };

  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Application started ...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
