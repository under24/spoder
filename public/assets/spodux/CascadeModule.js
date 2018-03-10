'use strict';

class CascadeModule extends StateModule {
  
  processState(stateChange) {
    this._rememberStateChange(stateChange);
    
    // iterate observers
    this._parsedObservers.forEach(observer => {
      // determine if the current observer should be called
      // if not then quit and proceed to the next observer
      if (!this._isObserverTriggered(observer)) return;
      
      // resolve dependencies. paths -> values
      let handlerArguments = this._resolveDependencies(observer.dependencies);
      
      // call handler with the dependency values
      var handlerResult = this[observer.handler](...handlerArguments);
      
      if (!handlerResult) {
        if (this.settings && this.settings.consoleLogging)
          console.log(`${handler} returned empty value`);
        
        // nothing to merge. proceed to the next observer
        return;
      }
      
      // merge stateChange with the handler result
      Object.assign(this._stateChange, handlerResult);
    });
    
    this._forgetStateChange();
  }
  
  _parseObserver(observer) {
    // trim spaces
    observer = observer.replace(/[\r\n\ ]/g, '');
    
    return {
      // observer handler
      handler: observer.slice(0, observer.indexOf('(')),
      // observer dependencies
      dependencies: observer.slice(observer.indexOf('(') + 1, observer.indexOf(')')).split(',')
    };
  }
  
  _rememberStateChange(stateChange) {
    this._stateChange = stateChange;
  }
  
  _forgetStateChange() {
    delete this._stateChange;
  }
  
  resolvePath(path) {
    // if dependency is present in the stateChange
    if (path in this._stateChange)
      // pull it from there
      return this._stateChange[path];
    // dependency is not in the stateChange
    else
      // take it from the state
      return this.resolveStatePath(path);
  }
  
  _parseDependencySpecifiers(dependency) {
    return dependency.split(":").slice(1);
  }
  
  _fixComplexDependency(dependency) {
    return dependency.slice(0, dependency.indexOf(":"));
  }
  
  _prepareModule() {
    // for every observer create a parsed object which contains parsed data about current observer
    this._parsedObservers = this.observers.map(observer => {
      // get handler and dependencies array of the observer
      var { handler, dependencies } = this._parseObserver(observer);
      
      // create an object for storing specifiers for dependencies
      var specifiers = {};
      
      // transform dependency properties into dependency paths
      dependencies = dependencies.map(dependency => {
        // if current dependency has specifiers
        if (dependency.indexOf(':') !== -1) {
          // get an array of specifiers of the dependency
          let currentSpecifiers = this._parseDependencySpecifiers(dependency);
          // remove specifiers from the dependency string
          dependency = this._fixComplexDependency(dependency);
          // get the path of the dependency
          var path = this._getPropPath(dependency);
          // save specifiers of the current dependency
          specifiers[path] = currentSpecifiers;
        }
        // dependency with no specifiers
        else
          // get the path of the dependency
          var path = this._getPropPath(dependency);
          
        // return the path of the dependency
        return path;
      });
      
      // save parsed observer into this._parsedObservers array
      return { handler, dependencies, specifiers };
    });
  }
  
  _isObserverTriggered(observer) {
    return observer.dependencies.some(dependency => {
      // check if the current dependency is present in the state change
      if (dependency in this._stateChange) {
        
        // pull specifiers from the dependency (if any)
        let dependencySpecifiers = this._dependencyHasSpecifiers(observer, dependency);
        
        // if the dependency has specifiers
        if (dependencySpecifiers)
          // return true or false based on the specifiers changed
          return this._specifiersChanged(dependencySpecifiers, this.resolveStatePath(dependency), this._stateChange[dependency]);
        // dependency has no specifiers
        else
          // current dependency is present in state change
          return true;
      }
      else
        // dependency is not present in state change
        return false;
    });
  }
  
  _dependencyHasSpecifiers(observer, dependency) {
    return observer.specifiers[dependency];
  }
  
  _specifiersChanged(specifiers, oldState, newState) {
    return specifiers.some(specifier => {
      // check if the specifier changed
      if (oldState[specifier] !== newState[specifier])
        // specifier changed
        return true;
      else
        // specifier is the same
        return false;
    });
  }
  
  _resolveDependencies(dependencies) {
    return dependencies.map(dependency => {
    	return this.resolvePath(dependency);
    });
  }
  
}