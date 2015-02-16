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
