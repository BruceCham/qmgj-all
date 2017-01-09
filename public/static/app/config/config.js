var app = angular.module('qmgj_unlogin',['ui.router','ui.bootstrap']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'static/app/view/homeView.html',
        // 控制器的名字 不是js文件名
        controller: 'homeController'
    }).state('reg',{//注册
    	url: '/reg',
    	templateUrl: 'static/app/view/regView.html',
    	controller: 'regController'
    }).state('login',{
    	url: '/login',
    	templateUrl: 'static/app/view/loginView.html',
    	controller: 'loginController'
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
// 字符串截取
app.filter('substr',function(){
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
app.filter('getMoon',function(){
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
