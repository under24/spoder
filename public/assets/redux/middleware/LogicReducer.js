'use strict';

class LogicReducer {
  
  constructor(store) {
    // save referrence to the store in LogicReducer.store
    LogicReducer.store = store;
  }
  
  getState() {
    return LogicReducer.store.getState();
  }
  
  // [props...]
  syncProps(props) {
    // array is passed
    if (props) {
      for (let i = 0; i < props.length; i++) {
        let propName = props[i],
            propStatePath = this.properties[propName],
            propStateValue = this.resolvePath(propStatePath);
        
        this[propName] = this.resolvePath(propStatePath);
      }
    }
    // no argument is passed
    else {
      for (let key in this.properties) {
        let propName = key,
            propStatePath = this.properties[propName],
            propStateValue = this.resolvePath(propStatePath);
            
        this[propName] = propStateValue;
      }
    }
  }
  
  // [props...]
  flushProps(props) {
    // argument is passed
    if (props) {
      for (let i = 0; i < props.length; i++) {
        let propName = props[i];
        delete this[propName];
      }
    }
    // no argument is passed
    else {
      for (let propName in this.properties) {
        delete this[propName]; // this[propName] = undefined;
      }
    }
  }
  
  resolvePath(path) {
    var prop = this.getState();
    
    var pathParts = path.split('.');
    
    for (let i = 0; i < pathParts.length; i++) {
      let nextStep = pathParts[i];
      prop = prop[nextStep];
    }
    
    return prop;
  }
  
  getPropStateValue(propName) {
    // validation
    if (!this.properties[propName]) 
      throw new Error('no such propname in properties');
    
    // get property state path
    var propStatePath = this.properties[propName],
        // get property state value
        propStateValue = this.resolvePath(propStatePath);
        
    return propStateValue;
  }
  
  getPropPath(propName) {
    return this.properties[propName];
  }
  
}