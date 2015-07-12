(function () {
  'use strict';
  angular
    .module('favorites', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/favorites/:_id', {
        templateUrl: 'favorites/views/detail.html',
        controller: 'FavoritesController'
      })
      .when('/favorites', {
        templateUrl: 'favorites/views/list.html',
        controller: 'FavoritesController'
      });
    });
})();
