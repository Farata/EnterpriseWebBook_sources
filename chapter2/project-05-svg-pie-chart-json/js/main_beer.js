
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

	/* --------- start // google maps | multi markers | json data -------------- */

	(function() {

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

		loadData('data/campaignsdata.json');

	})();
	/* --------- google maps | multi markers | json data  // end -------------- */

	/* --------- stert// svg pie chart --------------- */
	(function() {
				
		function drawPieChart(chartContainer, chartData, centerX, centerY, pieRadius, chartLegendX, chartLegendY) {
			// the XML namespace for svg elements
			var namespace = "http://www.w3.org/2000/svg";
 		    var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", 
 		                      "#772FBF", "#2F94BF", "#c3d4db"];

			var totalCities = chartData.items.length;
			var totalDonors = 0;
            
            // Count total donors
			for (var i = 0; i < totalCities; i++) {
				totalDonors += chartData.items[i].donors;
			}
			
			// Draw pie sectors
			startAngle = 0;
			for (var i = 0; i < totalCities; i++) {
				// End of the sector = starting angle + sector size
				var endAngle = startAngle + chartData.items[i].donors / totalDonors * Math.PI * 2;
				var x1 = centerX + pieRadius * Math.sin(startAngle);
				var y1 = centerY - pieRadius * Math.cos(startAngle);
				var x2 = centerX + pieRadius * Math.sin(endAngle);
				var y2 = centerY - pieRadius * Math.cos(endAngle);

				// This is a flag for angles larger than than a half circle
				// It is required by the SVG arc drawing component
				var big = 0;
				if (endAngle - startAngle > Math.PI) {
					big = 1;
				}

				//Set <svg:path> element
				var path = document.createElementNS(namespace, "path");

				 // Start at circle center
				var pathDetails = "M " + centerX + "," + centerY +
				// Draw line to (x1,y1)
				" L " + x1 + "," + y1 + 
				// Draw the arc 
				" A " + pieRadius + "," + pieRadius + 
				// Arc details...
				" 0 " + big + " 1 " +
				// Arc goes to to (x2,y2) 
				x2 + "," + y2 + 
				" Z";
				// Close the path at (centerX, centerY)

				// Attributes for the <svg:path> element
				path.setAttribute("d", pathDetails);
				path.setAttribute("fill", colorScheme[i]);

				chartContainer.appendChild(path);

				// The next sector begins where this one ends
				startAngle = endAngle;

				// label's bullet
				var labelBullet = document.createElementNS(namespace, "rect");
				// Bullet's position
				labelBullet.setAttribute("x", chartLegendX);
				labelBullet.setAttribute("y", chartLegendY + 20 * i);
				// Bullet's size
				labelBullet.setAttribute("width", 10);
				labelBullet.setAttribute("height", 10);
				labelBullet.setAttribute("fill", colorScheme[i]);

				chartContainer.appendChild(labelBullet);

				// Add the label text
				var labelText = document.createElementNS(namespace, "text");
				// lable position = bullet's width(10px) + padding(8px)
				labelText.setAttribute("x", chartLegendX + 18);
				labelText.setAttribute("y", chartLegendY + 20 * i + 10);
				var txt = document.createTextNode(chartData.items[i].location +" | "+chartData.items[i].donors);
				labelText.appendChild(txt);
				chartContainer.appendChild(labelText);
			}

		}

		function loadData(dataUrl, container) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
                   if ((xhr.status >= 200 && xhr.status < 300) || 
                                             xhr.status === 304) {
						var jsonData = xhr.responseText;

						//parse jsoon data
						var chartData = JSON.parse(jsonData).ChartData;
							
						drawPieChart(container, chartData, 50, 52, 49, 115, 10);
					} else {
						console.log(xhr.statusText);
					    tempContainer.innerHTML += '<p class="error">Error getting ' + 
                                      target.name + ": "+ xhr.statusText + 
                                      ",code: "+ xhr.status + "</p>";
					}
				}
			}
			xhr.send();
		}
		
		loadData('data/chartdata.json', document.getElementById('svg-container'));
		
		/* ------   Start of JSONP cexample -----*/
        processBeer=function (data){
        	
        	// Uncomment the next liine to emulate malicious data
        	// data="function evilFunction(){alert('This is a malitious function');}";
        	  
        	if (data.breweries == undefined){
        		console.log("Retrieved data has no breweries info.");
            } else{
        	   console.log("In the processBeer callback. The first brewery is "
        	               + data.breweries[0].name);
            }
        }
        
	    var myScriptTag = document.createElement("script");
        myScriptTag.src = "http://api.openbeerdatabase.com/v1/breweries.json?callback=processBeer";
        var bd = document.getElementsByTagName('body')[0];
        bd.appendChild(myScriptTag);
        
        /* -----   End of JSONP example   */
	})();

	/*svg pie chart //end */

}
