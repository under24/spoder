'use strict';

let legReducerInitState = {
  1: {
    legId: 1,
    coxaServoN: 1,
    femurServoN: 2,
    tibiaServoN: 3,
    side: 'left',
    row: 'front'
  },
  2: {
    legId: 2,
    coxaServoN: 4,
    femurServoN: 5,
    tibiaServoN: 6,
    side: 'right',
    row: 'front'
  },
  3: {
    legId: 3,
    coxaServoN: 7,
    femurServoN: 8,
    tibiaServoN: 9,
    side: 'left',
    row: 'middle'
  },
  4: {
    legId: 4,
    coxaServoN: 10,
    femurServoN: 11,
    tibiaServoN: 12,
    side: 'right',
    row: 'middle'
  },
  5: {
    legId: 5,
    coxaServoN: 13,
    femurServoN: 14,
    tibiaServoN: 15,
    side: 'left',
    row: 'back'
  },
  6: {
    legId: 6,
    coxaServoN: 16,
    femurServoN: 17,
    tibiaServoN: 18,
    side: 'right',
    row: 'back'
  }
}
const legReducer = (state = legReducerInitState, action) => {
  // switch (action.type) {
  //   case "a":
  //     
  // }
  return state;
}