$(document).on('pagebeforeshow', function() {
	// Overwrite jQM limits "No more than 5 items per line in navbar"
	$(".ssc-navbar > ul").removeClass("ui-grid-a");

});

$(document).on('pageshow', function() {
	// Set equal height for items on "about" page
	var aboutItemHeight = ($(window).height() - $('.ssc-grid-header').height() - $('.ssc-grid-footer').height() - 7) / 2;
	$('.ssc-grid-nav').css({
		'height' : aboutItemHeight,
		"padding-top" : aboutItemHeight/4+"px"
	});
});
