$(document).ready(function () {

  var lanesClosure = new Array(3).fill("0,0");
  for (var i = 1; i < 4; i++) {
    $('#closure'+i).slider({
  	min: 0,
  	max: 24,
  	value: [0,12],
  	labelledby: ['closure1_low', 'closure1_high']
  });
  var trafficArray = [
                0.019,
								0.016,
								0.013,
								0.015,
								0.016,
								0.021,
								0.029,
								0.036,
								0.044,
								0.052,
								0.060,
								0.065,
								0.066,
								0.066,
								0.067,
								0.069,
								0.067,
								0.062,
								0.055,
								0.048,
								0.040,
								0.033,
								0.026,
								0.015
            ];
  var trafficData = function(trafficArray){
    var dataObject = [];
    for (var i = 0; i < trafficArray.length; i++) {
      el = {
         "x": i,
         "y": trafficArray[i]*100
       }
       dataObject.push(el);
    }
    return dataObject;
  };

  function drawGraph(data) {
	    cleanGraph();

	    var width = 600;
	    var height = 400;
	    var canvas = d3.select("#d3Graph")
	      .append("svg")
	      .attr("width", width)
	      .attr("height", height)
	      .attr("class", "lanesClosureChart");

	    var margin = {
	      left: 100,
	      top: 100,
	      right: 100,
	      bottom: 50
	    };

	    var padding = 20;

	    var group = canvas.append("g")
	      .attr("width", width - margin.left - margin.right)
	      .attr("height", height - margin.top - margin.bottom)
	      .attr("transform", "translate(100,100)")
	      .attr("padding", padding);

        var x = d3.scaleLinear()
  	      .domain([d3.min(data, function(d) {
  	        return d.x;
  	      }), d3.max(data, function(d) {
  	        return d.x;
  	      })])
  	      .range([0, width - 200]);

  	    var y = d3.scaleLinear()
  	      .domain([0, d3.max(data, function(d) {
  	        return d.y;
  	      })])
  	      .range([height - 200, 0]);

	    var xAxis = d3.axisBottom()
	      .scale(x)
        .ticks(24);

	    var yAxis = d3.axisLeft()
	      .scale(y);

	    var line = d3.line()
	      .x(function(d) {
	        return x(d.x);
	      })
	      .y(function(d) {
	        return y(d.y);
	      })
	      .curve(d3.curveMonotoneX);

      var rectData = ["2,4","6,8","10,14"];

	    group.selectAll("path")
	      .data([data])
	      .enter()
	      .append("path")
	      .attr("d", line)
	      .attr("fill", "none")
	      .attr("stroke", "steelBlue")
	      .attr("stroke-width", "1.5px");

        group.selectAll('rect').data(rectData)
       .enter()
       .append("rect")
       .attr("x", function(d){ return x(parseInt(d.split(',')[0]))})
       .attr("y", 75)
       .attr("width", function(d){ return x(parseInt(d.split(',')[1]) - parseInt(d.split(',')[0]))})
       .attr("height", height - margin.top - margin.bottom - 50 )
       .attr("transform", "translate (0,-75)")
       .attr("fill", "lightpink")
       .attr("opacity", 0.4)

	    // group.selectAll(".area")
	    //   .data([data])
	    //   .enter()
	    //   .append("path")
	    //   .attr("class", "area")
	    //   .attr("d", area)
	    //   .attr("fill", "lightsteelblue")
	    //   .attr("stroke-width", 0)
	    //   .attr("opacity", 0.4);

	    group.append("g")
	      .attr("transform", "translate (0," + (height - 200) + ")") // move down x
	      .call(xAxis);

	    group.append("g")
	      .call(yAxis);

	    canvas.append("text")
	      .attr("transform", "translate(" + (width / 2) + " ," +
	        (height-65) + ")")
	      .style("text-anchor", "middle")
	      .text("Hours");

	    canvas.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", margin.left / 2)
	      .attr("x", 0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("Hourly Traffic Demand");
	  }

		//prevent duplicated appending
	  function cleanGraph() {
	    d3.select("svg").remove();
	  }

    drawGraph(trafficData(trafficArray));

  $("#closure" + i).on("slide", function(slideEvt) {
    var timeRange = (slideEvt.currentTarget.value).split(",");
    $("#" + slideEvt.currentTarget.id.replace("closure","closureTime_")).text("Begins: "+ timeRange[0] + " Ends: " + timeRange[1])
    });

  $("#setClosure_"+i).unbind('click').on('click',function () {
    var currentNumber = $(this)[0].id.split("_").pop();
    lanesClosure[currentNumber-1]=$("#closure"+currentNumber).val();
  });

  $("#resetClosure_"+i).unbind('click').on('click',function () {
    var currentNumber = $(this)[0].id.split("_").pop();
    lanesClosure[currentNumber-1]="0,0";
    $("#closure" + currentNumber).slider('setValue',[0,12], true, true);
    $("#closureTime_"+currentNumber).text("");
  });

  }

})
