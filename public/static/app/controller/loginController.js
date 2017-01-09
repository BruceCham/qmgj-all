app.controller('loginController', ['$scope','$http','$state','$stateParams', function($scope,$http,$state,$stateParams){
	$scope.loginClick = function(){
		if( $scope.myform.$valid ){
			$http({
				url: '/user/login',
				method: 'post',
				data: {
					phone: $scope.phone,
					password: $scope.pwd
				}
			}).then(function(res){
				if(res.data.resultCode == '0000'){
					alert('登录成功');
					location.reload();
				}else{
					alert( res.data.resultMsg );
				}
			})
		}
	}
}])