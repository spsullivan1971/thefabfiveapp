(function() {
  'use strict';
  angular
  .module('favorites')
  .controller('FavoritesController', function ($scope, FavoritesService, $routeParams) {

    FavoritesService.getFavorites().then(function (data) {
      $scope.favorites = data;
    });

    FavoritesService.getFavorite($routeParams._id).then(function (place) {
      $scope.favorite = place.data;
    });

    $scope.addToFavorites = function (place) {
      FavoritesService.addFavorite(place);
    };

    $scope.deleteFavorite = function (id) {
      console.log(id);
      FavoritesService.delete(id);
    };

    // $scope.barIcon =
    //
    // FavoritesService.iconSprite()
    var watchCallback = function (data) {
        FavoritesService.getFavorites().then(function (data) {
          $scope.favorites = data;
        });
      };
    $scope.$on('favorite:deleted', watchCallback);
    $scope.$on('favorite:added', watchCallback);
  });
}());
