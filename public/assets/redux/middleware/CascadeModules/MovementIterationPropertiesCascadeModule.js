'use strict';

class MovementIterationPropertiesCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      movementIterationProperties: 'movement.iteration.properties',
      movementSettings: 'movement.settings'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'processNewMovementIterationProperties(movementIterationProperties, movementSettings)',
    ];
  }
  
  processNewMovementIterationProperties(movementIterationProperties, movementSettings) {
    debugger;
    return;
    // validation. update "movement.iteration.properties" only when the currentTick is 0
    // because you cannot change iteration values in mid iteration
    if (iterationProperties.currentTick !== 0) return;
    
    if (newSettings.tps === oldSettings.tps &&
        newSettings.duration === oldSettings.duration &&
        newSettings.gait === oldSettings.gait &&
        newSettings.sequencerMode === oldSettings.sequencerMode) return;
        
    debugger;
  }

}