'use strict';

{
  let movementInterationReducerInitState = {
    tps: null,
    duration: null,
    amountOfTicks: null,
    gait: null,
    transitionShift: null,
    transitionShiftSource: null,
    blueprint: null,
    sequencerMode: null,
    currentTick: 0,
    currentTickPct: 0
  }

  var movementInterationReducer = (state = movementInterationReducerInitState, action) => {
    switch (action.type) {
      case "MOVEMENT_ITERATION_VALUES_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
      // case "SEQUENCE_SHIFTED_XY_BATCHED":
      //   {
      //     return Object.assign({}, state, { currentTick: action.currentTick, currentTickPct: action.currentTickPct });
      //   }
    }
    if ('movement.iteration' in action) {
      var newState = action['movement.iteration'];
      
      delete action['movement.iteration'];
      
      return newState;
    }
    return state;
  };  
}