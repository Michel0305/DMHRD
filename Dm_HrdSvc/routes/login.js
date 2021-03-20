/**
 * 用户登录路由
 */
var express = require('express');
var router = express.Router();
var userlogin = require('../control/userlogin');

/**
 * 用户登录
 */
router.post('/login', function (req, res, next) {
  let infoUser = {} = req.body;
  infoUser.token = req.headers['x-token'] ? req.headers['x-token'] : undefined;
  userlogin.Verify(infoUser).then(infoStat => {
    res.send({ 'code': 20000, 'token': infoStat.token });
  })

});

/**
 * 登录用户信息
 */
router.get('/info', function (req, res, next) {
  let xToken = req.headers['x-token']
  let reback ={} = userlogin.GetUserInfo(xToken);
  reback.avatar=`http://127.0.0.1:8888/public/images/${reback.userid}.jpeg`;
  reback.introduction = '当前用户超级用户'
  reback.roles = ['admin']
  res.send({ code: 20000, 'data': reback })  
});


/**
 * 获取基本资料资讯
 */
router.get('/basedata',(req,res,next)=>{
  userlogin.GetBeasBata().then((base)=>{
    res.send({ code: 20000, 'data': base }) 
  }).catch((err)=>{
    res.send({ code: 50012, 'data': err })
  })
})

/**
 * 用户登录
 */
router.post('/logout', function (req, res, next) {
  res.send({ code: 20000, 'data': 'loginOut Success' })
});

module.exports = router;