define(['app', 'js/utils/citySelect'], function (app, CitySelect) {
  app.controller('mapCtrl', ['$q', '$scope', '$ionicActionSheet', function ($q, $scope, $ionicActionSheet, $ionicPopup) {

    var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
    $scope.$on('$ionicView.afterEnter', function() {
      if (pages.indexOf(location.hash) > -1) {
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).removeClass("tabs-item-hide");
      }
    });
    $scope.$on('$ionicView.beforeLeave', function() {
      if (pages.indexOf(location.hash) > -1) return;
      var tabs =document.getElementsByTagName('ion-tabs');
      angular.element(tabs).addClass("tabs-item-hide");
    });

    // var map;
    // loadMap();
    // function loadMap() {
    //   this.map = new AMap.Map('mapContainer', {
    //     resizeEnable: true,
    //     zoom: 8,
    //     center: [116.39, 39.9]
    //   });
    // }

    var AMapArea = document.getElementById('mapContainer');
    AMapArea.parentNode.style.height = "100%";
    //$scope.AMapId='container';
    $scope.mapObj;//存放初始化的地图对象
    //$scope.initAMap=function(){
    var position = new AMap.LngLat(116.397428, 39.90923);
    $scope.mapObj = new AMap.Map("mapContainer", {
      resizeEnable: true,
      zoom: 14,
      center: [116.39, 39.9]
    });

    //定位插件
    $scope.mapObj.plugin(['AMap.Geolocation'], function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      $scope.mapObj.addControl(geolocation);
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    //定位完成调用的方法
    function onComplete(dt) {
      var position = dt.position;
      var _latitude = position.getLat();
      var _longitude = position.getLng();
      $scope.mapObj.setCenter([_longitude, _latitude]);
      console.log(_latitude, _longitude);
    }

    //定位出现错误调用
    function onError(error) {
      console.log(error);
      console.log('定位出现错误!');
    }

    //获取定位信息
    $scope.getLocation = function () {
      var deferred = $q.defer();

      if (!navigator.geolocation) {
        console.log("不支持");
        return;
      }
      console.log("start");
      navigator.geolocation.getCurrentPosition(function (position) {
        var _locationGaps = [];
        console.log("ok");
        var _latitude = position.coords.latitude;
        var _longitude = position.coords.longitude;
        $scope.mapObj.setCenter([_longitude, _latitude]);
        console.log(_latitude, _longitude);

      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
        // 如果获取经纬度时出错, 提示错误
        //toaster.pop('error','无法获取您的地理位置','请检查您是否禁止本应用获取您的当前位置');
        console.log('无法获取您的地理位置', '请检查您是否禁止本应用获取您的当前位置');
        deferred.reject(error);
      });
      return deferred.promise;
    };


  }]);

});
