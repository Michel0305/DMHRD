var express = require('express');
var router = express.Router();
var resuser = require('../control/resuser');
var ResDepartment = require('../control/resdepartment');
var WorkTimes = require('../control/worktimes');
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
    res.send({ code: 20000, data: err })
  })
});

/**
 * 更新保存人事资料
 */
router.post('/infouser',(req,res,next)=>{
  let tmpUserData = qs.parse(req.body)
  resuser.UserDataSave(tmpUserData).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({ code: 20000, data: err })
  })
  
})

/**
 * 保存更新部门资讯
 */
router.post('/infodepart',(req,res,next)=>{
  let tmpDepartment = qs.parse(req.body)
  ResDepartment.InfoDepartmentData(tmpDepartment).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({code:20000,data:err}) 
  })  
})

/**
 * 删除部门资料
 */
router.post('/deptremove',(req,res,next)=>{
  let tmpDepartId = qs.parse(req.body)
  ResDepartment.DepartRemove(tmpDepartId).then((reback)=>{
    res.send({code:20000,data:reback})
  }).catch((err)=>{
    res.send({code:20000,data:err})
  })
})

/**
 * 添加职位
 */
router.post('/infojob',(req,res,next)=>{
  let tmpJob = qs.parse(req.body)
  ResDepartment.InfoJob(tmpJob).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({code:20000,data:err})
  })  
})

/***
 * 新增修改班次
 */
router.post('/infotimes',(req,res,next)=>{
  let tmpTimes = qs.parse(req.body);
  WorkTimes.InfoTimes(tmpTimes).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({code:20000,data:err})
  })
  
})

/**\
 * 删除班次
 */
router.post('/deltimes',(req,res,next)=>{
  let tmpIds = qs.parse(req.body)
  WorkTimes.RemoveTimes(tmpIds).then((rs)=>{
    res.send({code:20000,data:rs})
  }).catch((err)=>{
    res.send({code:20000,data:err})
  })
})


module.exports = router;
