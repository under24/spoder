'use strict';

var CascadeModule = require('../CascadeModule.js');

class MovementIterationPropertiesCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.settings = {
      disableConsoleLogging: true
    };
    
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
      amountOfTicks: +(movementSettings.duration / (1000 / movementSettings.tps)).toFixed(0), // state.movement.iteration.properties.amountOfTicks
      tps: movementSettings.tps, // state.movement.iteration.properties.tps
      duration: movementSettings.duration, // state.movement.iteration.properties.duration
      gait: movementSettings.gait, // state.movement.iteration.properties.gait
      sequencerMode: movementSettings.sequencerMode // state.movement.iteration.properties.sequencerMode
    });
    
    return { 'movement.iteration.properties': newMovementIterationProperties };
  }

}

module.exports = (store) => new MovementIterationPropertiesCascadeModule(store);