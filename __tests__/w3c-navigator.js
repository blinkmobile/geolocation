/* @flow */
'use strict'

var geolocation = require('../geolocation')

var oldNavigatorGeolocation

beforeEach(() => {
  oldNavigatorGeolocation = global.navigator && global.navigator.geolocation
  global.navigator = global.navigator || {}
  global.navigator.geolocation = {}
})

afterEach(() => {
  (global.navigator || {}).geolocation = oldNavigatorGeolocation
})

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

test('getCurrentPosition with success (promise)', function () {
  const fakeApi = jest.fn()
    .mockImplementation((onSuccess, onError, options) => {
      setTimeout(() => onSuccess(testPosition), 0)
    })
  global.navigator.geolocation.getCurrentPosition = fakeApi

  return geolocation.getCurrentPosition()
    .then(function (position) {
      expect(fakeApi.mock.calls.length).toBe(1)
      expect(position).toMatchObject(testPosition)
    })
})

test('getCurrentPosition with error (promise)', function () {
  const fakeApi = jest.fn()
    .mockImplementation((onSuccess, onError, options) => {
      setTimeout(() => onError(new Error(':(')), 0)
    })
  global.navigator.geolocation.getCurrentPosition = fakeApi

  return geolocation.getCurrentPosition()
    .then(() => {
      throw new Error('unexpected resolve')
    })
    .catch(function (err) {
      expect(err).toBeInstanceOf(Error)
      expect(fakeApi.mock.calls.length).toBe(1)
    })
})
