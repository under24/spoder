'use strict';

let movementSettingsReducerInitState = {
  loop: true,
  applyDirectionAndTurnAngles: true,
  movementGeneratorEnabled: false
}

const movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}