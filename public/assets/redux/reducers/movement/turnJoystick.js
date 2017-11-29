'use strict';

let movementTurnJoystickReducerInitState = { x: 0 }

const movementTurnJoystickReducer = (state = movementTurnJoystickReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}