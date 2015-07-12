angular.module('MyApp', [
  'ngMessages',
  'ngRoute',
  'ngSanitize',
  'mgcrea.ngStrap',
  'auth',
  'profile',
  'posts',
  'places',
  'favorites'

])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'places/views/location.html'
    })
    .when('/404', {
      template: '<h1>Sorry, page not found</h1>'
    })
    .otherwise({
      redirectTo: '/404'
    });

});
