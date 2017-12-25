'use strict';

let customBlueprintReducerInitState = {
  raiseOneLeg: {
    1: [{
      coordType: 'sagittalCursorX',
      startPct: 0,
      endPct: 50,
      pxlsToMove: 50
    },
    {
      coordType: 'sagittalCursorX',
      startPct: 50,
      endPct: 100,
      pxlsToMove: -50
    }]
  },
  engage: {
    
  },
  disengage: {
    
  }
}

const customBlueprintReducer = (state = customBlueprintReducerInitState, action) => {
  switch (action.type) {
    // case "MISC_CHANGED_BATCHED":
    //   {
    //     let newState = {};
    // 
    //     for (let legId in action.payload) {
    //       newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
    //     }
    // 
    //     return Object.assign({}, state, newState);
    //   }
  }
  return state;
}
