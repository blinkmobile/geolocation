# geolocation

wrapper for HTML5 GeoLocation

## why?

We've noticed that different browsers (and web views) sometimes return a
`Position` object that is incompatible with `JSON.stringify()`. Our wrapper
fixes this problem.

Further, it also exposes a `Promise` API for people that prefer them.

## API

### clonePosition(Position position)

- @param {Position} position returned from GeoLocation API
- @returns {Object} plain JavaScript object with the coordinate information
- @throws {TypeError} if `position` or `position.coords` are not objects

## further reading

- http://dev.w3.org/geo/api/spec-source.html
