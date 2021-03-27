var express = require('express');
var router = express.Router();
var ZkData = require('../control/resattendance');
var ResWorkRecords = require('../control/resworkrecords');
/**
 * 考勤数据API
 */

router.get('/download', function (req, res, next) {
    ZkData.download().then((reback) => {
        console.log(reback)
    })
    res.send({ code: 20000 })
});

/**
 * 获取考勤数据
 */
router.get('/workrecors', (req, res, next) => {
    ResWorkRecords.GetDataByParms(req.query).then((records) => {
        res.send({ code: 20000, data: records })
    }).catch((err) => {
        res.send({ code: 50014, data: err })
    })
})

// router.get('/:userid', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
