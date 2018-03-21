'use strict';

{
  let levelReducerInitState = {
    y: 0,
    normalizer: 1.5, // x: 100 -> normalizedY: 150
    normalizedY: 0,
    appliedTo: 'sagittalBaseY',
    range: {
      upper: 100,
      lower: -10
    }
  };

  var levelReducer = (state = levelReducerInitState, action) => {
    if ('modifiers.level' in action) {
      var stateChange = action['modifiers.level'];
      
      delete action['modifiers.level'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = levelReducer }
catch(e) {}