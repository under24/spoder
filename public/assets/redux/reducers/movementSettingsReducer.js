'use strict';

let movementSettingsReducerInitState = {
  loop: true,
  applyDirectionAndTurnAngles: true,
  movementGeneratorEnabled: false
}

const movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_META_DATA_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}