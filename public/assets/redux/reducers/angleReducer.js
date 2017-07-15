'use strict';

let angleReducerInitState = {
  1: {
    legId: 1,
    side: 'left',
    row: 'front',
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  2: {
    legId: 2,
    side: 'right',
    row: 'front',
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  3: {
    legId: 3,
    side: 'left',
    row: 'middle',
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  4: {
    legId: 4,
    side: 'right',
    row: 'middle',
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  5: {
    legId: 5,
    side: 'left',
    row: 'back',
    coxaScreenAngle: null,
    coxaServoAngle: null,
    femurScreenAngle: null,
    femurServoAngle: null,
    tibiaScreenAngle: null,
    tibiaServoAngle: null
  },
  6: {
    legId: 6,
    side: 'right',
    row: 'back',
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
    case "LEG_ANGLE_CHANGED":
      return Object.assign(
        {}, 
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload.angles) }
      );
  }
  return state;
}
