(function() {
  'use strict';
  angular
  .module('favorites')
  .controller('FavoritesController', function ($scope, FavoritesService, $routeParams) {

    FavoritesService.getFavorites().success(function (favorites) {
      $scope.favorites = favorites;
    });

    FavoritesService.getFavorite($routeParams.favoriteId).then(function (favorite) {
      $scope.favorite = favorite;
    });

    $scope.addFavorite = function (item) {
      FavoritesService.addFavorite(item);
    };
  });
}());
