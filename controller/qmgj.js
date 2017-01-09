var IndexInfo = require('../json/indexInfo.json');
var ProInfo = require('../json/proInfo.json');
module.exports = function(app) {
    // ['','微电影','电视剧','话剧','电影','戏曲','书画','相声','戏剧','音乐剧']
    // 首页
    app.get('/IndexInfo', function(req, res) {
        res.send({
            resultCode: '0000',
            result: IndexInfo,
            resultMsg: '返回成功'
        });
    });

    // 列表页面
    app.get('/prolist',function(req, res){
        var status = parseInt( req.query.status ) || 0;
        var cid = parseInt(req.query.cid) || 0;
        var timeStatus = parseInt(req.query.timeStatus) || 0;
        var page = req.query.page || 1;
        var count = req.query.count || 5;
        var imgArr = [
            '/images/proj/20151214170904.jpg',
            '/images/proj/20151215094703.jpg',
            '/images/proj/20151214170904.jpg',
            '/images/proj/20151211104100.jpg'
        ];
        var nameArr = [
            '触电来袭：互动演出鬼吹灯',
            '《犹太人在郑州》',
            '《我不是潘金莲》',
            '《你不是西门庆》',
            '《老炮》规矩',
            '中国的奥斯卡',
            '史上最高颜值天团等你来加油',
            '《未来十年》电影众筹'
        ];
        var fnameArr = [
            '万娱引力',
            '上海传媒',
            '人人娱乐',
            '冯小刚',
            '中国星传媒',
            '嘉禾',
            '万万没想到'
        ];
        var desc = '韩联社报道称，在接下来的两天访华行程中，韩议员代表团将在中国国际文化研究所与专家座谈，并与中共中央对外联络部的有关人士会面。6日，代表团将与韩国驻华大使金章洙和中国全国人大外事委员会主任委员傅莹等高官会面，并与韩国媒体特派记者们座谈。这并非共同民主党议员第一次因“萨德”问题访华。去年8月，6名反对“萨德”部署的共同民主党国会议员曾顶着政府的压力执意访华。这一次，韩国政府再次施压。韩国外交部发言人赵俊赫3日在例行记者会上说，部署“萨德”是政府和朝野应形成共识和负起责任来处理的重大国家安全事务。有媒体评论说，赵俊赫这是在婉转指出反对“萨德”入韩的在野阵营政治人士访华无助于国家利益。韩国《朝鲜日报》称，中国拒绝与韩国政府对话调解，却与以实现政权交替为目标的在野党议员会面，这是中方有意要传播“萨德”部署问题可以翻盘的信息。4日，韩国国防部方面再次强调“萨德”将按计划部署。韩国共同民主党国会发言人3日反驳说，外交部强推无能政府的护身符“国家安保”，就等于是在破坏国家利益。批判国会议员的正当议政活动，只是为了掩盖自身的错误与无能。韩联社报道称，尽管韩国的看守内阁坚持部署“萨德”的立场，但民主党籍的总统热门人选纷纷要重新审视这一决定。除了文在寅曾提出交由下一届政府讨论，城南市长李在明、首尔市长朴元淳则明确反对部署。';
        var list = [];
        for(var i=0;i<count;i++){
            list.push({
                "cid": cid==0?(parseInt(Math.random()*100)%9+1) :cid,
                "rday": parseInt(Math.random()*1000)%100,
                "rprice": parseInt( Math.random()*1000000 ),
                "sp": parseInt(Math.random()*100),
                "desc": desc.substr( parseInt(Math.random()*100), parseInt(Math.random()*100) ),
                "id": parseInt( Math.random()*100 )%17,
                "fname": fnameArr[parseInt( Math.random()*100 )%4],
                "name": nameArr[parseInt( Math.random()*100 )%8],
                "img": imgArr[parseInt( Math.random()*100 )%4]
            })
        }
        return res.send({
            resultCode : '0000',
            resultMsg  : '返回成功',
            result: {
                count: count,
                page: page,
                countAll: 300 - status==0?0:90 - cid==0?0:77 - timeStatus==0?0:93 ,
                list: list
            }
        });
    })
};
