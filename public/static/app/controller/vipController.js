appLogin.controller('vipController',['$scope',"$http",function($scope,$http){
	$http({
		url: 'static/app/json/userinfo.json'
	}).success(function(res){
		if(res.resultCode == '0000'){
			$scope.userinfo = res.result;
			var serverHour = new Date(parseInt(res.result.serverTime)).getHours();
			if( 7 < serverHour &&  serverHour < 12 ){
				$scope.userinfo.timeMoon = "上午"
			}else if( 12 <= serverHour && serverHour < 14 ){
				$scope.userinfo.timeMoon = "中午"
			}else if( 14 <= serverHour &&  serverHour< 18 ){
				$scope.userinfo.timeMoon = "下午"
			}else{
				$scope.userinfo.timeMoon = "晚上"
			}
		}
	});
}]);