'use strict';

let viewSettingsRelativeTransverseReducerInitState = {
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

const viewSettingsRelativeTransverseReducer = (state = viewSettingsRelativeTransverseReducerInitState, action) => {
  switch (action.type) {
    case "RELATIVE_TRANSVERSE_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}