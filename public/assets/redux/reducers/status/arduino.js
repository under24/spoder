'use strict';

{
  let arduinoReducerInitState = {
    connected: false
  };

  var arduinoReducer = (state = arduinoReducerInitState, action) => {
    // switch (action.type) {
    //   case "ARDUINO_STATUS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('status.arduino' in action) {
      var stateChange = action['status.arduino'];
      
      delete action['status.arduino'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = arduinoReducer }
catch(e) {}