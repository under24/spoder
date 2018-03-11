'use strict';

{
  let movementIterationBlueprintReducerInitState = null;

  var movementIterationBlueprintReducer = (state = movementIterationBlueprintReducerInitState, action) => {
    // switch (action.type) {
    //   case "MOVEMENT_ITERATION_BLUEPRINT_CHANGED":
    //     {
    //       // action.payload is a blueprint which is create every time anew
    //       return action.payload;
    //     }
    // }
    if ('movement.iteration.blueprint' in action) {
      var stateChange = action['movement.iteration.blueprint'];
      
      delete action['movement.iteration.blueprint'];
      
      return stateChange;
    }
    return state;
  };  
}

// node environment export
try { module.exports = movementIterationBlueprintReducer }
catch(e) {}