var express = require('express');
var router = express.Router();
var SysHRDSetting = require('../control/sysconfig');
var Qs = require('qs');

/**
 * 获取节假日列表
 */
router.get('/', function (req, res, next) {
  SysHRDSetting.GetHolidys().then((rs)=>{
    res.send({code:20000,data:rs});
  });  
});


/***
 * 新增节假日
 */
router.post('/infoholidays',(req,res,next)=>{
  let infoData = Qs.parse(req.body)
  SysHRDSetting.InfoHolidays(infoData).then((rs)=>{
    res.send({code:20000,data:rs});
  })
})

/**
 * 删除
 */
router.post('/delholidays',(req,res,next)=>{
  let infoData = Qs.parse(req.body)
  SysHRDSetting.RemoveHolidays(infoData).then((rs)=>{
    res.send({code:20000,data:rs});
  })
})

module.exports = router;
