var fs = require('fs');
var async = require('async');
function MockKit(req, res, rules, regex_rules) {
  this.req = req;
  this.res = res;
  this.rules = rules;
  this.regex_rules = regex_rules;

  function returnSpecificResource(req, res, rules, regex_rules, missCallback) {
    console.log("returnSpecificResource: "+ req.url);
    
    var keys = Object.keys(rules);
    var isHitted = false;
    
    for (var _i = 0, _len = keys.length; _i < _len; _i++) {
      if (req.url.match(regex_rules[keys[_i]])) {
        isHitted = true;
        fs.readFile(rules[keys[_i]], function (err, data) {
          if (err) throw err;
          res.end(data);
        });
      } else if (_i == (keys.length - 1) && !isHitted) {
        missCallback(req, res, return404);
      }
    }
  }
  
   function returnStaticResource(req, res, missCallback) {
    console.log("returnStaticResource: "+ req.url);
    
    fs.exists(req.url.slice(1), function (exists) {
      if (exists && !req.url.match(/\/$/)) {
        fs.readFile("." + req.url, function (err, data) {
          if (err) throw err;
          res.end(data);
        }); 
      } else {
        missCallback(req, res);
      }
    });
  }
  
  function return404(req, res) {
    console.log("return500: "+ req.url);
    
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("");
  }
  
  this.run = function () {
    console.log(this.req.url);
    returnSpecificResource(this.req, this.res, this.rules, this.regex_rules, returnStaticResource);
  }
}

exports = MockKit;

// exports the constructor properly
module.exports = MockKit;