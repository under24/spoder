'use strict';

{
  let socketReducerInitState = {
    connected: false
  };

  var socketReducer = (state = socketReducerInitState, action) => {
    // switch (action.type) {
    //   case "SOCKET_STATUS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
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