'use strict';

let tiltInitState = {
  leftTiltModifier: 0,
  rightTiltModifier: 0,
  frontTiltModifier: 0,
  backTiltModifier: 0,
  appliedTo: 'sagittalBaseY'
}

const tiltReducer = (state = tiltInitState, action) => {
  switch (action.type) {
    case "BASE_Y_TILT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}
