'use strict';

{
  let viewSettingsRelativeTransverseViewReducerInitState = {
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
  
  {
    // get settings from local storage
    let localSettings = LSU.get('relativeTransverseView');
    // if some settings are present
    if (localSettings)
      // merge them with the init state
      viewSettingsRelativeTransverseViewReducerInitState = Object.assign({}, viewSettingsRelativeTransverseViewReducerInitState, JSON.parse(localSettings));
  }

  var viewSettingsRelativeTransverseViewReducer = (state = viewSettingsRelativeTransverseViewReducerInitState, action) => {
    switch (action.type) {
      case "RELATIVE_TRANSVERSE_VIEW_SETTINGS_CHANGED":
        {
          // save payload items to local storages
          LSU.save('relativeTransverseView', action.payload);
          
          return Object.assign({}, state, action.payload);
        }
      case "RELATIVE_TRANSVERSE_VIEW_SETTINGS_RESET":
        {
          // clear local storage settings
          LSU.remove('relativeTransverseView');
          
          return Object.assign({}, {
            legId: 1,
            useOffsets: true,
            useScaling: false,
            scaling: 70,
            showMovementCircle: true,
            showMovementPointer: true,
            showInvalidRange: true,
            showLegSelector: true,
            showReachRadius: true
          });
        }
    }
    return state;
  }  
}