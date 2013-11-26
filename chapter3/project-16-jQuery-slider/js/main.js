jQuery(function($) {
	/* --- transitions trigger ----- */
	$("input:radio[name=transitions]").click(function() {
		var transition = $(this).val();
		var newClassName = 'carousel carousel-' + transition;
		$('#image-carousel').attr('class', '');
		$('#image-carousel').addClass(newClassName);
		$('#image-carousel').attr('data-transition', transition);
	});
});
