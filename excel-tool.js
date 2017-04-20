var xlsx = require("node-xlsx");

var workbook = xlsx.parse(`${__dirname}/january.xlsx`);

var data = workbook[0].data;
var titleList = data[0];

//constant
var RAW_DATA = data.slice(1);

var NOTIME_ROW_INDEX = 3;

var ROW_LEN = titleList.length;

var COL_LEN = data.length;

function getIndex(name) {
  for (var i = 0; i < ROW_LEN; i++) {
    if (name === titleList[i])
      return i;
  }

  return -1;
}

function readColumn(prop) {
  var idx = -1;

  if (typeof prop === "string") {
    idx = getIndex(prop);
  } else {
    idx = prop
  }

  if (idx !== -1) {
    return data.map(function (item) {
      return item[idx];
    }).slice(1)
  }

  return null;
}

function readRow(row, start, end) {
  if (typeof end === "undefined") {
    end = ROW_LEN;
  }

  return data[row].slice(start, end);
}

module.exports = {
  readColumn: readColumn,
  readRow: readRow,
  titleList: titleList,
  NOTIME_ROW_INDEX: NOTIME_ROW_INDEX,
  ROW_LEN: ROW_LEN,
  COL_LEN: COL_LEN,
  RAW_DATA: RAW_DATA,
};