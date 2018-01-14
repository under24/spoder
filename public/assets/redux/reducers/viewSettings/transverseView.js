'use strict';

let viewSettingsTransverseViewReducerInitState = {
  useOffsets: false,
  useScaling: false,
  scaling: 60
};

const viewSettingsTransverseViewReducer = (state = viewSettingsTransverseViewReducerInitState, action) => {
  switch (action.type) {
    case "TRANSVERSE_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}