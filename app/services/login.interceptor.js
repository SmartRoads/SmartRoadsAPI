(function() {

  angular.module("SmartRoads").factory("loginInterceptor", ["$window","$q", loginInterceptor]);

  function loginInterceptor($window, $q) {
    // Factory configuration

    // Public
    return {
      request: request,
      responseError: responseError
    };

    // Private
    function request(config) {
      config.headers = config.headers || {};
      var token = $window.sessionStorage.token;
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

    function responseError(rejection) {
      if (rejection.status === 401) {
      }
      return $q.reject(rejection);
    }
  }

})();
