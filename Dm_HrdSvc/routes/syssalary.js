var express = require('express');
var router = express.Router();
var controlSalary = require('../control/syssalary')

router.get('/', (req, res, next)=> {
  controlSalary.BaseData(req.query).then((rs)=>{
    res.send({code:20000,data:rs})
  }) 
});

module.exports = router;
