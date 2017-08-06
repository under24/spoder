'use strict';

let tiltReducerInitState = {
  leftTiltModifier: 0,
  rightTiltModifier: 0,
  frontTiltModifier: 0,
  backTiltModifier: 0,
  appliedTo: 'sagittalBaseY'
}

const tiltReducer = (state = tiltReducerInitState, action) => {
  switch (action.type) {
    case "TILT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}
