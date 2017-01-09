app2.controller('vipMainController', ['$scope','$http', function($scope,$http){
	$http({
		url: '/user/pros'
	}).then(function(res){
		$scope.procare = res.data.result.procare;
		$scope.prohot = res.data.result.prohot;
	})
}])