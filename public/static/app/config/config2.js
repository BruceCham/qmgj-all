var app2 = angular.module('qmgj_login',['ui.router','ui.bootstrap']);
app2.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/vip/main');
    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'static/app/view/homeView.html',
        // 控制器的名字 不是js文件名
        controller: 'homeController'
    }).state('vip',{
    	url: '/vip',
    	templateUrl: 'static/app/view/vipView.html',
    	controller: 'vipController'
    }).state('vip.main',{ // 个人主页
    	url: '/main',
    	templateUrl: 'static/app/view/vip.mainView.html',
    	controller: 'vipMainController'
    }).state('vip.info',{ // 个人信息
    	url: '/info',
    	templateUrl: 'static/app/view/vip.infoView.html',
    	controller: 'vipInfoController'
    }).state('vip.record',{
    	url: '/record',
    	templateUrl: 'static/app/view/vip.recordView.html',
    	controller: 'vipRecordController'
    }).state('list',{// 列表页面
    	url: '/list',
    	templateUrl: 'static/app/view/listView.html',
    	controller: 'listController'
    }).state('list2',{// 搜索框进入列表页面
    	url: '/list/:keyword',
    	templateUrl: 'static/app/view/listView.html',
    	controller: 'listController'
    })
}]);
// 退出登录
app2.controller('logoutController', ['$scope','$http', function($scope,$http){
	$scope.userLogout = function(){
		$http({
			url: '/user/logout'
		}).then(function(res){
			if( res.data.resultCode == '0000' ){
				alert('退出成功');
				location.reload();
			}
		})
	}
}]);
// 字符串截取
app2.filter('substr',function(){
	return function(){
		// val, start, count
		var val = arguments[0],
			start = arguments[1],
			count = arguments[2];
		// {{ '12345'|substr:4 }}
		if( count == undefined ){
			count = arguments[1];
			start = 0;
		}
		// {{'12345'|substr}}
		if( start == undefined ){
			start = 0;
			count = val.length;
		}
		return val.substr(start,count);
	}
});
// 通过时间毫秒 获取上下午
app2.filter('getMoon',function(){
	return function(input){
		var curH = new Date(parseInt(input)).getHours();
		var moon = '';
		if( curH>=6 && curH<12 ){
			moon="上午";
		}else if(curH>=12 && curH<14){
			moon="中午";
		}else if(curH>=14 && curH<18){
			moon="下午";
		}else if(curH>=18 && curH<24){
			moon="晚上";
		}else{
			moon="凌晨"
		}
		return moon;
	}
});
