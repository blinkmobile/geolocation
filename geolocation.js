/* @flow */
'use strict'

/* :: import type {
  GeolocationDriver, PositionLike, PositionOptionsLike
} from './types.js' */

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

var DRIVERS_PREFERENCE = [ 'W3C' ]

var DRIVERS /* : { [id:string]: GeolocationDriver } */ = {

  W3C: {
    isAvailable: function () /* : boolean */ {
      return !!(
        typeof navigator !== 'undefined' &&
        navigator.geolocation &&
        navigator.geolocation.getCurrentPosition
      )
    },

    getCurrentPosition: function (
      onSuccess /* : (position: PositionLike) => any */,
      onError /* : (error: PositionError) => any */,
      options /* : PositionOptions */
    ) /* : void */ {
      navigator.geolocation.getCurrentPosition(function (position) {
        onSuccess(clonePosition(position))
      }, onError, options)
    }
  }

}

function detectDriver () /* : GeolocationDriver | false */ {
  const availableDrivers = DRIVERS_PREFERENCE.filter((name) => {
    return DRIVERS[name].isAvailable()
  })
  return DRIVERS[availableDrivers[0]] || false
}

function getCurrentPosition (
  options /* :? PositionOptionsLike */
) /* : Promise<PositionLike> */ {
  const driver = detectDriver()
  if (!driver) {
    return Promise.reject(new Error('GeoLocation not supported'))
  }
  return new Promise(function (resolve, reject) {
    driver.getCurrentPosition(function (position) {
      resolve(position)
    }, function (err) {
      reject(err)
    }, mergePositionOptions(options))
  })
}

module.exports = {
  DEFAULT_POSITION_OPTIONS,

  clonePosition,
  getCurrentPosition,
  mergePositionOptions
}
