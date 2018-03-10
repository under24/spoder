'use strict';

class MovementPointersCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      circles: 'movement.circles',
      directionJoystick: 'movement.directionJoystick'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'processNewPointers(circles, directionJoystick)'
    ];
    
    this._prepareModule();
  }
  
  processNewPointers(circles, directionJoystick) {    
    // create new pointers
    var newMovementPointers = this.generatePointers(circles, directionJoystick);
    
    return { 'movement.pointers': newMovementPointers };
  }
  
  generatePointers(circles, directionJoystick) {
    var baseDirection = this.resolvePath('base.direction'),
        turnJoystick = this.resolvePath('movement.turnJoystick');
        
    var pointers = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      let pointer = {
        x: circles[legId].fluentX - circles[legId].solidRadius * (directionJoystick.x / 100),
        y: circles[legId].fluentY - circles[legId].solidRadius * (directionJoystick.y / 100)
      };
      
      // apply baseDirection + turnJoystick
      pointers[legId] = this.applyDirectionAndTurn(pointer, circles[legId], baseDirection, turnJoystick.normalizedX);
    }
    
    return pointers;
  }
  
  applyDirectionAndTurn(pointer, circle, baseDirection, turn) {
    var dx = pointer.x - circle.fluentX,
        dy = pointer.y - circle.fluentY,
        distance = MU.getDistance(dx, dy),
        circleToPointerAngle = MU.getAngle(dy, dx);
    
    return MU.getCoordsFromDistanceAndAngle(circle.fluentX, circle.fluentY, circleToPointerAngle + baseDirection - turn, distance);
  }

}