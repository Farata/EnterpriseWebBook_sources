$(document).on('pagebeforeshow', function() {
	// Overwrite jQM limits "No more than 5 items per line in navbar"
	$(".ssc-navbar > ul").removeClass("ui-grid-a");

});

$(document).on('pageshow', function() {
	// Set equal height for items on "about" page
	var aboutItemHeight = ($(window).height() - $('.ssc-grid-header').height() - $('.ssc-grid-footer').height() - 7) / 2;
	$('.ssc-grid-nav').css({
		'height' : aboutItemHeight,
		"padding-top" : aboutItemHeight/4+"px"
	});
});

/* --------- donate start */

$(document).on('pageshow',"#Donate", function() { 
		
	var checkedInd = 2;
	
	// Reset custom amount. 
	$('#radio-container .ui-radio').on('touchend click', function() {
		// click is working on desktop only, just "tap" event not working correctly on iPhone
		// bind both "touchend" and "click" works fine on desktop and mobile
		$('#customAmount').val('');
	});
	
	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if($('#customAmount').val() == '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
		$('form[name="_xclick"] input:radio').next().removeClass('ui-btn-active');
	}

	function onCustomAmountBlur() {
		if($('#customAmount').val() == '') {
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').prop("checked", true);
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').next().addClass('ui-btn-active');
		}
	}

	$('#customAmount').on({
		focus : onCustomAmountFocus,
		blur : onCustomAmountBlur
	});

	//$('[type="submit"]').button('disable'); 
	//$('.donate-button-submit').button('disable');
	
	$('.donate-button-submit').on('click', submitSerializedData);

	function submitSerializedData(event) {

		//Block the default action of the event
		event.preventDefault();

		// freeze button to prevent double click
		//$('[type="submit"]').button('disable');

		// get inputs data with definite type, name or value - total 6
		// paypal_email, item_name, currency_code - i.e. all hidden exept name=cdm
		// amount, full name, email
		var queryString = $('form[name="_xclick"]').find(':input[type=hidden][name!=cmd], :input[name=amount][value!=""], :input[name=full_name], :input[name=email_addr]').serialize();

		console.log('-------- get inputs data with definite type, name or value -----------');
		console.log(queryString);

		$.mobile.showPageLoadingMsg();

		$.ajax({
			url : '../demo.php',
			type : 'POST',
			data : queryString
		}).done(function(data) {
			console.log('-------- response from demo.php  -----------');
			console.log(data);

			localStorage.sscDonateResponse = data;
			$.mobile.changePage("donate-submit-result.html", {
				transition : "slide"
			});

		}).fail(function(jqXHR, textStatus) {
			var errorMes = "";

			if(jqXHR.status === 0) {
				errorMes = 'Not connect. Verify Network.'
				console.log(errorMes);
			} else if(jqXHR.status == 404) {
				errorMes = 'Requested page not found [404]';
				console.log(errorMes);
			} else if(jqXHR.status == 500) {
				errorMes = 'Internal Server Error [500]';
				console.log(errorMes);
			} else {
				errorMes = 'Uncaught Error. ' + jqXHR.responseText;
				console.log(errorMes);
			}
			// unfreeze button
			//$('[type="submit"]').button('enable');
			
			localStorage.sscDonateResponse = errorMes;
			$.mobile.changePage("donation-submit-result.html", {
				transition : "slide"
			});
		});
	}

});
/* ---------  donate end */

/* --------- start stats */

$(document).on("pageshow", "#Stats", function() {

	var donorsDataCache = [];
	var labelsDataCache = [];

	function drawPieChart(chartContainer, chartData, chartLegendData) {

		// clear chartContainer
		while (chartContainer.firstChild) {
			chartContainer.removeChild(chartContainer.firstChild);
		}

		// the XML namespace for svg elements
		var namespace = "http://www.w3.org/2000/svg";

		var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];

		var width = $(window).width();
		var height = $(window).height();

		var centerX = 0;
		var centerY = 0;
		var pieRadius = 0;
		var chartLegendX = 0;
		var chartLegendY = 0;

		if (width > height) {
			// landscape mode
			centerX = width * .2;
			centerY = width * .2;
			pieRadius = width * .2;
			chartLegendX = width / 2 - 10;
			chartLegendY = 20;

		} else {
			// portrait mode
			centerX = width * .4;
			centerY = width * .4;
			pieRadius = width * .4;
			chartLegendX = 10;
			chartLegendY = pieRadius * 2 + 30;
		}

		// calculate the total data
		var totalDonors = 0;
		for (var i = 0; i < chartData.length; i++)
		//verifying that data is numeric
			if ( typeof chartData[i] == 'number') {
				totalDonors += chartData[i];
			}

		// Sector size
		var angles = [];
		for (var i = 0; i < chartData.length; i++) {
			angles[i] = chartData[i] / totalDonors * Math.PI * 2;
		}
		// Loop through sectors.
		startAngle = 0;
		for (var i = 0; i < chartData.length; i++) {
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

			chartContainer.appendChild(path);

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

			chartContainer.appendChild(labelBullet);

			// Add a label text
			var labelText = document.createElementNS(namespace, "text");
			// lable position = bullet's width(10px) + padding(8px)
			labelText.setAttribute("x", chartLegendX + 18);
			labelText.setAttribute("y", chartLegendY + 20 * i + 10);
			var txt = document.createTextNode(chartLegendData[i] + " | " + chartData[i]);
			labelText.appendChild(txt);
			chartContainer.appendChild(labelText);
			// Add text to the chart
		}

	}

	function loadData(dataUrl, container) {
		$.ajax({
			url : dataUrl,
			type : 'GET',
			dataType : 'json'
		}).done(function(data) {

			for (var i = 0; i < data.ChartData.items.length; i++) {
				donorsDataCache.push(data.ChartData.items[i].donors);
			}
			for (var i = 0; i < data.ChartData.items.length; i++) {
				labelsDataCache.push(data.ChartData.items[i].location);
			}

			drawPieChart(container, donorsDataCache, labelsDataCache);

		}).fail(function(jqXHR, textStatus) {
			console.log('Error status code:' + jqXHR.status);
			if (textStatus === 'parsererror') {
				console.log('Requested JSON parse was failed.');
			} else if (textStatus === 'abort') {
				console.log('Ajax request was aborted.');
			}
		});
	}

	loadData('../data/chartdata.json', $('#svg-container')[0]);

	window.addEventListener("resize", windowResizeHandler);
	function windowResizeHandler() {
		drawPieChart($('#svg-container')[0], donorsDataCache, labelsDataCache);
	}

});
/* --------- stats end */

/* --------- events start */

$(document).on("pageshow", "#Events", function() {

	$.mobile.showPageLoadingMsg();

	var geocoder = new google.maps.Geocoder();

	// latitude = 39.8097343 longitude = -98.55561990000001
	// Lebanon, KS 66952, USA Geographic center of the contiguous United States
	// the center point of the map
	var latitudeOfMapCenter = 39.8097343;
	var longitudeOfMapCenter = -98.55561990000001;

	var campaignsCount = 0;

	//setup map's options
	var mapOptions = {
		center : new google.maps.LatLng(latitudeOfMapCenter, longitudeOfMapCenter),
		zoom : 3,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions : {
			style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position : google.maps.ControlPosition.TOP_RIGHT
		}
	};

	var map = new google.maps.Map($('#location-map')[0], mapOptions);

	function resizemap() {
		var height = ($(window).height() - $("#Campaigns").find('[data-role="header"]').outerHeight() - $("#Campaigns").find('[data-role="footer"]').outerHeight());
		$('#location-map').height(height);

		google.maps.event.trigger(map, "resize");
	}

	function createCampaignsMap(campaigns) {

		var infowindow = new google.maps.InfoWindow();
		var marker;

		// self invoking function, passing the number of iterations as an argument i.e. campaigns count
		(function getCoordinatesByAddress(e) {

			var address = campaigns.items[e - 1].location;
			var campaignsTitle = campaigns.items[e - 1].title;
			var campaignsDescription = campaigns.items[e - 1].description;

			//get latitude and longitude by city name from json data
			geocoder.geocode({
				'address' : address,
				'country' : 'USA'
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//we should waiting for google's geocoder.geocode results and than call function again

					//getting coordinates
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					//create marker
					marker = new google.maps.Marker({
						position : new google.maps.LatLng(latitude, longitude),
						map : map,
						title : address
					});

					//adding click event to the marker to show info-bubble with data from json
					google.maps.event.addListener(marker, 'click', (function(marker) {
						return function() {
							var content = '<p class="infowindow"><b>' + campaignsTitle + '</b><br/>' + campaignsDescription + '<br/><i>' + address + '</i></p>';
							infowindow.setContent(content);
							infowindow.open(map, marker);
						}
					})(marker));

					if (--e) {
						getCoordinatesByAddress(e);
					}

				} else {
					console.log('Error getting location data');
				}
			});

		})(campaignsCount);

	}

	function showCampaignsInfo(campaigns) {
		//get data from parsed json data
		campaignsCount = campaigns.items.length;

		$('#campaignsInfo').html("<h4>" + campaigns.header + "</h4>" + "On " + campaigns.timestamp + " we run " + campaignsCount + " campaigns.");

		createCampaignsMap(campaigns);
		resizemap();
		$.mobile.hidePageLoadingMsg();

		$('#campaignsInfoPopup').popup("open");
	}

	function loadData(dataUrl) {
		$.ajax({
			url : dataUrl,
			type : 'GET',
			dataType : 'json'
		}).done(function(data) {

			showCampaignsInfo(data.campaigns);

		}).fail(function(jqXHR, textStatus) {
			console.log('Error status code:' + jqXHR.status);
			if (textStatus === 'parsererror') {
				console.log('Requested JSON parse was failed.');
			} else if (textStatus === 'abort') {
				console.log('Ajax request was aborted.');
			}
		});
	}

	loadData('../data/campaignsdata.json');

});
/* --------- // events end -------------- */

/* --------- media */
// Working with iframes in jQM popups
function scale(width, height, padding, border) {
	var scrWidth = $(window).width() - 20; 
	var scrHeight = $(window).height() - 20; 
	var ifrPadding = 2 * padding; 
	var ifrBorder = 2 * border; 
	var ifrWidth = width + ifrPadding + ifrBorder; 
	var ifrHeight = height + ifrPadding + ifrBorder, h, w;

	if (ifrWidth < scrWidth && ifrHeight < scrHeight) {
		w = ifrWidth;
		h = ifrHeight;
	} else if ((ifrWidth / scrWidth ) > (ifrHeight / scrHeight )) {
		w = scrWidth;
		h = (scrWidth / ifrWidth ) * ifrHeight;
	} else {
		h = scrHeight;
		w = (scrHeight / ifrHeight ) * ifrWidth;
	}

	return {
		'width' : w - (ifrPadding + ifrBorder ),
		'height' : h - (ifrPadding + ifrBorder )
	};
};

$(document).on("pageinit", function() {
	$("#ytVideo iframe").attr("width", 0).attr("height", 0);

	$("#ytVideo").on({
		popupbeforeposition : function() {
			var size = scale(480, 270, 15, 1), w = size.width, h = size.height;
			$("#ytVideo iframe").attr("width", w).attr("height", h);
		},
		popupafterclose : function() {
			$("#ytplayer").stopVideo();
			$("#ytVideo iframe").attr("width", 0).attr("height", 0);

		}
	});
});
/* --------- media end */