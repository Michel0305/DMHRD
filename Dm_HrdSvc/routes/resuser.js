var express = require('express');
var router = express.Router();
var resuser = require('../control/resuser')
var ResDepartment = require('../control/resdepartment')
var qs = require('qs');


/**
 * 获取所有用户资料
 */
router.get('/all', function (req, res, next) {
  resuser.GetAllUser().then((users) => {
    res.send({ code: 20000, data: users })
  }).catch(err => {
    res.send({ code: 50012, data: err })
  })
});

/**
 * 获取部门信息
 */
router.get('/departmentjob', (req, res, next) => {
  ResDepartment.GetDeptAndJob().then((departjob) => {
    res.send({ code: 20000, data: departjob })
  }).catch(err => {
    res.send({ code: 50012, data: err })
  })
})


/**
 * 获取指定用户数据
 */
router.get('/:userid', function (req, res, next) {
  resuser.GetUserByID(req.params.userid).then((rs) => {
    res.send({ code: 20000, data: rs[0].dataValues });
  }).catch((err) => {
    res.send({ code: 50012, data: err })
  })
});

router.post('/infouser',(req,res,next)=>{
  let tmpUserData = qs.parse(req.body)
  resuser.UserDataSave(tmpUserData).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({ code: 50012, data: err })
  })
  
})

module.exports = router;
