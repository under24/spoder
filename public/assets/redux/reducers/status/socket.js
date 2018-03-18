'use strict';

{
  let socketReducerInitState = {
    connected: false
  };

  var socketReducer = (state = socketReducerInitState, action) => {
    if ('status.socket' in action) {
      var stateChange = action['status.socket'];
      
      delete action['status.socket'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = socketReducer }
catch(e) {}