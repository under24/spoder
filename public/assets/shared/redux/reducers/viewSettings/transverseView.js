'use strict';

{
  let viewSettingsTransverseViewReducerInitState = {
    useOffsets: true,
    useScaling: false,
    scaling: 60,
    showFluentTransverseBaseXY: false,
    showInvalidRange: false,
    showMovementPointer: false,
    showReachRadius: false,
    showFluentMovementCircle: false,
    showSolidMovementCircle: false
  };
  
  // {
  //   // get settings from local storage
  //   let localSettings = LSU.get('transverseView');
  //   // if some settings are present
  //   if (localSettings)
  //     // merge them with the init state
  //     viewSettingsTransverseViewReducerInitState = Object.assign({}, viewSettingsTransverseViewReducerInitState, JSON.parse(localSettings));
  // }

  var viewSettingsTransverseViewReducer = (state = viewSettingsTransverseViewReducerInitState, action) => {
    if ('viewSettings.transverseView' in action) {
      var stateChange = action['viewSettings.transverseView'];
      
      delete action['viewSettings.transverseView'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = viewSettingsTransverseViewReducer }
catch(e) {}