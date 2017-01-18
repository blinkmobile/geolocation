/* @flow */
'use strict'

// our modules

var geolocation = require('../geolocation')

// this module

var spy = {
  onSuccess: function () {},
  onError: function () {},
  count: 0,
  getCurrentPosition: function (onSuccess, onError) {
    this.count += 1
    this.onSuccess = onSuccess
    this.onError = onError
  },
  resolve: function (result) {
    this.onSuccess(result)
  },
  reject: function (err) {
    this.onError(err)
  }
}

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
geolocation.setGeoLocation(spy)

test('getCurrentPosition with success (promise)', function () {
  spy.count = 0
  setTimeout(function () {
    spy.resolve(testPosition)
  }, 0)
  return geolocation.getCurrentPosition()
    .then(function (position) {
      expect(spy.count).toBe(1)
      expect(position).toMatchObject(testPosition)
    })
})

test('getCurrentPosition with error (promise)', function () {
  spy.count = 0
  setTimeout(function () {
    spy.reject(new Error(':('))
  }, 0)
  return geolocation.getCurrentPosition()
    .then(() => {
      throw new Error('unexpected resolve')
    })
    .catch(function (err) {
      expect(err).toBeInstanceOf(Error)
      expect(spy.count).toBe(1)
    })
})
