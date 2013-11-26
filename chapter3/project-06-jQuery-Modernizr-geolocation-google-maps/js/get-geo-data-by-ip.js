function init() {
	
	var locationMap = $('#location-map')[0];
	
	var locationUI = $('#location-ui');
	var initMessage = 'HTML 5 geolocation is not supported. We\'ve used <a href="http://www.maxmind.com/app/javascript">GeoIP Javascript from MaxMind</a>...'
	locationUI.html(initMessage + '<b>Please wait...</b>'); 

	// get latitude and longitude vie GeoIP API 
	var latitude = geoip_latitude();
	var longitude = geoip_longitude();
	
	// get city, region and country vie GeoIP API 
	var city = geoip_city();
	var region = geoip_region_name();
	var countryCode = geoip_country_code()

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

	// set marker and info window
	// <div id="info-window-content"> is optinal. But we can set style for map info 'bubble' via CSS
	var contentString = '<div id="info-window-content">' + 'We have found yours location via IP address.' + ' We have visualized it with the Google Maps API</div>';
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
	google.maps.event.addListenerOnce(map, 'idle', function() {
		locationUI.html(initMessage + " <b>We found your location</b>: " + city + ", " + region + ", " + countryCode);
	})
}
