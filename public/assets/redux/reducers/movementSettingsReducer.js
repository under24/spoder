'use strict';

let movementSettingsReducerInitState = {
  loop: true,
  applyDirectionAndTurnAngles: true,
  movementGeneratorEnabled: false,
  tps: 60,
  iterationDuration: 750,
  amountOfTicks: null // automaticcaly calculated from tps + iterationDuration
}

// init tps + iterationDuration into amountOfTicks
movementSettingsReducerInitState.amountOfTicks = +(movementSettingsReducerInitState.iterationDuration / (1000 / movementSettingsReducerInitState.tps)).toFixed(0);

const movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_SETTINGS_CHANGED":
      {
        // if tps or iterationDuration in the payload then calc amountOfTicks
        if (action.payload.tps || action.payload.iterationDuration) {
          let tps = action.payload.tps || state.tps,
              iterationDuration = action.payload.iterationDuration || state.iterationDuration;
          return Object.assign({}, state, action.payload, { amountOfTicks: +(iterationDuration / (1000 / tps)).toFixed(0) })
        }
        else
          return Object.assign({}, state, action.payload);
      }
  }
  return state;
}