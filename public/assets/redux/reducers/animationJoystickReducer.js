'use strict';

let animationJoystickReducerInitState = {
  x: 0,
  y: 0
}

const animationJoystickReducer = (state = animationJoystickReducerInitState, action) => {
  switch (action.type) {
    case "ANIMATION_JOYSTICK_VALUES_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}