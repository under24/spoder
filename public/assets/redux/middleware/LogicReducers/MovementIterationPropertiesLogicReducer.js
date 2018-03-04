'use strict';

class MovementIterationPropertiesLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionTypes = [
      'processMovementIterationProperties(MOVEMENT_ITERATION_PROPERTIES_CHANGED)'
    ];
  }
  
  processMovementIterationProperties(payload) {
    var oldMovementIterationProperties = this.resolveStatePath('movement.iteration.properties');
    
    var newMovementIterationProperties = Object.assign({}, oldMovementIterationProperties, payload);
    
    return { 'movement.iteration.properties': newMovementIterationProperties };
  }

}
