'use strict';

// SU == SequencerUtils
let SU = {
  generateSequenceTimeline(blueprint, tps, duration, amountOfTicks = this.calcAmountOfTicks(tps, duration)) {
    // create a timeline object
    let timeline = this.createTimeline(amountOfTicks);
    
    // populate timeline with blueprint data
    for (let legId in blueprint) {
      blueprint[legId].forEach(dataItem => {
        this.populateTimeline(dataItem, legId, timeline, amountOfTicks);
      });
    }

    return {
      timeline,
      metaData: {
        tps,
        duration,
        amountOfTicks
      }
    }
  },
  // calc amount of ticks from timeline dureation and amount of ticks per second
  calcAmountOfTicks(tps, duration) {
    let amountOfTicks = duration / (1000 / tps);
    
    return MU.roundNumber(amountOfTicks, 0);
  },
  createTimeline(amountOfTicks) {
    // create a timeline object
    let timeline = {};
    
    // fill in timeline object with ticks
    for (let currTick = 1; currTick <= amountOfTicks; currTick++) {
      timeline[currTick] = {
        pct: this.calcTickPct(currTick, amountOfTicks),
        payload: {}
      }
    }
    
    return timeline;
  },
  populateTimeline(dataItem, legId, timeline, amountOfTicks) {
    // skip dataItem with no coords to move
    // if (dataItem.pxlsToMove === 0) return;
    
    let startTick = this.getClosestTick(dataItem.startPct, timeline, amountOfTicks) + 1,
        endTick = this.getClosestTick(dataItem.endPct, timeline, amountOfTicks),
        ticksBetweenStartAndEnd = this.calcAmountOfTicksBetween(startTick, endTick),
        tickValue = this.calcTickValueBasedOnPxlsToMove(ticksBetweenStartAndEnd, dataItem.pxlsToMove);

    for (let i = startTick; i <= endTick; i++) {
      timeline[i].payload[legId] = timeline[i].payload[legId] || {};
      
      timeline[i].payload[legId][dataItem.coordType] = tickValue;
    }
  },
  getClosestTick(targetPct, timeline, amountOfTicks) {
    // memoization. try to retrieve
    // this.cache = {
    //   [amountOfTicks]: {
    //     [targetPct]: closestTick
    //   }
    // }
    // check if there is a timeline with the same amount of ticks in cache
    if (amountOfTicks in this.cache) {
      // check if the same targetPct has been calculated
      if (targetPct in this.cache[amountOfTicks])
        return this.cache[amountOfTicks][targetPct];
    }
    
    // set initial value
    let closestTick = 0,
        // target
        targetDiff = targetPct;
    
    // iterate timeline and look for the tick with the closest pct
    for (let currTick in timeline) {
      // current tick diff
      let currDiff = Math.abs(targetPct - timeline[currTick].pct);
      // if current diff is better than what we already have then replace it and save the referrence to the tick #
      if (currDiff < targetDiff) {
        // save update best diff
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
  calcTickValueBasedOnPxlsToMove(amountOfTicks, pixelsToMove) {
    return pixelsToMove / amountOfTicks;
  },
  // get tick from amount of ticks and the current tick #
  calcTickPct(tick, amountOfTicks) {
    return MU.roundNumber(100 / amountOfTicks * tick, 1);
  },
  // memoization for this.getClosestTick
  cache: {}
}