var express = require('express');
var router = express.Router();
var SignForm = require('../control/signform')
var qs =require('qs');



router.get('/', function (req, res, next) {  
  SignForm.BaseData(req.query).then((rs)=>{
    res.send({code:20000,data:rs});
  })  
});


router.post('/formapplove', function (req, res, next) { 
  SignForm.ApploveForm(req.body).then((rs)=>{
    res.send({code:20000,data:rs});
  })  
});


router.post('/oneapplove',(req,res,next)=>{
  let tmpQsData = qs.parse(req.body)  
  SignForm.OnlyApplove(tmpQsData).then((rs)=>{
    res.send({code:20000,data:rs})})
})

router.post('/listapplove',(req,res,next)=>{  
  let tmpQsData = qs.parse(req.body)
  SignForm.BatchApplove(tmpQsData).then((rs)=>{
    res.send({code:20000,data:rs})
  })
})

router.get('/userbox',(req,res,next)=>{
  console.log(req.query)
  SignForm.UserBoxData(req.query).then((rs)=>{
    res.send({code:20000,data:rs})
  })
})


module.exports = router;
