'use strict';

class CoordsLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionTypes = [
      'processCursorXYShifted(CURSOR_XY_SHIFTED)',
      'processBaseXYShifted(BASE_XY_SHIFTED)',
      'processSequenceShiftedXYBatched(SEQUENCE_SHIFTED_XY_BATCHED)',
      'processInitCoordsWithMockData(INIT_STATE_DATA)'
    ];
  }
  
  processCursorXYShifted(payload, action) {
    var oldCoords = this.resolveStatePath('coords');
    
    // calc shifted coords
    var cursorXY = {};
    if (action.payload.sagittalCursorX)
      cursorXY.sagittalCursorX = oldCoords[action.legId].sagittalCursorX - action.payload.sagittalCursorX;
      
    if (action.payload.sagittalCursorY)
      cursorXY.sagittalCursorY = oldCoords[action.legId].sagittalCursorY - action.payload.sagittalCursorY;
      
    if (action.payload.transverseCursorX)
      cursorXY.transverseCursorX = oldCoords[action.legId].transverseCursorX - action.payload.transverseCursorX;
      
    if (action.payload.transverseCursorY)
      cursorXY.transverseCursorY = oldCoords[action.legId].transverseCursorY - action.payload.transverseCursorY;
    
    // gather up latest coords for further computations
    var coords = CU.aggregateCoords(oldCoords[action.legId], cursorXY);
    
    // compensative computations from transverse coords for sagittal
    // transverseCursorX/Y => sagittalCursorX
    if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
      let result = CU.getTransverseBaseXYCompensativeCoords(coords);
      // compare with the existing coords
      if (result.sagittalCursorX !== oldCoords[action.legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
    }
    // compensative computations from sagittal coords for transverse
    // sagittalCursorX => transverseCursorX + transverseCursorY
    else if (cursorXY.sagittalCursorX) {
      let result = CU.getSagittalCursorXCompensativeCoords(coords);
      // compare with the existing coords
      if (result.transverseCursorX !== oldCoords[action.legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
      if (result.transverseCursorY !== oldCoords[action.legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
    }
    
    var newCoords = Object.assign(
      {},
      oldCoords,
      { [action.legId]: Object.assign({}, oldCoords[action.legId], cursorXY) }
    );
    
    return { 'coords': newCoords };
  }
  
  processBaseXYShifted(payload, action) {
    var oldCoords = this.resolveStatePath('coords');
    
    var baseXY = {};
    if (action.payload.sagittalBaseX)
      baseXY.sagittalBaseX = oldCoords[action.legId].sagittalBaseX - action.payload.sagittalBaseX;
      
    if (action.payload.sagittalBaseY)
      baseXY.sagittalBaseY = oldCoords[action.legId].sagittalBaseY - action.payload.sagittalBaseY;
      
    if (action.payload.transverseBaseX)
      baseXY.transverseBaseX = oldCoords[action.legId].transverseBaseX - action.payload.transverseBaseX;
      
    if (action.payload.transverseBaseY)
      baseXY.transverseBaseY = oldCoords[action.legId].transverseBaseY - action.payload.transverseBaseY;
    
    // gather up latest coords for further computations
    var coords = CU.aggregateCoords(oldCoords[action.legId], baseXY);
    
    // compensative computations from transverse coords for sagittal
    // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
    if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
      let result = CU.getTransverseBaseXYCompensativeCoords(coords);
      // compare with the existing coords
      if (result.sagittalBaseX !== oldCoords[action.legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
      if (result.sagittalCursorX !== oldCoords[action.legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
    }
    // compensative computations from sagittal coords for transverse
    // sagittalBaseX => transverseBaseX + transverseBaseY
    else if (baseXY.sagittalBaseX) {
      let result = CU.getSagittalBaseXCompensativeCoords(coords);
      // compare with the existing coords
      if (result.transverseBaseX !== oldCoords[action.legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
      if (result.transverseBaseY !== oldCoords[action.legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
    }
      
    var newCoords = Object.assign(
      {},
      oldCoords,
      { [action.legId]: Object.assign({}, oldCoords[action.legId], baseXY) }
    );
    
    return { 'coords': newCoords };
  }
  
  processSequenceShiftedXYBatched(payload, action) {
    // "coords"
    {
      let oldCoords = this.resolveStatePath('coords');
      
      let newState = {};
      
      for (let legId in action.payload) {
        
        // cursorXY coords
        let cursorXY = {};
        if (action.payload[legId].sagittalCursorX)
          cursorXY.sagittalCursorX = oldCoords[legId].sagittalCursorX - action.payload[legId].sagittalCursorX;
          
        if (action.payload[legId].sagittalCursorY)
          cursorXY.sagittalCursorY = oldCoords[legId].sagittalCursorY - action.payload[legId].sagittalCursorY;
          
        if (action.payload[legId].transverseCursorX)
          cursorXY.transverseCursorX = oldCoords[legId].transverseCursorX - action.payload[legId].transverseCursorX;
          
        if (action.payload[legId].transverseCursorY)
          cursorXY.transverseCursorY = oldCoords[legId].transverseCursorY - action.payload[legId].transverseCursorY;
          
        // gather up latest coords for further computations
        let cursorCoords = CU.aggregateCoords(oldCoords[legId], cursorXY);
        
        // compensative computations from transverse coords for sagittal
        // transverseCursorX/Y => sagittalCursorX
        if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
          let result = CU.getTransverseBaseXYCompensativeCoords(cursorCoords);
          // compare with the existing coords
          if (result.sagittalCursorX !== oldCoords[legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations from sagittal coords for transverse
        // sagittalCursorX => transverseCursorX + transverseCursorY
        else if (cursorXY.sagittalCursorX) {
          let result = CU.getSagittalCursorXCompensativeCoords(cursorCoords);
          // compare with the existing coords
          if (result.transverseCursorX !== oldCoords[legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
          if (result.transverseCursorY !== oldCoords[legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
        }
        
        
        // baseXY coords
        let baseXY = {};
        if (action.payload[legId].sagittalBaseX)
          baseXY.sagittalBaseX = oldCoords[legId].sagittalBaseX - action.payload[legId].sagittalBaseX;
          
        if (action.payload[legId].sagittalBaseY)
          baseXY.sagittalBaseY = oldCoords[legId].sagittalBaseY - action.payload[legId].sagittalBaseY;
          
        if (action.payload[legId].transverseBaseX)
          baseXY.transverseBaseX = oldCoords[legId].transverseBaseX - action.payload[legId].transverseBaseX;
          
        if (action.payload[legId].transverseBaseY)
          baseXY.transverseBaseY = oldCoords[legId].transverseBaseY - action.payload[legId].transverseBaseY;
          
        // gather up latest coords for further computations
        let baseCoords = CU.aggregateCoords(oldCoords[legId], baseXY, cursorXY);
        
        // compensative computations from transverse coords for sagittal
        // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
        if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
          let result = CU.getTransverseBaseXYCompensativeCoords(baseCoords);
          // compare with the existing coords
          if (result.sagittalBaseX !== oldCoords[legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
          if (result.sagittalCursorX !== oldCoords[legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations from sagittal coords for transverse
        // sagittalBaseX => transverseBaseX + transverseBaseY
        else if (baseXY.sagittalBaseX) {
          let result = CU.getSagittalBaseXCompensativeCoords(baseCoords);
          // compare with the existing coords
          if (result.transverseBaseX !== oldCoords[legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
          if (result.transverseBaseY !== oldCoords[legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
        }
        
        newState[legId] = Object.assign({}, oldCoords[legId], cursorXY, baseXY);
      }
      var newCoords = Object.assign({}, oldCoords, newState);
    }
    
    // "movement.iteration.properties"
    {
      let oldMovementIterationProperties = this.resolveStatePath('movement.iteration.properties');
      
      var newMovementIterationProperties = Object.assign({}, oldMovementIterationProperties, { currentTick: action.currentTick, currentTickPct: action.currentTickPct });
    }
    
    return {
      'coords': newCoords,
      'movement.iteration.properties': newMovementIterationProperties
    };
  }
  
  processInitCoordsWithMockData(payload) {
    // compute sagittalBaseX and sagittalCursorX coords
    for (let key in payload) {
      let result = CU.getTransverseBaseXYCompensativeCoords({
        tbx: payload[key].transverseBaseX,
        tby: payload[key].transverseBaseY,
        tcx: payload[key].transverseCursorX,
        tcy: payload[key].transverseCursorY
      });
      
      Object.assign(payload[key], result);
    }
    
    return { 'coords': payload };
  }

}