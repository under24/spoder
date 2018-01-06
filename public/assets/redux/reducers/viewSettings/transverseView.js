'use strict';

let viewSettingsTransverseReducerInitState = {
  legId: 1,
  useOffsets: true,
  useScaling: false,
  scaling: 70,
  showMovementCircle: true,
  showMovementPointer: true,
  showInvalidRange: true,
  showLegSelector: true,
  showReachRadius: true
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