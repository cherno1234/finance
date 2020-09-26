//Delgetstei ajillakh Controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      //Convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(el) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    addListItem: function(item, type) {
      // Orlogo zarlagiin elementiig aguulsan html-g beltgene.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">+$$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix"id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">-$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Ter HTML dotroo orlogo zarlagiin utga-uudiig replace ashiglaj solij ogno
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("$$value$$", item.value);
      // Beltgsen HTML ee DOM ruu hiij ogno .
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    },
    tusuv: 0,
    huvi: 0
  };

  return {
    tusuwTootsooloh: function() {
      //Niit orlogiin niilberiig tootsoolno
      calculateTotal("inc");
      //Niit zarlagiin niilberiig tootsoolno
      calculateTotal("exp");

      // Toswiig shineer tootsoolno
      data.tusuv = data.totals.inc - data.totals.exp;

      //Orlogo zarlagiin huwiig tootsoolno
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
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
      return item;
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

    if (input.description !== "" && input.value !== "") {
      //2. Olj awsan ogogdluude sankhuugiin conrollert damjuuulj hadgalna.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3.Olj awsan ogogdlvvdiig web dre tohirokh hesegy gargana

      uiController.addListItem(item, input.type);
      uiController.clearFields();

      //4. Toswiig tootsoolno
      financeController.tusuwTootsooloh();
      //5. Etsiin uldegdel,
      var tusuw = financeController.tusviigAvah();
      //6. Toswiin tootsoog delgetsend gargana .
      console.log(tusuw);
    }
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
