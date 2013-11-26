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


/* --------- geolocation with Modernizr test | embedding google maps module start -------------- */

$(function() {
	
		Modernizr.load({

			//test : Modernizr.geolocation,

			// for test reason we can test fake property and in this case we should got 'nope'
			 test: Modernizr.fakegeolocation,

			// if yes (ie Modernizr.geolocation return true): load script which is using browser native geolacation API and then load Google API
			yep : ['js/get-native-geo-data.js', 'https://www.google.com/jsapi'],

			// if no (ie Modernizr.geolocation return false): - load GeoIP Javascript from MaxMind to get location by user IP address and then load script that
			// will parse GeoIP response and then load Google API
			nope : ['http://j.maxmind.com/app/geoip.js', 'js/get-geo-data-by-ip.js', 'https://www.google.com/jsapi'],

			// when all of the resources have been loaded
			complete : function() {
				// load maps module v3 of Google's data api
				google.load("maps", "3", {
					other_params : "sensor=false",
					'callback' : init
				});
			}
		});

});

/* --------- geolocation | embedding google maps module start -------------- */

