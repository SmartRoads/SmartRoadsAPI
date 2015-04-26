(function() {

  angular.module("SmartRoads")
  .controller("SmartRoadsController", ["$window", "$location", "smartRoadsService", SmartRoadsController]);

  function SmartRoadsController($window, $location, smartRoadsService) {

    // Public
    var vm = this;
    vm.login = login;
    vm.next = next;
    vm.message = "";
    vm.token = "";
    // Private

    function login() {
      smartRoadsService.login(vm.email, vm.password, function(data) {
        console.log(data);
        if (data.error) {
            vm.message = data.error;
        } else {
          $window.sessionStorage.token = data.token;
          $location.path("/doc");
        }
      });
    }

    function next() {
      // check auth
      login();
    }
  }

})();
