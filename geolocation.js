'use strict'

var api

var DEFAULT_POSITION_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 0, // fresh results each time
  timeout: 10 * 1000 // take no longer than 10 seconds
}

var POSITION_OPTION_TYPES = {
  enableHighAccuracy: 'boolean',
  maximumAge: 'number',
  timeout: 'number'
}

function clonePosition (position) {
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
}

function getGeoLocation () {
  if (api && api.getCurrentPosition) {
    return api
  }
  if (typeof navigator !== 'undefined' && navigator.geolocation &&
      navigator.geolocation.getCurrentPosition) {
    return navigator.geolocation
  }
  return false
}

function mergePositionOptions (options) {
  var result
  if (!options || typeof options !== 'object') {
    return DEFAULT_POSITION_OPTIONS
  }
  result = {}
  Object.keys(POSITION_OPTION_TYPES).forEach(function (option) {
    var type = POSITION_OPTION_TYPES[option]
    var value = options[option]
    if (typeof options[option] === type && (type !== 'number' || !isNaN(value))) {
      result[option] = options[option]
    } else {
      result[option] = DEFAULT_POSITION_OPTIONS[option]
    }
  })
  return result
}

function requestCurrentPosition (onSuccess, onError, options) {
  var geolocation = getGeoLocation()
  if (!geolocation) {
    throw new Error('the current web engine does not support GeoLocation')
  }
  if (typeof onSuccess !== 'function') {
    throw new TypeError('getCurrentPosition(): 1st parameter must be a Function to handle success')
  }
  if (typeof onError !== 'function') {
    throw new TypeError('getCurrentPosition(): 2nd parameter must be a Function to handle error')
  }
  options = mergePositionOptions(options)
  return geolocation.getCurrentPosition(function (position) {
    onSuccess(clonePosition(position))
  }, onError, options)
}

function getCurrentPosition (onSuccess, onError, options) {
  return new Promise(function (resolve, reject) {
    requestCurrentPosition(function (position) {
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

function setGeoLocation (geolocation) {
  api = geolocation
}

module.exports = {
  DEFAULT_POSITION_OPTIONS,
  POSITION_OPTION_TYPES,

  clonePosition,
  getCurrentPosition,
  getGeoLocation,
  mergePositionOptions,
  requestCurrentPosition,
  setGeoLocation
}
