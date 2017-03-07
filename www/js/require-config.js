require.config({
  //基准URL – baseUrl
  baseUrl: './',
  paths: {
    'app': 'js/app',
    'appConfig': 'js/app-config',
    'routes': 'js/routes',
    'ionic': 'lib/ionic/js/ionic.bundle',
    'ngcordova': 'lib/ngCordova/dist/ng-cordova',
    'bootstrap': 'js/bootstrap',
    'zepto': 'lib/zepto/zepto.min',
    'asyncLoader': 'lib/async-loader/angular-async-loader'
  },
  //加载超时时间 默认7秒
  waitSeconds: 10,
  //楔子 – shim 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置。
  shim: {
    'app': {
      deps: ['ionic']
    },
    'routes': {
      deps: ['ionic', 'app']
    },
    'appConfig': {
      deps: ['app']
    },
    'ionic': {exports: 'ionic'},
  },
  priority: [
    'ionic',
    'ngcordova',
    'app',
    'routes',
    'appConfig'
  ],
  //模块依赖 – deps
  deps: [
    'bootstrap'
  ]
});
