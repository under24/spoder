'use strict';

{
  let angleReducerInitState = {
    1: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    },
    2: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    },
    3: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    },
    4: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    },
    5: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    },
    6: {
      coxaScreenAngle: null,
      coxaServoAngle: null,
      femurScreenAngle: null,
      femurServoAngle: null,
      tibiaScreenAngle: null,
      tibiaServoAngle: null
    }
  };

  var angleReducer = (state = angleReducerInitState, action) => {
    // switch (action.type) {
    //   case "ANGLES_CHANGED_BATCHED":
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
    if ('angles' in action) {
      var stateChange = action['angles'];
      
      delete action['angles'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = angleReducer }
catch(e) {}