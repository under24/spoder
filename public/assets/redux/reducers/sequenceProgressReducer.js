'use strict';

let sequenceProgressReducerInitState = 0;

const sequenceProgressReducer = (state = sequenceProgressReducerInitState, action) => {
  switch (action.type) {
    case "SEQUENCE_PROGRESS_PCT_CHANGED":
      {
        return action.payload;
      }
  }
  return state;
}