'use strict';

{
  let shiftReducerInitState = {
    x: 0,
    normalizedX: 0,
    y: 0,
    normalizedY: 0,
    normalizer: 0.7, // x: 100 -> normalizedX/Y: 70
    appliedTo: 'transverseBaseXY'
  };

  var shiftReducer = (state = shiftReducerInitState, action) => {
    if ('modifiers.shift' in action) {
      var stateChange = action['modifiers.shift'];
      
      delete action['modifiers.shift'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = shiftReducer }
catch(e) {}