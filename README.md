# geolocation

wrapper for HTML5 GeoLocation

## why?

We've noticed that different browsers (and web views) sometimes return a
`Position` object that is incompatible with `JSON.stringify()`. Our wrapper
fixes this problem.

Further, it also exposes a `Promise` API for people that prefer them.

## further reading

- http://dev.w3.org/geo/api/spec-source.html
