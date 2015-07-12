(function() {
  'use strict';
  angular
  .module('favorites')
  .factory('FavoritesService', function ($http) {
    var url = 'http://tiy-fee-rest.herokuapp.com/collections/barsNstripes2';
    var addFavorite = function (place) {
      $http.post(url, place).success(function (resp) {
        console.log("place:", place);
      }).error(function (err) {
        console.log(err);
      });
    };
    var getFavorites = function () {
      return $http.get(url).then(function (data) {
        console.log(data);
        return data.data
      })
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
