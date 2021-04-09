var express = require('express');
var router = express.Router();
var SignForm = require('../control/signform')
var qs =require('qs');
/* GET users listing. */
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

// router.get('/:userid', function (req, res, next) {
//   console.log(req.params)
//   res.send({ code: 20000 });
// });

module.exports = router;
