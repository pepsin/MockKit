var fs = require('fs');
function MockKit(req, res) {
  this.req = req;
  this.res = res;
  
  this.returnStaticResource = function() {
    isHitted = false;
    req = this.req;
    res = this.res;
    fs.exists(req.url, function (exists) {
      if (exists) {
        this.isHitted = true;
        fs.readFile(req.url, function (err, data) {
          if (err) throw err;
          res.end(data);
        });
      }
    });
  }
  
  this.returnSpecificResource = function(route_regex, file) {
    req = this.req;
    res = this.res;
    if (req.url.match(route_regex) != null) {
      this.isHitted = true
      fs.readFile(file, function (err, data) {
        if (err) throw err;
        res.end(data);
      });
    }
  }

  this.returnJson = function(route_regex, json) {
    req = this.req;
    res = this.res;
    if (req.url.match(route_regex) != null) {
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.end(json);
    } else {
      this.returnBlank();
    }
  }
  
  this.returnBlank = function () {
    this.res.writeHead(200, {'Content-Type': 'text/html'});
    this.res.end("");
  }
  
  this.run = function () {
    for (var prop in this.rules) {
      prop this.rules[prop];
    }
  }
}


exports = MockKit;

// exports the constructor properly
module.exports = MockKit;