var express = require('express');
var router = express.Router();
var ReqBusiness = require('../control/business');
var Qs = require('qs');

/**
 * 获取出差基本数据
 */
router.get('/', function (req, res, next) {
  ReqBusiness.BaseData().then((rs)=>{
    res.send({code:20000,data:rs});
  })  
});


router.post('/infobusiness', (req, res, next)=> {
  let infoData = Qs.parse(req.body)
  infoData.createUser = req.user.param.userid
  ReqBusiness.infoBusinessData(infoData).then((rs)=>{
    res.send({code:20000,data:rs});
  })  
});

// router.get('/:userid', function (req, res, next) {
//   console.log(req.params)
//   res.send({ code: 20000 });
// });

module.exports = router;
