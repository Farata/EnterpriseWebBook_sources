/* --------- login section -------------- */
$(function() {
    'use strict';

	function showLoginForm() {
		$('#login-link, #login-form, #login-submit').toggle();
	}

	$('#login-link').on('click', showLoginForm);

	function showAuthorizedSection() {
		$('#authorized, #login-form, #login-submit').toggle();
	}

	function logIn() {
		var userNameValue = $('#username').val();
		var userNameValueLength = userNameValue.length;
		var userPasswordValue = $('#password').val();
		var userPasswordLength = userPasswordValue.length;
		
		//check the user's credentials
		if (userNameValueLength === 0 || userPasswordLength === 0) {
			if (userNameValueLength === 0) {
				console.log('username is empty');
			}
			if (userPasswordLength === 0) {
				console.log('password is empty');
			}
		} else if (userNameValue !== 'admin' || userPasswordValue !== '1234') {
			console.log('username or password is invalid');
		} else if (userNameValue === 'admin' && userPasswordValue === '1234') {
			showAuthorizedSection();
		}
	}


	$('#login-submit').on('click', logIn);

	function logOut() {
		$('#username, #password').val('');
		$('#authorized, #login-link').toggle();
	}


	$('#logout-link').on('click', logOut);

	$('#profile-link').on('click', function() {
		console.log('Profile link was clicked');
	});

});

/* --------- make donation module start -------------- */

$(function() {
    'use strict';

	function showHideDonationForm() {
		$('#donation-address, #donate-form-container').toggle();
	}


	$('#donate-button').on('click', showHideDonationForm);
	$('#donate-later-link').on('click', showHideDonationForm);

    function resetCustomAmount(event) {
        if (event.target.type === "radio") {
            $('#customAmount').val('');
        }
    }
    // Intercept any click on the donate form in a capturing phase
	$('#donate-form-container').on('click', resetCustomAmount);

	var checkedInd = 2;
	//uncheck selected radio buttons if custom amount was choosen
	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if ($('#customAmount').val() === '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
	}

	function onCustomAmountBlur() {
		if ($('#customAmount').val() === '') {
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').prop("checked", true);
		}
	}


	$('#customAmount').on({
		focus : onCustomAmountFocus,
		blur : onCustomAmountBlur
	});

});

/* --------- make donation module end ---------------- */

/* --------- start // google maps | multi markers | json data -------------- */

/*global google */
$(function() {
    'use strict';

	var geocoder = new google.maps.Geocoder();

	var locationUI = $('#location-ui');

	var resizeMapLink = $('#resize-map');

	// latitude = 39.8097343 longitude = -98.55561990000001
	// Lebanon, KS 66952, USA Geographic center of the contiguous United States is the center point of the map
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

		var textCont = resizeMapLink.text();
		var locationMap = $('#location-map');

		if (textCont === "increase map's size") {
			locationMap.removeClass('reduced').addClass('increased');
			resizeMapLink.text("reduce map's size");
			google.maps.event.trigger(map, "resize");
		} else if (textCont === "reduce map's size") {
			locationMap.removeClass('increased').addClass('reduced');
			resizeMapLink.text("increase map's size");
			google.maps.event.trigger(map, "resize");
		}
	}

	resizeMapLink.on('click', resizemap);

	function createCampaignsMap(campaigns) {

		var infowindow = new google.maps.InfoWindow();
		var marker;

		// a self invoking function, passing the number of iterations as an argument i.e. campaigns count
		(function getCoordinatesByAddress(e) {

			var address = campaigns.items[e - 1].location;
			var campaignsTitle = campaigns.items[e - 1].title;
			var campaignsDescription = campaigns.items[e - 1].description;

			//get latitude and longitude by city name from json data
			geocoder.geocode({
				'address' : address,
				'country' : 'USA'
			}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					//wait for the google's geocoder.geocode results and than call function again

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
						};
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

		var message = "<h3>" + campaigns.header + "</h3>" + "On " + campaigns.timestamp + " we run " + campaignsCount + " campaigns.";
		var curHtml = locationUI.html();

		//add the description text

		locationUI.html(message + curHtml);

		resizeMapLink.css("visibility", "visible");

		createCampaignsMap(campaigns);

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

	loadData('app/data/campaignsdata.json');
});

/* --------- google maps | multi markers | json data  // end -------------- */

/* --------- stert// svg pie chart --------------- */

$(function() {
    'use strict';

	function drawPieChart(chartContaner, data, centerX, centerY, pieRadius, chartLegendData, chartLegendX, chartLegendY) {
		// the XML namespace for svg elements
		var namespace = "http://www.w3.org/2000/svg";

		var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];

		// calculate the total data
		var totalData = 0;
		for (var i = 0; i < data.length; i++) {
		//verifying that data is numeric
			if ( typeof data[i] === 'number') {
				totalData += data[i];
			}
		}
		// The pie sector size
		var angles = [];
		for (var y = 0; y < data.length; y++) {
			angles[y] = data[y] / totalData * Math.PI * 2;
		}
		// Loop through the pie sectors
		startAngle = 0;
		for (var j = 0; j < data.length; j++) {
			// End of the sector
			var endAngle = startAngle + angles[j];
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
			path.setAttribute("fill", colorScheme[j]);
			
			path.setAttribute("class", 'item'+j);

			chartContaner.appendChild(path);

			// The next sector begins where this one ends
			var startAngle = endAngle;

			// label's bullet
			var labelBullet = document.createElementNS(namespace, "rect");
			// Bullet's position
			labelBullet.setAttribute("x", chartLegendX);
			labelBullet.setAttribute("y", chartLegendY + 20 * j);
			// Bullet's size
			labelBullet.setAttribute("width", 10);
			labelBullet.setAttribute("height", 10);
			labelBullet.setAttribute("fill", colorScheme[j]);
			
			chartContaner.appendChild(labelBullet);

			// Add a label text
			var labelText = document.createElementNS(namespace, "text");
			// lable position = bullet's width(10px) + padding(8px)
			labelText.setAttribute("x", chartLegendX + 18);
			labelText.setAttribute("y", chartLegendY + 20 * j + 10);
			
			labelText.setAttribute("class", 'item'+j);
			
			var txt = document.createTextNode(chartLegendData[j] + " | " + data[j]);
			labelText.appendChild(txt);
			chartContaner.appendChild(labelText);
			// Add text to the chart
		}
	
	}

    function loadData(dataUrl, container) {
        $.ajax({
            url: dataUrl,
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {

                var values = [];
                for (var i = 0; i < data.ChartData.items.length; i++) {
                    values.push(data.ChartData.items[i].value);
                }
                var labels = [];
                for (var j = 0; j < data.ChartData.items.length; j++) {
                    labels.push(data.ChartData.items[j].location);
                }

                drawPieChart(container, values, 50, 52, 50, labels, 115, 10);

            }).fail(function (jqXHR, textStatus) {
                console.log('Error status code:' + jqXHR.status);
                if (textStatus === 'parsererror') {
                    console.log('Requested JSON parse was failed.');
                } else if (textStatus === 'abort') {
                    console.log('Ajax request was aborted.');
                }
            });
    }
		
		loadData('app/data/chartdata.json', $('#svg-container')[0]);
});

/*svg pie chart //end */