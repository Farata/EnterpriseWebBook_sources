/**
 * @author
 */

window.onload = function() {

	// Using an anonymous wrapper for encapsulating code in its own namespace.
	// This does not only protect code against name clashes,
	// but it also allows for better modularization of programs.

	/* --------- login module start -------------- */
	(function() {
		// a self contained "namespace"

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

	/* --------- geolocation | embedding google maps module start -------------- */
	(function() {

		var locationUI = document.getElementById('location-ui');
		var locationMap = document.getElementById('location-map');
		
		var watcherID;


		function successGeoData(position) {
			var successMessage = "We found your location!";
			var latitude = position.coords.latitude;
			
			var longitude = position.coords.longitude;
			successMessage += '\n Latitude = ' + latitude;
			successMessage += '\n Longitude = ' + longitude;
			successMessage += '\n Accuracy = ' + position.coords.accuracy + ' meters';
			console.log(successMessage);

			// Turn the geolocation position into a LatLng object.
			var locationCoordinates = new google.maps.LatLng(latitude, longitude);

			var mapOptions = {
				center : locationCoordinates,
				zoom : 12,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				mapTypeControlOptions : {
					style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position : google.maps.ControlPosition.TOP_RIGHT
				}
			};
			// Create the map
			var map = new google.maps.Map(locationMap, mapOptions);

			// set the marker and info window
			var contentString = '<div id="info-window-content">' + 
			        'We have located you using HTML5 Geolocation.</div>';
			var infowindow = new google.maps.InfoWindow({
				content : contentString,
				maxWidth : 160
			});
			var marker = new google.maps.Marker({
				position : locationCoordinates,
				map : map,
				title : "Your current location"

			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
			
			// When the map is loaded show the message and  
 	        // remove event handler after the first "idle" event
			google.maps.event.addListenerOnce(map, 'idle', function(){
    			locationUI.innerHTML = "Your current location";
			})
			
		}

       // error handler
		function failGeoData(error) {
			console.log('error code = ' + error.code);
			
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
			mapContainer.innerHTML = errorMessage;	
		}

		if (navigator.geolocation) {
			var startMessage = 'Browser supports geolocation API. Checking your location...';
			console.log(startMessage);
			
			var currentContent = locationUI.innerHTML;
			locationUI.innerHTML = currentContent +' '+startMessage;

			var watcherID = navigator.geolocation.watchPosition(successGeoData, failGeoData, {
				maximumAge : 1000,
				enableHighAccuracy : true,
				timeout : 5000
			});
			
		} else {
			console.log('browser does not support geolocation :(');
		}

	})();
	/* --------- geolocation | embedding google maps module start -------------- */

}
