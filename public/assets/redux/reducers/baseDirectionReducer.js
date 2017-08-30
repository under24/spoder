'use strict';

let baseDirectionReducerInitState = 0;

const baseDirectionReducer = (state = baseDirectionReducerInitState, action) => {
  switch (action.type) {
    case "BASE_DIRECTION_CHANGED":
      {
        return action.payload;
      }
  }
  return state;
}