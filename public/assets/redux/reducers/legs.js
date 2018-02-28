'use strict';

{
  let legReducerInitState = {
    1: {
      legId: 1,
      coxaServoPIN: 1,
      femurServoPIN: 2,
      tibiaServoPIN: 3,
      side: 'left',
      row: 'front'
    },
    2: {
      legId: 2,
      coxaServoPIN: 4,
      femurServoPIN: 5,
      tibiaServoPIN: 6,
      side: 'right',
      row: 'front'
    },
    3: {
      legId: 3,
      coxaServoPIN: 7,
      femurServoPIN: 8,
      tibiaServoPIN: 9,
      side: 'left',
      row: 'middle'
    },
    4: {
      legId: 4,
      coxaServoPIN: 10,
      femurServoPIN: 11,
      tibiaServoPIN: 12,
      side: 'right',
      row: 'middle'
    },
    5: {
      legId: 5,
      coxaServoPIN: 13,
      femurServoPIN: 14,
      tibiaServoPIN: 15,
      side: 'left',
      row: 'back'
    },
    6: {
      legId: 6,
      coxaServoPIN: 16,
      femurServoPIN: 17,
      tibiaServoPIN: 18,
      side: 'right',
      row: 'back'
    }
  };
  
  var legReducer = (state = legReducerInitState, action) => {
    return state;
  }  
}