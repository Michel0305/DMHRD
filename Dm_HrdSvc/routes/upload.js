var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var Uploads = require('../control/upload')
var fs = require('fs');
var path = require('path')

/* GET users listing. */

router.post('/def', (req, res, next)=> {
    res.send({code:20000});
});

router.post('/userpic', (req, res, next)=> {
    let from_data = new multiparty.Form()
    from_data.parse(req,(err, fields, files)=>{
        let tmpFiles = fs.readFileSync(files.file[0].path)
        Uploads.UsersImg({fileds:fields,datas:tmpFiles,extname: path.extname(files.file[0].path)}).then((ts)=>{             
            res.send({code:20000,data:ts});  
        });
    })  
});


// router.post('/:userid', function (req, res, next) {
//   console.log(req.params)
//   res.send({ code: 20000 });
// });

module.exports = router;