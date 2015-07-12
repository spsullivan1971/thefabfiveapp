(function() {
  'use strict';
  angular.module('profile')
    .factory('Account', function($http) {
      return {
        getProfile: function() {
          return $http.get('/api/me');
        },
        updateProfile: function(profileData) {
          console.log(profileData);
          return $http.put('/api/me', profileData);
        }
      };
    });
}());
