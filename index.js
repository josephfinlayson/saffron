'use strict';

var slice = [].slice;

var saffron = function(fn, context) {

  var curry = function(fn, expectedLen) {

    if (typeof fn !== 'function') {
      throw new Error('not a function');
    }

    return function() {

      var actualLen = arguments.length;

      // exactly-applied
      if (expectedLen === actualLen) {
        var val = fn.apply(context, arguments);
        if (typeof val === 'function') {
          return saffron(val, context);
        }
        return val;
      }

      // under-applied
      if (actualLen < expectedLen) {
        var prevArgs = slice.call(arguments);
        expectedLen = expectedLen - actualLen;
        return curry(function() {
          var currArgs = slice.call(arguments);
          return fn.apply(context, prevArgs.concat(currArgs));
        }, expectedLen);
      }

      // over-applied
      var currArgs = slice.call(arguments, 0, expectedLen);
      var nextArgs = slice.call(arguments, expectedLen);
      return saffron(fn.apply(context, currArgs), context).apply(context, nextArgs);

    };

  };

  return curry(fn, fn.length);

};

module.exports = saffron;
