'use strict';

// SU == SequencerUtils
let SU = {
  abortSequence: false,
  generateSequenceTimeline(blueprint, tps = 10, timelineDuration = 1000) {
    let amountOfTicks = this.getAmountOfTicks(tps, timelineDuration),
        timeline = this.createTimeline(amountOfTicks);
    
    for (let legId in blueprint) {
      blueprint[legId].forEach(dataItem => {
        this.populateTimeline(dataItem, legId, timeline);
      });
    }

    return {
      timeline,
      metaData: {
        tps,
        timelineDuration,
        amountOfTicks
      }
    }
  },
  getAmountOfTicks(tps, timelineDuration) {
    let amountOfTicks = timelineDuration / (1000 / tps);
    
    return MU.roundNumber(amountOfTicks, 0);
  },
  createTimeline(amountOfTicks) {
    let timeline = {};
    
    for (let i = 1; i <= amountOfTicks; i++) {
      timeline[i] = {
        pct: MU.roundNumber(100 / amountOfTicks * i, 1),
        payload: {}
      }
    }
    
    return timeline;
  },
  populateTimeline(dataItem, legId, timeline) {
    let startTick = this.getClosestTick(dataItem.startPct, timeline) + 1,
        endTick = this.getClosestTick(dataItem.endPct, timeline),
        ticksBetweenStartAndEnd = this.getAmountOfTicksBetween(startTick, endTick),
        tickValue = this.getTickValueBasedOnPxlsToMove(ticksBetweenStartAndEnd, dataItem.pxlsToMove);

    for (let i = startTick; i <= endTick; i++) {
      timeline[i].payload[legId] = timeline[i].payload[legId] || {};
      
      timeline[i].payload[legId][dataItem.coordType] = tickValue;
    }
  },
  getClosestTick(num, timeline) {
    let currentNumber = 0;
    
    let diff = num;
    for (let key in timeline) {
      let newDiff = Math.abs(num - timeline[key].pct);
      if (newDiff < diff) {
        diff = newDiff;
        currentNumber = key;
      }
    }
    return +currentNumber;
  },
  getAmountOfTicksBetween(startTick, endTick) {
    return (endTick - startTick) + 1;
  },
  getTickValueBasedOnPxlsToMove(amountOfTicks, pixelsToMove) {
    return pixelsToMove / amountOfTicks;
  },
  playSequence(sequence, tick = 1, loop) {
    this.abortSequence = false;
    
    let interval = setInterval(() => {
      
      store.dispatch({
        type: "SEQUENCE_SHIFTED_XY_BATCHED",
        payload: sequence.timeline[tick].payload,
        pct: sequence.timeline[tick].pct,
        tick
      });
      
      // complete
      if (tick === sequence.metaData.amountOfTicks) {
        clearInterval(interval);

        store.dispatch({
          type: "SEQUENCE_PROGRESS_PCT_CHANGED",
          pct: 0,
          tick: 0
        });
        
        if (loop) this.playSequence(sequence, 1, true);
        
      } else if (this.abortSequence) {
        clearInterval(interval);
      }
      
      tick++;
      
    }, 1000 / sequence.metaData.tps);
  }
}