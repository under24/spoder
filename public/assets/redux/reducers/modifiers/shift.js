'use strict';

let shiftReducerInitState = {
  x: 0,
  normalizedX: 0,
  y: 0,
  normalizedY: 0,
  normalizer: 0.7, // x: 100 -> normalizedX/Y: 70
  appliedTo: 'transverseBaseXY'
}

const shiftReducer = (state = shiftReducerInitState, action) => {
  switch (action.type) {
    case "SHIFT_MODIFIER_CHANGED":
      {
        // calc normalized x (joystick x * normalizer)
        let normalizedX = MU.normalize(action.payload.x, state.normalizer),
            // calc normalized y  (joystick y * normalizer)
            normalizedY = MU.normalize(action.payload.y, state.normalizer);
        
        return Object.assign({}, state, action.payload, { normalizedX, normalizedY });
      }
  }
  return state;
}