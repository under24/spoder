'use strict';

let movementDirectionReducerInitState = {
  x: 0,
  y: 0
}

const movementDirectionReducer = (state = movementDirectionReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_DIRECTION_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}