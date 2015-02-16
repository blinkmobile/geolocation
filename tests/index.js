'use strict';

// 3rd-party modules

var test = require('tape');

// our modules

var geolocation = require('../geolocation');

// this module

test(function (t) {
  t.ok(geolocation);
  t.end();
});

test('clonePosition', function (t) {
  var position = {
    coords: {
      latitude: 1,
      longitude: 2,
      altitude: 3,
      accuracy: 4,
      altitudeAccuracy: 5,
      heading: 6,
      speed: 7
    }
  };
  var result = geolocation.clonePosition(position);
  t.deepEqual(position, result);
  t.end();
});
