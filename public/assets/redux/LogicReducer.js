'use strict';

class LogicReducer extends StateModule {
  
  processAction(action, newState) {
    var actionTypes = [];
    var actionHandlers = [];
    
    this.actionTypes.forEach(actionType => {
      var { action, handler } = this._parseActionType(actionType);
      
      actionTypes.push(action);
      actionHandlers.push(handler);
    });
    
    var ind = actionTypes.indexOf(action.type);
    
    if (ind !== -1) {
      var result = this[actionHandlers[ind]](action.payload);
      
      if (!result) {
        console.warn('action handler return empty object');
        return;
      };
      
      // merge newState with a new branch generated by the observer
      Object.assign(newState, result);
    }
  }
  
  _parseActionType(observer) {
    // trim spaces
    observer = observer.replace(/ /g, '');
    
    return {
      // observer handler
      handler: observer.slice(0, observer.indexOf('(')),
      // observer dependencies
      action: observer.slice(observer.indexOf('(') + 1, observer.indexOf(')'))
    };
  }
  
}