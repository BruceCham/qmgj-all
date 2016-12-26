function listControllerFn($scope, $http) {
    $scope.proTypes = [];
    $scope.proState = [];
    $scope.proTime = [];
    // 需要展示的项目数据
    $scope.proDatas = [];
    $scope.choiceType = 0; // 项目类型 微电影、电影……
    $scope.choiceState = 0; // 项目状态 筹资中……
    $scope.choiceTime = 0; // 项目进展 最新 结束 热门
    $scope.curPage = 1; // 当前是第几页的数据
    $scope.countPage = 6; // 每页面显示多少条数据 

    httpForData();
    $scope.filterData = function(e, i) {
        // filterData($event)
        // 转化为 jqlite 对象，jqlite与jquery极为相似 
        var $el = angular.element(e.target);
        var type = $el.attr('data');
        if (i == 0) {
            $scope.choiceType = type;
        } else if (i == 1) {
            $scope.choiceState = type;
        } else if (i == 2) {
            $scope.choiceTime = type;
        }
        httpForData();
    }
    function httpForData() {
        $http({
            url: 'static/app/json/listData.json',
            params: {
                choiceType: $scope.choiceType,
                choiceState: $scope.choiceState,
                choiceTime: $scope.choiceTime,
                curPage: $scope.curPage,
                countPage: $scope.countPage
            }
        }).success(function(res) {
            $scope.proTypes = res.result.proTypes;
            $scope.proState = res.result.proState;
            $scope.proTime = res.result.proTime;
            $scope.choiceType = res.result.choiceType;
            $scope.choiceState = res.result.choiceState;
            $scope.choiceTime = res.result.choiceTime;
            $scope.proDatas = res.result.data;
            $scope.curPage = 1;
            $scope.countPage = 6;
        })
    }
}
appLogin.controller('listController', ['$scope', '$http', listControllerFn]);
appUnlogin.controller('listController', ['$scope', '$http', listControllerFn]);
