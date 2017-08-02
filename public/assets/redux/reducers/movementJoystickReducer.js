'use strict';

let movementJoystickReducerInitState = {
  x: 0,
  y: 0
}

const movementJoystickReducer = (state = movementJoystickReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_JOYSTICK_VALUES_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}