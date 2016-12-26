appUnlogin.controller('loginController',['$scope','$http',function($scope,$http){
	$scope.userLogin = function(){
		if( $scope.loginForm.$valid ){
			// post请求
			$http({
				url: '/user/login',
				method: 'post',
				data: {
					phone: $scope.phone,
					password: $scope.pwd
				}
			}).success(function(res){
				if( res.resultCode == '0000' ){
					location.reload()
				}
			});
		}
	}
}]);