'use strict';

var LogicReducer = require('../LogicReducer.js');

class MovementSettingsLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processMovementSettings(MOVEMENT_SETTINGS_CHANGED)'
    ];
    
    this._prepareModule();
  }
  
  // custom: {
  //   blueprint: {},
  //   duration: 1000,
  //   tps: 60,
  //   loop: false, // will switch back to sequencerMode: 'movement' when the iteration is complete
  //   sequencerEnabled: true,
  //   type: 'center'
  // }
  
  processMovementSettings(payload) {
    var oldMovementSettings = this.resolveStatePath('movement.settings');
    
    var newMovementSettings = Object.assign({}, oldMovementSettings, payload);
    
    return { 'movement.settings': newMovementSettings };
  }

}

module.exports = MovementSettingsLogicReducer;