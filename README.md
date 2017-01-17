# geolocation.js [![Travis CI Status](https://travis-ci.org/blinkmobile/geolocation.js.svg?branch=master)](https://travis-ci.org/blinkmobile/geolocation.js) [![npm module](https://img.shields.io/npm/v/@blinkmobile/geolocation.svg)](https://www.npmjs.com/package/@blinkmobile/geolocation)

wrapper for HTML5 GeoLocation


## Why?

We've noticed that different browsers (and web views) sometimes return a
`Position` object that is incompatible with `JSON.stringify()`. Our wrapper
fixes this problem.

Further, it also exposes a `Promise` API for people that prefer them.


## Requirements

This library assumes ECMAScript 5 and `Promise` support.
Be sure to shim these in older environments as required.


## API


### clonePosition(position)

- @param {Position} position returned from GeoLocation API
- @returns {Object} plain JavaScript object with the coordinate information
- @throws {TypeError} if `position` or `position.coords` are not objects


### setGeoLocation(geolocation)

- @param {GeoLocation} geolocation object that exposes the GeoLocation API

This is useful for testing. We will use the provided object for all requests
instead of `navigator.geolocation`.


### getCurrentPosition(onSuccess, onError, options)

- @param {Function} onSuccess
- @param {Function} onError
- @param {Object} [options]
- @returns {Promise} when either `Promise` or `$.Deferred` is globally available

Similar API as the W3C standard: http://dev.w3.org/geo/api/spec-source.html#api_description
One difference is that we mandate the `onError` handler, to enforce good
practices.
The other difference is that we return a Promise when such an implementation is
available.


## further reading

- http://dev.w3.org/geo/api/spec-source.html
