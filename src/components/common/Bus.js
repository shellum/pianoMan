'use strict';

function Bus () {
  var f = [];
  this.add = function(key, fun) {
    f[key] = fun;
  }
  this.call = function(key, x) {
    f[key](x);
  }
}

module.exports = Bus;
