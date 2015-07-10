(function() {
    'use strict';


angular.module('places')
  .controller('PlacesController', function($scope, $auth, $alert, Account) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  });
})();
