'use strict';

{
  let privilegeReducerInitState = {
    authority: 'spectator'
  };

  var privilegeReducer = (state = privilegeReducerInitState, action) => {
    // switch (action.type) {
    //   case "PRIVILEGES_STATUS_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('status.privileges' in action) {
      var stateChange = action['status.privileges'];
      
      delete action['status.privileges'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = privilegeReducer }
catch(e) {}