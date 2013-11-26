/* --------- login section -------------- */

jQuery(function() {

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

jQuery(function() {

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

/* --------- geolocation | google maps multi markers module start -------------- */

jQuery(function() {

	var locations = [['Chicago, Il', 41.87, -87.62, 1, 'Description of campaigns and events here'], 
	['New York, NY', 40.71, -74.00, 2, 'Description of campaigns and events here'], 
	['Dallas, TX', 32.80, -96.76, 3, 'Description of campaigns and events here'], 
	['Miami, FL', 25.78, -80.22, 4, 'Description of campaigns and events here'], 
	['Miami, FL', 25.78, -80.22, 5, 'Description of campaigns and events here'], 
	['Fargo, ND', 46.87, -96.78, 6, 'Description of campaigns and events here']];

	var mapOptions = {
		center : new google.maps.LatLng(46.87, -96.78),
		zoom : 3,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions : {
			style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position : google.maps.ControlPosition.TOP_RIGHT
		}
	};

	var map = new google.maps.Map($('#location-map')[0], mapOptions);

	var infowindow = new google.maps.InfoWindow();

	var marker, i;

	for ( i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position : new google.maps.LatLng(locations[i][1], locations[i][2]),
			map : map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var content = locations[i][0] + '<br/>' + locations[i][4];
				infowindow.setContent(content);
				infowindow.open(map, marker);
			}
		})(marker, i));

		google.maps.event.addListenerOnce(map, 'idle', function() {
			$('#location-ui').html("These are our campaigns and events around the country.");
		})
	}

});

/* --------- geolocation | embedding google maps module start -------------- */

