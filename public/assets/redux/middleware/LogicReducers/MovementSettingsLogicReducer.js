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
  
  processMovementSettings(payload) {
    var oldMovementSettings = this.resolveStatePath('movement.settings');
    
    var newMovementSettings = Object.assign({}, oldMovementSettings, payload);
    
    return { 'movement.settings': newMovementSettings };
  }

}

// node environment export
try { module.exports = MovementSettingsLogicReducer }
catch(e) {}