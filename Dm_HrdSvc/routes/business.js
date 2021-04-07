var express = require('express');
var router = express.Router();
var ReqBusiness = require('../control/business');

/**
 * 获取出差基本数据
 */
router.get('/', function (req, res, next) {
  ReqBusiness.BaseData().then((rs)=>{
    res.send({code:20000,data:rs});
  })  
});


router.get('/:userid', function (req, res, next) {
  console.log(req.params)
  res.send({ code: 20000 });
});

module.exports = router;
