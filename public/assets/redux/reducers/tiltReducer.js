'use strict';

let tiltInitState = {
  sagittalBaseYLeftTiltModifier: 0,
  sagittalBaseYRightTiltModifier: 0,
  sagittalBaseYFrontTiltModifier: 0,
  sagittalBaseYBackTiltModifier: 0
}

const tiltReducer = (state = tiltInitState, action) => {
  switch (action.type) {
    case "BASE_Y_TILT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}
