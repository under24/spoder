'use strict';

// SEU == SocketEmitterUtils
var SEU = {
  emitAngles(angles) {
    // timer is in progress. cache last values
    if (this.activeTimeout) {
      // iterate angles and marge data from angles with pending data object
      for (let legId in angles) {
        // initialize pending data object for storing incoming data
        this.pendingData = this.pendingData || {};
        
        // legid is present in pending data object. merge values
        if (legId in this.pendingData)
          Object.assign(this.pendingData[legId], angles[legId]);
        // legid is not present in the pending data object
        else
          this.pendingData[legId] = angles[legId];
      }
      // console.log('added to cache');
    }
    // no timer. save to emit and start the timer
    else {
      // emit servo angles to the back end
      socket.emit('servo-angles-changed', angles);
      // console.log('straight emit');
      
      // start a timer which is going to pause all emits durings the time it is running
      this.activeTimeout = setTimeout(() => {
        // no updates came during the timeout. bail
        if (!this.pendingData) {
          // console.log('no data to dispatch');
          // clear timeout id
          this.activeTimeout = null;
          return;
        };
        
        // emit servo angles which were collected during the timer to the back end
        socket.emit('servo-angles-changed', this.pendingData);
        // console.log('timeout emit', this.pendingData);
        
        // clear pending data
        this.pendingData = null;
        // clear timeout id
        this.activeTimeout = null;
      }, 30);
    }
  }
}