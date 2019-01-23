
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    console.log('page executed')
    
    $http.get("https://build-buiz.firebaseio.com/theme.json")
    .then(function(response) {
        $scope.page = response.data[Object.keys(response.data)[Object.keys(response.data).length - 1]];
        console.log('page', $scope.page.theme)
    });
    $http.get("https://build-buiz.firebaseio.com/website.json")
    .then(function(response) {
        if(response.data) {
            $scope.website = response.data[Object.keys(response.data)[Object.keys(response.data).length - 1]];
        } else {
          $scope.website = null;
        }
        
        console.log('webstie', $scope.website)
    });
  $http.get("https://build-buiz.firebaseio.com/product.json")
  .then(function(response) {
      if(response.data) {
        $scope.products = response.data;
      } else {
        $scope.products = null;
      }
      
      console.log('products', $scope.products)
  });

  $http.get("https://build-buiz.firebaseio.com/about.json")
  .then(function(response) {
      console.log('about', response);
      if(response.data) {
        $scope.about = response.data[Object.keys(response.data)[Object.keys(response.data).length - 1]];
      } else {
        $scope.about = null;
      }

      console.log('about', $scope.about)
  });

  $scope.page = 2;

  $http.get("https://build-buiz.firebaseio.com/blogs.json")
  .then(function(response) {
    console.log(response);
      if(response.data) {
          $scope.blogs = response.data[Object.keys(response.data)[Object.keys(response.data).length - 1]];
      } else {
        $scope.blogs = null;
      }

      console.log('blogs', $scope.blogs)
  });
});