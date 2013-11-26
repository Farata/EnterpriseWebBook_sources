/* --------- login section -------------- */

$(function() {

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

$(function() {

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


/* --------- geolocation | embedding google maps and searchb location module start -------------- */

$(function() {


	var locationUI = $('#location-ui');
	var foundInfo = $('#found-info');
	
	var locationMap = $('#location-map')[0];
	
	var geocoder = new google.maps.Geocoder();

	function showMap(coordinates, mapcontainer) {
		// Set some map options. This example sets the starting zoom level,
		// the map type and map type control options
		// Google Maps API support four map types :
		// ROADMAP – Displays normal street/road map (default map type).
		// TERRAIN – Display normal street/road map based on terrain information.
		// SATELLITE – Display satellite images only.
		// HYBRID – Mixed normal and satellite views, display street/road views on top of the satellite images.
		var mapOptions = {
			center : coordinates,
			zoom : 12,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions : {
				style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position : google.maps.ControlPosition.TOP_RIGHT
			}
		};
		// Create the map, with these options.
		var map = new google.maps.Map(mapcontainer, mapOptions);

		// set marker and info window
		var contentString = '<div id="info-window-content">' + 'We have found yours location using HTML5 Geolocation.' + ' We have visualized it with the Google Maps API</div>';
		var infowindow = new google.maps.InfoWindow({
			content : contentString,
			maxWidth : 160
		});
		var marker = new google.maps.Marker({
			position : coordinates,
			map : map,
			title : "That's your location"

		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}

	function getMapByAddress() {
		var newaddress = $('#newaddress').val();
		console.log(newaddress);

		geocoder.geocode({
			'address' : newaddress,
			'country' : 'USA'
		}, function(results, status) {
			console.log('status = ' + status);
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				var formattedAddress = results[0].formatted_address;
				console.log('latitude = ' + latitude + ' longitude = ' + longitude);
				console.log('formatted_address = ' + formattedAddress);

				var message = '<b>Address</b>: ' + formattedAddress;
				foundInfo.html(message);

				var locationCoordinates = new google.maps.LatLng(latitude, longitude);

				showMap(locationCoordinates, locationMap);

			} else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
				console.log('geocode was successful but returned no results. ' + 'This may occur if the geocode was passed a non-existent ' + 'ddress or a latlng in a remote location.');
			} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
				console.log('We are over our quota of requests.');
			} else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
				console.log('Your request was denied, ' + 'enerally because of lack of a sensor parameter.');
			} else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
				console.log('Invalid request. ' + 'The query (address or latlng) is missing.');
			}
		});
	}


	$('#get-map').on('click', getMapByAddress);

	function successGeoData(position) {
		var successMessage = "We found your position!";
		var latitude = position.coords.latitude;

		var longitude = position.coords.longitude;
		successMessage += '\n Latitude = ' + latitude;
		successMessage += '\n Latitude = ' + longitude;
		successMessage += '\n Accuracy = ' + position.coords.accuracy + ' meters';
		console.log(successMessage);

		// Turn the geolocation position into a LatLng object.
		var locationCoordinates = new google.maps.LatLng(latitude, longitude);

		geocoder.geocode({
			'latLng' : locationCoordinates
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					//formatted address
					formattedAddress = results[0].formatted_address;
					console.log(formattedAddress);
					foundInfo.html(formattedAddress);
				} else {
					console.log("No results found");
				}
			} else {
				console.log("Geocoder failed due to: " + status);
			}
		});

		showMap(locationCoordinates, locationMap);
	}

	function failGeoData(error) {
		var errorCode = error.code;
		console.log('error code = ' + errorCode);

		/*
		 0: an unknown error, something went wrong getting the location.
		 1: the user disallowed sharing his or her location.
		 2: the position can’t be found, the network is down, or GPS is unavailable.
		 3: timeout occurred, as it took too long to get the user’s location.
		 */

		var errorMessage = "Unknown error";
		switch(errorCode) {
			case 0:
				errorMessage = "An unknown error, something went wrong getting the location";
				break;
			case 1:
				errorMessage = "The user disallowed sharing his or her location";
				break;
			case 2:
				errorMessage = "The position can’t be found, the network is down, or GPS is unavailable";
				break;
			case 3:
				errorMessage = "Timeout occurred, as it took too long to get the user’s location";
				break;
			default:
				errorMessage = "Unknown error";
				break;
		}
		console.log(errorMessage);
		locationUI.html(errorMessage);
	}

	if (navigator.geolocation) {
		var startMessage = 'Checking your position...';
		console.log(startMessage);

		foundInfo.html(startMessage);

		navigator.geolocation.getCurrentPosition(successGeoData, failGeoData, {
			maximumAge : 60000,
			enableHighAccuracy : true,
			timeout : 5000
		});
		// Using the 'maximumAge' option of the position to ensure the user’s location is
		// detected after no longer than 60 seconds.
		// object is guaranteed to be at most 10 minutes old.
		// By using a 'timeout' of 0 milliseconds, if there is
		// no suitable cached position available, the user agent
		// will asynchronously invoke the error callback with code
		// TIMEOUT and will not initiate a new position
		// acquisition process.
	} else {
		console.log('browser does not support geolocation :(');
	}

});
/* --------- geolocation | embedding google maps module start -------------- */

