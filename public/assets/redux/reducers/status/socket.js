'use strict';

{
  let socketReducerInitState = {
    connected: true
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