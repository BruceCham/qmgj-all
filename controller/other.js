module.exports = function(app) {
    // 爱心公益接口
    app.get('/GongYiInfo', function(req, res) {
        var id = req.query.id;
        if (id == '1602') {
            return res.send({
                resultCode: '0000',
                resultMsg: '返回成功',
                data: {
                    count: '30856',
                    slide: [{
                        id: 1,
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/slide1.jpg'
                    }, {
                        id: 2,
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/slide2.jpg'
                    }, {
                        id: 2,
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/slide3.jpg'
                    }],
                    hot: [{
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/detail1.jpg',
                        title: '爱，回家！让留守儿童家庭春节团聚',
                        class: '中国青少年发展基金会',
                        money: '21002',
                        count: '2106'
                    }, {
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/detail2.jpg',
                        title: '一个绿色的承诺',
                        class: '中国青少年发展基金会',
                        money: '11415',
                        count: '974'
                    }, {
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/detail3.jpg',
                        title: '放飞梦想，创业人生',
                        class: '中国创业公众基金会',
                        money: '235195',
                        count: '2149'
                    }, {
                        imgUrl: 'http://192.168.1.123:3000/images/gongyi/detail4.jpg',
                        title: '保护动物，生态地球',
                        class: '世界动物保护基金协会',
                        money: '93471',
                        count: '1084'
                    }]
                }
            });
        } else {
            return res.send({
                resultCode: '0001',
                resultMsg: '验证信息不正确',
                data: []
            })
        }
    });

    // 获取考试题
    app.post('/CheckData', function(req, res) {
        var id = req.body.id;
        if (id == '1602') {
            return res.send({
                resultCode: '0000',
                resultMsg: '返回成功',
                result: {
                    "title": "期中考试(多选题)",
                    "questions": [
                        {
                            "title": "1+1等于多少？",
                            "answers": {
                                "A": "3",
                                "B": "3.5",
                                "C": "1",
                                "D": "78",
                                "E": "2"
                            }
                        },
                        {
                            "title": "以下哪些同学追随过唐僧？",
                            "answers": {
                                "A": "孙悟空",
                                "B": "佛祖",
                                "C": "龙马",
                                "D": "金角大王",
                                "E": "银角大王"
                            }
                        },
                        {
                            "title": "下面哪个是银谷课程？",
                            "answers": {
                                "A": "html3",
                                "B": "html4",
                                "C": "html5",
                                "D": "html6",
                                "E": "html7"
                            }
                        },
                        {
                            "title": "孙悟空会多少般变化？",
                            "answers": {
                                "A": "70",
                                "B": "71",
                                "C": "72",
                                "D": "73",
                                "E": "74"
                            }
                        },
                        {
                            "title": "以下哪些同学姓孙？",
                            "answers": {
                                "A": "孙悟空",
                                "B": "佛祖",
                                "C": "龙马",
                                "D": "孙中山",
                                "E": "银角大王"
                            }
                        }
                    ]
                }
            })
        }else{
            return res.send({
                resultCode: '0001',
                resultMsg: '验证信息不正确',
                result: []
            })
        }
    });

    // 考试题答案
    app.post('/SubmitCheckData',function(req, res){
        var answers = req.body.answers || '[]';
        answers = JSON.parse(answers);
        var answers2 = ['E','AC','C','C','AD'];
        var count = 100;
        var nums = [];
        for(var i=0;i<answers2.length;i++){
            if( answers[i] == undefined || answers[i] != answers2[i] ){
                count -= 20;
                nums.push(i+1);
            }
        }
        var Msg = '';
        switch(count){
            case 100 : Msg = '得分：' + count + '，评分：A+';break;
            case 80 : Msg = '得分：' + count + '，评分：B，错题：'+ nums.toString()  ;break;
            case 60 : Msg = '得分：' + count + '，评分：B-，错题：'+ nums.toString()  ;break;
            case 40 : Msg = '得分：' + count + '，评分：C，错题：'+ nums.toString()  ;break;
            case 20 : Msg = '得分：' + count + '，评分：C-，错题：'+ nums.toString()  ;break;
            case 0 : Msg = '得分：' + count + '，评分：D';break;
        }
        return res.send({
            resultCode: '0000',
            resultMsg: Msg,
            result: []
        })
    })
};
