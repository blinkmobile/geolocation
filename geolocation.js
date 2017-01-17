// UMD: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    if (root.BMP) {
      root.BMP.geolocation = factory()
    } else {
      root.geolocation = factory()
    }
  }
}(this, function () {
  'use strict'

  var api

  var module = {

    setGeoLocation: function (geolocation) {
      api = geolocation
    },

    getGeoLocation: function () {
      if (api && api.getCurrentPosition) {
        return api
      }
      if (typeof navigator !== 'undefined' && navigator.geolocation &&
          navigator.geolocation.getCurrentPosition) {
        return navigator.geolocation
      }
      return false
    },

    clonePosition: function (position) {
      if (!position || typeof position !== 'object' || !position.coords || typeof position.coords !== 'object') {
        throw new TypeError('cannot clone non-Position object')
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
      }
    },

    DEFAULT_POSITION_OPTIONS: {
      enableHighAccuracy: true,
      maximumAge: 0, // fresh results each time
      timeout: 10 * 1000 // take no longer than 10 seconds
    },

    POSITION_OPTION_TYPES: {
      enableHighAccuracy: 'boolean',
      maximumAge: 'number',
      timeout: 'number'
    },

    mergePositionOptions: function (options) {
      var result
      if (!options || typeof options !== 'object') {
        return module.DEFAULT_POSITION_OPTIONS
      }
      result = {}
      Object.keys(module.POSITION_OPTION_TYPES).forEach(function (option) {
        var type = module.POSITION_OPTION_TYPES[option]
        var value = options[option]
        if (typeof options[option] === type && (type !== 'number' || !isNaN(value))) {
          result[option] = options[option]
        } else {
          result[option] = module.DEFAULT_POSITION_OPTIONS[option]
        }
      })
      return result
    },

    requestCurrentPosition: function (onSuccess, onError, options) {
      var geolocation = module.getGeoLocation()
      if (!geolocation) {
        throw new Error('the current web engine does not support GeoLocation')
      }
      if (typeof onSuccess !== 'function') {
        throw new TypeError('getCurrentPosition(): 1st parameter must be a Function to handle success')
      }
      if (typeof onError !== 'function') {
        throw new TypeError('getCurrentPosition(): 2nd parameter must be a Function to handle error')
      }
      options = module.mergePositionOptions(options)
      return geolocation.getCurrentPosition(function (position) {
        onSuccess(module.clonePosition(position))
      }, onError, options)
    },

    getCurrentPosition: function (onSuccess, onError, options) {
      return new Promise(function (resolve, reject) {
        module.requestCurrentPosition(function (position) {
          if (typeof onSuccess === 'function') {
            onSuccess(position)
          }
          resolve(position)
        }, function (err) {
          if (typeof onError === 'function') {
            onError(err)
          }
          reject(err)
        }, options)
      })
    }

  }

  return module
}))
