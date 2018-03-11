'use strict';

{
  let movementSettingsReducerInitState = {
    loop: null,
    sequencerEnabled: null,
    gait: null,
    tps: null,
    duration: null,
    sequencerMode: null, // possible values: 'movement', 'custom'
    customBlueprint: null
  };

  var movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
    // switch (action.type) {
    //   case "MOVEMENT_SETTINGS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('movement.settings' in action) {
      var stateChange = action['movement.settings'];
      
      delete action['movement.settings'];
      
      return stateChange;
    }
    return state;
  };  
}

// node environment export
try { module.exports = movementSettingsReducer }
catch(e) {}