'use strict';

{
  let arduinoReducerInitState = {
    connected: false
  };

  var arduinoReducer = (state = arduinoReducerInitState, action) => {
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