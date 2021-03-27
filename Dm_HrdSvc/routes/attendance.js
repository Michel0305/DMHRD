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
    // console.log(req.params)
    // console.log(req.body)
    ResWorkRecords.getDataByParms(req.query)
    // console.log(req.query.datewhere ? 0 : req.query.datewhere)
    // console.log(req.query.dept ? req.query.dept : 1)
    res.send({ code: 20000 })
})

// router.get('/:userid', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
