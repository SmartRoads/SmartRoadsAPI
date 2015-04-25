(function() {

  angular.module("SmartRoads").factory("paymentService", paymentService);

  function paymentService() {
    return {
      requestPayment: requestPayment
    };

    function requestPayment(callback) {

    }
  }
})();
