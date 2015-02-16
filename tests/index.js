'use strict';

// 3rd-party modules

var test = require('tape');

// our modules

var geolocation = require('../geolocation');

// this module

var spy = {
  onSuccess: null,
  onError: null,
  count: 0,
  getCurrentPosition: function (onSuccess, onError) {
    this.count += 1;
    this.onSuccess = onSuccess;
    this.onError = onError;
  },
  resolve: function (result) {
    this.onSuccess(result);
  },
  reject: function (err) {
    this.onError(err);
  }
};

var testPosition = {
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
geolocation.setGeoLocation(spy);

test(function (t) {
  t.ok(geolocation);
  t.end();
});

test('clonePosition', function (t) {
  t.deepEqual(testPosition, geolocation.clonePosition(testPosition));
  t.end();
});

test('mergePositionOptions with bad values', function (t) {
  var input = {
    enableHighAccuracy: 1,
    maximumAge: 'blah',
    timeout: NaN
  };
  var expected = {
    enableHighAccuracy: geolocation.DEFAULT_POSITION_OPTIONS.enableHighAccuracy,
    maximumAge: geolocation.DEFAULT_POSITION_OPTIONS.maximumAge,
    timeout: geolocation.DEFAULT_POSITION_OPTIONS.timeout
  };
  t.deepEqual(geolocation.mergePositionOptions(input), expected);
  t.end();
});

test('mergePositionOptions with good values', function (t) {
  var input = {
    enableHighAccuracy: false,
    maximumAge: 1,
    timeout: 2
  };
  t.deepEqual(geolocation.mergePositionOptions(input), input);
  t.end();
});

test('requestCurrentPosition with success', function (t) {
  spy.count = 0;
  geolocation.requestCurrentPosition(function (position) {
    t.equal(spy.count, 1);
    t.deepEqual(position, testPosition);
    t.end();
  }, function (err) {
    t.error(err);
    t.end();
  });
  setTimeout(function () {
    spy.resolve(testPosition);
  }, 0);
});

test('requestCurrentPosition with error', function (t) {
  spy.count = 0;
  geolocation.requestCurrentPosition(function () {
    t.fail();
    t.end();
  }, function (err) {
    t.ok(err);
    t.equal(spy.count, 1);
    t.end();
  });
  setTimeout(function () {
    spy.reject(new Error(':('));
  }, 0);
});

test('getCurrentPosition with success', function (t) {
  spy.count = 0;
  geolocation.getCurrentPosition().then(function (position) {
    t.equal(spy.count, 1);
    t.deepEqual(position, testPosition);
    t.end();
  }, function (err) {
    t.error(err);
    t.end();
  });
  setTimeout(function () {
    spy.resolve(testPosition);
  }, 0);
});

test('getCurrentPosition with error', function (t) {
  spy.count = 0;
  geolocation.getCurrentPosition().then(function () {
    t.fail();
    t.end();
  }, function (err) {
    t.ok(err);
    t.equal(spy.count, 1);
    t.end();
  });
  setTimeout(function () {
    spy.reject(new Error(':('));
  }, 0);
});
