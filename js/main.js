$(document).ready(function(){
	$(".next").click(function(e) {
		e.preventDefault();
		var href = e.target.href;
		var target = href.indexOf("#");
		target = href.substr(target);
		console.log(target);
		$("html, body").animate({
			scrollTop: $(target).offset().top + 1
		}, 1500);
	});

	resizeHeader();
});

var resizeHeader = function() {
	$window = $(window);
	$window.on("scroll", function() {
		var fromTop = $("body").scrollTop();
		$(".site-header").toggleClass("shrink", (fromTop > 200));
	});
};