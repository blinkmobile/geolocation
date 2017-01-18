/* @flow */
'use strict'

// our modules

const geolocation = require('../geolocation.js')

// this module

const testPosition = {
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

test('module', () => {
  expect(geolocation).toBeDefined()
})

test('clonePosition', () => {
  const position = geolocation.clonePosition(testPosition)
  expect(position).toMatchObject(testPosition)
})

test('mergePositionOptions with bad values', () => {
  const input = {
    enableHighAccuracy: 1,
    maximumAge: 'blah',
    timeout: NaN
  }
  const expected = geolocation.DEFAULT_POSITION_OPTIONS
  // $FlowFixMe: testing intentionally wrong types
  const result = geolocation.mergePositionOptions(input)
  expect(result).toMatchObject(expected)
})

test('mergePositionOptions with good values', () => {
  const input = {
    enableHighAccuracy: false,
    maximumAge: 1,
    timeout: 2
  }
  const result = geolocation.mergePositionOptions(input)
  expect(result).toMatchObject(input)
})
