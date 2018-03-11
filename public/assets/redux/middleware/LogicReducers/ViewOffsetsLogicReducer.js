'use strict';

try {
  var LogicReducer = require('../../../spodux/LogicReducer.js');
}
catch(e) {}

class ViewOffsetsLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processSequenceShiftedXYCoords(SEQUENCE_SHIFTED_XY_BATCHED)'
    ];
    
    this._prepareModule();
  }
  
  processSequenceShiftedXYCoords(payload) {
    var oldViewOffsets = this.resolveStatePath('viewOffsets');
    
    var viewOffsets = {};
    
    for (let legId in payload) {
      let viewOffset = {};
      
      if (payload[legId].transverseBaseX)
        viewOffset.transverseX = oldViewOffsets[legId].transverseX + payload[legId].transverseBaseX;
      
      if (payload[legId].transverseBaseY)
        viewOffset.transverseY = oldViewOffsets[legId].transverseY + payload[legId].transverseBaseY;
      
      viewOffsets[legId] = Object.assign({}, oldViewOffsets[legId], viewOffset);
    }
    
    var newViewOffsets = Object.assign({}, oldViewOffsets, viewOffsets);
    
    return { 'viewOffsets': newViewOffsets };
  }

}

// node environment export
try { module.exports = ViewOffsetsLogicReducer }
catch(e) {}