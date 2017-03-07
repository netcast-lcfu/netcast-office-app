define(['app', 'js/utils/citySelect'], function (app, CitySelect) {
  app.controller('scanCodeCtrl', ['$scope', '$ionicActionSheet', function ($scope, $ionicActionSheet, $ionicPopup) {
    $scope.changeImg = function () {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '从相册中选择'},
          {text: '拍照'}
        ],
        titleText: '确认修改图片',
        cancelText: '取消',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          //下标从0开始
          console.log('You click index is ' + index);
          return true;
        }
      });
    };

    //扫码
    $scope.scanCode = function () {
      //$cordovaBarcodeScanner.scan()
      cloudSky.zBar.scan().then({},function (imageData) {
        var myPopup = $ionicPopup.alert({
          title: '<strong>提示</strong>',
          template: '<h2>二维码信息</h2><p>Text:' + imageData.text + '</p><p>Barcode Format -> ' + imageData.format + '</p>' + '</p><p>Cancelled -> ' + imageData.cancelled + '</p>'
        });

        //alert(imageData.text);
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function (error) {
        console.log("An error happened -> " + error);
        // 一个提示对话框
        var alertPopup = $ionicPopup.alert({
          title: '<strong>提示</strong>',
          template: '出现异常...请联系相关开发工程师!'
        });
        alertPopup.then(function (res) {
          console.log('An error happened -> " + error');
        });
      });
    };

    //显示地址选择
    $scope.template = {
      area: ""
    };
    $scope.showCitySelect = function () {
      CitySelect.init({
        element: ".js-citySelestNode",
        value: ["广东省", "广州市", "天河区"],
        callback: function (data) {
          $scope.$apply(function () {
            $scope.template.area = data.join('，')
          })
        },
        initComplete: function (data) {
          if ($scope.template.area != '') {
            var data = $scope.template.area.split('，');
            CitySelect.set(data)
          } else {
            $scope.$apply(function () {
              $scope.template.area = data.join('，')
            })
          }

        },
        url: 'data/city.json'
      })

    };
  }]);

});
