'use strict';

{
  let viewSettingsRelativeSagittalViewReducerInitState = {
    legId: 1,
    useOffsets: true,
    useScaling: false,
    scaling: 70
  };

  {
    // get settings from local storage
    let localSettings = LSU.get('relativeSagittalView');
    // if some settings are present
    if (localSettings) {
      // merge them with the init state
      viewSettingsRelativeSagittalViewReducerInitState = Object.assign({}, viewSettingsRelativeSagittalViewReducerInitState, JSON.parse(localSettings));
    }  
  }

  var viewSettingsRelativeSagittalViewReducer = (state = viewSettingsRelativeSagittalViewReducerInitState, action) => {
    switch (action.type) {
      case "RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED":
        {
          // save payload items to local storages
          LSU.save('relativeSagittalView', action.payload);
          
          return Object.assign({}, state, action.payload);
        }
      case "RELATIVE_SAGITTAL_VIEW_SETTINGS_RESET":
        {
          // clear local storage settings
          LSU.remove('relativeSagittalView');
          
          return Object.assign({}, {
            legId: 1,
            useOffsets: true,
            useScaling: false,
            scaling: 70
          });
        }
    }
    return state;
  }
}