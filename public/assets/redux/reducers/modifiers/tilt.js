'use strict';

{
  let tiltReducerInitState = {
    x: 0,
    normalizedX: 0,
    y: 0,
    normalizedY: 0,
    normalizer: 0.25, // x: 100 -> normalizedX/Y: 25
    appliedTo: 'sagittalBaseY'
  };

  var tiltReducer = (state = tiltReducerInitState, action) => {
    // switch (action.type) {
    //   case "TILT_MODIFIER_CHANGED":
    //     {
    //       // calc normalized x (joystick x * normalizer)
    //       let normalizedX = MU.normalize(action.payload.x, state.normalizer),
    //           // calc normalized y  (joystick y * normalizer)
    //           normalizedY = MU.normalize(action.payload.y, state.normalizer);
    //       
    //       return Object.assign({}, state, action.payload, { normalizedX, normalizedY });
    //     }
    // }
    if ('modifiers.tilt' in action) {
      var newState = action['modifiers.tilt'];
      
      delete action['modifiers.tilt'];
      
      return newState;
    }
    return state;
  }
}