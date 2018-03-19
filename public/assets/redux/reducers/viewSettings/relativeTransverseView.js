'use strict';

{
  let viewSettingsRelativeTransverseViewReducerInitState = {
    legId: 1,
    useOffsets: true,
    useScaling: false,
    scaling: 70,
    showFluentMovementCircle: true,
    showMovementPointer: true,
    showInvalidRange: true,
    showLegSelector: true,
    showReachRadius: true,
    showFluentTransverseBaseXY: true,
    showSolidMovementCircle: true
  };
  
  // {
  //   // get settings from local storage
  //   let localSettings = LSU.get('relativeTransverseView');
  //   // if some settings are present
  //   if (localSettings)
  //     // merge them with the init state
  //     viewSettingsRelativeTransverseViewReducerInitState = Object.assign({}, viewSettingsRelativeTransverseViewReducerInitState, JSON.parse(localSettings));
  // }

  var viewSettingsRelativeTransverseViewReducer = (state = viewSettingsRelativeTransverseViewReducerInitState, action) => {
    if ('viewSettings.relativeTransverseView' in action) {
      var stateChange = action['viewSettings.relativeTransverseView'];
      
      delete action['viewSettings.relativeTransverseView'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = viewSettingsRelativeTransverseViewReducer }
catch(e) {}