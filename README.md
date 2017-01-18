# geolocation.js [![Travis CI Status](https://travis-ci.org/blinkmobile/geolocation.js.svg?branch=master)](https://travis-ci.org/blinkmobile/geolocation.js) [![npm module](https://img.shields.io/npm/v/@blinkmobile/geolocation.svg)](https://www.npmjs.com/package/@blinkmobile/geolocation)

wrapper for HTML5 GeoLocation


## Why?

We've noticed that different browsers (and web views) sometimes return a
`Position` object that is incompatible with `JSON.stringify()`. Our wrapper
fixes this problem.

Further, it also exposes a `Promise` API for people that prefer them.


## Requirements

This library assumes ECMAScript 2015 support (including `Promise`).
Be sure to shim these in older environments as required.


## API


### clonePosition(position)

- @param {Position} position returned from GeoLocation API
- @returns {Object} plain JavaScript object with the coordinate information
- @throws {TypeError} if `position` or `position.coords` are not objects


### getCurrentPosition(options)

- @param {Object} [options]
- @returns {Promise}

Promise style that is otherwise inspired by the W3C standard: http://dev.w3.org/geo/api/spec-source.html#api_description


## Further Reading

- http://dev.w3.org/geo/api/spec-source.html
