'use strict';

{
  let baseCenterCoordsReducerInitState = {
    x: null,
    y: null
  };

  var baseCenterCoordsReducer = (state = baseCenterCoordsReducerInitState, action) => {
    if ('base.centerCoords' in action) {
      var stateChange = action['base.centerCoords'];
      
      delete action['base.centerCoords'];
      
      return stateChange;
    }
    return state;
  }
}

// node environment export
try { module.exports = baseCenterCoordsReducer }
catch(e) {}