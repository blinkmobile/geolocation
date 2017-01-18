# Change Log


## Unreleased


### Changed

-   **BREAKING**: needs `Promise` support, no longer falls back to `jQuery.Deferred`

-   **BREAKING**: drop AMD / Require.js / UMD support, use CommonJS style and assume a build process

-   **BREAKING**: drop W3C-callback style, return `Promise`s

-   refactor to later support alternative Geolocation drivers (e.g. IP)


## v1.0.1 - 2015-02-24


### Fixed

-   PLATFORM-1587: iron out differences between `$.Deferred` and `Promise`
