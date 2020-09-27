//Delgetstei ajillakh Controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) callback(list[i], i);
  };

  var formatMoney = function(too, type) {
    too = "" + too;
    var x = too
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);
    if (type === "inc") z = "+ " + z;
    else z = "- " + z;
    return z;
  };

  return {
    displayDate: function() {
      var today = new Date();

      document.querySelector(DOMstrings.dateLabel).textContent =
        today.getFullYear() + " year " + today.getMonth() + " Month";
    },
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    displayPercentages: function(allPercentages) {
      //Zarlagiin NodeList -g olokh <button id = ''> clickme </button>
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );

      // element bolgonii huwid zarlagiin huwiig massive-s awch shij oruulakh

      nodeListForeach(elements, function(el, index) {
        el.textContent = allPercentages[index];
      });
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

    tusviigUzuuleh: function(tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );

      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function(item, type) {
      // Orlogo zarlagiin elementiig aguulsan html-g beltgene.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix"id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Ter HTML dotroo orlogo zarlagiin utga-uudiig replace ashiglaj solij ogno
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("$$value$$", formatMoney(item.value, type));
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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },

    calculatePercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPercentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPercentages;
    },

    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },

    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });
      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
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

      //Update to budget and display to Desktop
      updateTusuv();
    }
  };
  var updateTusuv = function() {
    //4. Toswiig tootsoolno
    financeController.tusuwTootsooloh();
    //5. Etsiin uldegdel,
    var tusuv = financeController.tusviigAvah();
    //6. Toswiin tootsoog delgetsend gargana .
    uiController.tusviigUzuuleh(tusuv);
    //   console.log(tusuv);

    //7. Elementuudiin Huwiig tootsoolno
    financeController.calculatePercentages();
    //8. Elementuudiin huwiig huleej awna
    var allPercentages = financeController.getPercentages();
    //9. Edgeer huwiig delgetsend gargana.
    uiController.displayPercentages(allPercentages);
    // console.log(allPercentages);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //income-2
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          //   console.log(type + "===>" + itemId);

          //1. Sankhvvgiin module-s type, id ashiglaaad ustgana.
          financeController.deleteItem(type, itemId);
          //2. Delgets deerees ene elementiig ustgana.
          uiController.deleteListItem(id);
          //3. Uldegdel tootsoog shinechilj haruulana
          //Update to budget and display to Desktop
          updateTusuv();
        }
      });
  };

  return {
    init: function() {
      console.log("Application started ...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
