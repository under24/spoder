'use strict';

{
  let movementTurnJoystickReducerInitState = {
    x: 0,
    normalizer: 0.25, // x: 100 -> normalizedX: 25
    normalizedX: 0
  };

  var movementTurnJoystickReducer = (state = movementTurnJoystickReducerInitState, action) => {
    if ('movement.turnJoystick' in action) {
      var stateChange = action['movement.turnJoystick'];
      
      delete action['movement.turnJoystick'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = movementTurnJoystickReducer }
catch(e) {}