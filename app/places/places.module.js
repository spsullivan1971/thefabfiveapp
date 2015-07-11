(function () {
  'use strict';
angular.module('places', [
  'ngRoute',
  'uiGmapgoogle-maps'

])

.config(function($routeProvider) {
  $routeProvider
    .when('/places', {
      templateUrl: 'places/views/location.html',
      controller: 'PlacesController'
    })
    .when('/places/:placeId', {
      templateUrl: 'places/views/detail.html',
      controller: 'PlacesController'
    })

  });
})();
