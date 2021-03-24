var express = require('express');
var router = express.Router();

var leaveControl = require('../control/leave');

/* GET home page. */
router.get('/base', function (req, res, next) {
    let xToken = req.headers['x-token']
    console.log(xToken)
    leaveControl.BaseData(xToken).then((rs) => {
        res.send({ code: 20000, data: rs })
    }).catch((err) => {
        res.send({ code: 50014, data: err })
    })

});

module.exports = router;
