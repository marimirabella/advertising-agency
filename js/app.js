// Angular module, router, animation
angular.module('adAgency', ['ui.router', 'ngAnimate'])

	// Animation for slide up and down
	.animation('.slide', function() {
		var NG_HIDE_CLASS = 'ng-hide';
		return {
			beforeAddClass: function(element, className, done) {
				if(className === NG_HIDE_CLASS) {
					element.slideUp(done);
				}
			},
			removeClass: function(element, className, done) {
				if(className === NG_HIDE_CLASS) {
					element.hide().slideDown(done);
				}
			}
		}
	})

	// UI Router
	.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
			// route for home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'mainController'
                    },
                    'home': {
                        templateUrl : 'views/home.html',
                        controller  : 'sliderController'
                    },
                    'services': {
                        templateUrl : 'views/services.html',
                        controller  : 'mainController'
                    },
                    'portfolio': {
                        templateUrl : 'views/portfolio.html',
                        controller  : 'mainController'
                    },
                    'order': {
                        templateUrl : 'views/order.html',
                        controller  : 'initMapController'
                    },
                    'contacts': {
                        templateUrl : 'views/contacts.html',
                        controller  : 'initMapController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            // route for services page
            .state('app.services', {
                url:'services'
            })

            // route for portfolio page
            .state('app.portfolio', {
                url:'portfolio'
            })
        
            // route for order page
            .state('app.order', {
                url:'order'
            })

            // route for contacts page
            .state('app.contacts', {
                url:'contacts'
            });
    
        $urlRouterProvider.otherwise('/');
    })

    // On changing location scroll to element
    .run(function ($rootScope, $state, $stateParams, $location) {
        $rootScope.$on('$locationChangeSuccess', function () {

            // Replacement of / to #
            var element = $location.url() === '/' ? $('#home') : $('#' + $location.url().replace('/', ''));

            if(element.length > 0) {

                // Smooth scroll and offset
                element[0].scrollIntoView({ block: 'start', behavior: 'smooth' });

                if($(window).width() < 768){
                    $('html,body').animate({
                        scrollTop: element[0].offsetTop+10
                    }, 1000);
                }
                else {
                    $('html,body').animate({
                        scrollTop: element[0].offsetTop-90
                    }, 1000);
                }
            }    
        });
    });
;

