'use strict';

var joystickReducerInitState = {
  charge: null,
  connected: false,
  status: null
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