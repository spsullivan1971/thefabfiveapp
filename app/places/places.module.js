(function () {
  'use strict';
angular.module('places', [
  'ngRoute',
  'uiGmapgoogle-maps'

])

.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
  $routeProvider
    .when('/places', {
      templateUrl: 'places/views/list.html',
      controller: 'PlacesController'
    })
    .when('/places/:placeId', {
      templateUrl: 'places/views/detail.html',
      controller: 'PlacesController'
    })
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDh3JutHi19Cdas8AyY36-R2Mn9mkMw-YA',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
  });



})();
