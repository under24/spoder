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
      var newState = action['movement.iteration.blueprint'];
      
      delete action['movement.iteration.blueprint'];
      
      return newState;
    }
    return state;
  };  
}
