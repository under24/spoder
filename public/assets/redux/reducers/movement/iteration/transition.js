'use strict';

{
  let movementIterationTransitionReducerInitState = null;

  var movementIterationTransitionReducer = (state = movementIterationTransitionReducerInitState, action) => {
    if ('movement.iteration.transition' in action) {
      var stateChange = action['movement.iteration.transition'];
      
      delete action['movement.iteration.transition'];
      
      return stateChange;
    }
    return state;
  };  
}

// node environment export
try { module.exports = movementIterationTransitionReducer }
catch(e) {}