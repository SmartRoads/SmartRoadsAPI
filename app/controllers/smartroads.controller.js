(function() {

  angular.module("SmartRoads")
  .controller("SmartRoadsController", ["$window", "$location", "smartRoadsService", SmartRoadsController]);

  function SmartRoadsController($window, $location, smartRoadsService) {

    // Public
    var vm = this;
    vm.login = login;
    vm.next = next;

    // Private

    function login() {
      smartRoadsService.login(vm.email, vm.password, function(data) {
        if (data) {
          next();
        }
      })
    }

    function next() {
      // check auth
      $location.path("/doc");
    }
  }

})();
