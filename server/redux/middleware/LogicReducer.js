'use strict';

try {
  var StateModule = require('../../../public/assets/shared/StateModule.js');
}
catch(e) {}

class LogicReducer extends StateModule {
  
  processAction(action, stateChange) {
    // check if the action belongs to this logic reducer
    var actionTypeId = this._parsedActionObservers.actionTypes.indexOf(action.type);
    
    // action type does not belong to this action reducer. bail.
    if (actionTypeId === -1) return;
    
    // call corresponding action handler if the match is found
    var actionHandler = this._parsedActionObservers.actionHandlers[actionTypeId];
    var handlerResult = this[actionHandler](action.payload, action);
    
    // if the handler returned empty values then bail
    if (!handlerResult) {
      console.warn('action handler returned no data');
      return;
    }
    
    // merge stateChange with the handler return data
    Object.assign(stateChange, handlerResult);
  }
  
  _parseActionObserver(actionObserver) {
    // trim spaces
    actionObserver = actionObserver.replace(/[\r\n\ ]/g, '');
    
    return {
      // action handler
      handler: actionObserver.slice(0, actionObserver.indexOf('(')),
      // action type
      type: actionObserver.slice(actionObserver.indexOf('(') + 1, actionObserver.indexOf(')'))
    };
  }
  
  _prepareModule() {
    // prepare data structure
    this._parsedActionObservers = {
      actionTypes: [],
      actionHandlers: []
    };
    
    this.actionObservers.forEach(actionObserver => {
      var { handler, type } = this._parseActionObserver(actionObserver);
      
      this._parsedActionObservers.actionTypes.push(type);
      this._parsedActionObservers.actionHandlers.push(handler);
    });
  }
  
}

// node environment export
try { module.exports = LogicReducer }
catch(e) {}