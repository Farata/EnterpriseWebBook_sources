/* --------- login section -------------- */

jQuery(function($) {

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
		//check credential
		if (userNameValueLength == 0 || userPasswordLength == 0) {
			if (userNameValueLength == 0) {
				console.log('username is empty');
			}
			if (userPasswordLength == 0) {
				console.log('password is empty');
			}
		} else if (userNameValue != 'admin' || userPasswordValue != '1234') {
			console.log('username or password is invalid');
		} else if (userNameValue == 'admin' && userPasswordValue == '1234') {
			showAuthorizedSection();
		}
	}


	$('#login-submit').on('click', logIn);

	function logOut() {
		$('#username, #password').val('')
		$('#authorized, #login-link').toggle();
	}


	$('#logout-link').on('click', logOut);

	$('#profile-link').on('click', function() {
		console.log('Profile link was clicked');
	});

});

/* --------- make donation module start -------------- */

jQuery(function($) {

	function showHideDonationForm() {
		$('#donation-address, #donate-form-container').toggle();
	}


	$('#donate-button').on('click', showHideDonationForm);
	$('#donate-later-link').on('click', showHideDonationForm);

	// Intercept any click on the donate form in a capturing phase
	$('#donate-form-container').on('click', resetCustomAmount);
	function resetCustomAmount(event) {
		if (event.target.type == "radio") {
			$('#customAmount').val('');
		}
	}

	var checkedInd = 2;
	//uncheck selected radio buttons if custom amount was choosen
	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if ($('#customAmount').val() == '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
	}

	function onCustomAmountBlur() {
		if ($('#customAmount').val() == '') {
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

jQuery(function($) {

	var geocoder = new google.maps.Geocoder();

	var locationUI = $('#location-ui');

	var resizeMapLink = $('#resize-map');

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

		var textCont = resizeMapLink.text();
		var locationMap = $('#location-map');

		if (textCont == "increase map's size") {
			locationMap.removeClass('reduced').addClass('increased');
			resizeMapLink.text("reduce map's size");
			google.maps.event.trigger(map, "resize");
		} else if (textCont == "reduce map's size") {
			locationMap.removeClass('increased').addClass('reduced');
			resizeMapLink.text("increase map's size");
			google.maps.event.trigger(map, "resize");
		}
	}


	resizeMapLink.on('click', resizemap);

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

		var message = "<h3>" + campaigns.header + "</h3>" + "On " + campaigns.timestamp + " we run " + campaignsCount + " campaigns.";
		var curHtml = locationUI.html();

		//add a description text

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

	loadData('data/campaignsdata.json');
});

/* --------- google maps | multi markers | json data  // end -------------- */

/* ---------  start // creating pie chart using HTML5 Canvas   -------------- */

jQuery(function($) {

	function drawPieChart(canvas, chartData, centerX, centerY, pieRadius) {
		var ctx;
		// The context of canvas
		var previousStop = 0;
		// The end position of the slice
		var totalDonors = 0;

		var totalCities = chartData.items.length;

		// Count total donors
		for (var i = 0; i < totalCities; i++) {
			//totalDonors += chartData.items[i].donors;
			totalDonors += chartData.items[i].donors;
		}

		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.heigh);

		var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];

		for (var i = 0; i < totalCities; i++) {

			//draw the sector
			ctx.fillStyle = colorScheme[i];
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, pieRadius, previousStop, previousStop + (Math.PI * 2 * (chartData.items[i].donors / totalDonors)), false);
			ctx.lineTo(centerX, centerY);
			ctx.fill();

			// label's bullet
			var labelY = 20 * i + 10;
			var labelX = pieRadius * 2 + 20;

			ctx.rect(labelX, labelY, 10, 10);
			ctx.fillStyle = colorScheme[i];
			ctx.fill();

			// label's text
			ctx.font = "italic 12px sans-serif";
			ctx.fillStyle = "#222";
			var txt = chartData.items[i].location + " | " + chartData.items[i].donors;
			ctx.fillText(txt, labelX + 18, labelY + 8);

			previousStop += Math.PI * 2 * (chartData.items[i].donors / totalDonors);
		}
	}
	
	/*	
		function loadData(dataUrl, canvas) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
                   if ((xhr.status >= 200 && xhr.status < 300) || 
                                             xhr.status === 304) {
						var jsonData = xhr.responseText;

						var chartData = JSON.parse(jsonData).ChartData;

						drawPieChart(canvas,chartData, 50, 50, 49);
						
					} else {
						console.log(xhr.statusText);						
					}
				}
			}
			xhr.send();
		}
	
		loadData('data/chartdata.json', document.getElementById("canvas")); 
		
	*/
	
	function loadData(dataUrl, canvas) {
		$.ajax({
			url : dataUrl,
			type : 'GET',
			dataType : 'json'
		}).done(function(data) {
			drawPieChart(canvas, data.ChartData, 50, 50, 49);
		}).fail(function(jqXHR, textStatus) {
			console.log('Error status code:' + jqXHR.status);
			if (textStatus === 'parsererror') {
				console.log('Requested JSON parse was failed.');
			} else if (textStatus === 'abort') {
				console.log('Ajax request was aborted.');
			}
		});
	}

	loadData('data/chartdata.json', $('#canvas')[0]);

})
/* ---------  creating pie chart using HTML5 Canvas //end  -------------- */
