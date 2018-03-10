'use strict';

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