define(['app', 'js/utils/citySelect'], function (app, CitySelect) {
  app.controller('mapCtrl', ['$scope', '$ionicActionSheet', function ($scope, $ionicActionSheet, $ionicPopup) {
    var map;
    loadMap();
    function loadMap() {
      this.map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 8,
        center: [116.39, 39.9]
      });
    }
  }]);

});
