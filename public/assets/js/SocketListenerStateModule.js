'use strict';

class SocketListenerStateModule extends StateModule {
  
  constructor(store) {
    super(store);
    
    this.attachSocketHandlers();
  }
  
  attachSocketHandlers() {
    // socket connected
    socket.on('connect', this.handleSocketConnected.bind(this));
    // socket disconnected
    socket.on('disconnect', this.handleSocketDisconnected.bind(this));
    // logic state changed
    socket.on('state-change', this.handleStateChange.bind(this));
    // pull the logic state from the server and merge it with the client state
    socket.on('sync-state', this.handleSyncState.bind(this));
  }
  
  handleSocketConnected() {
    this._dispatch({ type: "SOCKET_STATUS_CHANGED", payload: { connected: true } });
  }
  
  handleSocketDisconnected() {
    this._dispatch({ type: "SOCKET_STATUS_CHANGED", payload: { connected: false } });
  }
  
  handleStateChange(stateChange) {
    this._dispatch(stateChange);
  }
  
  handleSyncState(state) {
    this.store.syncState(state);
  }
  
}