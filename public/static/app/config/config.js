var appUnlogin = angular.module('qmgj_unlogin', ['ui.router']);
appUnlogin.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/static/app/view/login.html',
            controller: 'loginController'
        })
        .state('reg', {
            url: '/reg',
            templateUrl: '/static/app/view/reg.html',
            controller: 'regController'
        })
        .state('home', {
            url: '/home',
            templateUrl: '/static/app/view/home.html',
            controller: 'homeController'
        })
        .state('list',{
            url: '/list',
            templateUrl: '/static/app/view/list.html',
            controller: 'listController'
        })

}]);
var appLogin = angular.module('qmgj_login', ['ui.router']);
appLogin.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/static/app/view/home.html',
            controller: 'homeController'
        })
        .state('list',{
            url: '/list',
            templateUrl: '/static/app/view/list.html',
            controller: 'listController'
        })
        .state('vip',{
            url:'/vip',
            templateUrl: '/static/app/view/vip.html',
            controller: 'vipController'
        })
        .state('vip.main',{//个人主页
            url: '/main',
            templateUrl: '/static/app/view/vip.main.html',
            controller: 'vipMainController'
        })
        .state('vip.info',{// 个人信息
            url: '/info',
            templateUrl: '/static/app/view/vip.info.html',
            controller: "vipInfoController"
        })
}]);
