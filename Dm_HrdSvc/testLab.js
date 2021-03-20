var fs = require('fs');
var request = require('request');
const { labelaryApiRequest } = require('labelary/lib/labelary');

var tmpLab = fs.readFileSync('SNlab.lab').toString()
console.log(tmpLab)
var zpl =tmpLab ;



// const ImageToZPL = require('./index');
// ImageToZPL('./libs/home.png').then(zpl => {
//     console.log(zpl);
// });

//  ZPL -> IMG
// var options = {
//     encoding: null,
//     formData: { file: zpl },
//     // omit this line to get PNG images back
//     // headers: { 'Accept': '*/*' },
//     // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
//     url: 'http://api.labelary.com/v1/printers/12dpmm/labels/2.755907x1.9685050000000002/0/'
// };

// request.post(options, function(err, resp, body) {
//     if (err) {
//         return console.log(err);
//     }
//     var filename = 'label.png'; // change file name for PNG images
//     fs.writeFile(filename, body, function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// });