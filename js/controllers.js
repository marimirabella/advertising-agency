// Angular module
angular.module('adAgency')

    // Main Controller, dependency injection
    .controller('mainController', ['$scope', '$stateParams', '$state', '$sce', 'mainService', '$location', '$anchorScroll', '$timeout', function($scope, $stateParams, $state, $sce, mainService, $location, $anchorScroll, $timeout) {

		$scope.sortedBy = '-date';

		$scope.mainService = mainService;

		// Call service and return data 
		$scope.data = mainService.getData();

		// Show active menu-item
		$scope.isActive = function(viewLocation) {
			var active = (viewLocation === $location.path());

			return active;
		};

		// Show Menu
		// On load
		$scope.menuOpened = $(window).width() < 768 ? false : true;

		// On resize
		window.onresize = function() {
			if ($(window).width() < 768) {
				$scope.menuOpened = false;
				$(".nav-wrapper").addClass('ng-hide');
			} else {
				$scope.menuOpened = true;
				$(".nav-wrapper").removeClass('ng-hide');
			}
		};

		// On toggle
		$scope.toggleMenu = function(event) {

			$scope.menuOpened = !$scope.menuOpened;

			// To not get clicked window.onclick
			event.stopPropagation();

			// When click outside the button
			window.onclick = function() {
				if ($scope.menuOpened) {
					$scope.menuOpened = false;

					// update and refresh UI
					$scope.$apply();
				}
			};

			// Update the state of menuOpened after toggle and resize
			window.onresize = function() {
				$scope.menuOpened = $(window).width() < 768 ? false : true;

				// update and refresh UI
				$scope.$apply();
			};
		};

		// Show submenu
		$scope.overSubmenu = function() {
			if ($(window).width() > 767) {
				$(".submenu").css({ 'opacity': '1', 'visibility': 'visible' });
			}
		};

		// Hide submenu
		$scope.hideSubmenu = function() {
			if ($(window).width() > 767) {
				$(".submenu").css({ 'opacity': '0', 'visibility': 'hidden' });
			}
		};

		// Going to the section after changing the router state
		$scope.scrollOnClick = function(url) {
			var element = $(url);

			if (element.length > 0) {
				// Smooth scroll and offset
				element[0].scrollIntoView({ block: 'start', behavior: 'smooth' });

				if ($(window).width() < 768) {
					$('html, body').animate({
						scrollTop: element[0].offsetTop + 10
					}, 1000);
				} else {
					$('html, body').animate({
						scrollTop: element[0].offsetTop - 90
					}, 1000);
				}
			}
		};

		// Highlighting the menu items and changing the location path
		window.onscroll = function(event) {
			var section = $(".js-section");

			if ($location.url() !== '/search') {
				section.each(function(i) {
					if ($(this).position().top - 95 <= $(window).scrollTop()) {
						$('a.menu__link.active').removeClass('active');
						$('a.menu__link').eq(i).addClass('active');
						$location.path('/' + $('a.menu__link').eq(i).attr('ui-sref').slice(4));
					}
				});
			}
		};

		// Convert to html
		$scope.trust = function(htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		};

		// New order
		$scope.neworder = { name: '', tel: '', email: '', message: '' };

		$scope.orders = [];

		$scope.submitOrder = function() {

			// push order into the orders array
			$scope.orders.push($scope.neworder);

			// show the success message after submit
			$scope.success = true;

			// hide the message after 3sec
			$timeout(function() {
				$scope.success = false;
			}, 3000);

			// reset the form to pristine
			$scope.orderForm.$setPristine();

			// reset JavaScript object that holds the order
			$scope.neworder = { name: '', tel: '', email: '', message: '' };
		};
    }])

    // Controller for slider
	.controller('sliderController', ['$scope', '$interval', function($scope, $interval) {

		$scope.pause = false;

		// On page loading start slider
		angular.element(document).ready(function() {

			// Slider content fade In
			$(".slider__header").fadeIn(3000).css("display", "table");

			$scope.showSlide = function() {
				var currentWidth = $(".slider__slide").width();

				$(".slider__slides").stop().animate({
					left: -currentWidth
				}, 'slow', function() {
					$('.slider__slide:first-child').appendTo('.slider__slides');
					$('.slider__slides').css('left', '');
				});
			};

			$scope.stop = function() {
				$scope.pause = !$scope.pause;
			};

			$interval(function() {
				if (!$scope.pause) {
					$scope.showSlide();
				}
			}, 3000);

		});
	}])

	// Controller for Google map
	.controller('initMapController', ['$scope', 'GMap', function($scope, GMap) {

		GMap.init();

	}])
;