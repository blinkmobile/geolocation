/* @flow */
'use strict'

/* :: import type { PositionLike, PositionOptionsLike } from './types.js' */

var api

var DEFAULT_POSITION_OPTIONS /* : PositionOptions */ = {
  enableHighAccuracy: true,
  maximumAge: 0, // fresh results each time
  timeout: 10 * 1000 // take no longer than 10 seconds
}

function clonePosition (position /* : PositionLike */) /* : PositionLike */ {
  var coords
  position = position || {}
  coords = position.coords || {}
  if (typeof position !== 'object' || typeof coords !== 'object') {
    throw new TypeError('cannot clone non-Position object')
  }
  return {
    coords: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracy: coords.accuracy,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      speed: coords.speed
    },
    timestamp: position.timestamp || Date.now()
  }
}

function getGeoLocation () /* : Geolocation | false */ {
  if (api && api.getCurrentPosition) {
    return api
  }
  if (typeof navigator !== 'undefined' && navigator.geolocation &&
      navigator.geolocation.getCurrentPosition) {
    return navigator.geolocation
  }
  return false
}

function mergePositionOptions (
  options /* :? PositionOptionsLike */
) /* : PositionOptions */ {
  options = options || {}
  if (typeof options !== 'object') {
    return DEFAULT_POSITION_OPTIONS
  }

  return {
    enableHighAccuracy: typeof options.enableHighAccuracy === 'boolean' ? options.enableHighAccuracy : DEFAULT_POSITION_OPTIONS.enableHighAccuracy,

    maximumAge: typeof options.maximumAge === 'number' && !isNaN(options.maximumAge) ? options.maximumAge : DEFAULT_POSITION_OPTIONS.maximumAge,

    timeout: typeof options.timeout === 'number' && !isNaN(options.timeout) ? options.timeout : DEFAULT_POSITION_OPTIONS.timeout
  }
}

// internal
function requestCurrentPosition (
  onSuccess /* : (position: PositionLike) => any */,
  onError /* : (error: PositionError) => any */,
  options /* :? PositionOptionsLike */
) {
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

function getCurrentPosition (
  onSuccess /* :? (position: PositionLike) => any */,
  onError /* :? (error: PositionError) => any */,
  options /* :? PositionOptionsLike */
) /* : Promise<PositionLike> */ {
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

function setGeoLocation (geolocation /* : Geolocation | Object */) {
  api = geolocation
}

module.exports = {
  DEFAULT_POSITION_OPTIONS,

  clonePosition,
  getCurrentPosition,
  getGeoLocation,
  mergePositionOptions,
  setGeoLocation
}
