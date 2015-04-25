(function() {

  angular.module("SmartRoads")
  .controller("LandingController", ["$location", "paymentService", LandingController]);

  function LandingController($location, paymentService) {

    // Public
    var vm = this;
    vm.login = login;
    vm.pay = pay;

    // Private

    function login() {
      $location.path("login");
    }

    function pay() {
      paymentService.requestPayment(function(response) {
        
        $location.path("api");
      });
    }
  }

})();
