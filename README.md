# saffron [![npm Version](http://img.shields.io/npm/v/saffron.svg?style=flat)](https://www.npmjs.org/package/saffron) [![Build Status](https://img.shields.io/travis/yuanqing/saffron.svg?style=flat)](https://travis-ci.org/yuanqing/saffron) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/saffron.svg?style=flat)](https://coveralls.io/r/yuanqing/saffron)

> An implementation of function currying in JavaScript.

## Why

This was written mainly as a learning exercise.

## Usage

```js
'use strict';

var saffron = require('saffron');

var fn = function(x) {
  return function(y, z) {
    return x + y + z;
  };
};
console.log(saffron(fn)(1, 2, 3)); //=> 6
console.log(saffron(fn)(1, 2)(3)); //=> 6
console.log(saffron(fn)(1)(2, 3)); //=> 6
console.log(saffron(fn)(1)(2)(3)); //=> 6
```

- `fn` can return a function, which in turn returns a function, which in turn returns another function, and so on&hellip;
- There aren&rsquo;t any restrictions on how the curried function receives its arguments. As above, arguments could be supplied all at a time, some at a time, or even one at a time.

## API

```js
var saffron = require('saffron');
```

### saffron(fn [, context])

Returns a curried version of `fn`.

- `fn` &mdash; Throws if not a function.
- `context` &mdash; The context (ie. `this`) for `fn`. The context is propagated to all functions possibly &ldquo;nested&rdquo; in `fn`.

## Installation

Install via [npm](https://npmjs.com/):

```
$ npm i --save saffron
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT](https://github.com/yuanqing/saffron/blob/master/LICENSE)
