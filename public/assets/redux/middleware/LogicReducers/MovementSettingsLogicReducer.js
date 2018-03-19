'use strict';

// try {
//   var LogicReducer = require('../../../spodux/LogicReducer.js');
// }
// catch(e) {}

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

// node environment export
try { module.exports = MovementSettingsLogicReducer }
catch(e) {}