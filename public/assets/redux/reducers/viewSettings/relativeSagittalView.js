'use strict';

let viewSettingsRelativeSagittalReducerInitState = {
  legId: 1,
  useOffsets: true,
  useScaling: false,
  scaling: 70
};

const viewSettingsRelativeSagittalReducer = (state = viewSettingsRelativeSagittalReducerInitState, action) => {
  switch (action.type) {
    case "RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}