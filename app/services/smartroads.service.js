(function() {

  angular.module("SmartRoads").factory("smartRoadsService", ["$http","$window", smartRoadsService]);

  function smartRoadsService($http, $window) {
    return {
      login: login
    };

    function login(email, password, callback) {
      $http.post("auth/login", {email: email, password: password})
          .success(function(data) {
            callback(data)
          })
          .error(function(data) {
            callback(data);
          });
    }
  }
})();
