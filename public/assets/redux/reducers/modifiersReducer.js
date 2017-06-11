'use strict';

let modifiersInitState = {
  sagittalBaseYLevelModifier: 0,
  sagittalBaseYLeftTiltModifier: 0,
  sagittalBaseYRightTiltModifier: 0,
  sagittalBaseYFrontTiltModifier: 0,
  sagittalBaseYBackTiltModifier: 0
}

const modifiersReducer = (state = modifiersInitState, action) => {
  switch (action.type) {
    case "BASE_Y_LEVEL_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
    case "BASE_Y_TILT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}