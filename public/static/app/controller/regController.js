app.controller('regController', ['$scope','$http','$state', function($scope,$http,$state){
	$scope.regClick = function(){
		if( $scope.myform.$valid && $scope.pwd == $scope.pwd2 ){
			$http({
				url: '/user/reg',
				method: 'post',
				data: {
					name: $scope.username,
					phone: $scope.phone,
					password: $scope.pwd,
					passwordRepeat: $scope.pwd2
				}
			}).then(function(res){
				if( res.data.resultCode == '0000' ){
					alert('注册成功，请登录');
					$state.go( 'login' );
				}else{
					alert( res.data.resultMsg );
				}
			})
		}
	}
}])