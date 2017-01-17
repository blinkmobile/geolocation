# Change Log


## Unreleased


### Changed

-   **BREAKING**: needs `Promise` support, no longer falls back to `jQuery.Deferred`

-   **BREAKING**: drop AMD / Require.js / UMD support, use CommonJS style and assume a build process


## v1.0.1 - 2015-02-24


### Fixed

-   PLATFORM-1587: iron out differences between `$.Deferred` and `Promise`
