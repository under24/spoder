'use strict';

class StateModule {
  
  constructor(store) {
    // save referrence to the store in StateModule.store
    StateModule.store = store;
  }
  
  _getState() {
    return StateModule.store.getState();
  }
  
  // [props...]
  // syncProps(props) {
  //   // array is passed
  //   if (props) {
  //     for (let i = 0; i < props.length; i++) {
  //       let propName = props[i],
  //           propStatePath = this._getPropPath(propName),
  //           propStateValue = this.resolveStatePath(propStatePath);
  //       
  //       this[propName] = propStateValue;
  //     }
  //   }
  //   // no argument is passed
  //   else {
  //     for (let key in this.properties) {
  //       let propName = key,
  //           propStatePath = this._getPropPath(propName),
  //           propStateValue = this.resolveStatePath(propStatePath);
  //           
  //       this[propName] = propStateValue;
  //     }
  //   }
  // }
  
  // [props...]
  // flushProps(props) {
  //   // argument is passed
  //   if (props) {
  //     for (let i = 0; i < props.length; i++) {
  //       let propName = props[i];
  //       delete this[propName];
  //     }
  //   }
  //   // no argument is passed
  //   else {
  //     for (let propName in this.properties) {
  //       delete this[propName]; // this[propName] = undefined;
  //     }
  //   }
  // }
  
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
  
  // _getPropPath(propName) {
  //   // notify that there is no such prop declared
  //   if (!(propName in this.properties))
  //     console.warn('no such property in the properties:', propName);
  //   
  //   return this.properties[propName];
  // }
  
}

// node environment export
try { module.exports = StateModule }
catch(e) {}