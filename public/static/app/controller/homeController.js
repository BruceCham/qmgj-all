function homeControllerFn($scope, $interval) {
    $scope.slideImg = [{
        proImg: 'static/app/images/slide1.jpg',
        proId: '1'
    }, {
        proImg: 'static/app/images/slide2.jpg',
        proId: '2'
    }];
    $scope.showIndex = 0;
    var inter = $interval(function() {
        if ($scope.showIndex >= $scope.slideImg.length - 1) {
            $scope.showIndex = 0;
            return;
        }
        $scope.showIndex++;
    }, 3500);

    $scope.showCurrentFn = function(i) {
            $scope.showIndex = i;
            // 销毁定时器
            $interval.cancel(inter);
            // 重新定义定时器
            inter = $interval(function() {
                if ($scope.showIndex >= $scope.slideImg.length - 1) {
                    $scope.showIndex = 0;
                    return;
                }
                $scope.showIndex++;
            }, 3500);
        }
        /*
        ['微电影','话剧','电影']
         */
    var hotPro = [{
        imgSrc: 'static/app/images/hot1.jpg',
        proName: '《晚秋》再现江湖',
        proCon: '蓝宝公司劳斯莱斯',
        proInfo: '超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司',
        proType: 1,
        proProcess: '46%',
        proMoney: '1234',
        proPeople: '123',
        proDays: '12'
    }, {
        imgSrc: 'static/app/images/hot1.jpg',
        proName: '《封神传奇》再现江湖',
        proCon: '中国星',
        proInfo: '超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司',
        proType: 2,
        proProcess: '12%',
        proMoney: '3789',
        proPeople: '323',
        proDays: '22'
    }, {
        imgSrc: 'static/app/images/hot1.jpg',
        proName: '《超脑特工》再现江湖',
        proCon: '东印度',
        proInfo: '超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司超模明星足球队授权电影制作公司',
        proType: 0,
        proProcess: '50%',
        proMoney: '1423',
        proPeople: '1223',
        proDays: '5'
    }];
    $scope.prosType = ['微电影', '话剧', '电影'];
    $scope.showPro = hotPro[1];
    $scope.showProIndex = $scope.showPro.proType;
    $scope.showProFn = function(i) {
        $scope.showProIndex = i;
        for (var j = 0; j < hotPro.length; j++) {
            if (hotPro[j].proType == i) {
                $scope.showPro = hotPro[j];
                break;
            }
        }
    }
}
appLogin.controller('homeController', ['$scope', '$interval', homeControllerFn]);
appUnlogin.controller('homeController', ['$scope', '$interval', homeControllerFn]);
