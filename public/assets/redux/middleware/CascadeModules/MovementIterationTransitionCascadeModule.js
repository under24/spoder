'use strict';

// try {
//   var CascadeModule = require('../../../spodux/CascadeModule.js');
// }
// catch(e) {}

class MovementIterationTransitionCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      movementIterationProperties: 'movement.iteration.properties',
      turnJoystick: 'movement.turnJoystick',
      directionJoystick: 'movement.directionJoystick'
    };
    
    this.observers = [
      'observeJoysticks(turnJoystick, directionJoystick)',
      'observeMovementIterationProperties(movementIterationProperties :currentTick)'
    ];
    
    this._prepareModule();
  }
  
  observeJoysticks() {
    var movementIterationTransition = this.processNewMovementIterationTransition();
    
    return { 'movement.iteration.transition': movementIterationTransition };
  }
  
  observeMovementIterationProperties(movementIterationProperties) {
    // calc new transition shift every time currentTick === 0
    if (movementIterationProperties.currentTick !== 0) return;
    
    var movementIterationTransition = this.processNewMovementIterationTransition();

    return { 'movement.iteration.transition': movementIterationTransition };
  }
  
  processNewMovementIterationTransition() {
    var transitionShift = this.generateTransitionShift(),
        transitionShiftSource = this.generateTransitionShiftSource();
        
    return { transitionShift, transitionShiftSource };
  }
  
  generateTransitionShift() {
    var circles = this.resolvePath('movement.circles'),
        pointers = this.resolvePath('movement.pointers'),
        coords = this.resolvePath('coords');
    
    var transitionShift = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      transitionShift[legId] = {
        transverseBaseX: circles[legId].fluentX - pointers[legId].x,
        transverseBaseY: circles[legId].fluentY - pointers[legId].y,
        transverseCursorX: coords[legId].transverseCursorX - pointers[legId].x,
        transverseCursorY: coords[legId].transverseCursorY - pointers[legId].y
      };
      

      
      // var a = {
      //   x: coords[legId].transverseCursorX,
      //   y: coords[legId].transverseCursorY
      // }
      // var b = {
      //   x: pointers[legId].x,
      //   y: pointers[legId].y
      // }
      // var c = {
      //   x: circles[legId].fluentX,
      //   y: circles[legId].fluentY,
      // }
      // var temp = MU.interceptOnCircle(a,b,c,80);
      // 
      // var drag = {
      //   x: temp.x - coords[legId].transverseCursorX,
      //   y: temp.y - coords[legId].transverseCursorY
      // }
      // console.log(legId, temp, drag);
      
      // var distance = MU.getDistance(drag.x, drag.y);
      
      // console.log(legId, distance);
      
      
      
      
      // transitionShift[legId].slackX = Math.abs(transitionShift[legId].dragX) - Math.abs(transitionShift[legId].transverseCursorX);
      // transitionShift[legId].slackY = Math.abs(transitionShift[legId].dragY) - Math.abs(transitionShift[legId].transverseCursorY);
      
      // correction[legId] = {
      //   x: temp.x - this.coords[legId].transverseCursorX,
      //   y: temp.y - this.coords[legId].transverseCursorY
      // };
      // debugger;
      // console.log(legId, temp);
      // console.log(transitionShift[legId], correction[legId]);
    }
    
    return transitionShift;
  }
  
  generateTransitionShiftSource() {
    var turnJoystick = this.resolvePath('movement.turnJoystick'),
        directionJoystick = this.resolvePath('movement.directionJoystick');
    
    return {
      directionX: directionJoystick.x,
      directionY: directionJoystick.y,
      turnX: turnJoystick.x
    };
  }

}

// node environment export
try { module.exports = MovementIterationTransitionCascadeModule }
catch(e) {}