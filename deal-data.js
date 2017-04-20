var excTool = require("./excel-tool");
var mathTool = require("./math-tool");

var NOTIME_ROW_INDEX = excTool.NOTIME_ROW_INDEX;
var ROW_LEN = excTool.ROW_LEN;
var COL_LEN = excTool.COL_LEN;
var RAW_DATA = excTool.RAW_DATA;

var readRow = excTool.readRow;

var normalize = mathTool.normalize;

var MAXES = [], MINES = [], DIGIT_DATA = [];

function p2n(str) {
  var reg = /^[0-9]+(.[0-9]+)?/;
  return Number(reg.exec(str)[0]);
}

function getMax(obj) {
  console.log(obj);
  return obj.reduce(function (acc, item) {
    if (typeof item !== "number")
      item = getMax(item);
    return acc > item ? acc : item;
  }, 0)
}

function getMaxes(obj) {
  return obj.map(function (sub) {
    return sub.reduce(function (acc, item) {
      return acc > item ? acc : item;
    }, 0)
  })
}

function getMin(obj) {
  return obj.reduce(function (acc, item) {
    if (typeof item !== "number")
      item = getMin(item);
    return acc < item ? acc : item;
  }, 100000)
}

function getMines(obj) {
  return obj.map(function (sub) {
    return sub.reduce(function (acc, item) {
      return acc < item ? acc : item;
    }, 100000)
  })
}

function r2c(nestArr) {
  var result = [], row_len = nestArr[0].length, col_len = nestArr.length;
  for(var i = 0; i < row_len; i++) {
    var sub = [];
    for(var j = 0; j < col_len; j++)
      sub.push(nestArr[j][i]);
    result.push(sub);
  }

  return result;
}

(function main() {

  for (var i = 1; i < COL_LEN; i++) {

    DIGIT_DATA.push((function () {
      var item = readRow(i, NOTIME_ROW_INDEX, ROW_LEN);
      item[1] = p2n(item[1]);
      return item;
    })());
  }

  var R2C_DATA = r2c(DIGIT_DATA)
  MAXES = getMaxes(R2C_DATA);
  MINES = getMines(R2C_DATA);

  DIGIT_DATA = DIGIT_DATA.map(function (sub) {
    return sub.map(function (item, idx) {
      return normalize(item, MINES[idx], MAXES[idx])
    })
  })
})();

module.exports = {
  DIGIT_DATA: DIGIT_DATA
};
