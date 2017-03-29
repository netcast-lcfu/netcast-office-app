define(['app'], function (app) {
  app.controller('addPostCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
    // Triggered on a button click, or some other target
    $scope.addcomment = function () {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.comment">',
        title: '添加评论',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>保存</b>',
            type: 'button-positive',
            onTap: function (e) {
              return $scope.data.comment;
            }
          }
        ]
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    };

    $scope.people = '1';
    $scope.changeSharePeople = function (people) {
      if (people == 1) {
        $scope.people = '1';
      } else if (people == 2) {
        $scope.people = '2';
      } else {
        $scope.people = '3';
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
