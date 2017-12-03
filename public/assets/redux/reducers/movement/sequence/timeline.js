'use strict';

let timelineReducerInitState = null;

const timelineReducer = (state = timelineReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_SEQUENCE_TIMELINE_CHANGED":
      {
        // do not marge with the state because we want to remove missing legs from the obj
        return Object.assign({}, action.payload);
      }
  }
  return state;
}