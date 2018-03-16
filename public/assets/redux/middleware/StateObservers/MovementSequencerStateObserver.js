'use strict';

class MovementSequencerStateObserver extends StateObserver {

  constructor(store) {
    super(store);
    
    this.timelineGenerator = new TimelineGeneratorStateModule(store);
    
    this.properties = {
      amountOfTicks: 'movement.iteration.properties.amountOfTicks',
      blueprint: 'movement.iteration.blueprint'
    };
    
    this.observers = [
      'processNewTimeline(blueprint, amountOfTicks)'
    ];
    
    this._prepareModule();
  }

  processNewTimeline(blueprint, amountOfTicks) {
    var timeline = this.timelineGenerator.processNewTimeline(blueprint.new, amountOfTicks.new);
    
    debugger;
  }

}
