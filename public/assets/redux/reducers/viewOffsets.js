'use strict';

let viewOffsetsReducerInitState = {
  1: {
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  2: {
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  3: {
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  4: {
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  5: {
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  },
  6: {
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 0,
    sagittalViewOffsetX: 0,
    transverseAnimationViewOffsetX: 0,
    transverseAnimationViewOffsetY: 0
  }
}

const viewOffsetsReducer = (state = viewOffsetsReducerInitState, action) => {
  switch (action.type) {
    // case "VIEW_OFFSET_SHIFTED":
    //   {
    //     let newOffsets = {};
    //     // if (action.payload)
    //     
    //     return Object.assign(
    //       {}, 
    //       state,
    //       { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
    //     );
    //   }
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