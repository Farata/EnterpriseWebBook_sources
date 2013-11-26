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
				$('form[name="_xclick"] input:radio:eq('+checkedInd+')').prop("checked", true); 			
			}
		}
		$('#customAmount').on({focus:onCustomAmountFocus, blur:onCustomAmountBlur});

});

/* --------- make donation module end ---------------- */

/* --------- geolocation | embedding google maps module start -------------- */

jQuery(function() {

		//var locationUI = document.getElementById('location-ui');
		//var locationMap = document.getElementById('location-map');
		
		var locationUI = $('#location-ui');
		var locationMap = $('#location-map')[0];
		
		/* Why [0]?
		 If we're using Google Maps Javascript API V3, we need to pass the plain vanilla HTML element (i.e. node) 
		 instead of the collection which a jQuery call returns.
		 The Google reference says the container for the map should be a mapDiv:Node 
		 Map(mapDiv:Node, opts?:MapOptions)
		 https://developers.google.com/maps/documentation/javascript/reference#Map
		 */

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

			// Set some map options. This example sets the starting zoom level,
			// the map type and map type control options
			// Google Maps API support four map types :
			// ROADMAP – Displays normal street/road map (default map type).
			// TERRAIN – Display normal street/road map based on terrain information.
			// SATELLITE – Display satellite images only.
			// HYBRID – Mixed normal and satellite views, display street/road views on top of the satellite images.
			var mapOptions = {
				center : locationCoordinates,
				zoom : 12,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				mapTypeControlOptions : {
					style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position : google.maps.ControlPosition.TOP_RIGHT
				}
			};
			// Create the map, with these options.
			var map = new google.maps.Map(locationMap, mapOptions);

			// set marker and info window
			var contentString = '<div id="info-window-content">' + 'We have found yours location using HTML5 Geolocation.' + ' We have visualized it with the Google Maps API</div>';
			var infowindow = new google.maps.InfoWindow({
				content : contentString,
				maxWidth : 160
			});
			var marker = new google.maps.Marker({
				position : locationCoordinates,
				map : map,
				title : "That's your location"

			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
			// When map is loaded show message
			google.maps.event.addListenerOnce(map, 'idle', function(){
    			locationUI.html("That's your location.");
			})
			
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
			var currentContent = locationUI.html();
			locationUI.html(currentContent + ' <b>' + errorMessage + '</b>');

		}

		if (navigator.geolocation) {
			var startMessage = 'Browser supports geolocation API. Checking your position...';
			console.log(startMessage);
			
			var currentContent = locationUI.html();
			locationUI.html(currentContent +' '+startMessage);

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


