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
    var circles = this.resolvePath('movement.circles'),
        pointers = this.resolvePath('movement.pointers'),
        coords = this.resolvePath('coords');
    
    var transition = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      transition[legId] = {
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
      
      
      
      
      // transition[legId].slackX = Math.abs(transition[legId].dragX) - Math.abs(transition[legId].transverseCursorX);
      // transition[legId].slackY = Math.abs(transition[legId].dragY) - Math.abs(transition[legId].transverseCursorY);
      
      // correction[legId] = {
      //   x: temp.x - this.coords[legId].transverseCursorX,
      //   y: temp.y - this.coords[legId].transverseCursorY
      // };
      // debugger;
      // console.log(legId, temp);
      // console.log(transition[legId], correction[legId]);
    }
    
    return transition;
  }

}

// node environment export
try { module.exports = MovementIterationTransitionCascadeModule }
catch(e) {}