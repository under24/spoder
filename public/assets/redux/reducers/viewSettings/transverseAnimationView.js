'use strict';

let viewSettingsTransverseAnimationReducerInitState = {
  useOffsets: false,
  useScaling: true,
  scaling: 60
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