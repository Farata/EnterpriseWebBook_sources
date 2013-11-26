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

/* --------- basic geolocation module start ----------- */

$(function() {

	//var mapContainer = document.getElementById('map-container');
	var mapContainer = $('#map-container');

	function popitup(url) {
		var newwindow = window.open(url, 'name', 'toolbar=1,scrollbars=1,location=1,statusbar=0,menubar=1,resizable=1,width=800,height=600');
		if (window.focus) {
			newwindow.focus()
		}
		return false;
	}

	function successGeoData(position) {
		var successMessage = "We found your position!";
		successMessage += '\n Latitude = ' + position.coords.latitude;
		successMessage += '\n Latitude = ' + position.coords.latitude;
		successMessage += '\n Accuracy = ' + position.coords.accuracy + ' meters';
		console.log(successMessage);

		var successMessageHTML = successMessage.replace(/\n/g, '<br />');
		//var currentContent = mapContainer.innerHTML;
		//mapContainer.innerHTML = currentContent + "<br />" + successMessageHTML;
		var currentContent = mapContainer.html();
		var newHtml = currentContent + "<br />" + successMessageHTML;
		mapContainer.html(newHtml);
		
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
		//mapContainer.innerHTML = errorMessage;
		mapContainer.html(errorMessage);

	}

	if (navigator.geolocation) {
		var startMessage = 'Browser supports geolocation API :)';
		console.log(startMessage);
		//mapContainer.innerHTML = startMessage;
		mapContainer.html(startMessage);
		console.log('Checking your position...');
		//mapContainer.innerHTML = startMessage + '<br />Checking your position...';
		mapContainer.html(startMessage + '<br />Checking your position...');

		navigator.geolocation.getCurrentPosition(successGeoData, failGeoData, {
			maximumAge : 60000,
			enableHighAccuracy : true,
			timeout : 5000
		});

	} else {
		console.log('browser does not support geolocation :(');
	}

});

/* --------- basic geolocation module end -------------- */

