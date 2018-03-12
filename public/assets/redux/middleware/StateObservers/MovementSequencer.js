'use strict';

class MovementSequencer extends StateObserver {

  constructor(store) {
    super(store);
    
    this.properties = {
      test1: 'coords',
      test2: 'angles'
    };
    
    this.observers = [
      'foo(test1, test2)'
    ];
  }

  foo(coords, angles) {
    debugger;
  }

}
