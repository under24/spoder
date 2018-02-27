'use strict';

{
  let authorizationReducerInitState = {
    permission: false
  };

  var authorizationReducer = (state = authorizationReducerInitState, action) => {
    switch (action.type) {
      case "AUTHORIZATION_STATUS_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  }  
}