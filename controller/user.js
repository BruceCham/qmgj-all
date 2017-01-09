var crypto = require('crypto'),
    UserEntity = require('../models/User').UserEntity;
var Procare = require('../json/procare.json');
module.exports = function(app) {
    /**
     * post方式 注册
     */
    app.post('/user/reg', checkNotLogin);
    app.post('/user/reg', function(req, res) {
        var name = req.body.name,
            phone = req.body.phone,
            password = req.body.password,
            password_re = req.body['passwordRepeat'];
        var regex = /^(1[^012][0-9]{9})$/i;
        if (!regex.test(phone)) {
            res.send({
                'resultCode': '000004',
                'result': {},
                'resultMsg': '请输入正确的手机号码'
            });
            return;
        }
        if (password_re != password) {
            res.send({
                'resultCode': '000003',
                'result': {},
                'resultMsg': '两次输入的密码不一致'
            });
            return;
        }
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        UserEntity.findOne({ phone: phone }, '_id', function(err, user) {
            if (err) {
                return res.send({
                    resultCode: '000001',
                    resultMsg: '服务器异常',
                    result: null
                })
            }
            if (user) {
                return res.send({
                    resultCode: '000002',
                    resultMsg: '用户已存在',
                    result: null
                })
            }
            var registerUser = new UserEntity({
                name: name || phone,
                phone: phone,
                password: password
            });
            registerUser.save(function(err, row) {
                if (err) { //服务器保存异常  
                    return res.send({
                        resultCode: '000001',
                        resultMsg: '服务器异常',
                        result: null
                    })
                }
                res.send({
                    resultCode: '0000',
                    result: {},
                    resultMsg: '注册成功'
                });
            });
        });
    });

    /**
     * post方式 登录
     */
    app.post('/user/login', checkNotLogin);
    app.post('/user/login', function(req, res) {
        var md5 = crypto.createHash('md5'),
            phone = req.body.phone,
            password = md5.update(req.body.password).digest('hex');
        UserEntity.findOne({ phone: phone, password: password }, { password: 0 }, function(err, user) {
            if (err) {
                return res.send({
                    resultCode: '000001',
                    resultMsg: '服务器异常',
                    result: null
                })
            }
            if (!user) {
                return res.send({
                    resultCode: '000003',
                    resultMsg: '用户名或密码错误',
                    result: null
                })
            }
            req.session.user = user;
            res.send({
                "resultCode": "0000",
                "result": {
                    username: user.name
                },
                "resultMsg": "登陆成功"
            });
            UserEntity.update({_id:user._id},{$set: {lastLoginTime: new Date()}}).exec(); 
        });
    });

    /**
     * get方式 退出登录
     */
    app.get('/user/logout', checkLogin);
    app.get('/user/logout', function(req, res) {
        req.session.user = null;
        res.send({
            "resultCode": "0000",
            "result": {},
            "resultMsg": "退出成功"
        });
        return;
    });

    /**
     * post方式 个人信息
     */
    app.post('/user/info',checkLogin);
    app.post('/user/info',function(req,res){
        var user = req.session.user;
        res.send({
            resultCode: '0000',
            resultMsg: '返回成功',
            result : {
                "userImg": "static/app/images/userhead.png",  //用户头像
                "username": user.name,
                "serverTime": +new Date(),
                "createTime": user.createTime,
                "safe": parseInt( Math.random()*10 )%3+1,// 1低 2中 3高
                "lastTime": user.lastLoginTime
            }
        })
    });

    /**
     * 购买记录 post
     */
    app.post('/user/RecordList',checkLogin);
    app.post('/user/RecordList',function(req, res){
        var type = req.body.type || 0;
        var page = req.body.page || 1;
        var count = req.body.count || 5;
        var imgArr = [
            '/images/proj/20151214170904.jpg',
            '/images/proj/20151215094703.jpg',
            '/images/proj/20151214170904.jpg',
            '/images/proj/20151211104100.jpg'
        ];
        var nameArr = [
            '触电来袭：互动演出鬼吹灯',
            '《犹太人在郑州》',
            '史上最高颜值天团等你来加油',
            '《未来十年》电影众筹'
        ];
        var fnameArr = [
            '万娱引力',
            '上海传媒',
            '人人娱乐',
            '万万没想到'
        ];
        var list = [];
        for(var i=0;i<count;i++){
            list.push({
                "oid": "6",
                "rprice": parseInt( Math.random()*1000000 ),
                "status": type==0?parseInt(Math.random()*10)%2:(type-1),
                "id": parseInt( Math.random()*100 )%4,
                "fname": fnameArr[parseInt( Math.random()*100 )%4],
                "name": nameArr[parseInt( Math.random()*100 )%4],
                "img": imgArr[parseInt( Math.random()*100 )%4]
            })
        }
        return res.send({
            resultCode : '0000',
            resultMsg  : '返回成功',
            result: {
                count: 150,
                countpage: page,
                list: list
            }
        });
    });
    // 个人主页
    app.get('/user/pros',checkLogin);
    app.get('/user/pros',function(req,res){
        res.send({
            resultCode: '0000',
            resultMsg: '返回成功',
            result: Procare
        })
    })
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            //用户还未登陆
            res.send({
                "resultCode": "0000",
                "result": {
                    hasLogin: false
                },
                "resultMsg": "用户未登录"
            });
            return;
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        console.log(req.session);
        var user = req.session.user;
        if (user) {
            //已经登录过的用户
            res.send({
                "resultCode": "000010",
                "result": {
                    username: user.name
                },
                "resultMsg": "用户已登录"
            });
            return;
        }
        next();
    }
};
