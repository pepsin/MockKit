var http = require('http');
var MockKit = require("./mockkit.js");


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var regex_rules = {
    index: /\/$/
  }
  
  var rules = {
    index: "./small_test.html",
  }
  var m = new MockKit(req, res, rules, regex_rules);
  
  console.log(req.url);
  
  //m.returnStaticResource();
  
  m.returnSpecificResource(/\/$/, "./small_test.html");
  
  m.returnJson(/hello.json$/, '{"url":"hello.com", "err":""}\n');
  
}).listen(1234, '0.0.0.0');
console.log("Listening 0.0.0.0:1234");