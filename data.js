var ml = require("machine_learning");

var toolSet = require("./excel-tool");
var dealData = require("./deal-data");

var titleList = toolSet.titleList;
var NOTIME_ROW_INDEX = toolSet.NOTIME_ROW_INDEX;
var ROW_LEN = toolSet.ROW_LEN;

var DIGIT_DATA = dealData.DIGIT_DATA;


var result = ml.kmeans.cluster({
  data: DIGIT_DATA,
  k: 5,
  epochs: 11,
  distance: {type: "pearson"},
  // distance: {type: "euclidean"}
});

console.log(titleList.slice(NOTIME_ROW_INDEX, ROW_LEN));
result.means.forEach(function (sub) {
  console.log(sub[0].toFixed(6), sub[1].toFixed(6), sub[2].toFixed(6));
});

result.clusters.forEach(function (sub, idx) {
  console.log(idx + ": has " + sub.length + " member.")
});
