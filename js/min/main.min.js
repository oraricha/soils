$window = $(window);

$(document).ready(function() {

	// methods
	var resizeHeader = function() {
		$window.on("scroll", function() {
			var fromTop = $("body").scrollTop();
			$(".site-header").toggleClass("shrink", (fromTop > 200));
		});
	};

	var setSectionHeight = function() {
		var viewportHeight = $window.height();
		var sections = $("body section");
		sections.each(function(index, element) {
			element = $(element);
			if (element.height() < viewportHeight) {
				element.height(viewportHeight);
			}
		});
	};

	var setSliderHeight = function () {
		var slider = $(".about .slider");
		var summary = $(".summary");
		slider.height(summary.height() + 10 + "px");
	};

	// logic
	setSectionHeight();
	setSliderHeight();

	$(".next, .site-header a").click(function(e) {
		e.preventDefault();
		var href = e.target.href;
		var target = href.indexOf("#");
		target = href.substr(target);
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


