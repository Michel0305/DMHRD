var express = require('express');
var router = express.Router();
var SwitchWork = require('../control/switchwork');
var Qs = require('qs');

/**
 * 获取基本数据
 */
router.get('/', function (req, res, next) {
    SwitchWork.BaseData().then((rs)=>{
        res.send({code:20000,data:rs});
    })      
});


router.post('/infoworkdate', (req, res, next)=>{
    let infoData = Qs.parse(req.body)
    infoData.createUser = req.user.param.userid
    SwitchWork.infoSwitchData(infoData).then((rs)=>{
        res.send({ code: 20000,data:rs });
    })  
});

module.exports = router;
