module.exports = function(app) {
    // 浏览器拦截请求地址  重定向
    app.get('/User', function(req, res) {
        var use = req.session.user;
        // use = {
        //     name: 'zhangsan',
        //     phone: '17711111111'
        // }
        if (use) {
            // home.jade
            res.render('home', {
                username: use.name
            });
        } else {
            res.render('login', {});
        }
    });
    app.get('/account/getHotImages', function(req, res) {
        if (req.query.phone == '18888888888') {
            res.send({
                resultCode: '0000',
                result: [{
                    username: 'zhangsan',
                    age: '18',
                    job: 'student'
                }, {
                    username: 'lisi',
                    age: '18',
                    job: 'student'
                }, {
                    username: 'wangwu',
                    age: '18',
                    job: 'student'
                }, {
                    username: 'zhaoliu',
                    age: '18',
                    job: 'student'
                }]
            });
        } else {
            res.send({
                resultCode: '0001',
                resultMsg: '账号信息不正确'
            })
        }
    });

    app.get('/getSlideInfo', function(req, res) {
        var id = req.query.id;
        if (id == '1602') {
            res.send({
                resultCode: '0000',
                result: [{
                    imgUrl: 'http://192.168.1.61:3000/static/img/1.png',
                    id: 1
                }, {
                    imgUrl: 'http://192.168.1.61:3000/static/img/2.jpg',
                    id: 2
                }, {
                    imgUrl: 'http://192.168.1.61:3000/static/img/3.jpg',
                    id: 3
                }],
                resultMsg: '返回成功'
            });
        }else{
            res.send({
                resultCode: '0001',
                resultMsg: '验证信息有误',
                result: []
            });
        }
    });

    app.get('/regAngular',function(req, res){
        var username = req.query.username || '';
        var phone = req.query.phone;
        if( !/^(1[35678]\d{9})$/g.test( phone ) ){
            return res.send({
                resultCode: '0002',
                result: [],
                resultMsg: '请输入合法的手机号'
            });
        }
        if( username.length > 5 || username.length < 2 ){
            return res.send({
                resultCode: '0003',
                result: [],
                resultMsg: '请输入合法的用户名'
            });
        }
        return res.send({
            resultCode: '0000',
            result: [],
            resultMsg: '注册成功'
        })

    })
};
