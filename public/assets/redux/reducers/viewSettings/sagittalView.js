'use strict';

let viewSettingsSagittalReducerInitState = {
  legId: 1,
  useOffsets: false,
  useScaling: false,
  scaling: null
};

const viewSettingsSagittalReducer = (state = viewSettingsSagittalReducerInitState, action) => {
  switch (action.type) {
    case "SAGITTAL_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}