/* @flow */
'use strict'

// these types are FlowType built-ins, just pointing this out here

// https://github.com/facebook/flow/blob/v0.37.4/lib/bom.js#L484
// type Geolocation ...

// https://github.com/facebook/flow/blob/v0.37.4/lib/bom.js#L498
// type Position ...

// https://github.com/facebook/flow/blob/v0.37.4/lib/bom.js#L503
// type Coordinates ...

// https://github.com/facebook/flow/blob/v0.37.4/lib/bom.js#L512
// type PositionError ...

// https://github.com/facebook/flow/blob/v0.37.4/lib/bom.js#L520
// type PositionOptions ...

/* ::
export type CoordinatesLike = Coordinates | {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  accuracy?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export type PositionLike = Position | {
  coords?: CoordinatesLike;
  timestamp?: number;
}

export type PositionOptionsLike = PositionOptions | {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export type GeolocationDriver = {
  getCurrentPosition: (
    success: (position: PositionLike) => any,
    error: (error: PositionError | Error) => any,
    options: PositionOptions
  ) => any;
  isAvailable: () => boolean;
}
*/
