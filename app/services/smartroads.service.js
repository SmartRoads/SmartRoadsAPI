(function() {

  angular.module("SmartRoads").factory("smartRoadsService", ["$http","$window", smartRoadsService]);

  function smartRoadsService($http, $window) {
    return {
      login: login,
      register: register
    };

    function login(email, password, callback) {
      $http.post("auth/login", {email: email, password: password})
          .success(function(data) {
            console.log(data);
          })
          .error(function(data) {
            console.log(data);
          });
    }
    function register(email, password, callback) {
      $http.post("auth/register", {email: email, password: password})
          .success(function(data) {
            callback(data.href);
          })
          .error(function(data) {
            console.log(data);
          });
    }
  }
})();
