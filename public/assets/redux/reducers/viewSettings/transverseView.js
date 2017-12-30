'use strict';

let viewSettingsTransverseReducerInitState = {
  legId: 1,
  scaling: null,
  useOffsets: false
};

const viewSettingsTransverseReducer = (state = viewSettingsTransverseReducerInitState, action) => {
  switch (action.type) {
    case "TRANSVERSE_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}