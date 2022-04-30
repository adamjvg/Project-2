var series;
var yAxis;

function updateGraph(genre, measurement) {
  songData.then((tracks) => {
    var data = tracks
      .filter(d => d.topgenre === genre)
      .map(d => ({
        track: `${d.artist} - ${d.title}`,
        value: d[measurement]
      }))
      .sort((a, b) => a.value - b.value);

      console.log(data);

    yAxis.data.setAll(data);
    series.data.setAll(data);
    sortCategoryAxis();
  });
}

am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");


  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: true,
    wheelX: "none",
    wheelY: "panY"
  }));

  // We don't want zoom-out button to appear while animating, so we hide it
  chart.zoomOutButton.set("forceHidden", false);


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 30
  });

  yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "track",
    renderer: yRenderer,
    tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
  }));

  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    extraMax:0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  }));


  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "track",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "left",
      labelText: "{valueX}"
    })
  }));


  // Rounded corners for columns
  series.columns.template.setAll({
    cornerRadiusTR: 5,
    cornerRadiusBR: 5
  });

  // Set each column to be of a different color
  series.columns.template.adapters.add("fill", function(fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function(stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomY",
    xAxis: xAxis,
    yAxis: yAxis
  }));
  
  chart.set("scrollbarY", am5.Scrollbar.new(root, {
    orientation: "vertical"
  }));

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);

}); // end am5.ready()

// Axis sorting
function sortCategoryAxis() {

  // // Sort by value
  series.dataItems.sort(function(x, y) {
    return x.get("valueX") - y.get("valueX"); // descending
    //return y.get("valueY") - x.get("valueX"); // ascending
  })

  // // Go through each axis item
  am5.array.each(yAxis.dataItems, function(dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instanlty
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic)
      })
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set,
  // they keep in the same places and then animate to true positions.
  yAxis.dataItems.sort(function(x, y) {
    return x.get("index") - y.get("index");
  });
}

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}