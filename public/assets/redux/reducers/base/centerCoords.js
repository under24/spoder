'use strict';

{
  let baseCenterCoordsReducerInitState = {
    x: null,
    y: null
  };

  var baseCenterCoordsReducer = (state = baseCenterCoordsReducerInitState, action) => {
    // switch (action.type) {
    //   case "BASE_CENTER_COORDS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('base.centerCoords' in action) {
      var stateChange = action['base.centerCoords'];
      
      delete action['base.centerCoords'];
      
      return stateChange;
    }
    return state;
  }
}