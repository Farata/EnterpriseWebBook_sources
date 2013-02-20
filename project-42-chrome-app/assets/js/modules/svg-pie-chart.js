define(function() {

	var dataUrl = 'assets/js/json-data/chartdata.json';
	var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];
	var svgContainer = document.getElementById('svg-container');

	function drawPieChart(chartContaner, data, centerX, centerY, pieRadius, colorScheme, chartLegendData, chartLegendX, chartLegendY) {
		// the XML namespace for svg elements
		var namespace = "http://www.w3.org/2000/svg";

		// calculate the total data
		var totalData = 0;
		for (var i = 0; i < data.length; i++)
		//verifying that data is numeric
			if ( typeof data[i] == 'number') {
				totalData += data[i];
			}

		// Sector size
		var angles = [];
		for (var i = 0; i < data.length; i++) {
			angles[i] = data[i] / totalData * Math.PI * 2;
		}
		// Loop through sectors.
		startAngle = 0;
		for (var i = 0; i < data.length; i++) {
			// End of the sector
			var endAngle = startAngle + angles[i];
			var x1 = centerX + pieRadius * Math.sin(startAngle);
			var y1 = centerY - pieRadius * Math.cos(startAngle);
			var x2 = centerX + pieRadius * Math.sin(endAngle);
			var y2 = centerY - pieRadius * Math.cos(endAngle);

			// This is a flag for angles larger than than a half circle
			// It is required by the SVG arc drawing component
			var big = 0;
			if (endAngle - startAngle > Math.PI) {
				big = 1;
			}

			//Set <svg:path> element
			var path = document.createElementNS(namespace, "path");

			// Path details
			var pathDetails = "M " + centerX + "," + centerY + // Start at circle center
			" L " + x1 + "," + y1 + // Draw line to (x1,y1)
			" A " + pieRadius + "," + pieRadius + // Draw an arc of radius
			" 0 " + big + " 1 " + // Arc details...
			x2 + "," + y2 + // Arc goes to to (x2,y2)
			" Z";
			// Close path back to (centerX, centerY)

			// Attributes for the <svg:path> element
			path.setAttribute("d", pathDetails);
			// Sector fill color
			path.setAttribute("fill", colorScheme[i]);

			chartContaner.appendChild(path);

			// The next sector begins where this one ends
			startAngle = endAngle;

			// label's bullet
			var labelBullet = document.createElementNS(namespace, "rect");
			// Bullet's position
			labelBullet.setAttribute("x", chartLegendX);
			labelBullet.setAttribute("y", chartLegendY + 20 * i);
			// Bullet's size
			labelBullet.setAttribute("width", 10);
			labelBullet.setAttribute("height", 10);
			labelBullet.setAttribute("fill", colorScheme[i]);

			chartContaner.appendChild(labelBullet);

			// Add a label text
			var labelText = document.createElementNS(namespace, "text");
			// lable position = bullet's width(10px) + padding(8px)
			labelText.setAttribute("x", chartLegendX + 18);
			labelText.setAttribute("y", chartLegendY + 20 * i + 10);
			var txt = document.createTextNode(chartLegendData[i] + " | " + data[i]);
			labelText.appendChild(txt);
			chartContaner.appendChild(labelText);
			// Add text to the chart
		}

	}

	function loadData(dataUrl, container) {
		var xhr = new XMLHttpRequest();
		xhr.overrideMimeType("application/json");
		xhr.open('GET', dataUrl, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var jsonData = xhr.responseText;

					//parse jsoon data
					var chartData = JSON.parse(jsonData).ChartData;

					var data = [];
					for (var i = 0; i < chartData.items.length; i++) {
						data.push(chartData.items[i].value);
					}

					var labels = [];
					for (var i = 0; i < chartData.items.length; i++) {
						labels.push(chartData.items[i].location);
					}
					drawPieChart(container, data, 50, 52, 50, colorScheme, labels, 115, 10);
				} else {
					console.log(xhr.statusText);
				}
			}
		}
		xhr.send(null);
	}

	loadData(dataUrl, svgContainer);
	
	console.log('SVG Pie Chart module was loaded');
});
