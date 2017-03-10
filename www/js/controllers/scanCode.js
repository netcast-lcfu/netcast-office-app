define(['app', 'js/utils/citySelect'], function (app, CitySelect) {
  app.controller('scanCodeCtrl', ['$scope', '$ionicActionSheet', '$cordovaBarcodeScanner', function ($scope, $ionicActionSheet, $ionicPopup, $cordovaBarcodeScanner) {
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
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        },
        function (error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: true, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          prompt: "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS
        }
      );

      // $cordovaBarcodeScanner.scan().then(function (imageData) {
      //   var myPopup = $ionicPopup.alert({
      //     title: '<strong>二维码内容</strong>',
      //     template: "We got a barcode\n" +
      //     "Result: " + imageData.text + "\n" +
      //     "Format: " + imageData.format + "\n" +
      //     "Cancelled: " + imageData.cancelled
      //   });
      //
      //   console.log("Result -> " + imageData.text);
      //   console.log("Barcode Format -> " + imageData.format);
      //   console.log("Cancelled -> " + imageData.cancelled);
      // }, function (error) {
      //   console.log("An error happened -> " + error);
      //   // 一个提示对话框
      //   var alertPopup = $ionicPopup.alert({
      //     title: '<strong>提示</strong>',
      //     template: '出现异常...请联系相关开发工程师!'
      //   });
      //   alertPopup.then(function (res) {
      //     console.log('An error happened -> " + error');
      //   });
      // });
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
