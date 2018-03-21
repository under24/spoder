'use strict';

{
  let movementIterationPropertiesReducerInitState = {
    tps: null,
    duration: null,
    amountOfTicks: null,
    gait: null,
    sequencerMode: null,
    currentTick: null,
    currentTickPct: null
  };

  var movementIterationPropertiesReducer = (state = movementIterationPropertiesReducerInitState, action) => {
    if ('movement.iteration.properties' in action) {
      var stateChange = action['movement.iteration.properties'];
      
      delete action['movement.iteration.properties'];
      
      return stateChange;
    }
    return state;
  };  
}

// node environment export
try { module.exports = movementIterationPropertiesReducer }
catch(e) {}