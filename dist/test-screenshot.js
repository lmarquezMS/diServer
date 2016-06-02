var fs = require('fs');
var screenshot = require('node-webkit-screenshot');

screenshot({
  url : 'http://google.de',
  width : 1024,
  height : 768
})
.then(function(buffer){
  fs.writeFile('./out.png', buffer, function(){
    // This will close the screenshot service
    screenshot.close();
  });
});
