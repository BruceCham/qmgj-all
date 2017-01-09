app2.controller('vipRecordController', ['$scope','$http' ,function($scope,$http) {
	var Record = {
		init: function(){
			$scope.type = 0;// 0全部 1未支付 2已支付
			$scope.maxSize = 5;// 显示多少个页签
			$scope.countAll = 0;// 默认0条数据
			$scope.page = 1;// 第1页
			$scope.count = 5;// 每页5条数据

			this.events();// 初始化事件
			this.getRecordData();// 初始化页面数据
		},
		events: function(){
			var that = this;
			$scope.pageChanged = function(){
				console.log( $scope.page );
				that.getRecordData();
			}
			$scope.changeType = function( index ){
				$scope.type = index;
				$scope.page = 1;
				$scope.count = 5;
				that.getRecordData();
			}
		},
		getRecordData: function(){
			$http({
				url: '/user/RecordList',
				method: 'post',
				data: {
					type: $scope.type,
					page: $scope.page,
					count: $scope.count
				}
			}).then(function(res){
				if( res.data.resultCode == '0000' ){
					var result = res.data.result;
					// 更新数据的总量
					$scope.countAll = res.data.result.count;
					$scope.recordData = result.list;
				}else{
					alert( res.data.resultMsg );
				}
			})
		}
	}
	Record.init();
}])
