'use strict';

{
  let privilegeReducerInitState = {
    authority: 'spectator'
  };

  var privilegeReducer = (state = privilegeReducerInitState, action) => {
    switch (action.type) {
      case "PRIVILEGE_STATUS_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  }  
}
