'use strict';

class MovementSettingsLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionTypes = [
      'processMovementSettings(MOVEMENT_SETTINGS_CHANGED)'
    ];
  }
  
  processMovementSettings(payload) {
    var oldMovementSettings = this.resolveStatePath('movement.settings');
    
    var newMovementSettings = Object.assign({}, oldMovementSettings, payload);
    
    return { 'movement.settings': newMovementSettings };
  }

}