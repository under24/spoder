'use strict';

// try {
//   var CascadeModule = require('../../../spodux/CascadeModule.js');
//   var MU = require('../../../utils/MathUtils.js');
// }
// catch(e) {}

class MovementPointersCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      circles: 'movement.circles',
      directionJoystick: 'movement.directionJoystick'
    };
    
    this.observers = [
      'processNewPointers(circles, directionJoystick)'
    ];
    
    this._prepareModule();
  }
  
  processNewPointers(circles, directionJoystick) {
    // create new pointers
    var pointers = this.generatePointers(circles, directionJoystick);
    
    return { 'movement.pointers': pointers };
  }
  
  generatePointers(circles, directionJoystick) {
    var baseDirection = this.resolvePath('base.direction'),
        turnJoystick = this.resolvePath('movement.turnJoystick');
        
    var pointers = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      // reduce the circle boundary by 10 px
      var circleRadius = circles[legId].solidRadius - 10;
      
      var dx = circleRadius * (directionJoystick.x / 100),
          dy = circleRadius * (directionJoystick.y / 100),
          distance = MU.getDistance(dx, dy),
          circleToPointerAngle = MU.getAngle(MU.flipNumber(dy), MU.flipNumber(dx)),
          finalAngle = circleToPointerAngle + baseDirection - turnJoystick.normalizedX;
      
      pointers[legId] = MU.getCoordsFromDistanceAndAngle(circles[legId].fluentX, circles[legId].fluentY, finalAngle, distance);
    }
    
    return pointers;
  }

}

// node environment export
try { module.exports = MovementPointersCascadeModule }
catch(e) {}