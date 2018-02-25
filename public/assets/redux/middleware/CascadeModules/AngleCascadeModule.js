'use strict';

class AngleCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      coords: 'coords'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'processNewAngles(coords)'
    ];
  }
  
  processNewAngles(coords) {
    var baseDirection = this.resolvePath2('base.direction');
    
    for (let legId = 1; legId <= 6; legId++) {
      // transverse coords
      
      
    }
    
    debugger;
    
  }

}