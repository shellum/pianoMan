'use strict';

// var Bus = React.createClass({
//   add: function(callbackFunction) {
//     alert('added!');
//     this.state.callbackFunction = callbackFunction;
//   },
//   call: function(a,b,c) {
//     this.state.callbackFunction(a,b,c);
//   },
//   render: function() {
//     return(
//       <div></div>
//     )
//   }
// });

//
// class Bus {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
//   add(f) {
//     alert('added');
//   }
// }

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
