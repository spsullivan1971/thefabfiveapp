(function () {
  'use strict';
  angular
    .module('favorites', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/favorites/:id', {
        templateUrl: 'store/views/detail.html',
        controller: 'FavoritesController'
      })
      .when('/favorites', {
        templateUrl: 'favorites/views/list.html',
        controller: 'FavoritesController'
      });
    });
})();
