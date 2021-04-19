var express = require('express');
var router = express.Router();
var ZkData = require('../control/resattendance');
var ResWorkRecords = require('../control/resworkrecords');

var Qs = require('qs');
/**
 * 考勤数据API
 */

router.get('/download', function (req, res, next) {
    ZkData.download().then((reback) => {
        console.log(reback)
    })
    res.send({ code: 20000 })
});

/**
 * 获取考勤数据
 */
router.get('/workrecors', (req, res, next) => {
    ResWorkRecords.GetDataByParms(req.query).then((records) => {
        res.send({ code: 20000, data: records })
    })
})

/**
 * 签卡生成
 */
router.post('/infoqk',(req,res,next)=>{
    let tmps = Qs.parse(req.body)
    tmps.createUser = req.user.param.userid
    ResWorkRecords.InfoRegistrationCard(tmps).then((rs)=>{
        res.send({code:20000,data:rs})
    })    
})


router.post('/upgradeqk',(req,res,next)=>{
    let tmps = Qs.parse(req.body)
    tmps.createUser = req.user.param.userid
    ResWorkRecords.UpdateRegistrationCard(tmps).then((rs)=>{
        res.send({code:20000,data:rs})
    })    
})

/**
 * 签卡单数据
 */
router.get('/baseqk',(req,res,next)=>{
    ResWorkRecords.getRegistrationCard().then((rs)=>{
        res.send({code:20000,data:rs})
    })
})

/**
 * 月考勤
 */
router.get('/vgatecard',(req,res,next)=>{
    ResWorkRecords.getVGateCard(req.query).then((rs)=>{
        res.send({code:20000,data:rs})
    })
})

/**
 * 月绩效
 */
router.get('/employeeeval',(req,res,next)=>{
    ResWorkRecords.getEmployeeEval(req.query).then((rs)=>{
        res.send({code:20000,data:rs})
    })
})


module.exports = router;
