(function() {
  // 'use strict';


angular.module('places')
  .factory('PlaceService', function($http, $routeParams, $rootScope) {
    var url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
    var detailUrl = 'https://maps.googleapis.com/maps/api/place/details/json?reference='
    var photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';
    var getBars = function() {

      return $http.post('/api/collections/placesProxy', {url: url + lat + ',' + long + '&radius=500&types=bar&key=AIzaSyDh3JutHi19Cdas8AyY36-R2Mn9mkMw-YA'}).then(function (data) {
        var listArray = [];
        var listings = JSON.parse(data.data.data);
        listings.results.forEach(function(el) {
          var barObj = {
            id: el.id,
            name: el.name,
            rating: el.rating,
            address: el.vicinity,
            photo: el.photos,
            ref: el.reference
          }
          // if (typeof(el.photos) === 'object' && el.photos.length > 0) {
          //   el.photos = el.photos[0].photo_reference;
          // }

          listArray.push(barObj);
        });
        console.log(listArray);
        return listArray;

      }).then(function(data) {


        data.forEach(function(el) {
          var el = el;
          $http.post('/api/collections/placesProxy', {url: detailUrl + el.ref + '&key=AIzaSyDh3JutHi19Cdas8AyY36-R2Mn9mkMw-YA'}).then(function(stuff) {

            var listingsDetail = JSON.parse(stuff.data.data);
            el.reviews = listingsDetail.result.reviews;
            el.hours = listingsDetail.result.opening_hours.weekday_text.join(', ');
            el.website = listingsDetail.result.website;
            el.phone = listingsDetail.result.formatted_phone_number;
            el.address = listingsDetail.result.formatted_address;

          })

        });
        console.log(data[0].photo[0].html_attributions);
        return data;

      })
      // .then(function(stuff) {
      // console.log(stuff);
      //   stuff.forEach(function(el) {
      //     var el = el;
      //     if (typeof(el.photo) === 'object') {
      //     $http.post('/api/collections/placesProxy', {url: photoUrl + el.photo[0].photo_reference + '&key=AIzaSyDh3JutHi19Cdas8AyY36-R2Mn9mkMw-YA'}).success(function(data) {
      //       console.log(data);
      //       var imgsrc = "data:image/*;base64," +  btoa(encodeURIComponent(data.data));
      //       // console.log(imgsrc);
      //       console.log(imgsrc);
      //       el.photo = imgsrc;
      //     })
      //
      //     }
      //
      //   });
      //   console.log(stuff);
      //   return stuff;
      //
      // })

    };
    var getSingleBar = function(id, lat, long) {
      var listingId = id;
      return getBars().then(function(data) {
          var filteredArray = [];
          data.forEach(function(el) {
            el.id = el.id.toString();
            if (el.id === listingId) {
              filteredArray.push(el);
            }

          });
          return(filteredArray[0]);
      });

    }
    var getReviews = function(listing) {

      console.log(listing.reviews);
      return listing.reviews;

    };

    var commentsUrl = 'http://tiy-fee-rest.herokuapp.com/collections/barsandstripescomment';

    var getComments = function () {
       return $http.get(commentsUrl);
     };

    var createComment = function (newComment) {
      var commentObject = {
        comment: newComment
      };
      $http.post(commentsUrl, commentObject).success(function () {
        $rootScope.$broadcast('comment:created');
      });
     };

    return {
      getComments: getComments,
      createComment: createComment,
      getBars: getBars,
      getSingleBar: getSingleBar,
      getReviews: getReviews
    };


  });
})();
