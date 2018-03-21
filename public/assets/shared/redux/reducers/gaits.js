'use strict';

{  
  let gaitReducerInitState = {
    ripple: {
      sequence: [ [2,5], [3], [1,6], [4] ],
      sequenceTimings: [
        { startPct: 0, endPct: 25 },
        { startPct: 25, endPct: 50 },
        { startPct: 50, endPct: 75 },
        { startPct: 75, endPct: 100 }
      ],
      legTimings: {
        1: { startPct: 50, endPct: 75 },
        2: { startPct: 0, endPct: 25 },
        3: { startPct: 25, endPct: 50 },
        4: { startPct: 75, endPct: 100 },
        5: { startPct: 0, endPct: 25 },
        6: { startPct: 50, endPct: 75 }
      }
    },
    rippleReversed: {
      sequence: [ [4], [1,6], [3], [2,5] ],
      sequenceTimings: [
        { startPct: 0, endPct: 25 },
        { startPct: 25, endPct: 50 },
        { startPct: 50, endPct: 75 },
        { startPct: 75, endPct: 100 }
      ],
      legTimings: {
        1: { startPct: 25, endPct: 50 },
        2: { startPct: 75, endPct: 100 },
        3: { startPct: 50, endPct: 75 },
        4: { startPct: 0, endPct: 25 },
        5: { startPct: 75, endPct: 100 },
        6: { startPct: 25, endPct: 50 }
      }
    },
    ripple2: {
      sequence: [ [2], [5], [3], [1], [6], [4] ],
      sequenceTimings: [
        { startPct: 0, endPct: 16.6 },
        { startPct: 16.6, endPct: 33.3 },
        { startPct: 33.3, endPct: 50 },
        { startPct: 50, endPct: 66.6 },
        { startPct: 66.6, endPct: 83.3 },
        { startPct: 83.3, endPct: 100 },
      ],
      legTimings: {
        1: { startPct: 50, endPct: 66.6 },
        2: { startPct: 0, endPct: 16.6 },
        3: { startPct: 33.3, endPct: 50 },
        4: { startPct: 83.3, endPct: 100 },
        5: { startPct: 16.6, endPct: 33.3 },
        6: { startPct: 66.6, endPct: 83.3 }
      }
    },
    tripod: {
      sequence: [ [1, 4, 5], [2, 3, 6] ],
      sequenceTimings: [
        { startPct: 0, endPct: 50 },
        { startPct: 50, endPct: 100 },
      ],
      legTimings: {
        1: { startPct: 0, endPct: 50 },
        2: { startPct: 50, endPct: 100 },
        3: { startPct: 50, endPct: 100 },
        4: { startPct: 0, endPct: 50 },
        5: { startPct: 0, endPct: 50 },
        6: { startPct: 50, endPct: 100 }
      }
    },
    tripodReversed: {
      sequence: [ [2, 3, 6], [1, 4, 5] ],
      sequenceTimings: [
        { startPct: 0, endPct: 50 },
        { startPct: 50, endPct: 100 },
      ],
      legTimings: {
        1: { startPct: 50, endPct: 100 },
        2: { startPct: 0, endPct: 50 },
        3: { startPct: 0, endPct: 50 },
        4: { startPct: 50, endPct: 100 },
        5: { startPct: 50, endPct: 100 },
        6: { startPct: 0, endPct: 50 }
      }
    }
  };

  var gaitReducer = (state = gaitReducerInitState, action) => {
    return state;
  };  
}

// node environment export
try { module.exports = gaitReducer }
catch(e) {}