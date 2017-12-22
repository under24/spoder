'use strict';

let viewSettingsSagittalAnimationReducerInitState = {
  scale: 60
};

const viewSettingsSagittalAnimationReducer = (state = viewSettingsSagittalAnimationReducerInitState, action) => {
  switch (action.type) {
    case "SAGITTAL_ANIMATION_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}