'use strict';

{
  let movementIterationPropertiesReducerInitState = {
    tps: null,
    duration: null,
    amountOfTicks: null,
    gait: null,
    sequencerMode: null,
    currentTick: 0,
    currentTickPct: 0
  };

  var movementIterationPropertiesReducer = (state = movementIterationPropertiesReducerInitState, action) => {
    // switch (action.type) {
    //   case "MOVEMENT_ITERATION_PROPERTIES_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    //   case "SEQUENCE_SHIFTED_XY_BATCHED":
    //     {
    //       return Object.assign({}, state, { currentTick: action.currentTick, currentTickPct: action.currentTickPct });
    //     }
    // }
    if ('movement.iteration.properties' in action) {
      var newState = action['movement.iteration.properties'];
      
      delete action['movement.iteration.properties'];
      
      return newState;
    }
    return state;
  };  
}