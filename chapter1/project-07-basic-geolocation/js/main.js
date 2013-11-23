/**
 * @author
 */

window.onload = function() {
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

	/* --------- basic geolocation module start -------------- */
	(function() {
	
		var mapContainer = document.getElementById('map-container');
		
		// Success handler
		function successGeoData(position) {
			var successMessage = "We found your position!";
			successMessage += '\n Latitude = ' + position.coords.latitude;
			successMessage += '\n Longitude = ' + position.coords.longitude;
			successMessage += '\n Accuracy = ' + position.coords.accuracy + ' meters';			
			console.log(successMessage);
			
			var successMessageHTML = successMessage.replace(/\n/g, '<br />');
			var currentContent = mapContainer.innerHTML;
			mapContainer.innerHTML = currentContent + "<br />" + successMessageHTML;
			
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
			var startMessage = 'Browser supports geolocation API';
			console.log(startMessage);
			mapContainer.innerHTML = startMessage;
			console.log('Checking your position...');
			mapContainer.innerHTML = startMessage + '<br />Checking your position...';
			
			navigator.geolocation.getCurrentPosition(successGeoData, failGeoData, {
				maximumAge : 60000,
				enableHighAccuracy : true,
				timeout : 5000
			});
		} else {
			mapContainer.innerHTML ='Your browser does not support geolocation';
		}
		
	})();
	/* --------- basic geolocation module end -------------- */

}
