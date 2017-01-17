/* @flow */
'use strict'

// our modules

var geolocation = require('../geolocation')

// this module

var testPosition = {
  coords: {
    latitude: 1,
    longitude: 2,
    altitude: 3,
    accuracy: 4,
    altitudeAccuracy: 5,
    heading: 6,
    speed: 7
  },
  timestamp: Date.now()
}

test('module', function () {
  expect(geolocation).toBeDefined()
})

test('clonePosition', function () {
  var position = geolocation.clonePosition(testPosition)
  expect(position).toMatchObject(testPosition)
})

test('mergePositionOptions with bad values', function () {
  var input = {
    enableHighAccuracy: 1,
    maximumAge: 'blah',
    timeout: NaN
  }
  var expected = geolocation.DEFAULT_POSITION_OPTIONS
  // $FlowFixMe: testing intentionally wrong types
  var result = geolocation.mergePositionOptions(input)
  expect(result).toMatchObject(expected)
})

test('mergePositionOptions with good values', function () {
  var input = {
    enableHighAccuracy: false,
    maximumAge: 1,
    timeout: 2
  }
  var result = geolocation.mergePositionOptions(input)
  expect(result).toMatchObject(input)
})
