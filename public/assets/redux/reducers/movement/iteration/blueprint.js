'use strict';

{
  let movementIterationBlueprintReducerInitState = null;

  var movementIterationBlueprintReducer = (state = movementIterationBlueprintReducerInitState, action) => {
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