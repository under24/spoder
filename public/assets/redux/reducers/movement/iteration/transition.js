'use strict';

{
  let movementIterationTransitionReducerInitState = {
    transitionShift: null,
    transitionShiftSource: null
  };

  var movementIterationTransitionReducer = (state = movementIterationTransitionReducerInitState, action) => {
    switch (action.type) {
      case "MOVEMENT_ITERATION_TRANSITION_CHANGED":
        {
          return action.payload;
        }
    }
    return state;
  };  
}
