// UMD: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    if (root.BMP) {
      root.BMP.geolocation = factory();
    } else {
      root.geolocation = factory();
    }
  }
}(this, function () {
  'use strict';

  var module = {

    clonePosition: function (position) {
      if (!position || typeof position !== 'object' || !position.coords || typeof position.coords !== 'object') {
        throw new TypeError('cannot clone non-Position object');
      }
      return {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed
        }
      };
    }

  };

  return module;
}));
