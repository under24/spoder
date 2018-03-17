'use strict';

{
  let tiltReducerInitState = {
    x: 0,
    normalizedX: 0,
    y: 0,
    normalizedY: 0,
    normalizer: 0.20, // x: 100 -> normalizedX/Y: 20
    appliedTo: 'sagittalBaseY'
  };

  var tiltReducer = (state = tiltReducerInitState, action) => {
    if ('modifiers.tilt' in action) {
      var stateChange = action['modifiers.tilt'];
      
      delete action['modifiers.tilt'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = tiltReducer }
catch(e) {}