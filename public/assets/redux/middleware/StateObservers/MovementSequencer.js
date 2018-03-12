'use strict';

class Temp extends StateObserver {

  constructor(store) {
    super(store);
    
    this.properties = {
      test1: 'coords',
      test2: 'angles'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'foo(test1, test2)'
    ];
  }

  foo(coords, angles) {
    debugger;
  }

}
