'use strict';

try {
  var LogicReducer = require('../../../spodux/LogicReducer.js');
}
catch(e) {}

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

// node environment export
try { module.exports = MovementIterationPropertiesLogicReducer }
catch(e) {}