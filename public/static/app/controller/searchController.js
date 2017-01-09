app.controller('searchController', ['$scope','$state', mySearchController]);
app2.controller('searchController', ['$scope','$state', mySearchController]);
function mySearchController($scope,$state){
	$scope.myKeyUp = function(e){
		if( e.keyCode == 13 ){
			var inputVal = angular.element( e.target ).val();
			$state.go('list2',{keyword: inputVal})
		}
	}
}