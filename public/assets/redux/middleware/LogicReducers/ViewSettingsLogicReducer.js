'use strict';

// try {
//   var LogicReducer = require('../../../spodux/LogicReducer.js');
// }
// catch(e) {}

class ViewSettingsLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processCoronalViewSettingsChanged(CORONAL_VIEW_SETTINGS_CHANGED)',
      'processCoronalViewSettingsReset(CORONAL_VIEW_SETTINGS_RESET)',
      'processRelativeSagittalViewSettingsChanged(RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED)',
      'processRelativeSagittalViewSettingsReset(RELATIVE_SAGITTAL_VIEW_SETTINGS_RESET)',
      'processRelativeTransverseViewSettingsChanged(RELATIVE_TRANSVERSE_VIEW_SETTINGS_CHANGED)',
      'processRelativeTransverseViewSettingsReset(RELATIVE_TRANSVERSE_VIEW_SETTINGS_RESET)',
      'processTransverseViewSettingsChanged(TRANSVERSE_VIEW_SETTINGS_CHANGED)',
      'processTransverseViewSettingsReset(TRANSVERSE_VIEW_SETTINGS_RESET)'
    ];
    
    this._prepareModule();
  }
  
  processCoronalViewSettingsChanged(payload) {
    // save payload items to local storage
    LSU.save('coronalView', payload);
    
    var oldCoronalViewSettings = this.resolveStatePath('viewSettings.coronalView');
    
    return { 'viewSettings.coronalView': Object.assign({}, oldCoronalViewSettings, payload) };
  }
  
  processCoronalViewSettingsReset() {
    // clear local storage settings
    LSU.remove('coronalView');
    
    return {
      'viewSettings.coronalView': {
        useOffsets: true,
        useScaling: true,
        scaling: 60
      }
    };
  }
  
  processRelativeSagittalViewSettingsChanged(payload) {
    // save payload items to local storages
    LSU.save('relativeSagittalView', payload);
    
    var oldRelativeSagittalViewSettings = this.resolveStatePath('viewSettings.relativeSagittalView');
    
    return { 'viewSettings.relativeSagittalView': Object.assign({}, oldRelativeSagittalViewSettings, payload) };
  }
  
  processRelativeSagittalViewSettingsReset() {
    // clear local storage settings
    LSU.remove('relativeSagittalView');
    
    return {
      'viewSettings.relativeSagittalView': {
        legId: 1,
        useOffsets: true,
        useScaling: false,
        scaling: 70
      }
    };
  }
  
  processRelativeTransverseViewSettingsChanged(payload) {
    // save payload items to local storage
    LSU.save('relativeTransverseView', payload);
    
    var oldRelativeTransverseViewSettings = this.resolveStatePath('viewSettings.relativeTransverseView');
    
    return { 'viewSettings.relativeTransverseView': Object.assign({}, oldRelativeTransverseViewSettings, payload) };
  }
  
  processRelativeTransverseViewSettingsReset() {
    // clear local storage settings
    LSU.remove('relativeTransverseView');
    
    return {
      'viewSettings.relativeTransverseView': {
        legId: 1,
        useOffsets: true,
        useScaling: false,
        scaling: 70,
        showFluentMovementCircle: true,
        showMovementPointer: true,
        showInvalidRange: true,
        showLegSelector: true,
        showReachRadius: true,
        showFluentTransverseBaseXY: true,
        showSolidMovementCircle: true
      }
    };
  }
  
  processTransverseViewSettingsChanged(payload) {
    // save payload items to local storage
    LSU.save('transverseView', payload);
    
    var oldTransverseViewSettings = this.resolveStatePath('viewSettings.transverseView');
    
    return { 'viewSettings.transverseView': Object.assign({}, oldTransverseViewSettings, payload) };
  }
  
  processTransverseViewSettingsReset() {
    // clear local storage settings
    LSU.remove('transverseView');
    
    return {
      'viewSettings.transverseView': {
        useOffsets: true,
        useScaling: true,
        scaling: 60,
        showFluentTransverseBaseXY: true,
        showInvalidRange: false,
        showMovementPointer: true,
        showReachRadius: false,
        showFluentMovementCircle: true,
        showSolidMovementCircle: true
      }
    };
  }

}

// node environment export
try { module.exports = ViewSettingsLogicReducer }
catch(e) {}