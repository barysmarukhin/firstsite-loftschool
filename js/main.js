$(document).ready(function() {
	
	$('.image img').hover(function() {
		$(this).stop().animate({
			opacity:0.2,
		}, 400);
	},function() {
		$(this).stop().animate({
			opacity:1
		}, 400);
	});

});




	
