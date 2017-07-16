'use strict';

let viewOffsetsReducerInitState = {
  1: {
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  },
  2: {
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  },
  3: {
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  },
  4: {
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  },
  5: {
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  },
  6: {
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
  }
}

const viewOffsetsReducer = (state = viewOffsetsReducerInitState, action) => {
  switch (action.type) {
    case "a":
      
  }
  return state;
}