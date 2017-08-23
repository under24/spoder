'use strict';

let movementTurnReducerInitState = {
  x: 0,
  y: 0
}

const movementTurnReducer = (state = movementTurnReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_TURN_VALUES_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}