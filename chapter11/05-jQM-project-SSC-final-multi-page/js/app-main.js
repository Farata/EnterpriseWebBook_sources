function logIn(event) {
	event.preventDefault();

	var userNameValue = $('#username').val();
	var userNameValueLength = userNameValue.length;
	var userPasswordValue = $('#password').val();
	var userPasswordLength = userPasswordValue.length;

	//check credential
	if (userNameValueLength == 0 || userPasswordLength == 0) {
		if (userNameValueLength == 0) {
			$('#error-message').text('Username is empty');
		}
		if (userPasswordLength == 0) {
			$('#error-message').text('Password is empty');
		}
		if (userNameValueLength == 0 && userPasswordLength == 0) {
			$('#error-message').text('Username and Password are empty');
		}
		$('#login-submit').parent().removeClass('ui-btn-active');
		$('[type="submit"]').button('refresh');
	} else if (userNameValue != 'admin' || userPasswordValue != '1234') {
		$('#error-message').text('Username or password is invalid');
	} else if (userNameValue == 'admin' && userPasswordValue == '1234') {
		$('.login-btn').css('display', 'none');
		$('.logout-btn').css('display', 'block');
		history.back();
	}
}


$(document).on('pagebeforeshow', function() {
	// Overwrite jQM limits "No more than 5 items per line in navbar"
	// Also additional steps were done in the CSS
	$(".ssc-navbar > ul").removeClass("ui-grid-a");

});

$(document).on('pageshow', function() {

	// Set equal height for items on the "about" and "share" page
	var aboutItemHeight = ($(window).height() - $('.ssc-grid-header').height() - $('.ssc-grid-footer').height() - 7) / 2;
	$('.ssc-grid-nav').css({
		'height' : aboutItemHeight,
		"padding-top" : aboutItemHeight / 4 + "px"
	});

	/* login  start */

	$('#login-submit').on('click', logIn);

	$('#login-cancel').on('click', function(event) {
		event.preventDefault();
		history.back();
	});

	$('.logout-confirm-btn').on('click', function() {

		$('.logout-btn').css('display', 'none');
		$('.login-btn').css('display', 'block');
	})
	/* login  end */

});

/* --------- donate start */

$(document).on('pageshow', "#Donate", function() {

	var checkedInd = 2;

	// Reset custom amount.
	$('#radio-container .ui-radio').on('touchend click', function() {
		// click is working on desktop only, just "tap" event not working correctly on iPhone
		// bind both - "touchend" and "click" - works fine on desktop and mobile
		$('#customAmount').val('');
	});

	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if ($('#customAmount').val() == '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
		$('form[name="_xclick"] input:radio').next().removeClass('ui-btn-active');
	}

	function onCustomAmountBlur() {
		if ($('#customAmount').val() == '') {
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').prop("checked", true);
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').next().addClass('ui-btn-active');
		}
	}


	$('#customAmount').on({
		focus : onCustomAmountFocus,
		blur : onCustomAmountBlur
	});

	$('.donate-button-submit').on('click', simulateSubmitSerializedData);

	function simulateSubmitSerializedData(event) {
		//Block the default action of the event
		event.preventDefault();

		// Serialize selected input fields
		// get inputs data with definite type, name or value - total 6
		// paypal_email, item_name, currency_code - i.e. all hidden exept name=cdm
		// amount, full name, email
		var queryString = $('form[name="_xclick"]').find(':input[type=hidden][name!=cmd], :input[name=amount][value!=""], :input[name=full_name], :input[name=email_addr]').serialize();

		// Demo mode: Show submitted data in jQM popup
		// split query string and create output message
		var inputQueryString = queryString.split('&');
		var outputString = '';
		for (var i = 0; i < inputQueryString.length; i++) {
			outputString += inputQueryString[i] + '<br/>';
		}
		outputString += '<br/>';
		$('#donatePopupContent').html("<h4>These parts of the serialized data will be sent to the server:</h4>" + outputString);
		// open jQM popup with id=donatePopupDialog
		$("#donatePopupDialog").popup("open");

		// ajax submition code goes here

		// go to "donation-submit-result" page when ajax submission was passed
		// or - in demo mode - jQM popup was closed
		$("#donatePopupDialog").on({
			popupafterclose : function() {
				$.mobile.changePage("#Donation-submit-result", {
					transition : "slide"
				});
			}
		});
	}

});
/* ---------  donate end */

/* --------- start stats */

$(document).on("pageshow", "#Stats", function() {

	var donorsDataCache = [];
	var labelsDataCache = [];

	function drawPieChart(chartContainer, chartData, chartLegendData) {

		// clear chartContainer
		while (chartContainer.firstChild) {
			chartContainer.removeChild(chartContainer.firstChild);
		}

		// the XML namespace for svg elements
		var namespace = "http://www.w3.org/2000/svg";

		var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];

		var width = $(window).width();
		var height = $(window).height();

		var centerX = 0;
		var centerY = 0;
		var pieRadius = 0;
		var chartLegendX = 0;
		var chartLegendY = 0;

		if (width > height) {
			// landscape mode
			centerX = width * .2;
			centerY = width * .2;
			pieRadius = width * .2;
			chartLegendX = width / 2 - 10;
			chartLegendY = 20;

		} else {
			// portrait mode
			centerX = width * .4;
			centerY = width * .4;
			pieRadius = width * .4;
			chartLegendX = 10;
			chartLegendY = pieRadius * 2 + 30;
		}

		// calculate the total data
		var totalDonors = 0;
		for (var i = 0; i < chartData.length; i++)
		//verifying that data is numeric
			if ( typeof chartData[i] == 'number') {
				totalDonors += chartData[i];
			}

		// Sector size
		var angles = [];
		for (var i = 0; i < chartData.length; i++) {
			angles[i] = chartData[i] / totalDonors * Math.PI * 2;
		}
		// Loop through sectors.
		startAngle = 0;
		for (var i = 0; i < chartData.length; i++) {
			// End of the sector
			var endAngle = startAngle + angles[i];
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

			// Path details
			var pathDetails = "M " + centerX + "," + centerY + // Start at circle center
			" L " + x1 + "," + y1 + // Draw line to (x1,y1)
			" A " + pieRadius + "," + pieRadius + // Draw an arc of radius
			" 0 " + big + " 1 " + // Arc details...
			x2 + "," + y2 + // Arc goes to to (x2,y2)
			" Z";
			// Close path back to (centerX, centerY)

			// Attributes for the <svg:path> element
			path.setAttribute("d", pathDetails);
			// Sector fill color
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

			// Add a label text
			var labelText = document.createElementNS(namespace, "text");
			// lable position = bullet's width(10px) + padding(8px)
			labelText.setAttribute("x", chartLegendX + 18);
			labelText.setAttribute("y", chartLegendY + 20 * i + 10);
			var txt = document.createTextNode(chartLegendData[i] + " | " + chartData[i]);
			labelText.appendChild(txt);
			chartContainer.appendChild(labelText);
			// Add text to the chart
		}

	}

	function loadData(dataUrl, container) {
		$.ajax({
			url : dataUrl,
			type : 'GET',
			dataType : 'json'
		}).done(function(data) {

			for (var i = 0; i < data.ChartData.items.length; i++) {
				donorsDataCache.push(data.ChartData.items[i].donors);
			}
			for (var i = 0; i < data.ChartData.items.length; i++) {
				labelsDataCache.push(data.ChartData.items[i].location);
			}

			drawPieChart(container, donorsDataCache, labelsDataCache);

		}).fail(function(jqXHR, textStatus) {
			console.log('Error status code:' + jqXHR.status);
			if (textStatus === 'parsererror') {
				console.log('Requested JSON parse was failed.');
			} else if (textStatus === 'abort') {
				console.log('Ajax request was aborted.');
			}
		});
	}

	loadData('data/chartdata.json', $('#svg-container')[0]);

	window.addEventListener("resize", windowResizeHandler);
	function windowResizeHandler() {
		drawPieChart($('#svg-container')[0], donorsDataCache, labelsDataCache);
	}

});
/* --------- stats end */

/* --------- events start */

$(document).on("pageshow", "#Events", function() {

	$.mobile.showPageLoadingMsg();

	var geocoder = new google.maps.Geocoder();

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

	function resizemap() {
		var height = ($(window).height() - $("#Campaigns").find('[data-role="header"]').outerHeight() - $("#Campaigns").find('[data-role="footer"]').outerHeight());
		$('#location-map').height(height);

		google.maps.event.trigger(map, "resize");
	}

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

		$('#campaignsInfo').html("<h4>" + campaigns.header + "</h4>" + "On " + campaigns.timestamp + " we run " + campaignsCount + " campaigns.");

		createCampaignsMap(campaigns);
		resizemap();
		$.mobile.hidePageLoadingMsg();

		$('#campaignsInfoPopup').popup("open");
	}

	function loadData(dataUrl) {
		$.ajax({
			url : dataUrl,
			type : 'GET',
			dataType : 'json'
		}).done(function(data) {

			showCampaignsInfo(data.campaigns);

		}).fail(function(jqXHR, textStatus) {
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
/* --------- // events end -------------- */

/* --------- media */

// autoplay html5 video on desktop
$(document).on("pageshow", "#Html5video", function() {
	// this will working on desktop only
	$('#html5video')[0].play();
});
// When we are using jQM multi page template we forced to pause/stop video via javascript
// when page was changed
$(document).on("pagehide", "#Html5video", function() {
	$('#html5video')[0].pause();
});


// When we are using jQM multi page template 
// we forced to pause/stop YouTube via javascript when page was changed/hidden
// If start to play youtube video and then click "Back" 
// youtube video still contunued play in hidden <div>
// We need function to control iframe based YouTube player

// Note: "enablejsapi=1" param was added into the src of iframe

// Third-party function to control iframe based YouTube player
//http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html
/**
 * @author       Rob W <gwnRob@gmail.com>
 * @website      http://stackoverflow.com/a/7513356/938089
 * @version      20120724
 * @description  Executes function on a framed YouTube video (see website link)
 *               For a full list of possible functions, see:
 *               https://developers.google.com/youtube/js_api_reference
 * @param String frame_id The id of (the div containing) the frame
 * @param String func     Desired function to call, eg. "playVideo"
 *        (Function)      Function to call when the player is ready.
 * @param Array  args     (optional) List of arguments to pass to function func*/
function callPlayer(frame_id, func, args) {
	if (window.jQuery && frame_id instanceof jQuery)
		frame_id = frame_id.get(0).id;
	var iframe = document.getElementById(frame_id);
	if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
		iframe = iframe.getElementsByTagName('iframe')[0];
	}

	// When the player is not ready yet, add the event to a queue
	// Each frame_id is associated with an own queue.
	// Each queue has three possible states:
	//  undefined = uninitialised / array = queue / 0 = ready
	if (!callPlayer.queue)
		callPlayer.queue = {};
	var queue = callPlayer.queue[frame_id], domReady = document.readyState == 'complete';

	if (domReady && !iframe) {
		// DOM is ready and iframe does not exist. Log a message
		window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
		if (queue)
			clearInterval(queue.poller);
	} else if (func === 'listening') {
		// Sending the "listener" message to the frame, to request status updates
		if (iframe && iframe.contentWindow) {
			func = '{"event":"listening","id":' + JSON.stringify('' + frame_id) + '}';
			iframe.contentWindow.postMessage(func, '*');
		}
	} else if (!domReady || iframe && (!iframe.contentWindow || queue && !queue.ready)) {
		if (!queue)
			queue = callPlayer.queue[frame_id] = [];
		queue.push([func, args]);
		if (!('poller' in queue)) {
			// keep polling until the document and frame is ready
			queue.poller = setInterval(function() {
				callPlayer(frame_id, 'listening');
			}, 250);
			// Add a global "message" event listener, to catch status updates:
			messageEvent(1, function runOnceReady(e) {
				var tmp = JSON.parse(e.data);
				if (tmp && tmp.id == frame_id && tmp.event == 'onReady') {
					// YT Player says that they're ready, so mark the player as ready
					clearInterval(queue.poller);
					queue.ready = true;
					messageEvent(0, runOnceReady);
					// .. and release the queue:
					while ( tmp = queue.shift()) {
						callPlayer(frame_id, tmp[0], tmp[1]);
					}
				}
			}, false);
		}
	} else if (iframe && iframe.contentWindow) {
		// When a function is supplied, just call it (like "onYouTubePlayerReady")
		if (func.call)
			return func();
		// Frame exists, send message
		iframe.contentWindow.postMessage(JSON.stringify({
			"event" : "command",
			"func" : func,
			"args" : args || [],
			"id" : frame_id
		}), "*");
	}
	/* IE8 does not support addEventListener... */
	function messageEvent(add, listener) {
		var w3 = add ? window.addEventListener : window.removeEventListener;
		w3 ? w3('message', listener, !1) : ( add ? window.attachEvent : window.detachEvent)('onmessage', listener);
	}

}

// Solving issue on desktop: When YT page is hidden Youtube video still  contunued play 
$(document).on("pagehide", "#YoutubeVideo", function() {
	callPlayer("yt-video-iframe", function() {
    // This function runs once the player is ready ("onYouTubePlayerReady")
    callPlayer("yt-video-iframe", "pauseVideo");
});

});

/* -------- // media end ------ */