'use strict';

{
  let rotationReducerInitState = {
    x: 0,
    normalizer: 0.3, // x: 100 -> normalizedX: 30
    normalizedX: 0,
    appliedTo: 'transverseBaseXY'
  }

  var rotationReducer = (state = rotationReducerInitState, action) => {
    switch (action.type) {
      case "ROTATION_MODIFIER_CHANGED":
        {
          // calc normalized x (joystick value * normalizer)
          let normalizedX = MU.normalize(action.payload.x, state.normalizer);
          
          return Object.assign({}, state, action.payload, { normalizedX });
        }
    }
    return state;
  }
}