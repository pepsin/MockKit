var http = require('http');
var MockKit = require("./mockkit.js");
console.log("Listening 127.0.0.1:1234");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var regex_rules = {
    index: /\/$/
  };
  
  var rules = {
    index: "./small_test.html"
  };
  
  var m = new MockKit(req, res, rules, regex_rules);
  
  m.run();
  
}).listen(1234, '127.0.0.1');