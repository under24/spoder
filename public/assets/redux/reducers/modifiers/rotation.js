'use strict';

{
  let rotationReducerInitState = {
    x: 0,
    normalizer: 0.3, // x: 100 -> normalizedX: 30
    normalizedX: 0,
    appliedTo: 'transverseBaseXY'
  };

  var rotationReducer = (state = rotationReducerInitState, action) => {
    if ('modifiers.rotation' in action) {
      var stateChange = action['modifiers.rotation'];
      
      delete action['modifiers.rotation'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = rotationReducer }
catch(e) {}