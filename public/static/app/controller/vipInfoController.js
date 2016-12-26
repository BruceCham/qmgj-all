appLogin.controller('vipInfoController',["$scope",function($scope){
	$scope.fileNameChanged = function(e){
		var $el = angular.element(e);
		var filesCount = $el[0].files.length;
		if(filesCount==0){

		}else{
			
		}
	}
}])