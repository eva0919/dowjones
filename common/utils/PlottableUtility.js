import $ from 'jquery';

export function PlottableChartUtility(Plottable, el, dataSet, config={}){
  if( Plottable ){
    const width = config.width || "1000px";
    const height = config.height || "500px";
    const div = d3.select(el);
    const svg = d3.select($('svg', div[0])[0]);
    // console.log(svg);
    svg.html("");
    // div.append('svg')
    //   .attr('width', width)
    //   .attr('height', height);
    var xScale = new Plottable.Scales.Time();
    var yScale = new Plottable.Scales.Linear();

    var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
    xAxis.formatter(Plottable.Formatters.multiTime());
    var yAxis = new Plottable.Axes.Numeric(yScale, "left");

    var plot = new Plottable.Plots.Line();
    plot.x(function(d) {
      let dateString = d.Date.split("T")[0];
      let dateToken = dateString.split("-");
      return new Date(Date.UTC(dateToken[0], parseInt(dateToken[1])-1, dateToken[2]));
    }, xScale);
    plot.y(function(d) { return d.High; }, yScale);

    // var data = [
    //   { "x": 0, "y": 1 },
    //   { "x": 1, "y": 2 },
    //   { "x": 2, "y": 4 },
    //   { "x": 3, "y": 8 }
    // ];

    var dataset = new Plottable.Dataset(dataSet);
    plot.addDataset(dataset);
    var pzi = new Plottable.Interactions.PanZoom(xScale, null);
    pzi.attachTo(plot);

    var output = d3.select("#hoverFeedback");
    var outputDefaultText = "Closest:"
    output.text(outputDefaultText);
    var chart = new Plottable.Components.Table([
      [yAxis, plot],
      [null, xAxis]
    ]);
    console.log( d3.select($('svg', div[0])[0]) );
    chart.renderTo( d3.select($('svg', div[0])[0]) );
    var crosshair = createCrosshair(plot);
  }
  function createCrosshair(plot) {
    var crosshair = {};
    var crosshairContainer = plot.foreground().append("g").style("visibility", "hidden");
    crosshair.vLine = crosshairContainer.append("line")
                      .attr("stroke", "black")
                      .attr("y1", 0)
                      .attr("y2", plot.height());
    crosshair.circle = crosshairContainer.append("circle")
                      .attr("stroke", "black")
                      .attr("fill", "white")
                      .attr("r", 3);
    crosshair.drawAt = function(p) {
      crosshair.vLine.attr({
        x1: p.x,
        x2: p.x
      });
      crosshair.circle.attr({
        cx: p.x,
        cy: p.y
      });
      crosshairContainer.style("visibility", "visible");
    }
    crosshair.hide = function() {
      crosshairContainer.style("visibility", "hidden");
    }
    return crosshair;
  }
}
