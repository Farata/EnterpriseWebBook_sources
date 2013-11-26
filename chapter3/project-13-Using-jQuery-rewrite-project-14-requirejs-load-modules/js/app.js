require.config({
	paths: {
		'jquery':'libs/jquery-1.9.0.min',
		'login':'modules/login',
		'donation':'modules/donation',
		'svg-pie-chart':'modules/svg-pie-chart',
		'campaigns-map':'modules/campaigns-map'
	}
	
});

require([
	'order!jquery',
	'order!login',
	'order!donation',
	'order!svg-pie-chart'
], function () {
	
});


//comments was copied from here - https://gist.github.com/882682
//
// Google Maps loads many JS files asynchronously, so listening just to the first script load
// isn't enough to check if it is ready to be used, another problem is that the regular gmaps script 
// uses document.write, so we need to pass a `callback` parameter to make it not use `document.write` 
// and wait for the callback call.
// <http://code.google.com/apis/maps/documentation/javascript/basics.html#Async>
//

require(['async!http://maps.google.com/maps/api/js?sensor=false!callback'], function(){
	//Google maps is available and all components are ready to use.
	
	require(['campaigns-map'], function () { });

});
