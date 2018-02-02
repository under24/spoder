'use strict';

{
  let levelReducerInitState = {
    y: 0,
    normalizer: 1.5, // x: 100 -> normalizedY: 150
    normalizedY: 0,
    appliedTo: 'sagittalBaseY'
  }

  var levelReducer = (state = levelReducerInitState, action) => {
    switch (action.type) {
      case "LEVEL_MODIFIER_CHANGED":
        {
          // calc normalized y (joystick value * normalizer)
          let normalizedY = MU.normalize(action.payload.y, state.normalizer);
          
          return Object.assign({}, state, action.payload, { normalizedY });
        }
    }
    return state;
  }  
}