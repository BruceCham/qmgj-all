app.controller('userController',['$scope','$http',function($scope,$http){
	$scope.userLogout = function(){
		$http({
			url: '/user/logout'
		}).success(function (res){
			if( res.resultCode == '0000' ){
				location.reload();
			}
		});
	}
}]);