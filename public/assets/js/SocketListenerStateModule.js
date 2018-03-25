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
    // joystick right stick
    // socket.on('right-analog-stick-moved', this.handleRightAnalogStickMoved.bind(this));
    // joystick left stick
    // socket.on('left-analog-stick-moved', this.handleLeftAnalogStickMoved.bind(this));
    // logic state changed
    socket.on('state-change', this.handleStateChange.bind(this));
    // pull the logic state from the server and merge it with the client state
    socket.on('sync-state', this.handleSyncState.bind(this));
  }
  
  handleSocketConnected() {
    SocketListenerStateModule.store.dispatch({ type: "SOCKET_STATUS_CHANGED", payload: { connected: true } });
  }
  
  handleSocketDisconnected() {
    SocketListenerStateModule.store.dispatch({ type: "SOCKET_STATUS_CHANGED", payload: { connected: false } });
  }
  
  // handleRightAnalogStickMoved(data) {
  //   SocketListenerStateModule.store.dispatch({
  //     type: "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED",
  //     payload: {
  //       x: data.x,
  //       y: data.y
  //     }
  //   });
  // }
  
  // handleLeftAnalogStickMoved(data) {
  //   SocketListenerStateModule.store.dispatch({
  //     type: "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED",
  //     payload: {
  //       x: data.x,
  //       y: data.y
  //     }
  //   });
  // }
  
  handleStateChange(stateChange) {
    store.dispatch(stateChange);
  }
  
  handleSyncState(state) {
    store.syncState(state);
  }
  
}