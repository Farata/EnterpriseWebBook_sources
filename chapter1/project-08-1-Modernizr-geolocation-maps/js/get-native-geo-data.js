		var locationUI = document.getElementById('location-ui');
		var locationMap = document.getElementById('location-map');
console.log("In the get-native-get-datacache1");

		function successGeoData(position) {
			var successMessage = "We found your position!";
			
			// get access to geolacation data via browser HTML5 native API
			var latitude = position.coords.latitude;			
			var longitude = position.coords.longitude;
			var accuracy = position.coords.accuracy;
			
			successMessage += '\n Latitude = ' + latitude;
			successMessage += '\n Longitude = ' + longitude;
			successMessage += '\n Accuracy = ' + accuracy + ' meters';
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
			// Create the map, with these options.
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
				title : "That's your location"

			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
			// When map is loaded show message
			google.maps.event.addListenerOnce(map, 'idle', function(){
    			locationUI.innerHTML = "That's your location.";
			})
			
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
			var currentContent = locationUI.innerHTML;
			locationUI.innerHTML = currentContent + ' <b>' + errorMessage + '</b>';

		}

		function init() {
	
			var startMessage = 'Browser supports geolocation API. Checking your position...';
			console.log(startMessage);
			
			var currentContent = locationUI.innerHTML;
			locationUI.innerHTML = currentContent +' '+startMessage;

			navigator.geolocation.getCurrentPosition(successGeoData, failGeoData, {
				maximumAge : 60000,
				enableHighAccuracy : true,
				timeout : 5000
			});
		}