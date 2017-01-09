app.controller('listController', ['$scope', '$http', '$stateParams', myListController]);
app2.controller('listController', ['$scope', '$http', '$stateParams', myListController]);

function myListController($scope, $http, $stateParams) {
    var arr = ['全部', '微电影', '电视剧', '话剧', '电影', '戏曲', '书画', '相声', '戏剧', '音乐剧', '其它'];
    $scope.arr = arr;
    var prolist = {
        init: function() {
            var that = this;
            $scope.cid = 0;
            $scope.status = 0;
            $scope.timeStatus = 0;
            $scope.countAll = 0; // pagations 翻页插件
            $scope.keyword = '';
            $scope.count = 9; // 每页多少条数据
            $scope.page = 1; // 默认第一页
            if( $stateParams.keyword != undefined ){
            	$scope.keyword = $stateParams.keyword;
            }
            that.events();
            that.getListData();
        },
        events: function() {
            var that = this;
            $scope.pageChanged = function() {
                that.getListData();
            }
            $scope.changeType = function(index) {
                $scope.cid = index;
                $scope.page = 1;
                that.getListData();
            }
            $scope.changeStatus = function( index ){
            	$scope.status = index;
            	$scope.page = 1;
            	that.getListData();
            }
            $scope.checkTimeStatus = function( index ){
            	$scope.timeStatus = index;
            	$scope.page = 1;
            	that.getListData();
            }
        },
        getListData: function() {
            $http({
                url: '/prolist',
                method: 'get',
                params: {
                    keyword: $scope.keyword,
                    cid: $scope.cid,
                    status: $scope.status,
                    timeStatus: $scope.timeStatus,
                    page: $scope.page,
                    count: $scope.count
                }
            }).then(function(res) {
                if (res.data.resultCode == '0000') {
                    var result = res.data.result;
                    $scope.countAll = result.countAll;
                    $scope.count = result.count;
                    $scope.listData = result.list;
                } else {
                    alert(res.data.resultMsg);
                }
            })
        }
    }
    prolist.init();
}
