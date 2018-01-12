// Angular module
angular.module('adAgency')

	// Main Controller, dependency injection
	.controller('mainController', ['$scope', '$stateParams', '$sce', 'mainService','$location', '$anchorScroll', '$rootScope', function($scope, $stateParams, $sce, mainService, $location, $anchorScroll, $rootScope) {

		$scope.sortedBy = '-date';
		
		$scope.mainService = mainService;

		// Call function and return data 
        $scope.data = mainService.getData();

		// Show active menu-item
		$scope.isActive = function (viewLocation) {
		     var active = (viewLocation === $location.path());
		     return active;
		};

		// Show Menu
		// On load
        $scope.menuOpened = $(window).width() < 768 ? false : true;
		
		// On resize
        window.onresize = function() {
    		if($(window).width() < 768) {
    			$scope.menuOpened = false;
    			$(".nav-wrapper").addClass('ng-hide');
    		}
    		else {
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
				// If menu open
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
        $scope.overSubmenu = function(){
        	if($(window).width() > 767) {
	        	$(".submenu").css({'opacity': '1', 'visibility': 'visible'});
        	}
        }

        // Hide submenu
        $scope.hideSubmenu = function(){
        	if($(window).width() > 767){
	        	$(".submenu").css({'opacity': '0', 'visibility': 'hidden'});
            }
        }

		// Convert to html
		$scope.trust = function(htmlCode){
			return $sce.trustAsHtml(htmlCode);
		};

	}])
	
	// Controller for slider
	.controller('sliderController', ['$scope', '$interval', function($scope, $interval) {

		// pause
		$scope.pause = false; 

		// On page loading start slider
		angular.element(document).ready(function() {

        	// Slider content fade In
		    $(".slider__header").fadeIn(3000).css("display","table"); 

		    $scope.showSlide = function(){ 
				var currentWidth = $(".slider__slide").width();
				$(".slider__slides").stop().animate({
		            left: - currentWidth
		        }, 'slow', function () {
		            $('.slider__slide:first-child').appendTo('.slider__slides');
		            $('.slider__slides').css('left', '');
		        });
			}

			$scope.stop = function(){
				$scope.pause = !$scope.pause;
			}

			$interval(function(){
				if(!$scope.pause){
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
