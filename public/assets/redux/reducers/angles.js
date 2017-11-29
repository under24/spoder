'use strict';

let angleReducerInitState = {
  1: {
    legId: 1,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  2: {
    legId: 2,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  3: {
    legId: 3,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  4: {
    legId: 4,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  5: {
    legId: 5,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  6: {
    legId: 6,
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  }
}

const angleReducer = (state = angleReducerInitState, action) => {
  switch (action.type) {
    case "ANGLES_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
        }
        
        return Object.assign({}, state, newState);
      }
  }
  return state;
}