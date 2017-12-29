'use strict';

var joystickReducerInitState = {
  connected: false
}

var joystickReducer = (state = joystickReducerInitState, action) => {
  switch (action.type) {
    case "ANALOG_JOYSTICK_STATUS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}