var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/:userid', function (req, res, next) {
  console.log(req.params)
  res.send({ code: 20000 });
});

module.exports = router;
