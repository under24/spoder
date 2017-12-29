'use strict';

let viewOffsetsReducerInitState = {
  1: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  2: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  3: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  4: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  5: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  6: {
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  }
}

const viewOffsetsReducer = (state = viewOffsetsReducerInitState, action) => {
  switch (action.type) {
    case "SEQUENCE_SHIFTED_XY_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          
          let payload = {};
          
          if (action.payload[legId].transverseBaseX)
            payload.transverseAnimationViewOffsetX = state[legId].transverseAnimationViewOffsetX + action.payload[legId].transverseBaseX;
          
          if (action.payload[legId].transverseBaseY)
            payload.transverseAnimationViewOffsetY = state[legId].transverseAnimationViewOffsetY + action.payload[legId].transverseBaseY;
          
          newState[legId] = Object.assign({}, state[legId], payload);
        }
        return Object.assign({}, state, newState);
      }
  }
  return state;
}