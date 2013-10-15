var fs = require('fs');
var async = require('async');
function MockKit(req, res, rules, regex_rules) {
  this.req = req;
  this.res = res;
  this.rules = rules;
  this.regex_rules = regex_rules;
  this.is_not_hitted = true;
  
  this.returnStaticResource = function(nextFunc) {
    console.log("returnStaticResource: "+ this.req.url);
    req = this.req;
    res = this.res;
    self = this;
    fs.exists(req.url.slice(1), function (exists) {
      if (exists && !req.url.match(/\/$/)) {
        fs.readFile("." + req.url, function (err, data) {
          if (err) throw err;
          res.end(data);
          return self;
        }); 
      }
    });
  }
  
  this.returnSpecificResource = function(nextFunc) {
    console.log("returnSpecificResource: "+ this.req.url);
    req = this.req;
    res = this.res;
    self = this;
    var hitted_data;
    for (var key in self.rules) {
      if (req.url.match(self.regex_rules[key]) && self.is_not_hitted) {
        fs.readFile("." + req.url, function (err, data) {
          if (err) throw err;
          res.end(data);
          return self;
        });
      }
    }
  }
  
  this.return500 = function () {
    console.log("return500: "+ self.req.url);
    req = this.req;
    res = this.res;
    self = this;
    
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end("");
    self.is_not_hitted = false;
    
    return self;
  }
  
  this.run = function () {
    console.log(this.req.url);
    self = this;
    if (self.returnSpecificResource()) {
      
    } else if (self.returnStaticResource()) {
      
    } else {
      self.return500();
    }
  }
}


exports = MockKit;

// exports the constructor properly
module.exports = MockKit;