var connect = require('connect');
var fs = require('fs');

var indexFileContent = '' + fs.readFileSync('index.html');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(function(req, res){
    var fileNameArray = fs.readdirSync('public');
    fileNameArray.sort();
  
  indexFileContent = indexFileContent.replace(/%images%/,JSON.stringify(fileNameArray));
    res.end(indexFileContent);
  })
 .listen(3000);