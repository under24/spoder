'use strict';

let movementInterationReducerInitState = {
  tps: 60,
  duration: 750,
  amountOfTicks: null, // will be calculated from tps + duration
  gait: 'ripple',
  currentTick: 0,
  currentTickPct: 0,
  blueprint: null,
  blueprintDataSource: null
}

// init tps + duration into amountOfTicks
movementInterationReducerInitState.amountOfTicks = +(movementInterationReducerInitState.duration / (1000 / movementInterationReducerInitState.tps)).toFixed(0);

const movementInterationReducer = (state = movementInterationReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_ITERATION_VALUES_CHANGED":
      {
        if (action.payload.tps || action.payload.duration) {
          let tps = action.payload.tps || state.tps,
              duration = action.payload.duration || state.duration;
              
          let amountOfTicks = +(duration / (1000 / tps)).toFixed(0);
          
          return Object.assign({}, state, action.payload, { amountOfTicks });
        }
        else
          return Object.assign({}, state, action.payload);
      }
    case "SEQUENCE_SHIFTED_XY_BATCHED":
      {
        return Object.assign({}, state, { currentTick: action.currentTick, currentTickPct: action.currentTickPct });
      }
  }
  return state;
};