let data;
let selectedPlanetsCount = 10;

d3.csv("data/new_data.csv").then(loadedData => {
    data = loadedData;
    data.forEach(d => {
        d.mass_multiplier = parseFloat(d.mass_multiplier);
        d.distance = parseFloat(d.distance);
        d.radius_multiplier = parseFloat(d.radius_multiplier);
    });
    data.sort((a, b) => a.distance - b.distance);
    // console.log(data);
    initChart();
    updateChart(data.slice(0, selectedPlanetsCount));
});

function initChart() {
    const svg = d3.select("#bubble-chart"),
          margin = { top: 50, right: 50, bottom: 50, left: 50 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.distance)])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.mass_multiplier)])
        .range([height, 0]);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    g.append("text")
        .attr("transform", `translate(${width / 2},${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .text("Distance from Earth in light years");
    
    g.append("g")
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(yScale));
    
    g.append("text")
        .attr("transform", `translate(-30,${height / 2}) rotate(-90)`)
        .style("text-anchor", "middle")
        .text("Mass multiplier of a planet");

}

d3.select("#next").on("click", function() {
    selectedPlanetsCount = selectedPlanetsCount + 10;
    if (selectedPlanetsCount > 50){
        selectedPlanetsCount = 52;
    } 
    updateChart(data.slice(selectedPlanetsCount-10, selectedPlanetsCount));
});

d3.select("#prev").on("click", function() {
    selectedPlanetsCount = selectedPlanetsCount - 10;
    if (selectedPlanetsCount < 10){
        selectedPlanetsCount = 10;
    }
    updateChart(data.slice(selectedPlanetsCount-10, selectedPlanetsCount));
});  


function updateChart(filteredData) {

    const svg = d3.select("#bubble-chart"),
        g = svg.select("g"),
        width = +svg.attr("width") - 40,
        height = +svg.attr("height") / 2 - 20,
        xScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.distance)])
            .range([0, width]),
        radiusScale = d3.scaleSqrt()
            .domain([0, d3.max(filteredData, d => d.radius_multiplier)])
            .range([2, 40]),
        colorScale = d3.scaleOrdinal()
            .domain(["Gas Giant", "Neptune-like", "Other", "Terrestrial", "Super Earth"])
            .range(["red", "blue", "green", "orange", "purple"]),
        yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.mass_multiplier)])
            .range([height+100, 0]);

    g.select("g").transition().duration(1000).call(d3.axisBottom(xScale));

    const circles = g.selectAll(".circle")
        .data(filteredData, d => d.name);

    const tooltip = d3.select("#tooltip")
        .style("opacity", 0);
    // console.log(tooltip);
    

    circles.join("circle")
        .merge(circles)
        .attr("class", "circle")
        .attr("cy", d => yScale(d.mass_multiplier))
        .attr("r", d => radiusScale(d.radius_multiplier))
        .transition()
        .duration(1000)
        .attr("cx", d => xScale(d.distance)-30)
        .attr("fill", d => colorScale(d.planet_type))
        .attr("opacity", d => d.stellar_magnitude / 10)
        .attr("stroke", "black");
        
    d3.selectAll(".circle").on('mouseover', function(e, d) {
            tooltip.html(`  Name: ${d.name}<br>
                            Distance: ${d.distance}<br>
                            Type: ${d.planet_type}<br>
                        `)
                .style("opacity", 1)
                .style("left", (e.clientX+5)+'px')
                .style("top", (e.clientY+10)+'px');
        })
        .on('mousemove', function(e, d) {
            tooltip.html(`  Name: ${d.name}<br>
                            Distance: ${d.distance}<br>
                            Type: ${d.planet_type}<br>
                    `)
            .style("opacity", 1)
            .style("left", (e.clientX+5)+'px')
            .style("top", (e.clientY+10)+'px');
        })
        .on('mouseout', function (e, d) {
            tooltip.style("opacity", 0);
        });
    

    
    const legend = svg.selectAll(".legend")
        .data(colorScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d);

    circles.exit().transition().duration(1000).attr("r", 0).remove();
}

