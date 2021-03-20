var express = require('express');
var router = express.Router();
var resuser = require('../control/resuser')
var ResDepartment = require('../control/resdepartment')


/**
 * 获取所有用户资料
 */
router.get('/all', function(req, res, next) {   
  resuser.GetAllUser().then((users)=>{
    res.send({code:20000,data: users})  
  }).catch(err=>{
    res.send({code:50012,data: err}) 
  }) 
});

/**
 * 获取部门信息
 */
router.get('/departmentjob',(req,res,next)=>{
  ResDepartment.GetDeptAndJob().then((departjob)=>{
    res.send({code:20000,data:departjob})
  }).catch(err=>{
    res.send({code:50012,data: err}) 
  })    
})



router.get('/:userid', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
