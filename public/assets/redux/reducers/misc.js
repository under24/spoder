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
    if ('misc' in action) {
      var stateChange = action['misc'];
      
      delete action['misc'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = miscReducer }
catch(e) {}