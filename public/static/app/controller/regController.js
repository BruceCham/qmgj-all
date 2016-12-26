appUnlogin.controller('regController',["$scope","$http","$state",function($scope,$http,$state){
	$scope.userReg = function(flag){
		if( flag ){
			$http({
				url:'/user/reg',
				method: 'post',
				data: {
					name: $scope.username,
					phone: $scope.phone,
					password: $scope.pwd,
					passwordRepeat: $scope.pwd2
				}
			}).success(function(res){
				if(res.resultCode == '0000'){
					alert('注册成功，请登录');
					$state.go('login');
				}else{
					alert( res.resultMsg );
				}
			});
		}
	}
}])