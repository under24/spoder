'use strict';

let viewSettingsRelativeSagittalViewReducerInitState = {
  legId: 1,
  useOffsets: true,
  useScaling: false,
  scaling: 70
};

const viewSettingsRelativeSagittalViewReducer = (state = viewSettingsRelativeSagittalViewReducerInitState, action) => {
  switch (action.type) {
    case "RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}