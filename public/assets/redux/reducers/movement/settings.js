'use strict';

{
  let movementSettingsReducerInitState = {
    loop: true,
    sequencerEnabled: false,
    gait: 'ripple',
    tps: 60,
    duration: 750,
    sequencerMode: 'movement', // possible values: 'movement', 'custom'
    customBlueprint: null
  };

  var movementSettingsReducer = (state = movementSettingsReducerInitState, action) => {
    switch (action.type) {
      case "MOVEMENT_SETTINGS_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  };  
}