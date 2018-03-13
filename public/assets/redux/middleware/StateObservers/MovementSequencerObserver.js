'use strict';

class MovementSequencerObserver extends StateObserver {

  constructor(store) {
    super(store);
    
    this.properties = {
      coords: 'coords',
      angles: 'angles',
      temp1: 'movement.circles',
      temp2: 'movement.iteration.transition'
    };
    
    this.observers = [
      'handler(coords, angles)',
      'handler2(temp1, temp2)'
    ];
    
    this._prepareModule();
  }

  handler(coords, angles) {
    // debugger;
  }
  
  handler2() {
    // debugger;
  }

}
