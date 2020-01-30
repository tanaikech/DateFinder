/**
 * GitHub  https://github.com/tanaikech/DateFinder<br>
 * Get charset of the inputted blob.<br>
 * @param {object} Object object
 * @return {RangeList} Return RangeList object
 */
function search(object) {
    return new DateFinder(object).Search();
}
;
(function(r) {
  var DateFinder;
  DateFinder = (function() {
    var columnToLetter, getA1Notation, init;

    DateFinder.name = "DateFinder";

    function DateFinder(obj_) {
      this.obj = obj_;
      this.sheet;
      this.range;
      this.from;
      this.to;
      this.date;
    }

    DateFinder.prototype.Search = function() {
      var a1Notations;
      a1Notations = getA1Notation.call(this, init.call(this));
      if (a1Notations.length > 0) {
        return this.sheet.getRangeList(a1Notations);
      }
      return null;
    };

    init = function() {
      var {from: from, to: to, date: date} = this.obj;
      if (from && to && !date) {
        this.from = from.getTime();
        this.to = to.getTime();
      } else if (from && !to && !date) {
        this.from = from.getTime();
      } else if (!from && to && !date) {
        this.to = to.getTime();
      } else if (!from && !to && date) {
        this.date = date.getTime();
      } else {
        throw new Error("Please set the condition for searching. 'from', 'to', 'date'");
      }
      this.sheet = "sheet" in this.obj ? this.obj.sheet : SpreadsheetApp.getActiveSheet();
      if (!this.sheet) {
        throw new Error("Please set 'sheet'. Because 'SpreadsheetApp.getActiveSheet()' returns 'null'.");
      }
      this.range = "range" in this.obj ? this.obj.range : this.sheet.getDataRange();
      return this.range.getValues();
    };

    getA1Notation = function(values) {
      return values.reduce((function(_this) {
        return function(ar1, row, i) {
          var temp;
          temp = row.reduce(function(ar2, col, j) {
            var v;
            if (col instanceof Date) {
              v = col.getTime();
              if (((_this.from && _this.to && !_this.date) && v >= _this.from && v <= _this.to) || ((_this.from && !_this.to && !_this.date) && v >= _this.from) || ((!_this.from && _this.to && !_this.date) && v <= _this.to) || ((!_this.from && !_this.to && _this.date) && v === _this.date)) {
                ar2.push((columnToLetter.call(_this, j + 1)) + (i + 1));
              }
            }
            return ar2;
          }, []);
          Array.prototype.push.apply(ar1, temp);
          return ar1;
        };
      })(this), []);
    };

    columnToLetter = function(column) {
      var letter, temp;
      temp = 0;
      letter = "";
      while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
      }
      return letter;
    };

    return DateFinder;

  })();
  return r.DateFinder = DateFinder;
})(this);
