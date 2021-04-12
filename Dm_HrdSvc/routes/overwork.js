var express = require('express');
var router = express.Router();
var qs = require('qs');
var overWorkControl = require('../control/overwork');

/**
 * 加班基本数据
 */
router.get('/base', function (req, res, next) {
    let xToken = req.headers['x-token']
    overWorkControl.BaseData(xToken).then((rs) => {
        res.send({ code: 20000, data: rs })
    }).catch((err) => {
        res.send({ code: 50014, data: err })
    })

});


router.post('/infodb',(req,res,next)=>{
    let xToken = req.headers['x-token']
    let  tmpBody= qs.parse(req.body)
    tmpBody.createUser = req.user.param.userid
    overWorkControl.SaveDB(tmpBody).then((rs)=>{
        res.send({code:20000,data:rs})
    }).catch((err)=>{
        res.send({ code: 50014, data: err })
    })
    
})


module.exports = router;
