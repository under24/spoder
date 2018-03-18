'use strict';

{
  let privilegeReducerInitState = {
    authority: 'spectator'
  };

  var privilegeReducer = (state = privilegeReducerInitState, action) => {
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