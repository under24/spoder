'use strict';

{
  let viewSettingsCoronalViewReducerInitState = {
    useOffsets: true,
    useScaling: true,
    scaling: 60
  };
  
  // {
  //   // get settings from local storage
  //   let localSettings = LSU.get('coronalView');
  //   // if some settings are present
  //   if (localSettings)
  //     // merge them with the init state
  //     viewSettingsCoronalViewReducerInitState = Object.assign({}, viewSettingsCoronalViewReducerInitState, JSON.parse(localSettings));
  // }

  var viewSettingsCoronalViewReducer = (state = viewSettingsCoronalViewReducerInitState, action) => {
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