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

const movementInterationReducer = (state = movementInterationReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_ITERATION_VALUES_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
    case "SEQUENCE_SHIFTED_XY_BATCHED":
      {
        return Object.assign({}, state, { currentTick: action.currentTick, currentTickPct: action.currentTickPct });
      }
  }
  return state;
};