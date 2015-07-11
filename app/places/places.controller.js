var lat;
var long;

(function() {
    // 'use strict';


angular.module('places')
<<<<<<< HEAD
  .controller('PlacesController', function($scope, $auth, $alert, Account, PlaceService, $routeParams, $location) {
=======

  .controller('PlacesController', function($scope, $auth, $alert, Account, PlaceService, $routeParams) {

>>>>>>> e5adab02253cb4dcc132ba5b7610b290c9c1e0cb
    $scope.map = {
        "center": {
            "latitude": 32.7833,
            "longitude": -79.931051
        },
        "zoom": 8
    }; //TODO:  set location based on users current gps location
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

    });
    }
    $scope.searchbox = { template: 'searchbox.tpl.html', events: events };


    $scope.createComment = function (newComment) {
        PlaceService.createComment(newComment);
        // $location.path('/places/detail');
    };

    var watchCallback = function () {
      PlaceService.getComments().success(function (comments) {
        $scope.comments = comments;
      });
    };

    $scope.$on('comment:created', watchCallback);


  });
})();
