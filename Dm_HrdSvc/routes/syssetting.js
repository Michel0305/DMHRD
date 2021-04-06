var express = require('express');
var router = express.Router();
var SysHRDSetting = require('../control/sysconfig')

/**
 * 获取节假日列表
 */
router.get('/', function (req, res, next) {
  SysHRDSetting.GetHolidys().then((rs)=>{
    res.send({code:20000,data:rs});
  });  
});


// router.get('/:userid', function (req, res, next) {
//   console.log(req.params)
//   res.send({ code: 20000 });
// });

module.exports = router;
