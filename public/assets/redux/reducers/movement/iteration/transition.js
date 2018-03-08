'use strict';

{
  let movementIterationTransitionReducerInitState = {
    transitionShift: null,
    transitionShiftSource: null
  };

  var movementIterationTransitionReducer = (state = movementIterationTransitionReducerInitState, action) => {
    // switch (action.type) {
    //   case "MOVEMENT_ITERATION_TRANSITION_CHANGED":
    //     {
    //       return action.payload;
    //     }
    // }
    if ('movement.iteration.transition' in action) {
      var newState = action['movement.iteration.transition'];
      
      delete action['movement.iteration.transition'];
      
      return newState;
    }
    return state;
  };  
}
