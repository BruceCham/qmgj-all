app.controller('homeController', ['$scope', '$http', '$interval', myHomeController]);
app2.controller('homeController', ['$scope', '$http', '$interval', myHomeController]);
function myHomeController($scope, $http, $interval) {
    $scope.hotNav =  ['','微电影','电视剧','话剧','电影','戏曲','书画','相声','戏剧','音乐剧'];
    var HomePage = {
        init: function() {
            var that = this;
            $http({
                url: '/IndexInfo',
                method: 'get'
            }).then(function(res) {
                if (res.data.resultCode == '0000') {
                    // 轮播图数据
                    that.dealSlide( res.data.result.slides );
                    // 处理热门推荐
                    that.dealHot( res.data.result.hot );
                    // 卫视主推
                    that.dealTV( res.data.result.new );
                    // 合并单位
                    that.dealUnit( res.data.result.unit );
                } else {
                    alert(res.data.resultMsg)
                }
            })
        },
        dealSlide: function(slideData) {
            $scope.slideData = slideData;
            $scope.showIndex = 0;
            var inter = $interval(function() {
                $scope.showIndex++;
                if ($scope.showIndex == $scope.slideData.length) {
                    $scope.showIndex = 0;
                }
            }, 1500);
            $scope.pauseSlide = function(index) {
                $interval.cancel(inter);
                $scope.showIndex = index;
            }
            $scope.playSlide = function() {
                inter = $interval(function() {
                    $scope.showIndex++;
                    if ($scope.showIndex == $scope.slideData.length) {
                        $scope.showIndex = 0;
                    }
                }, 1500);
            }
        },
        dealHot: function( hotData ){
            $scope.hotData = hotData;
            $scope.hotItem = hotData[0];
            $scope.hotIndex = 0;
            $scope.showHotItem = function(index){
                $scope.hotIndex = index;
                $scope.hotItem = hotData[index];
            }
        },
        dealTV: function( tvData ){
            $scope.tvData = tvData;
        },
        dealUnit: function(unitData){
            $scope.unitData = unitData;
        }
    };

    HomePage.init();
}