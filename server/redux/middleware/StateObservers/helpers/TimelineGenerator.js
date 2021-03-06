'use strict';

var MU = require('../../../../../public/assets/shared/utils/MathUtils.js');

// TG === TimelineGenerator
var TG = {
  // memoization for this.getClosestTick
  // structure of cache:
  // cache = {
  //   [amountOfTicks]: {
  //     [targetPct]: closestTick
  //   }
  // }
  cache: {},
  processNewTimeline(blueprint, amountOfTicks) {
    // if the blueprint is idle (null) then the timeline should also be idle (null)
    if (blueprint === null) return null;
    
    var timeline = this.createTimeline(amountOfTicks);
    
    // populate timeline with blueprint data
    for (let legId in blueprint) {
      blueprint[legId].forEach(dataItem => {
        this.populateTimeline(dataItem, legId, timeline, amountOfTicks);
      });
    }
    
    return timeline;
  },
  createTimeline(amountOfTicks) {
    // create a timeline object
    var timeline = {};
    
    // fill in timeline object with ticks
    for (let currTick = 1; currTick <= amountOfTicks; currTick++) {
      timeline[currTick] = {
        pct: this.calcTickPct(currTick, amountOfTicks),
        payload: null
      };
    }
    
    return timeline;
  },
  // get tick from amount of ticks and the current tick #
  calcTickPct(tick, amountOfTicks) {
    return MU.roundNumber(100 / amountOfTicks * tick, 1);
  },
  populateTimeline(dataItem, legId, timeline, amountOfTicks) {
    // skip dataItem with no coords to move
    if (MU.empty(dataItem.pxlsToMove)) return;
    
    var startTick = this.getClosestTick(dataItem.startPct, timeline, amountOfTicks) + 1,
        endTick = this.getClosestTick(dataItem.endPct, timeline, amountOfTicks),
        ticksBetweenStartAndEnd = this.calcAmountOfTicksBetween(startTick, endTick),
        tickValue = this.calcTickValueBasedOnPxlsToMove(ticksBetweenStartAndEnd, dataItem.pxlsToMove);

    for (let currTick = startTick; currTick <= endTick; currTick++) {
      // payload is null
      if (!timeline[currTick].payload) timeline[currTick].payload = {};
      // no legId in payload
      if (!timeline[currTick].payload[legId]) timeline[currTick].payload[legId] = {};
      
      timeline[currTick].payload[legId][dataItem.coordType] = tickValue;
    }
  },
  getClosestTick(targetPct, timeline, amountOfTicks) {
    // memoization. try to retrieve
    // check if there is a timeline with the same amount of ticks in cache
    if (amountOfTicks in this.cache) {
      // check if the same targetPct has been calculated
      if (targetPct in this.cache[amountOfTicks])
        // return the value from cache
        return this.cache[amountOfTicks][targetPct];
    }
    
    // set initial value of the closest tick
    var closestTick = 0,
        // target
        targetDiff = targetPct;
    
    // iterate timeline and look for the tick with the closest pct
    for (let currTick in timeline) {
      // current tick diff
      let currDiff = Math.abs(targetPct - timeline[currTick].pct);
      // if current diff is better than what we already have then replace it and save the referrence to the tick #
      if (currDiff < targetDiff) {
        // save best diff
        targetDiff = currDiff;
        // save the referrence to the tick # with the best diff
        closestTick = +currTick;
      }
    }
    
    // memoization. cache value
    // save a new value for the current timeline
    if (amountOfTicks in this.cache)
      this.cache[amountOfTicks][targetPct] = closestTick;
    // first time calculation (this timeline)
    else
      this.cache[amountOfTicks] = { [targetPct]: closestTick };
    
    return closestTick;
  },
  // get amount of ticks between two selected ticks ......|.|..this..[.].........
  calcAmountOfTicksBetween(startTick, endTick) {
    return (endTick - startTick) + 1;
  },
  // calc step value for every tick based of the amount of ticks and the movement distance
  calcTickValueBasedOnPxlsToMove(amountOfTicks, pxlsToMove) {
    return pxlsToMove / amountOfTicks;
  }
};

// node environment export
module.exports = TG;