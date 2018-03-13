'use strict';

{
  let viewSettingsCoronalViewReducerInitState = {
    useOffsets: true,
    useScaling: true,
    scaling: 60
  };
  
  {
    // get settings from local storage
    let localSettings = LSU.get('coronalView');
    // if some settings are present
    if (localSettings)
      // merge them with the init state
      viewSettingsCoronalViewReducerInitState = Object.assign({}, viewSettingsCoronalViewReducerInitState, JSON.parse(localSettings));
  }

  var viewSettingsCoronalViewReducer = (state = viewSettingsCoronalViewReducerInitState, action) => {
    // switch (action.type) {
    //   case "CORONAL_VIEW_SETTINGS_CHANGED":
    //     {
    //       // save payload items to local storage
    //       LSU.save('coronalView', action.payload);
    //       
    //       return Object.assign({}, state, action.payload);
    //     }
    //   case "CORONAL_VIEW_SETTINGS_RESET":
    //     {
    //       // clear local storage settings
    //       LSU.remove('coronalView');
    //       
    //       return Object.assign({}, {
    //         useOffsets: true,
    //         useScaling: true,
    //         scaling: 60
    //       });
    //     }
    // }
    if ('viewSettings.coronalView' in action) {
      var stateChange = action['viewSettings.coronalView'];
      
      delete action['viewSettings.coronalView'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = viewSettingsCoronalViewReducer }
catch(e) {}