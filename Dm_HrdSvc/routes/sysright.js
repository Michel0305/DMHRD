var express = require('express');
var router = express.Router();
var Qs = require('qs');

var SysRight = require('../control/sysright');

/**
 * 获取权限模块基本数据
 */
router.get('/', (req, res, next) => {
    SysRight.RightBaseData().then((rs)=>{        
        res.send({ code: 20000,data:rs});
    }).catch((err)=>{
        res.send({ code: 20000,data:err});
    })
});


/**
 * 保存更新用户对角色
 */
router.post('/userrole',(req, res, next) => {
    let userRole = Qs.parse(req.body)
    SysRight.UserRoles(userRole).then((rs)=>{
        res.send({code:20000,data:rs})
    }).catch((err)=>{
        res.send({ code: 20000,data:err});
    })
})

/**
 * 绝对对模块权限
 */
router.post('/rolemodel',(req, res, next) => {
    let roleModel = Qs.parse(req.body)
    SysRight.RoleToModels(roleModel).then((rs)=>{
        res.send({code:20000,data:rs})
    }).catch((err)=>{
        res.send({ code: 20000,data:err});
    })
})


// router.get('/:userid', function (req, res, next) {
//   console.log(req.params)
//   res.send({ code: 20000 });
// });

module.exports = router;
