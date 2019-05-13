//width and height
var w = 800;
var h = 600;
var padding = 100;



// /*
//load data
//This opens the csv and leaves it open to work with the data
d3.csv('assets/data/data.csv').then(function (dataset) {
	//dropping columns array
	delete dataset["columns"];
	//adds variability for options in x and y axis
	var xValues = "poverty";
	var yValues = "healthcare";
	var toolTipState = "state";

	var svg = d3.select("#scatter")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
	
	// d3.selectAll("svg > *").remove();

			
	function scatterPlot(xValues, yValues) {

		// This typecasts the data being used properly
		dataset.forEach(function (d) {
			d[xValues] = +d[xValues];
			d[yValues] = +d[yValues];
			d.abbr = String(d.abbr);
			// console.log(typeof d[xValues])
		});
		//print all data to console
		console.log(dataset);
		//scale function
		var tickNumber = 10;
		var xValPadding = d3.max(dataset, function (d) { return d[xValues]; }) / d3.min(dataset, function (d) { return d[xValues]; });
		var yValPadding = d3.max(dataset, function (d) { return d[yValues]; }) / d3.max(dataset, function (d) { return d[yValues]; });
		//These variables help with scaling the x and y axis to match the data
		var xScale = d3.scaleLinear()
			.domain([d3.min(dataset, function (d) { return d[xValues]; }) - xValPadding,
			d3.max(dataset, function (d) { return d[xValues]; }) + xValPadding])
			.range([padding, w - padding * 2]);
			
		var yScale = d3.scaleLinear()
			.domain([d3.min(dataset, function (d) { return d[yValues]; }) - yValPadding,
			d3.max(dataset, function (d) { return d[yValues]; }) + yValPadding])
			.range([h - padding, padding]);
		// Axes
		//These variables set the x and y axis into the svg
		var xAxis = d3.axisBottom().scale(xScale).ticks(tickNumber);
		
		var yAxis = d3.axisLeft().scale(yScale).ticks(tickNumber);
		
		//create svg element
	
		// ToolTip 
		//pop up when mouse over each circle
		var tool_tip = d3.tip()
			.attr("class", "d3-tip")
			.offset([-8, 0])
			.html(function (d) { return d[toolTipState] + "<br>" + xValues + ": " + d[xValues] + "<br>" + yValues + ": " + d[yValues]; });
		svg.call(tool_tip);
		console.log(tool_tip.show);
	
		// function handleMouseOver() {
		// 	d3.select(this).attr("stroke", "red");
		// };
	
		// function handleMouseOut() {
		// 	d3.select(this).attr("stroke", "white");
		// };

		//CIRCLES

		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("class", "circle")
			.attr("cx", function (d) {
				return xScale(d[xValues]);
			})
			.attr("cy", function (d) {
				return yScale(d[yValues]);
			})
			.attr("r", 8)
			.attr("fill", "blue")
			.attr("stroke", "white")
			.on("mouseover", tool_tip.show)
			.on('mouseout', tool_tip.hide);
	
		
		//TEXT : state abbreviations 
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.attr("class", "abbr")
			.attr("x", function (d) {
				// console.log(d);
				return xScale(d[xValues]);
			})
			.attr("y", function (d) {
				return yScale(d[yValues]);
			})
			.text(function (d) {
				return d.abbr;
			})
			.attr("font-size", "7px")
			.attr("fill", "red")
			.attr("text-anchor", "middle")
			// location should be relative to circle radius
			.attr("transform", 'translate(0, 2.5)')
			.attr("pointer-events", "none");
		//x axis

		svg.append("g")
			.attr("class", "xaxis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
		
		//y axis
		svg.append("g")
		.attr("class", "yaxis")	
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis);
	};
	
	//LABELS
	
		//x axis label
	xLabelPadding = 40;
	xLabelSeparator = 20;
	
	//In Poverty Label
	svg.append("text")
		.attr("class", "poverty")
		.text("In Poverty (%)")
		.attr("id", "inPoverty")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + w / 2 + "," + (h - padding + xLabelPadding) + ")")
		.style("text-anchor", "middle")
		.on("click", function () {
			xValues = "poverty";
			d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".xaxis").remove();
			scatterPlot(xValues, yValues)
			});

	//Age Label
	svg.append("text")
		.attr("class", "age")
		.text("Age (Median)")
		.attr("id", "age")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + w / 2 + "," + (h - padding + xLabelPadding + xLabelSeparator) + ")")
		.style("text-anchor", "middle")
		.on("click", function () {
			xValues = "age";
				d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".xaxis").remove();
			scatterPlot(xValues, yValues);
			});

	//Household Income Label
	svg.append("text")
		.attr("class", "income")
		.text("Household Income (Median)")
		.attr("id", "householdIncome")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + w / 2 + "," + (h - padding + xLabelPadding + xLabelSeparator * 2) + ")")
		.style("text-anchor", "middle")
		.on("click", function () {
			xValues = "income";
				d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".xaxis").remove();
			scatterPlot(xValues, yValues)
			});
	
			//y axis label
			yLabelPadding = 60;
			yLabelSeparator = 20;
	//Lacks Healthcare Label
	svg.append("text")
		.attr("class", "healthcare")
		.text("Lacks Healthcare (%)")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + yLabelPadding + "," + (h) / 2 + ")" + " rotate(-90)")
		.style("text-anchor", "middle")		
		.on("click", function () {
			yValues = "healthcare";
				d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".yaxis").remove();
			scatterPlot(xValues, yValues)
			});

	//Smokes Label		
	svg.append("text")
		.attr("class", "smokes")
		.text("Smokes (%)")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + (yLabelPadding - yLabelSeparator) + "," + (h) / 2 + ")" + " rotate(-90)")
		.style("text-anchor", "middle")
		.on("click", function () {
			yValues = "smokes";
				d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".yaxis").remove();
			scatterPlot(xValues, yValues)
			});

	// Obese Label
	svg.append("text")
		.attr("class", "obesity")
		.text("Obese (%)")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("transform", "translate(" + (yLabelPadding - yLabelSeparator * 2) + "," + (h) / 2 + ")" + " rotate(-90)")
		.style("text-anchor", "middle")
		.on("click", function () {
			yValues = "obesity";
				d3.selectAll(".circle").remove();
			d3.selectAll(".abbr").remove();
			d3.selectAll(".yaxis").remove();
			scatterPlot(xValues, yValues)
			});
	
	scatterPlot(xValues,yValues)
});	
		