(function() {
  'use strict';
  angular
  .module('favorites')
  .factory('FavoritesService', function ($http) {
    var url = 'http://tiy-fee-rest.herokuapp.com/collections/barsNstripes1';
    var addFavorite = function (item) {
      $http.post(url, item).success(function (resp) {
        console.log(resp);
      }).error(function (err) {
        console.log(err);
      });
    };
    var getFavorites = function () {
      return $http.get(url);
    };

    var getFavorite = function (id) {
      return $http.get(url + '/' + id);
    };

    return {
      addFavorite: addFavorite,
      getFavorites: getFavorites,
      getFavorite: getFavorite
    };
  });
}());
