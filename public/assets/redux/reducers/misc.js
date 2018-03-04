'use strict';

{  
  let miscReducerInitState = {
    1: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    },
    2: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    },
    3: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    },
    4: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    },
    5: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    },
    6: {
      sagittalAngle: null,
      sagittalBoundaryBallCoords: null,
      sagittalDiff: null,
      sagittalDistance: null,
      transverseLegLength: null,
      transverseReachCoords: null,
      transverseReachRadius: null
    }
  };

  var miscReducer = (state = miscReducerInitState, action) => {
    // switch (action.type) {
    //   case "MISC_CHANGED_BATCHED":
    //     {
    //       let newState = {};
    // 
    //       for (let legId in action.payload) {
    //         newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
    //       }
    // 
    //       return Object.assign({}, state, newState);
    //     }
    // }
    if ('misc' in action) {
      var newState = action['misc'];
      
      delete action['misc'];
      
      return newState;
    }
    return state;
  }  
}