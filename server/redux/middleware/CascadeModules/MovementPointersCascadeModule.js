'use strict';

var CascadeModule = require('../CascadeModule.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

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
      // reduce the circle boundary by 15 px
      let circleRadius = circles[legId].solidRadius - 15;
      
      let dx = circleRadius * (directionJoystick.x / 100),
          dy = circleRadius * (directionJoystick.y / 100),
          distance = MU.getDistance(dx, dy),
          circleToPointerAngle = MU.getAngle(MU.flipNumber(dy), MU.flipNumber(dx)),
          angle = circleToPointerAngle + baseDirection - turnJoystick.normalizedX;
          
      pointers[legId] = MU.getCoordsFromDistanceAndAngle(circles[legId].fluentX, circles[legId].fluentY, angle, distance);
    }
    
    return pointers;
  }

}

module.exports = (store) => new MovementPointersCascadeModule(store);