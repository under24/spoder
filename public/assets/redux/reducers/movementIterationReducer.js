'use strict';

let movementInterationReducerInitState = {
  tps: null,
  duration: null,
  amountOfTicks: null,
  gait: null,
  blueprint: null,
  blueprintDataSource: null,
  currentTick: 0,
  currentTickPct: 0
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