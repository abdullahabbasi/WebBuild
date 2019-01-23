
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    console.log('page executed')
    $scope.page = 2;

  $http.get("https://build-buiz.firebaseio.com/blogs.json")
  .then(function(response) {
      console.log(Object.keys(response.data).length - 1);
      $scope.blogs = response.data[Object.keys(response.data)[Object.keys(response.data).length - 1]];
      console.log('blogs', $scope.blogs)
  });
});