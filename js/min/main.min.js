$window = $(window);

$(document).ready(function(){
	setSectionHeight();
	setSliderHeight();

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

	$window.resize(function() {
		setSectionHeight();
		setSliderHeight();
	});
});

var resizeHeader = function() {
	$window.on("scroll", function() {
		var fromTop = $("body").scrollTop();
		$(".site-header").toggleClass("shrink", (fromTop > 200));
	});
};

var setSectionHeight = function() {
	var viewportHeight = $window.height();
	$("body section").height(viewportHeight);
};

var setSliderHeight = function () {
	var slider = $(".about .slider");
	var summary = $(".summary");
	slider.height(summary.height() + 10 + "px");
};
