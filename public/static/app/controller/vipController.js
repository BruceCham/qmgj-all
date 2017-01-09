app2.controller('vipController', ['$scope','$http','$rootScope','$state', function($scope,$http,$rootScope,$state){
	$http({
		url: '/user/info',
		method: 'post'
	}).then(function( res ){
		$scope.userinfo = res.data.result;
	});
}]);