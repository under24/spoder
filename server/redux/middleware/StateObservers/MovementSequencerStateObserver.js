'use strict';

var StateObserver = require('../StateObserver');
var TG = require('./helpers/TimelineGenerator');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

class MovementSequencerStateObserver extends StateObserver {

  constructor(store) {
    super(store);
    
    this.properties = {
      amountOfTicks: 'movement.iteration.properties.amountOfTicks',
      blueprint: 'movement.iteration.blueprint',
      sequencerEnabled: 'movement.settings.sequencerEnabled'
    };
    
    this.observers = [
      'processNewTimeline(blueprint, amountOfTicks)',
      'observeSequencerEnabled(sequencerEnabled)'
      
    ];
    
    this._prepareModule();
  }

  processNewTimeline(blueprint, amountOfTicks) {
    var sequencerEnabled = this.resolveStatePath('movement.settings.sequencerEnabled');
    
    this.timeline = TG.processNewTimeline(blueprint.new, amountOfTicks.new);
    
    // timeline is idle (null)
    if (this.timeline === null)
      // set the flag which will fail one condition when the sequencer is run
      this.sequencerIdle = true;
    // state changed from idle to active. not from active to active
    else if (this.timeline && this.sequencerIdle) {
      // set the flag which shows that the timeline is not idle (null)
      this.sequencerIdle = false;
      // run the sequencer again if it is enabled
      if (sequencerEnabled) this.runSequence();
    }
  }
  
  runSequence(currentTick = 1) {
    var iterationProperties = this.resolveStatePath('movement.iteration.properties');
    
    // validation: no second invocation, no invalid tick, no idle timeline
    if (!this.validConditions(currentTick, iterationProperties)) return;
    
    // iteration starts after (1000 / this.iteration.tps) amount of time with tick 1
    this.sequencerInterval = setInterval(() => {
      // prepare payload data
      var payload = this.addTurningValues(this.timeline[currentTick].payload);
      // dispatch current tick data
      this.dispatchTickPayload(payload, currentTick, this.timeline[currentTick].pct);
      
      // check if that was the last tick of the iteration
      if (currentTick === iterationProperties.amountOfTicks) {
        // current iteration is compelete. stop sequencer
        this.clearSequencerInterval();
        // reset progress when the iteration is complete
        this.resetTickData();
        
        // if loop flag is true
        if (this.resolveStatePath('movement.settings.loop'))
          // start iterating over again
          this.runSequence();
        // loop flag is false
        else
          // set sequencerEnabled flag to false which will clear sequencer interval
          this.disableSequencer();
      }
      
      // update tick value for the next tick interval
      currentTick++;
    }, 1000 / iterationProperties.tps);
  }
  
  validConditions(currentTick, iterationProperties) {    
    // double invocation
    if (this.sequencerInterval) {
      console.warn('Movement sequencer is already in progress');
      // fail condition
      return false;
    }
    
    // wrong input tick
    if (currentTick > iterationProperties.amountOfTicks) {
      console.warn('Current tick is greater that the amount of ticks in the iteration');
      // fail condition
      return false;
    }
    
    // timeline is idle
    if (this.sequencerIdle)
      // fail condition
      return false;
    
    // valid conditions
    // run sequencer
    return true;
  }
  
  addTurningValues(payload) {
    var turnJoystick = this.resolveStatePath('movement.turnJoystick'),
        iterationProperties = this.resolveStatePath('movement.iteration.properties'),
        coords = this.resolveStatePath('coords'),
        baseCenterCoords = this.resolveStatePath('base.centerCoords');
    
    // no turn values. return back the payload unchanged
    if (turnJoystick.normalizedX === 0) return payload;
    
    // calc turn values and add them to the payload
    for (let legId = 1; legId <= 6; legId++) {
      
      // angle / amount of ticks = angle for each tick
      let stepAngle = MU.flipNumber(turnJoystick.normalizedX) / iterationProperties.amountOfTicks;
    
      // find rotated base coords
      let rotatedCoords = { x: coords[legId].transverseBaseX, y: coords[legId].transverseBaseY };
      rotatedCoords = MU.rotateCoords(baseCenterCoords, rotatedCoords, stepAngle);
    
      // get turn shift values
      let shiftX = coords[legId].transverseBaseX - rotatedCoords.x,
          shiftY = coords[legId].transverseBaseY - rotatedCoords.y;
      
      
      // payload object
      payload = payload || {};
      // payload[legId]
      payload[legId] = payload[legId] || {};
      
      if (payload[legId].transverseBaseX)
        payload[legId].transverseBaseX += shiftX;
      else
        payload[legId].transverseBaseX = shiftX;
      
      if (payload[legId].transverseBaseY)
        payload[legId].transverseBaseY += shiftY;
      else
        payload[legId].transverseBaseY = shiftY;
    }
    return payload;
  }
  
  dispatchTickPayload(payload, currentTick, currentTickPct) {
    var action = [];
    
    // payload is not empty
    // payload can be empty when the current leg/stroke does not have any pixels to move
    if (payload)
      action.push({ type: "SEQUENCE_SHIFTED_XY_BATCHED", payload });
      
    action.push({ type: "MOVEMENT_ITERATION_PROPERTIES_CHANGED", payload: { currentTick, currentTickPct } })
    
    store.dispatch(action);
  }
  
  // stop sequencer
  clearSequencerInterval() {
    clearInterval(this.sequencerInterval);
    this.sequencerInterval = undefined;
  }
  
  resetTickData() {
    store.dispatch({ type: "MOVEMENT_ITERATION_PROPERTIES_CHANGED", payload: { currentTick: 0, currentTickPct: 0 } });
  }
  
  disableSequencer() {
    store.dispatch({ type: "MOVEMENT_SETTINGS_CHANGED", payload: { sequencerEnabled: false } });
  }
  
  observeSequencerEnabled(sequencerEnabled) {
    // sequencer enabled
    if (sequencerEnabled.new)
      // start sequencer from where it stopped
      this.runSequence(this.resolveStatePath('movement.iteration.properties').currentTick + 1);
    // sequencer disabled
    else
      // stop sequencer
      this.clearSequencerInterval();
  }

}

module.exports = MovementSequencerStateObserver;