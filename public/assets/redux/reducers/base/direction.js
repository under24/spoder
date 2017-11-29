'use strict';

let baseDirectionReducerInitState = null;

const baseDirectionReducer = (state = baseDirectionReducerInitState, action) => {
  switch (action.type) {
    case "BASE_DIRECTION_CHANGED":
      {
        return action.payload;
      }
  }
  return state;
}