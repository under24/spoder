'use strict';

{
  let viewSettingsRelativeSagittalViewReducerInitState = {
    legId: 1,
    useOffsets: true,
    useScaling: false,
    scaling: 70
  };

  // {
  //   // get settings from local storage
  //   let localSettings = LSU.get('relativeSagittalView');
  //   // if some settings are present
  //   if (localSettings)
  //     // merge them with the init state
  //     viewSettingsRelativeSagittalViewReducerInitState = Object.assign({}, viewSettingsRelativeSagittalViewReducerInitState, JSON.parse(localSettings));
  // }

  var viewSettingsRelativeSagittalViewReducer = (state = viewSettingsRelativeSagittalViewReducerInitState, action) => {
    if ('viewSettings.relativeSagittalView' in action) {
      var stateChange = action['viewSettings.relativeSagittalView'];
      
      delete action['viewSettings.relativeSagittalView'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = viewSettingsRelativeSagittalViewReducer }
catch(e) {}