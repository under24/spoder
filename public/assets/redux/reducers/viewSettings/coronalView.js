'use strict';

let viewSettingsCoronalViewReducerInitState = {
  useOffsets: true,
  useScaling: true,
  scaling: 60
};

const viewSettingsCoronalViewReducer = (state = viewSettingsCoronalViewReducerInitState, action) => {
  switch (action.type) {
    case "CORONAL_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}