'use strict';

class StateObserver extends StateModule {
  
  constructor(store) {
    // save referrence to the store in LogicReducer.store
    LogicReducer.store = store;
    
    // subscribe properties
    // store.subscribe
    
    this.properties = {
      a: 1
    };
  }
  
  
  
}
