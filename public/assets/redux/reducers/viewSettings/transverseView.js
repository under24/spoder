'use strict';

{
  let viewSettingsTransverseViewReducerInitState = {
    useOffsets: true,
    useScaling: true,
    scaling: 60
  };
  
  {
    // get settings from local storage
    let localSettings = LSU.get('transverseView');
    // if some settings are present
    if (localSettings)
      // merge them with the init state
      viewSettingsTransverseViewReducerInitState = Object.assign({}, viewSettingsTransverseViewReducerInitState, JSON.parse(localSettings));
  }

  var viewSettingsTransverseViewReducer = (state = viewSettingsTransverseViewReducerInitState, action) => {
    switch (action.type) {
      case "TRANSVERSE_VIEW_SETTINGS_CHANGED":
        {
          // save payload items to local storages
          LSU.save('transverseView', action.payload);
          
          return Object.assign({}, state, action.payload);
        }
      case "TRANSVERSE_VIEW_SETTINGS_RESET":
        {
          // clear local storage settings
          LSU.remove('transverseView');
          
          return Object.assign({}, {
            useOffsets: true,
            useScaling: true,
            scaling: 60
          });
        }
    }
    return state;
  }  
}