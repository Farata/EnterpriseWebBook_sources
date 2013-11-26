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

/* --------- start // google maps | multi markers | json data -------------- */

jQuery(function() {

	var geocoder = new google.maps.Geocoder();

		//var locationUI = document.getElementById('location-ui');
		var locationUI = $('#location-ui');
		
		//var locationMap = document.getElementById('location-map');

		//var resizeMapLink = document.getElementById('resize-map');
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

		resizeMapLink.addEventListener('click', resizemap, false); 
		*/
		
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
			//var curHtml = locationUI.innerHTML;
			var curHtml = locationUI.html();
			
			//add a description text
			//locationUI.innerHTML = message + curHtml;
			locationUI.html(message + curHtml);
			
			//resizeMapLink.style.visibility = "visible";
			resizeMapLink.css("visibility", "visible");
			
			createCampaignsMap(campaigns);
			
		}
		
		function loadData(dataUrl) {
			$.ajax({ 
	    		url: dataUrl,
	    		type: 'GET',
	    		dataType: 'json'
			}).done(function (data) {			
				
				showCampaignsInfo(data.campaigns);
			
			}).fail(function (jqXHR, textStatus) {
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

