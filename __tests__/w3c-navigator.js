/* @flow */
'use strict'

const geolocation = require('../geolocation.js')

let oldNavigatorGeolocation

beforeEach(() => {
  oldNavigatorGeolocation = global.navigator && global.navigator.geolocation
  global.navigator = global.navigator || {}
  global.navigator.geolocation = {}
})

afterEach(() => {
  (global.navigator || {}).geolocation = oldNavigatorGeolocation
})

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

test('getCurrentPosition with success (promise)', () => {
  const fakeApi = jest.fn()
    .mockImplementation((onSuccess, onError, options) => {
      setTimeout(() => onSuccess(testPosition), 0)
    })
  global.navigator.geolocation.getCurrentPosition = fakeApi

  return geolocation.getCurrentPosition()
    .then(position => {
      expect(fakeApi.mock.calls.length).toBe(1)
      expect(position).toMatchObject(testPosition)
    })
})

test('getCurrentPosition with error (promise)', () => {
  const fakeApi = jest.fn()
    .mockImplementation((onSuccess, onError, options) => {
      setTimeout(() => onError(new Error(':(')), 0)
    })
  global.navigator.geolocation.getCurrentPosition = fakeApi

  return geolocation.getCurrentPosition()
    .then(() => {
      throw new Error('unexpected resolve')
    })
    .catch(err => {
      expect(err).toBeInstanceOf(Error)
      expect(fakeApi.mock.calls.length).toBe(1)
    })
})
