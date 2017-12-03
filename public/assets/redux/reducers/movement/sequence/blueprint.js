'use strict';

let blueprintReducerInitState = null;

const blueprintReducer = (state = blueprintReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_SEQUENCE_BLUEPRINT_CHANGED":
      {
        // do not marge with the state because we want to remove missing legs from the obj
        return Object.assign({}, action.payload);
      }
  }
  return state;
}