'use strict';

let sequenceProgressReducerInitState = {
  pct: 0,
  tick: 0
};

const sequenceProgressReducer = (state = sequenceProgressReducerInitState, action) => {
  switch (action.type) {
    case "SEQUENCE_SHIFTED_XY_BATCHED":
    case "SEQUENCE_PROGRESS_PCT_CHANGED":
      {
        return Object.assign({}, state, { pct: action.pct, tick: action.tick });
      }
  }
  return state;
}