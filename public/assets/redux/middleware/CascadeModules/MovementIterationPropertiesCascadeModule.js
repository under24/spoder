'use strict';

try {
  var CascadeModule = require('../../../spodux/CascadeModule.js');
}
catch(e) {}

class MovementIterationPropertiesCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      movementIterationProperties: 'movement.iteration.properties',
      movementSettings: 'movement.settings'
    };
    
    this.observers = [
      `processNewMovementIterationProperties(movementIterationProperties :currentTick, movementSettings :tps :duration :gait :sequencerMode)`
    ];
    
    this._prepareModule();
  }
  
  processNewMovementIterationProperties(movementIterationProperties, movementSettings) {
    // validation. do not apply movement settings in mid iteration. wait for the next iteration (currentTick === 0)
    if (movementIterationProperties.currentTick !== 0) return;
    
    var newMovementIterationProperties = Object.assign({}, movementIterationProperties, {
      // state.movement.iteration.properties.amountOfTicks
      amountOfTicks: +(movementSettings.duration / (1000 / movementSettings.tps)).toFixed(0),
      // state.movement.iteration.properties.tps
      tps: movementSettings.tps,
      // state.movement.iteration.properties.duration
      duration: movementSettings.duration,
      // state.movement.iteration.properties.gait
      gait: movementSettings.gait,
      // state.movement.iteration.properties.sequencerMode
      sequencerMode: movementSettings.sequencerMode
    });
    
    return { 'movement.iteration.properties': newMovementIterationProperties };
  }

}

// node environment export
try { module.exports = MovementIterationPropertiesCascadeModule }
catch(e) {}