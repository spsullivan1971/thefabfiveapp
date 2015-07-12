var lat;
var long;

(function() {
    // 'use strict';


angular.module('places')
  .controller('PlacesController', function($scope, $auth, $alert, Account, PlaceService, $routeParams, $sce, uiGmapGoogleMapApi) {
    $scope.getCurrentLocation = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        changeLocation(position.coords.latitude, position.coords.longitude);
      });
    }

    uiGmapGoogleMapApi.then(function(map) {
      $scope.map = {
          "center": {
              "latitude": 32.7833,
              "longitude": -79.931051
          },
          "zoom": 8
      }; //TODO:  set location based on users current gps location
      });


      $scope.marker = {
          id: 0,
          coords: {
              latitude: 52.47491894326404,
              longitude: -1.8684210293371217
          },
          options: { draggable: true },
          events: {
              dragend: function (marker, eventName, args) {

                  $scope.marker.options = {
                      draggable: true,
                      labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                      labelAnchor: "100 0",
                      labelClass: "marker-labels"
                  };
              }
          }
      };

      var changeLocation = function(lat, long) {

        PlaceService.getBars(lat, long).then(function(data) {
          $scope.places = data;
        });
        $scope.map = {
            "center": {
                "latitude": lat,
                "longitude": long
            },
            "zoom": 18
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: lat,
                longitude: long
            }
        };
      }
      var events = {
          places_changed: function (searchBox) {
              var place = searchBox.getPlaces();
              lat = place[0].geometry.location.lat();
              long = place[0].geometry.location.lng();
              if (!place || place == 'undefined' || place.length == 0) {
                  return;
              }

              PlaceService.getBars(lat, long).then(function(data) {
                $scope.places = data;

              });

              if($routeParams.placeId) {
                PlaceService.getSingleBar($routeParams.placeId).then(function(listing) {
                console.log(listing);
                $scope.place = listing;
                });
              }

              $scope.map = {
                  "center": {
                      "latitude": place[0].geometry.location.lat(),
                      "longitude": place[0].geometry.location.lng()
                  },
                  "zoom": 18
              };
              $scope.marker = {
                  id: 0,
                  coords: {
                      latitude: place[0].geometry.location.lat(),
                      longitude: place[0].geometry.location.lng()
                  }
              };

          }
      };

      if($routeParams.placeId) {
      PlaceService.getSingleBar($routeParams.placeId, lat, long).then(function(listing) {
        $scope.place = listing;
        $scope.reviews = listing.reviews;
        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }
        console.log($scope.trustSrc(listing.website))
      });
      }

      $scope.searchbox = { template: 'searchbox.tpl.html', events: events, parentdiv:'searchBoxParent' };


    $scope.createComment = function (newComment) {
        PlaceService.createComment(newComment);
    };

    var watchCallback = function () {
      PlaceService.getComments().success(function (comments) {
        $scope.comments = comments;
      });
    };

    $scope.$on('comment:created', watchCallback);

  });
})();
