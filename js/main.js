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
			$window.on("scroll", function() {
				var bodyFromTop = $("body").scrollTop();
				var hrefFromTop = hrefElement.offset().top;
				var hrefHeight = hrefElement.height();
				if (bodyFromTop <= hrefFromTop) {
					element.addClass("active");
				}
			});

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

	// logic
	setSectionHeight();
	// setHeaderLinksListeners();

	// $(".next a, .site-header a").click(function(e) {
	$(".next a").click(function(e) {
		if ($(document).find("title").text().indexOf("references") >= 0) { return; }

		var href = e.target.href;
		var target = href.indexOf("#");
		target = href.substr(target);

		if (target === "#" || href.indexOf("references") >= 0) { return; }
		e.preventDefault();
		e.stopPropagation();

		var scrollTo = $(target).offset().top + 1;

		$("html, body").animate({
			scrollTop: scrollTo
		}, 1500);

		// make sure we updat the url for SEO parsing
		window.location.href = href;
	});

	$("header.site-header nav").singlePageNav({
		offset: $('header.site-header').outerHeight(),
		filter: ':not(.external)',
		updateHash: true,
		beforeStart: function() {
			// console.log('begin scrolling');
		},
		onComplete: function() {
			// console.log('done scrolling');
		}
	});



	$(".more").click(function(e) {
		var $this = $(this);
		var siblings = $(this).siblings();
		var brief = $this.prevAll(".brief");
		
		brief.slideToggle(function() {
			if (brief.is(':visible')) {
				$this.text("Read More");
			} else {
				$this.text("Read Less");
			}
		});
		$this.prevAll(".technology").slideToggle();

		
	});

	// resizeHeader();

	$window.resize(function() {
		setSectionHeight();
	});

	var formActions = (function() {
		var form = $(".contact form");
		var submitButton = form.find("button[type=submit]");

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

			var inputs = [];
			inputs.push(form.find("input[id=name]"));
			inputs.push(form.find("input[id=email]"));
			inputs.push(form.find("textarea[id=message]"));

			if (validateForm(inputs)) {
				$("#alert-fields").hide();

				var request = {
					url: "server.php",
					data: form.serialize(),
				};

				var success = function(data) {
					$("#alert-success").show();
					$("#alert-fail").hide();
				};

				var fail = function(data) {
					$("#alert-fail").show();
					$("#alert-success").hide();
				};

				$.ajax({
					type: "POST",
					url: request.url,
					data: request.data,
					success: success,
					error: fail
				});
			} else {
				$("#alert-fields").show();
			}
		});
	})();
});


