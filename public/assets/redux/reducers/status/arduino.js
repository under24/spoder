'use strict';

{
  let arduinoReducerInitState = {
    connected: false
  }

  var arduinoReducer = (state = arduinoReducerInitState, action) => {
    switch (action.type) {
      case "ARDUINO_STATUS_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  }
}