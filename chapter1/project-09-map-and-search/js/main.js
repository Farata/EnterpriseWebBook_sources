/**
 * @author
 */

window.onload = function() {

	/* --------- login module start -------------- */
	(function() {
		//login section elements
		var loginLink = document.getElementById("login-link");
		var loginForm = document.getElementById("login-form");
		var loginSubmit = document.getElementById('login-submit');
		var logoutLink = document.getElementById('logout-link');
		var profileLink = document.getElementById('profile-link');
		var authorizedSection = document.getElementById("authorized");

		var userName = document.getElementById('username');
		var userPassword = document.getElementById('password');

		function showLoginForm() {
			loginLink.style.display = "none";
			loginForm.style.display = "block";
			loginSubmit.style.display = "block";
		}


		loginLink.addEventListener('click', showLoginForm, false);

		function showAuthorizedSection() {
			authorizedSection.style.display = "block";
			loginForm.style.display = "none";
			loginSubmit.style.display = "none";
		}

		function logIn() {
			//check credential
			var userNameValue = userName.value;
			var userNameValueLength = userName.value.length;
			var userPasswordValue = userPassword.value;
			var userPasswordLength = userPassword.value.length;

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


		loginSubmit.addEventListener('click', logIn, false);

		function logOut() {
			userName.value = '';
			userPassword.value = '';
			authorizedSection.style.display = "none";
			loginLink.style.display = "block";
		}


		logoutLink.addEventListener('click', logOut, false);

		function getProfile() {
			console.log('Profile link was clicked');
		}


		profileLink.addEventListener('click', getProfile, false);

	})();
	/* --------- login module end  -------------- */

	/* --------- make donation module start -------------- */
	(function() {
		var donateBotton = document.getElementById('donate-botton');
		var donationAddress = document.getElementById('donation-address');
		var donateFormContainer = document.getElementById('donate-form-container');
		var customAmount = document.getElementById('customAmount');
		var donateForm = document.forms['_xclick'];
		var donateLaterLink = document.getElementById('donate-later-link');
		var checkedInd = 2;

		function showDotationForm() {
			donationAddress.style.display = "none";
			donateFormContainer.style.display = "block";
		}


		donateBotton.addEventListener('click', showDotationForm, false);

		//uncheck selected radio buttons if custom amount was choosen
		function onCustomAmountFocus() {
			for (var i = 0; i < donateForm.length; i++) {
				if (donateForm[i].type == 'radio') {
					donateForm[i].onclick = function() {
						customAmount.value = '';
					}
				}
				if (donateForm[i].type == 'radio' && donateForm[i].checked == true) {
					checkedInd = i;
					donateForm[i].checked = false;
				}
			}
		}


		customAmount.addEventListener('focus', onCustomAmountFocus, false);

		function onCustomAmountBlur() {
			var value = customAmount.value;
			if (value == '') {
				donateForm[checkedInd].checked = true;
			}
		}


		customAmount.addEventListener('blur', onCustomAmountBlur, false);

		function donateLater() {
			donationAddress.style.display = "block";
			donateFormContainer.style.display = "none";
		}

		donateLaterLink.addEventListener('click', donateLater, false);

	})();
	/* --------- make donation module end -------------- */

	/* --------- geolocation | embedding google maps and search by location module start -------------- */
	(function() {

		var locationUI = document.getElementById('location-ui');
		var foundInfo = document.getElementById('found-info');
		var locationMap = document.getElementById('location-map');
		var getMapButton = document.getElementById('get-map');

		var geocoder = new google.maps.Geocoder();

		function showMap(coordinates, mapcontainer) {
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
			var contentString = '<div id="info-window-content">' + 'We have found your location using HTML5 Geolocation.' 
			    + ' We have visualized it with the Google Maps API</div>';
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
			var newaddress = document.getElementById('newaddress').value;
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
					foundInfo.innerHTML = message;

					var locationCoordinates = new google.maps.LatLng(latitude, longitude);
					
					showMap(locationCoordinates, locationMap);

				} else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
					console.log('geocode was successful but returned no results. ' + 
					'This may occur if the geocode was passed a non-existent ' + 
					'address or a latlng in a remote location.');
				} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
					console.log('We are over our quota of requests.');
				} else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
					console.log('Your request was denied, ' + 'enerally because of lack of a sensor parameter.');
				} else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
					console.log('Invalid request. ' + 'The query (address or latlng) is missing.');
				}
			});
		}


		getMapButton.addEventListener('click', getMapByAddress, false);

		// Display the current user's position
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
						foundInfo.innerHTML = formattedAddress;
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

			switch(error.code) {
				case error.POSITION_UNAVALABLE:
					errorMessage = "Can't get the location";
					break;
				case error.PERMISSION_DENIED:
					errorMessage = "The user doesn't want to share location";
					break;
				case error.TIMEOUT:
					errorMessage = "Timeout - Finding location takes too long";
					break;
				case error.UNKNOWN_ERROR:
					errorMessage = "Unknown error: " + error.code;
					break;
			}
			console.log(errorMessage);
			locationUI.innerHTML = errorMessage;
		}

		if (navigator.geolocation) {
			var startMessage = 'Checking your position...';
			console.log(startMessage);

			foundInfo.innerHTML = startMessage;

			navigator.geolocation.getCurrentPosition(successGeoData, failGeoData, {
				maximumAge : 60000,
				enableHighAccuracy : true,
				timeout : 5000
			});

		} else {
			console.log('browser does not support geolocation :(');
		}

	})();
	/* --------- geolocation | embedding google maps module start -------------- */

}
