'use strict';

let viewSettingsTransverseAnimationReducerInitState = {
  scaling: 60,
  useOffsets: false
};

const viewSettingsTransverseAnimationReducer = (state = viewSettingsTransverseAnimationReducerInitState, action) => {
  switch (action.type) {
    case "TRANSVERSE_ANIMATION_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}