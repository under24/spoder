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
      var newState = action['base.direction'];
      
      delete action['base.direction'];
      
      return newState;
    }
    return state;
  }
}