'use strict';

var StateModule = require('../../../public/assets/shared/StateModule.js');

class StateObserver extends StateModule {
  
  _prepareModule() {
    // save every dependency path in this array
    this._parsedDependencies = [];
    
    // for every observer create a parsed object which contains parsed data about current observer
    this._parsedObservers = this.observers.map(observer => {
      // get handler and dependencies array of the observer
      var { handler, dependencies } = this._parseObserver(observer);
      
      // transform dependency properties into dependency paths
      dependencies = dependencies.map(dependency => {
        // get the path of the dependency
        return this._getPropPath(dependency);
      });
      
      // add dependency paths to the _parsedDependencies array
      this._parsedDependencies = [...this._parsedDependencies, ...dependencies];
      
      // save parsed observer into this._parsedObservers array
      return { handler, dependencies };
    });
    
    // init prev values object
    this._oldProps = {};
    // init current values object
    this._newProps = {};
    
    // subscribe for state changes
    this._subscribe();
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
  
  _subscribe() {
    StateObserver.store.subscribe(this._onStateChange.bind(this));
  }
  
  _onStateChange() {
    // fill in this._newProps object
    this._pullNewProps();
    
    // iterate observers
    this._parsedObservers.forEach(observer => {
      // determine if the current observer should be called
      // if not then quit and proceed to the next observer
      if (!this._observerTriggered(observer.dependencies)) return;
      
      // prepare observer arguments
      var args = this._prepareHandlerArgs(observer.dependencies);
      // call the observer
      this[observer.handler](...args);
    });
    
    // flush corrent iteration new props
    this._makeNewPropsObsolete();
  }
  
  _observerTriggered(dependencies) {
    // check if some of the dependencies have changed
    return dependencies.some(dependency => {
      if (this._oldProps[dependency] !== this._newProps[dependency])
        // property is different -> observer triggered
        return true;
      
      // property is the same
      return false;
    });
  }
  
  _prepareHandlerArgs(dependencies) {
    return dependencies.map(dependency => {
      return {
        old: this._oldProps[dependency],
        new: this._newProps[dependency]
      };
    });
  }
  
  _makeNewPropsObsolete() {
    this._oldProps = this._newProps;
    this._newProps = {};
  }
  
  _pullNewProps() {
    this._parsedDependencies.forEach(dependency => {
      this._newProps[dependency] = this.resolveStatePath(dependency);
    });
  }
  
}

module.exports = StateObserver;