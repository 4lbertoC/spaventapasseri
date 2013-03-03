var connect = require('connect');
var fs = require('fs');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('images')) // serve images
  .use(function(req, res){

    // Read index.html
    var indexFileContent = '' + fs.readFileSync('index.html');

    // Read list of images from images folder into array and sort it
    var fileNameArray = fs.readdirSync('images');
    // Filter only jpg files
    fileNameArray = fileNameArray.filter(function(fileName) {
      return fileName.indexOf('.jpg') > -1;  
    });
    // Sort the array by name
    fileNameArray.sort();

    // Perform replacements
    indexFileContent = indexFileContent.replace(/%imageArray%/,JSON.stringify(fileNameArray));
    console.log(indexFileContent)

    // Serve page
    res.end(indexFileContent);
  })
 .listen(3000);
 console.log('Listening on port 3000');