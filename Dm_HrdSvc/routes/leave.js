var express = require('express');
var router = express.Router();

var leaveControl = require('../control/leave');//请假单

var leaveOffice = require('../control/res_leaveoffice'); //离职单

var Qs = require('qs');

/**
 * 请假单 API数据模块
 */

router.get('/base', function (req, res, next) {
    let xToken = req.headers['x-token']
    leaveControl.BaseData(xToken).then((rs) => {
        res.send({ code: 20000, data: rs })
    }).catch((err) => {
        res.send({ code: 50014, data: err })
    })

});

/**
 * 提交数据
 */
router.post('/apply', (req, res, next) => {
    let infoData = Qs.parse(req.body)
    infoData.createUser = req.user.param.userid   
    leaveControl.ApplyFor(infoData).then((reback) => {
        res.send({ code: 20000, data: reback })
    })
})


router.post('/infobase',(req,res,next)=>{
    let infoData = Qs.parse(req.body)
    infoData.createUser = req.user.param.userid 
    leaveOffice.infoBaseData(infoData).then((rs)=>{
        res.send({code:20000,data:rs})
    })
})

/**
 * 获取年休/余休
 */
router.get('/annual',(req,res,next)=>{
    leaveControl.AnnualLeaveBaseData().then((rs)=>{
        res.send({code:20000,data:rs})
    })
})

router.post('/infoannual',(req,res,next)=>{
    let infoData = Qs.parse(req.body)
    infoData.createUser = req.user.param.userid 
    leaveControl.InfoAnnualLeave(infoData).then((rs)=>{
      res.send({code:20000,data:rs})
    })
})


module.exports = router;
