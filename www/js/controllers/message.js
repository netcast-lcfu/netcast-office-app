define(['app'], function (app) {
  app.controller('messageCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
    var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
    $scope.$on('$ionicView.afterEnter', function () {
      if (pages.indexOf(location.hash) > -1) {
        var tabs = document.getElementsByTagName('ion-tabs');
        angular.element(tabs).removeClass("tabs-item-hide");
      }
    });
    $scope.$on('$ionicView.beforeLeave', function () {
      if (pages.indexOf(location.hash) > -1) return;
      var tabs = document.getElementsByTagName('ion-tabs');
      angular.element(tabs).addClass("tabs-item-hide");
    });

    $rootScope.badges = {num: 0};

  }]);
});

