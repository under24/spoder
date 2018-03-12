'use strict';

{
  let joystickReducerInitState = {
    charge: null,
    connected: false,
    status: null
  };

  var joystickReducer = (state = joystickReducerInitState, action) => {
    // switch (action.type) {
    //   case "ANALOG_JOYSTICK_STATUS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('status.joystick' in action) {
      var stateChange = action['status.joystick'];
      
      delete action['status.joystick'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = joystickReducer }
catch(e) {}