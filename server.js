var connect = require('connect');
var fs = require('fs');

// Read index.html
var indexFileContent = '' + fs.readFileSync('index.html');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('images')) // serve images
  .use(function(req, res){

    // Read list of images from images folder into array and sort it
    var imageDir = 'images';
    var fileNameArray = fs.readdirSync(imageDir);
    fileNameArray.sort();
  
    // Perform replacements
    indexFileContent = indexFileContent.replace(/%imageArray%/,JSON.stringify(fileNameArray));
    indexFileContent = indexFileContent.replace(/%imageDir%/,imageDir);

    // Serve page
    res.end(indexFileContent);
  })
 .listen(3000);