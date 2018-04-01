'use strict';

class StateModule {
  
  constructor(store) {
    // save referrence to the store
    this.store = store;
  }
  
  _getState() {
    return this.store.getState();
  }
  
  _dispatch(action) {
    this.store.dispatch(action);
  }
  
  resolveStatePath(path) {
    var prop = this._getState();
    
    var pathParts = path.split('.');
    
    for (let i = 0; i < pathParts.length; i++) {
      let nextStep = pathParts[i];
      prop = prop[nextStep];
    }
    
    return prop;
  }
  
  // getPropStateValue(propName) {
  //   // validation
  //   if (!this.properties[propName])
  //     throw new Error('no such propname in properties');
  //   
  //   // get property state path
  //   var propStatePath = this._getPropPath(propName),
  //       // get property state value
  //       propStateValue = this.resolveStatePath(propStatePath);
  //       
  //   return propStateValue;
  // }
  
  _getPropPath(propName) {
    // notify that there is no such prop declared
    if (!(propName in this.properties))
      console.warn('no such property in the properties:', propName);
    
    return this.properties[propName];
  }
  
}

// node environment export
try { module.exports = StateModule }
catch(e) {}