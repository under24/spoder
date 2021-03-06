'use strict';

var LogicReducer = require('../LogicReducer.js');

class MovementIterationPropertiesLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processMovementIterationProperties(MOVEMENT_ITERATION_PROPERTIES_CHANGED)'
    ];
    
    this._prepareModule();
  }
  
  processMovementIterationProperties(payload) {
    var oldMovementIterationProperties = this.resolveStatePath('movement.iteration.properties');
    
    var newMovementIterationProperties = Object.assign({}, oldMovementIterationProperties, payload);
    
    return { 'movement.iteration.properties': newMovementIterationProperties };
  }

}

module.exports = (store) => new MovementIterationPropertiesLogicReducer(store);