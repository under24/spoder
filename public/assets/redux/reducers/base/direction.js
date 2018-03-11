'use strict';

{
  let baseDirectionReducerInitState = null;

  var baseDirectionReducer = (state = baseDirectionReducerInitState, action) => {
    // switch (action.type) {
    //   case "BASE_DIRECTION_CHANGED":
    //     {
    //       return action.payload;
    //     }
    // }
    if ('base.direction' in action) {
      var stateChange = action['base.direction'];
      
      delete action['base.direction'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = baseDirectionReducer }
catch(e) {}