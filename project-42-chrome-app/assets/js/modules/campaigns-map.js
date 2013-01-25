define(function() {

	var geocoder = new google.maps.Geocoder();

	var locationUI = document.getElementById('location-ui');
	var locationMap = document.getElementById('location-map');

	var resizeMapLink = document.getElementById('resize-map');

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

	var map = new google.maps.Map(locationMap, mapOptions);

	function resizemap() {
		var textCont = resizeMapLink.textContent;
		var locationMap = document.getElementById('location-map');
		if (textCont == "increase map's size") {
			locationMap.style.width = "500px";
			locationMap.style.height = "500px";
			locationMap.style.top = "-270px";
			locationMap.style.left = "-90px";
			resizeMapLink.textContent = "reduce map's size";
			google.maps.event.trigger(map, "resize");
		} else if (textCont == "reduce map's size") {
			locationMap.style.width = "300px";
			locationMap.style.height = "240px";
			locationMap.style.top = "0px";
			locationMap.style.left = "0px";
			resizeMapLink.textContent = "increase map's size";
			google.maps.event.trigger(map, "resize");
		}
	}


	resizeMapLink.addEventListener('click', resizemap, false);

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

					/*
					 // resize map onload
					 google.maps.event.addListenerOnce(map, 'idle', function() {
					 locationMap.style.width = "400px";
					 locationMap.style.height = "400px";
					 locationMap.style.top = "-170px";
					 locationMap.style.left = "-40px";
					 google.maps.event.trigger(map, "resize");
					 });
					 */

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
		var timeStamp = campaigns.timestamp;
		var campaignsHeader = campaigns.header;

		var message = "<h3>" + campaignsHeader + "</h3>" + "On " + timeStamp + " we run total" + campaignsCount + "campaigns around the country.";
		var curHtml = locationUI.innerHTML;
		//add a description text
		locationUI.innerHTML = message + curHtml;
		resizeMapLink.style.visibility = "visible";

		createCampaignsMap(campaigns);
	}

	function loadData(dataUrl) {
		var xhr = new XMLHttpRequest();
		xhr.overrideMimeType("application/json");
		xhr.open('GET', dataUrl, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var jsonData = xhr.responseText;

					//parse jsoon data
					var campaignsData = JSON.parse(jsonData).campaigns;
					showCampaignsInfo(campaignsData);
				} else {
					console.log(xhr.statusText);
				}
			}
		}
		xhr.send(null);
	}

	var dataUrl = 'assets/js/json-data/campaignsdata.json';
	loadData(dataUrl);

}); 