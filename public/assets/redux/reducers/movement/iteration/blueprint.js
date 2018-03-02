'use strict';

{
  let movementIterationBlueprintReducerInitState = null;

  var movementIterationBlueprintReducer = (state = movementIterationBlueprintReducerInitState, action) => {
    switch (action.type) {
      case "MOVEMENT_ITERATION_BLUEPRINT_CHANGED":
        {
          // action.payload is a blueprint which is create every time anew
          return action.payload;
        }
    }
    return state;
  };  
}
