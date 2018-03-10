'use strict';

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
        transitionShift = this.resolvePath('movement.iteration.transition').transitionShift;
    
    var blueprint = {};
    
    // if there is no data to move then the blueprint is idle (null)
    if (this.idleTransitionShift()) blueprint = null;
    // blueprint will have some data to move thus need to raise every leg
    else {
      for (let legId = 1; legId <= 6; legId++) {
        blueprint[legId] = this.generateBlueprintData(gaits[iterationGait].legTimings[legId], transitionShift[legId]);
      }
    }
    
    return blueprint;
  }
  
  idleTransitionShift() {
    var transitionShift = this.resolvePath('movement.iteration.transition').transitionShift;
    
    // iterate leg IDs
    for (let legId in transitionShift) {
      // iterate coords with shift data
      for (let coordShift in transitionShift[legId]) {
        // blueprint is not idle
        if (MU.notEmpty(transitionShift[legId][coordShift])) return false;
      }
    }
    
    // blueprint is idle (has no data to move)
    return true;
  }
  
  generateBlueprintData(legTimings, transitionShift) {
    // current leg blueprint data
    var result = [];
    
    // moves the base
    this.addTransverseBaseXY(result, transitionShift);
    // moves the legs
    this.addTransverseCursorXY(result, legTimings, transitionShift);
    // raises the legs
    this.addSagittalCursorY(result, legTimings, transitionShift);
    
    return result;
  }
  
  addTransverseBaseXY(result, transitionShift) {
    // transverseBaseX
    if (MU.notEmpty(transitionShift.transverseBaseX)) {
      let tbx = this.buildDataObject('transverseBaseX', 0, 100, transitionShift.transverseBaseX);
      result.push(tbx);
    }
    // transverseBaseY
    if (MU.notEmpty(transitionShift.transverseBaseY)) {
      let tby = this.buildDataObject('transverseBaseY', 0, 100, transitionShift.transverseBaseY);
      result.push(tby);
    }
  }
  
  addTransverseCursorXY(result, legTimings, transitionShift) {
    // transverseCursorX
    if (MU.notEmpty(transitionShift.transverseCursorX)) {
      let tcx =  this.buildDataObject('transverseCursorX', legTimings.startPct, legTimings.endPct, transitionShift.transverseCursorX);
      result.push(tcx);
    }
    // transverseCursorY
    if (MU.notEmpty(transitionShift.transverseCursorY)) {
      let tcy = this.buildDataObject('transverseCursorY', legTimings.startPct, legTimings.endPct, transitionShift.transverseCursorY);
      result.push(tcy);
    }
  }
  
  addSagittalCursorY(result, legTimings, transitionShift) {
    var strokeMedian = legTimings.startPct + (legTimings.endPct - legTimings.startPct) / 2;
    
    var raise = this.buildDataObject('sagittalCursorY', legTimings.startPct, strokeMedian, 20);
    var lower = this.buildDataObject('sagittalCursorY', strokeMedian, legTimings.endPct, -20);
    
    result.push(raise, lower);
  }
  
  buildDataObject(coordType, startPct, endPct, pxlsToMove) {
    return { coordType, startPct, endPct, pxlsToMove };
  }

}