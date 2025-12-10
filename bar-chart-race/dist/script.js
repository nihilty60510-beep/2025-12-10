/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Data
var allData = {
  "2015": {
    "Japan": 1629193,
    "Korea": 662670,
    "Vietnam": 143930,
    "Thailand": 121337,
    "Malaysia": 458401,
    "Singapore": 354767,
    "Philippines": 139758,
    "Indonesia": 181734,
    "USA": 497410,
    "Canada": 126003
  },
  "2016": {
    "Japan": 1896456,
    "Korea": 887412,
    "Vietnam": 194323,
    "Thailand": 193200,
    "Malaysia": 500496,
    "Singapore": 371663,
    "Philippines": 171816,
    "Indonesia": 192053,
    "USA": 542261,
    "Canada": 143691
  },
  "2017": {
    "Japan": 1895546,
    "Korea": 1055027,
    "Vietnam": 380833,
    "Thailand": 289801,
    "Malaysia": 552620,
    "Singapore": 386843,
    "Philippines": 290303,
    "Indonesia": 193813,
    "USA": 577628,
    "Canada": 155661
  },
  "2018": {
    "Japan": 1966303,
    "Korea": 1021530,
    "Vietnam": 490699,
    "Thailand": 317086,
    "Malaysia": 548947,
    "Singapore": 389689,
    "Philippines": 420302,
    "Indonesia": 215891,
    "USA": 594946,
    "Canada": 164079
  },
  "2019": {
    "Japan": 2162426,
    "Korea": 1245144,
    "Vietnam": 404570,
    "Thailand": 410385,
    "Malaysia": 560099,
    "Singapore": 421121,
    "Philippines": 510966,
    "Indonesia": 234968,
    "USA": 620077,
    "Canada": 173491
  },
  "2020": {
    "Japan": 268798,
    "Korea": 179190,
    "Vietnam": 110053,
    "Thailand": 63033,
    "Malaysia": 74788,
    "Singapore": 46225,
    "Philippines": 77914,
    "Indonesia": 56725,
    "USA": 82899,
    "Canada": 22078
  },
  "2021": {
    "Japan": 9910,
    "Korea": 3165,
    "Vietnam": 24872,
    "Thailand": 7534,
    "Malaysia": 6188,
    "Singapore": 2309,
    "Philippines": 9350,
    "Indonesia": 14131,
    "USA": 9680,
    "Canada": 1101
  },
  "2022": {
    "Japan": 87133,
    "Korea": 51480,
    "Vietnam": 135356,
    "Thailand": 74356,
    "Malaysia": 60742,
    "Singapore": 66182,
    "Philippines": 64490,
    "Indonesia": 79031,
    "USA": 85840,
    "Canada": 14486
  },
  "2023": {
    "Japan": 926140,
    "Korea": 745885,
    "Vietnam": 382026,
    "Thailand": 391573,
    "Malaysia": 463292,
    "Singapore": 423063,
    "Philippines": 387211,
    "Indonesia": 206023,
    "USA": 534219,
    "Canada": 117203
  },
  "2024": {
    "Japan": 1318372,
    "Korea": 1010035,
    "Vietnam": 370802,
    "Thailand": 397168,
    "Malaysia": 463216,
    "Singapore": 400181,
    "Philippines": 476746,
    "Indonesia": 231455,
    "USA": 660284,
    "Canada": 144168
  }
};


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

root.numberFormatter.setAll({
  numberFormat: "#a",

  // Group only into M (millions), and B (billions)
  bigNumberPrefixes: [
    { number: 1e6, suffix: "M" },
    { number: 1e9, suffix: "B" }
  ],

  // Do not use small number prefixes at all
  smallNumberPrefixes: []
});

var stepDuration = 2000;


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  paddingLeft: 0
}));


// We don't want zoom-out button to appear while animating, so we hide it at all
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 20,
  inversed: true,
  minorGridEnabled: true
});
// hide grid
yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "network",
  renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  strictMinMax: true,
  extraMax: 0.1,
  renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.set("interpolationDuration", stepDuration / 10);
xAxis.set("interpolationEasing", am5.ease.linear);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "network"
}));

// Rounded corners for columns
series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// Add label bullet
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1,
    sprite: am5.Label.new(root, {
      text: "{valueXWorking.formatNumber('#.# a')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerX: am5.p100,
      centerY: am5.p50,
      populateText: true
    })
  });
});

var label = chart.plotContainer.children.push(am5.Label.new(root, {
  text: "2015",
  fontSize: "8em",
  opacity: 0.2,
  x: am5.p100,
  y: am5.p100,
  centerY: am5.p100,
  centerX: am5.p100
}));

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}

// Axis sorting
function sortCategoryAxis() {
  // sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("valueX") - x.get("valueX"); // descending
    //return x.get("valueX") - y.get("valueX"); // ascending
  });

  // go through each axis item
  am5.array.each(yAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition =
        (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      if (dataItem.get("index") != index) {
        dataItem.set("index", index);
        // set deltaPosition instanlty
        dataItem.set("deltaPosition", -deltaPosition);
        // animate delta position to 0
        dataItem.animate({
          key: "deltaPosition",
          to: 0,
          duration: stepDuration / 2,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }
  });
  // sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
  yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

var year = 2015;

// update data with values each 1.5 sec
var interval = setInterval(function () {
  year++;

  if (year > 2024) {
    clearInterval(interval);
    clearInterval(sortInterval);
  }

  updateData();
}, stepDuration);

var sortInterval = setInterval(function () {
  sortCategoryAxis();
}, 100);

function setInitialData() {
  var d = allData[year];

  for (var n in d) {
    series.data.push({ network: n, value: d[n] });
    yAxis.data.push({ network: n });
  }
}

function updateData() {
  var itemsWithNonZero = 0;

  if (allData[year]) {
    label.set("text", year.toString());

    am5.array.each(series.dataItems, function (dataItem) {
      var category = dataItem.get("categoryY");
      var value = allData[year][category];

      if (value > 0) {
        itemsWithNonZero++;
      }

      dataItem.animate({
        key: "valueX",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
      dataItem.animate({
        key: "valueXWorking",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
    });

    yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
  }
}

setInitialData();
setTimeout(function () {
  year++;
  updateData();
}, 50);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);