(function() {
  angular
    .module("SmartRoads", ["ngRoute", "ui.bootstrap"])
    .config(["$routeProvider", "$locationProvider", "$httpProvider", function($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider.
      when("/", {
        templateUrl: "views/landing.html",
        controller: "LandingController"
      }).
      otherwise({
        redirectTo: "/"
      });
      $locationProvider.html5Mode(true);
      //$httpProvider.interceptors.push('loginInterceptor');
    }])
    .run(["$rootScope","$window", "$location", function($rootScope, $window, $location) {
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        /*if ($window.sessionStorage.token === undefined && next.templateUrl !== "login/login.html") {
          $location.path("login");
        }*/
      });
    }]);
})();
