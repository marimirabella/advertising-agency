// Angular module, router, animation
angular.module('adAgency', ['ui.router', 'ngAnimate'])

	// Animation for slide up and down
	.animation('.slide', function() {
		var NG_HIDE_CLASS = 'ng-hide';
		return {
			beforeAddClass: function(element, className, done) {
				if (className === NG_HIDE_CLASS) {
					element.slideUp(done);
				}
			},
			removeClass: function(element, className, done) {
				if (className === NG_HIDE_CLASS) {
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
                        controller  : 'mainController'
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
            })

            // route for search page
            .state('app.search', {
                url: 'search',
                views: {
                    'home@': {
                        templateUrl : 'views/search.html',
                        controller  : 'mainController'
                    },
                    'services@': {
                        templateUrl : '',
                    },
                    'portfolio@': {
                        templateUrl : '',
                    },
                    'order@': {
                        templateUrl : '',
                    },
                    'contacts@': {
                        templateUrl : '',
                    }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;

