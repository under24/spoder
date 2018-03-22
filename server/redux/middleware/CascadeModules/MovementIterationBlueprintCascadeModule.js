'use strict';

var CascadeModule = require('../CascadeModule.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

class MovementIterationBlueprintCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      movementIterationProperties: 'movement.iteration.properties',
      movementIterationTransition: 'movement.iteration.transition'
    };
    
    this.observers = [
      `processNewBlueprint(movementIterationProperties :gait, movementIterationTransition)`
    ];
    
    this._prepareModule();
  }
  
  processNewBlueprint() {
    // create a new blueprint
    var newMovementIterationBlueprint = this.generateBlueprint();

    return { 'movement.iteration.blueprint': newMovementIterationBlueprint };
  }
  
  generateBlueprint() {
    var gaits = this.resolveStatePath('gaits'),
        iterationGait = this.resolvePath('movement.iteration.properties').gait,
        transition = this.resolvePath('movement.iteration.transition');
        
    var blueprint = {};
    
    // if there is no data to move then the blueprint is idle (null)
    if (this.idleTransition()) blueprint = null;
    // blueprint will have some data to move thus need to raise every leg
    else {
      for (let legId = 1; legId <= 6; legId++) {
        blueprint[legId] = this.generateBlueprintData(gaits[iterationGait].legTimings[legId], transition[legId]);
      }
    }
    
    return blueprint;
  }
  
  idleTransition() {
    var transition = this.resolvePath('movement.iteration.transition');
    
    // iterate leg IDs
    for (let legId in transition) {
      // iterate coords with shift data
      for (let coordShift in transition[legId]) {
        // blueprint is not idle
        if (MU.notEmpty(transition[legId][coordShift])) return false;
      }
    }
    
    // blueprint is idle (has no data to move)
    return true;
  }
  
  generateBlueprintData(legTimings, transition) {
    // current leg blueprint data
    var result = [];
    
    // moves the base
    this.addTransverseBaseXY(result, transition);
    // moves the legs
    this.addTransverseCursorXY(result, legTimings, transition);
    // raises the legs
    this.addSagittalCursorY(result, legTimings);
    
    return result;
  }
  
  addTransverseBaseXY(result, transition) {
    // transverseBaseX
    if (MU.notEmpty(transition.transverseBaseX)) {
      let tbx = this.buildDataObject('transverseBaseX', 0, 100, transition.transverseBaseX);
      result.push(tbx);
    }
    // transverseBaseY
    if (MU.notEmpty(transition.transverseBaseY)) {
      let tby = this.buildDataObject('transverseBaseY', 0, 100, transition.transverseBaseY);
      result.push(tby);
    }
  }
  
  addTransverseCursorXY(result, legTimings, transition) {
    // transverseCursorX
    if (MU.notEmpty(transition.transverseCursorX)) {
      let tcx =  this.buildDataObject('transverseCursorX', legTimings.startPct, legTimings.endPct, transition.transverseCursorX);
      result.push(tcx);
    }
    // transverseCursorY
    if (MU.notEmpty(transition.transverseCursorY)) {
      let tcy = this.buildDataObject('transverseCursorY', legTimings.startPct, legTimings.endPct, transition.transverseCursorY);
      result.push(tcy);
    }
  }
  
  addSagittalCursorY(result, legTimings) {
    var strokeMedian = legTimings.startPct + (legTimings.endPct - legTimings.startPct) / 2;
    
    var raise = this.buildDataObject('sagittalCursorY', legTimings.startPct, strokeMedian, 20);
    var lower = this.buildDataObject('sagittalCursorY', strokeMedian, legTimings.endPct, -20);
    
    result.push(raise, lower);
  }
  
  buildDataObject(coordType, startPct, endPct, pxlsToMove) {
    return { coordType, startPct, endPct, pxlsToMove };
  }

}

module.exports = MovementIterationBlueprintCascadeModule