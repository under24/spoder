'use strict';

{
  let socketReducerInitState = {
    connected: false
  };

  var socketReducer = (state = socketReducerInitState, action) => {
    switch (action.type) {
      case "SOCKET_STATUS_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  }  
}

// node environment export
try { module.exports = socketReducer }
catch(e) {}