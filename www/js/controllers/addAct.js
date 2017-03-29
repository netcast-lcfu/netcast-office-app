define(['app'],function (app) {
    app.controller('addActCtrl', ['$scope','$ionicPopup', function($scope, $ionicPopup) {
      $scope.lable = '1';
      $scope.changeLable = function (lable) {
        if (lable == 1) {
          $scope.lable = '1';
        } else if (lable == 2) {
          $scope.lable = '2';
        } else if (lable == 3) {
          $scope.lable = '3';
        } else if (lable == 4) {
          $scope.lable = '4';
        } else {
          $scope.lable = '5';
        }
      };

      $scope.contentType = '1';
      $scope.changeContentType = function (contentType) {
        if (contentType == 1) {
          $scope.contentType = '1';
        } else if (contentType == 2) {
          $scope.contentType = '2';
        } else if (contentType == 3) {
          $scope.contentType = '3';
        } else {
          $scope.contentType = '4';
        }
      };

    }]);
});
