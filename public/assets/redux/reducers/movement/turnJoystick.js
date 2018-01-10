'use strict';

let movementTurnJoystickReducerInitState = {
  x: 0,
  normalizer: 0.25, // x: 100 -> normalizedX: 25
  normalizedX: 0
}

const movementTurnJoystickReducer = (state = movementTurnJoystickReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED":
      {
        // calc normalized x (joystick value * normalizer)
        let normalizedX = MU.normalize(action.payload.x, state.normalizer);
        
        return Object.assign({}, state, action.payload, { normalizedX });
      }
  }
  return state;
}