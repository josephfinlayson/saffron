'use strict';

var test = require('tape');
var saffron = require('..');

test('saffron(fn [, context])', function(t) {

  t.test('is a function', function(t) {
    t.true(typeof saffron === 'function');
    t.end();
  });

  t.test('throws if `fn` is not a function', function(t) {
    t.throws(function() {
      saffron({});
    });
    t.end();
  });

  t.test('`fn` expects no arguments', function(t) {
    var fn = function() {
      return 42;
    };
    t.equal(saffron(fn)(), 42);
    t.end();
  });

  t.test('`fn` expects some argument', function(t) {
    var fn = function(x) {
      return function(y, z) {
        return x + y + z;
      };
    };
    t.equal(saffron(fn)(1, 2, 3), 6);
    t.equal(saffron(fn)(1, 2)(3), 6);
    t.equal(saffron(fn)(1)(2, 3), 6);
    t.equal(saffron(fn)(1)(2)(3), 6);
    t.end();
  });

  t.test('`fn` can contain nested functions of arbitrary arity', function(t) {
    var fn = function() {
      t.equal(this, undefined);
      return function(x) {
        t.equal(this, undefined);
        return function() {
          t.equal(this, undefined);
          return function(y, z) {
            t.equal(this, undefined);
            return x + y + z;
          };
        };
      };
    };
    t.equal(saffron(fn)(1, 2, 3), 6);
    t.equal(saffron(fn)(1, 2)(3), 6);
    t.equal(saffron(fn)(1)(2, 3), 6);
    t.equal(saffron(fn)(1)(2)(3), 6);
    t.end();
  });

  t.test('takes an optional `context` which is propagated to every "nested" function', function(t) {
    var fn = function() {
      t.equal(this, 100);
      return function(x) {
        t.equal(this, 100);
        return function() {
          t.equal(this, 100);
          return function(y, z) {
            t.equal(this, 100);
            return this + x + y + z;
          };
        };
      };
    };
    t.equal(saffron(fn, 100)(1, 2, 3), 106);
    t.equal(saffron(fn, 100)(1, 2)(3), 106);
    t.equal(saffron(fn, 100)(1)(2, 3), 106);
    t.equal(saffron(fn, 100)(1)(2)(3), 106);
    t.end();
  });

});
