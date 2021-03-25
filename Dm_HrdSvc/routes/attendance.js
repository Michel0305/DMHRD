var express = require('express');
var router = express.Router();
var ZkData = require('../control/resattendance')

/* GET users listing. */
router.get('/download', function (req, res, next) {
    ZkData.download().then((reback) => {
        console.log(reback)
    })
    res.send({ code: 20000 })
});


// router.get('/:userid', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
