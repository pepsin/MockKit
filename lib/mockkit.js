var fs = require('fs');

function MockKit(req, res, rules) {
  this.req = req;
  this.res = res;
  this.rules = rules;

  function returnSpecificResource(req, res, rules, missCallback) {
    console.log("returnSpecificResource: "+ req.url);
    
    var keys = Object.keys(rules);
    var isHitted = false;
    
    for (var _i = 0, _len = keys.length; _i < _len; _i++) {
      var rule = RegExp(rules[keys[_i]][0]);
      if (req.url.match(rule)) {
        isHitted = true;
        file = rules[keys[_i]][1]
        console.log("SpecificFile:"+file);
        fs.readFile(file, function (err, data) {
          if (file.match(/\.json$/)) {
              res.writeHead(200, {'Content-Type': 'application/json'});
          }
          if (err) throw err;
          res.end(data);
        });
      } else {
        if (_i == (keys.length - 1) && !isHitted) {
          missCallback(req, res, return404);
        }
      }
    }
  }
  
   function returnStaticResource(req, res, missCallback) {
    console.log("returnStaticResource: "+ req.url);
    
    fs.exists(req.url.slice(1), function (exists) {
      if (exists && !req.url.match(/\/$/)) {
        fs.readFile("." + req.url, function (err, data) {
          if (err) throw err;
          if (req.url.match(/\.css$/)) {
            res.writeHead(200, {'Content-Type': 'text/css'});
          }
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
    returnSpecificResource(this.req, this.res, this.rules, returnStaticResource);
  }
}

exports = MockKit;

// exports the constructor properly
module.exports = MockKit;