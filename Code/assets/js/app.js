//width and height
var w = 600;
var h = 400;
var padding = 40;

// /*
//load data
d3.csv('assets/data/data.csv').then(function(dataset) {
 
	dataset.forEach(function (d) {
		d.poverty = +d.poverty;
		d.healthcare = +d.healthcare;
		d.abbr = String(d.abbr);
		console.log(d.abbr)
	}); 

console.log(dataset);	
		
		//scale function
		var xScale = d3.scaleLinear()
			//.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
			.domain([d3.min(dataset, function (d) { return d.healthcare; }) + 3,
								d3.max(dataset, function (d) { return d.poverty; }) + 3])
			//.range([padding, w-padding * 2]);
			.range([padding, w - padding * 2]);
			
		var yScale = d3.scaleLinear()
			.domain([d3.min(dataset, function (d) { return d.healthcare; }) - 1,
								d3.max(dataset, function (d) { return d.healthcare; }) - 1 ])
			//.range([padding, w-padding * 2]);
			.range([h - padding, padding]);
		
		var xAxis = d3.axisBottom().scale(xScale).ticks(10);
		
		var yAxis = d3.axisLeft().scale(yScale).ticks(10);
		
		//create svg element
		var svg = d3.select("#scatter")
					.append("svg")
					.attr("width", w)
					.attr("height", h);
		//circles 
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function (d) {
				return xScale(d.poverty);
			})
			.attr("cy", function(d) {
				return  yScale(d.healthcare);
			})
			.attr("r", 10)
			.attr("fill", "blue")
			.attr("stroke","white");
	//state abbreviations 
	svg.selectAll("state")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", function (d) {
			return xScale(d.poverty);
		})
		.attr("y", function (d) {
			console.log(yScale(d.healthcare));
			return  yScale(d.healthcare);
		})
		.text(function (d) {
			return d.abbr;
		} )
		.attr("font-size", "7px")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
		// location should be relative to circle radius
		.attr("transform",'translate(0, 2.5)')
		//x axis
		svg.append("g")
			.attr("class", "x axis")	
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
		
		//y axis
		svg.append("g")
			.attr("class", "y axis")	
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);
		});	