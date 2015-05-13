'use strict';

var saffron = require('..');

var fn = function(x) {
  return function(y, z) {
    return x + y + z;
  };
};
console.log(saffron(fn)(1, 2, 3)); //=> 6
console.log(saffron(fn)(1, 2)(3)); //=> 6
console.log(saffron(fn)(1)(2, 3)); //=> 6
console.log(saffron(fn)(1)(2)(3)); //=> 6
