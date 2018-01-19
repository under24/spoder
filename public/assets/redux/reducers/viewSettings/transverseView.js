'use strict';

let viewSettingsTransverseViewReducerInitState = {
  useOffsets: true,
  useScaling: true,
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