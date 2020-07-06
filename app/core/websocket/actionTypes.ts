export const DEFAULT_PREFIX = 'REDUX_WEBSOCKET'

// Library dispatched action types.
export const WEBSOCKET_BEGIN_RECONNECT = 'BEGIN_RECONNECT'
export const WEBSOCKET_RECONNECT_ATTEMPT = 'RECONNECT_ATTEMPT'
export const WEBSOCKET_RECONNECTED = 'RECONNECTED'
export const WEBSOCKET_BROKEN = 'BROKEN'
export const WEBSOCKET_CLOSED = 'CLOSED'
export const WEBSOCKET_ERROR = 'ERROR'
export const WEBSOCKET_MESSAGE = 'MESSAGE'
export const WEBSOCKET_OPEN = 'OPEN'

// User dispatched action types.
export const WEBSOCKET_CONNECT = 'CONNECT'
export const WEBSOCKET_DISCONNECT = 'DISCONNECT'
export const WEBSOCKET_SEND = 'SEND'
