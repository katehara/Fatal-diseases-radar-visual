$(function() {

	var data;
	
	var height , width;
	var tip = d3.tip()
		  .attr("class", "tip")
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<span style='color:#ffffba'>" + Math.round(d.values) + "</span>";
		  })

first();	
second();
third();
fourth();

	// d3.csv("deathData.csv", function(loadedRows) {
	//   	rows = loadedRows;
	  	// for(i=0;i<rows.length;i++)
	  	// 	console.log(rows[i]);

	

})

	
first = function(){

	var margin = {top: 30, right: 20, bottom: 30, left: 100};

	// Set the ranges
	var x = d3.scale.linear().range([0, 600]);
	var y = d3.scale.linear().range([500, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(10);

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(15);

	// Define the line
	var priceline = d3.svg.line()
	    .x(function(d) { return x(d.year); })
	    .y(function(d) { return y(d.deaths); })
	    .interpolate("linear");
	    
	// Adds the svg canvas
	var svg = d3.select("div.ar1").select(".v")
	    .append("svg")
	        .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 800 600")
	    .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	d3.csv("v1.csv", function(error, data) {
	    data.forEach(function(d) {
			// d.year = parseDate(d.year);
			d.deaths = +d.deaths;
	    });

	    // Scale the range of the data
	    x.domain(d3.extent(data, function(d) { return d.year; }));
	    y.domain([0 , d3.max(data, function(d) { return d.deaths; })]); 

	    // Nest the entries by symbol
	    var dataNest = d3.nest()
	        .key(function(d) {return d.sex;})
	        .entries(data);

	    // Loop through each symbol / key
	    dataNest.forEach(function(d) {
	    		l=d.key;
	        svg.append("path")
	            .attr("class", "line")
	            .attr("d", priceline(d.values));
	            
	        svg.append("text")
	        	.text(l)
	        	.attr("x" , function(d){
	        		if(l == "Male") return 300;
	        		if(l == "Female") return 300;
	        		if(l == "All") return 300;
	        	})
	        	.attr("y" ,  function(d){
	        		if(l == "Male") return 250;
	        		if(l == "Female") return 310;
	        		if(l == "All") return 45;
	        	})
	        	.attr("fill" , "#0d47a1");//, "#2979ff");
	        	
	            // .attr("stroke" , "green")
	            // .attr("stroke-width" , 2);
	    });

	    // Add the X Axis
	    svg.append("g")
	        .attr("class", "x axis")
	        .attr("transform", "translate(0," + 500 + ")")
	        .call(xAxis);

	    // Add the Y Axis
	    svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis);

	});


}	

second = function() {

var w = 500,
	h = 500;

var d1 , d2 , d;

var colorscale = d3.scale.linear()
      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

//Legend titles
var LegendOptions = ['Male ','Female'];

//Data
d3.csv("va.csv"  , function(error , data){
	d1 = data;
	d5 = d1.map(function(d){

		return {
			axis: d.cause,
			value: d.deaths
		};

	});
	// console.log(d1);


d3.csv("vb.csv"  , function(error , data){
	d2 = data;
	d6 = d2.map(function(d){

		return {
			axis: d.cause,
			value: d.deaths
		};

	});

d = [d5 , d6];

// console.log(d6);

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.,
  levels: 10,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

var svg = d3.select('div.ar2').select(".v")
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of people die out of a particular disease.");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;

	//console.log(LegendOptions);
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	

});

});

	
}

third = function(){

	var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return "<strong>Deaths:</strong> <span style='color:red'>" + Math.round(d.value) + "</span>";
  })



	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#0d47a1", "#2979ff"]);//, "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("div.ar3").select(".v").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
 	        .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 500 400")
  .append("g")
  	.style("position" , "relative")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

d3.csv("v3.csv", function(error, data) {
  if (error) throw error;

  var sexNames = d3.keys(data[0]).filter(function(key) { return key == "Male" || key == "Female"; });

  data.forEach(function(d) {
    d.sexs = sexNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.age; }));
  x1.domain(sexNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.sexs, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");;

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".5em")
      .style("text-anchor", "end")
      .text("Deaths");

  var age = svg.selectAll(".age")
      .data(data)
    .enter().append("g")
      .attr("class", "age")
      .attr("transform", function(d) { return "translate(" + x0(d.age) + ",0)"; });

  age.selectAll("rect")
      .data(function(d) { return d.sexs; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); })
      ;

  var legend = svg.selectAll(".legend")
      .data(sexNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 10 + ")"; });

  legend.append("rect")
      .attr("x", width - 10)
      .attr("width", 8)
      .attr("height", 8)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 10)
      .attr("y", 3)
      .attr("dy", ".3em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});



}
	
fourth = function(){

d3.csv("v4.csv", function(flights) {

  var m = 21,
      r = 120,
      z = d3.scale.ordinal()
      		.range(["#bbdefb", "#0d47a1", "#2979ff"])

  var pie = d3.layout.pie()
      .value(function(d) { return +d.deaths; })
      .sort(function(a, b) { return b.deaths - a.deaths; });

  var arc = d3.svg.arc()
      .innerRadius(r / 3)
      .outerRadius(r);

  var airports = d3.nest()
      .key(function(d) { return d.sex; })
      .entries(flights);

  var svg = d3.select("div.ar4").select(".v")
  		.selectAll("div")
      .data(airports)
    .enter().append("div") 
      .style("display", "inline-block")
      .style("width", (r + m) * 2 + "px")
      .style("height", (r + m) * 2 + "px")
    .append("svg:svg")
      .attr("width", (r + m) * 2)
      .attr("height", (r + m) * 2)
      .attr('viewBox','0 0 '+(r+m)*3+' '+(r+m)*3)
    .attr('preserveAspectRatio','xMinYMin')
    .append("svg:g")
      .attr("transform", "translate(" + (r + m) *1.5 + "," + (r + m)*1.5 + ")")
      .attr('viewBox','0 0 '+(r+m)+' '+(r+m))
    .attr('preserveAspectRatio','xMinYMin');

  svg.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });

  var g = svg.selectAll("g")
      .data(function(d) { return pie(d.values); })
    .enter().append("svg:g");

  // Add a colored arc path, with a mouseover title showing the deaths.
  g.append("svg:path")
      .attr("d", arc)
      .style("fill", function(d) { return z(d.data.cause); })
    .append("svg:title")
      .text(function(d) { return d.data.cause + ": " + d.data.deaths; });

  // Add a label to the larger arcs, translated to the arc centroid and rotated.
  g.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("z-index" , 1000)
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .text(function(d) { return d.data.cause; });

  // Computes the label angle of an arc, converting from radians to degrees.
  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }
});
			

}




