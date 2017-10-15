'use strict';

let movementSettingsReducerInitState = {
  loop: true,
  applyDirectionAndTurnAngles: true,
  movementEnabled: false,
  gait: 'ripple',
  tps: 60,
  duration: 750
};

const movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
};