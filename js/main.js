$window = $(window);

$(document).ready(function() {
	var originalUrl = window.location.href;

	// methods
	var resizeHeader = function() {
		$window.on("scroll", function() {
			var fromTop = $("body").scrollTop();
			$(".site-header").toggleClass("shrink", (fromTop > 200));
		});
	};

	var setHeaderLinksListeners = function() {
		var links = $(".site-header nav > ul > li");
		// var solutionsElemnts = links[1]

		links.each(function(index, element) {
			element = $(element);
			var href = $(element.children("a")[0]).attr("href");
			href = href === "#" ? "body" : href;
			var hrefElement = $(href);
			console.log(href);
			$window.on("scroll", function() {
				var bodyFromTop = $("body").scrollTop();
				// var hrefElement = $(href);
				var hrefFromTop = hrefElement.offset().top;
				var hrefHeight = hrefElement.height();
				console.log('body from top: ', bodyFromTop);
				console.log(href + ' from top: ', hrefFromTop);
				if (bodyFromTop <= hrefFromTop) {
					console.log(href);
					console.log(hrefFromTop);
					element.addClass("active");
				}
			});

		});

	};

	var setSectionHeight = function() {
		var viewportHeight = $window.height();
		var sections = $("body section").not("#experience, #about");
		sections.each(function(index, element) {
			element = $(element);
			if (element.height() < viewportHeight) {
				element.height(viewportHeight);
			}
		});
	};

	// logic
	setSectionHeight();
	// setHeaderLinksListeners();

	$(".next a, .site-header a, .more").click(function(e) {
		var href = e.target.href;
		var target = href.indexOf("#");
		target = href.substr(target);

		if (target === "#") { return; }
		e.preventDefault();
		e.stopPropagation();

		var scrollTo = $(target).offset().top + 1;

		$("html, body").animate({
			scrollTop: scrollTo
		}, 1500);

		// make sure we updat the url for SEO parsing
		window.location.href = href;
	});

	// resizeHeader();

	$window.resize(function() {
		setSectionHeight();
	});

	var formActions = (function() {
		var form = $(".contact form");
		var submitButton = form.find("button[type=submit]");

		// submitButton.click(function(e){
		// 	e.preventDefault();
		// });

		var validateForm = function(inputs) {
			var isValidationPassed = true;
			// var inputs = $.makeArray(inputs);
			for (var i = 0; i < inputs.length; i++) {
				var currentInput = inputs[i];
				var currentValue = currentInput.val();
				if (currentValue === "") {
					isValidationPassed = false;
					currentInput.addClass("error");
					continue;
				}

				if (currentInput.attr("id") === "email") {
					var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					isValidationPassed = emailRegex.test(currentValue);
				}

				if (isValidationPassed) {
					currentInput.removeClass("error");
				}
			};

			return isValidationPassed;
		};

		form.submit(function(e){
			e.preventDefault();
			console.log('entered');

			// var inputs = {
			// 	name: form.find("input[id=name]"),
			// 	email: form.find("input[id=email]"),
			// 	subject: form.find("input[id=subject]")
			// };

			var inputs = [];
			inputs.push(form.find("input[id=name]"));
			inputs.push(form.find("input[id=email]"));
			inputs.push(form.find("textarea[id=message]"));

			if (validateForm(inputs)) {
				var request = {
					url: "server.php",
					data: form.serialize(),
				};

				var success = function(data) {
					console.log(data);
				};
				console.log(request.data);
				$.ajax({
					type: "POST",
					url: request.url,
					data: request.data,
					success: success/*,
					dataType: dataType*/
				});
				console.log('submitted');
			}
		});
	})();
});


