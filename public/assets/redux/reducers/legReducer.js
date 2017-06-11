'use strict';

let legInitState = {
  1: {
    // IDs
    legId: 1,
    coxaServoN: 1,
    femurServoN: 2,
    tibiaServoN: 3,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'left',
    row: 'front'
  },
  2: {
    // IDs
    legId: 2,
    coxaServoN: 4,
    femurServoN: 5,
    tibiaServoN: 6,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'right',
    row: 'front'
  },
  3: {
    // IDs
    legId: 3,
    coxaServoN: 7,
    femurServoN: 8,
    tibiaServoN: 9,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'left',
    row: 'middle'
  },
  4: {
    // IDs
    legId: 4,
    coxaServoN: 10,
    femurServoN: 11,
    tibiaServoN: 12,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'right',
    row: 'middle'
  },
  5: {
    // IDs
    legId: 5,
    coxaServoN: 13,
    femurServoN: 14,
    tibiaServoN: 15,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'left',
    row: 'back'
  },
  6: {
    // IDs
    legId: 6,
    coxaServoN: 16,
    femurServoN: 17,
    tibiaServoN: 18,
    // angles
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null,
    // side
    side: 'right',
    row: 'back'
  }
}
const legReducer = (state = legInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      return Object.assign(
        {}, 
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
      );
  }
  return state;
}