import { Serializer } from './types'
import WebSocket from 'ws'
interface ReduxWebSocketOptions {
  reconnectInterval: number
  reconnectOnClose: boolean
  onOpen?: (s: WebSocket) => void
  serializer?: Serializer
}

const defaultOptions = {
  reconnectInterval: 2000,
  reconnectOnClose: false,
  serializer: (msg: string) => msg,
}

/**
 * MyWebSocket
 * @class
 *
 * Manages a WebSocket connection.
 */
export default class MyWebSocket {
  // Class options.
  private options: ReduxWebSocketOptions

  // WebSocket connection.
  private websocket: WebSocket | null = null

  // Keep track of how many times we've attempted to reconnect.
  private reconnectCount: number = 0

  // We'll create an interval to try and reconnect if the socket connection breaks.
  private reconnectionInterval: NodeJS.Timeout | null = null

  // Keep track of the last URL we connected to, so that when we automatically
  // try to reconnect, we can connect to the correct URL.
  private lastSocketUrl: string = ''

  // Keep track of if the WebSocket connection has ever successfully opened.
  private hasOpened = false

  private handleMessage: (message: any) => void = message => null

  private static instance: MyWebSocket | null = null

  /**
   * Constructor
   * @constructor
   *
   * @param {ReduxWebSocketOptions} options
   */
  constructor(options: ReduxWebSocketOptions) {
    this.options = options
  }

  //静态方法
  static getInstance() {
    if (!this.instance) {
      this.instance = new MyWebSocket(defaultOptions)
    }
    return this.instance
  }

  /**
   * WebSocket connect event handler.
   *
   * @param url
   */
  connect = (url: string) => {
    this.close()

    this.lastSocketUrl = url
    this.websocket = new WebSocket(url)

    this.websocket.addEventListener('close', () => this.handleClose())
    this.websocket.addEventListener('error', () => this.handleError())
    this.websocket.addEventListener('open', () => {
      this.handleOpen(this.options.onOpen)
    })
    this.websocket.addEventListener('message', event => this.baseHandleMessage(event))
  }

  isOpen = (): boolean => {
    return this.hasOpened
  }

  setMessageHandler = (handleMessage: (message: any) => void) => {
    this.handleMessage = handleMessage
  }

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {Error} Socket connection must exist.
   */
  disconnect = () => {
    if (this.websocket) {
      this.close()
    } else {
      throw new Error('Socket connection not initialized. please connect first')
    }
  }

  /**
   * WebSocket send event handler.
   *
   * @param msg
   *
   * @throws {Error} Socket connection must exist.
   */
  send = (msg: any) => {
    if (this.websocket) {
      if (this.options.serializer) {
        this.websocket.send(this.options.serializer(msg))
      } else {
        throw new Error('Serializer not provided')
      }
    } else {
      throw new Error('Socket connection not initialized. please connect first')
    }
  }

  /**
   * Handle a close event.
   *
   */
  private handleClose = () => {
    // Conditionally attempt reconnection if enabled and applicable
    const { reconnectOnClose } = this.options
    if (reconnectOnClose && this.canAttemptReconnect()) {
      this.handleBrokenConnection()
    }
  }

  /**
   * Handle an error event.
   *
   * @param {Event} event
   */
  private handleError = () => {
    if (this.canAttemptReconnect()) {
      this.handleBrokenConnection()
    }
  }

  /**
   * Handle an open event.
   *
   * @param {(s: WebSocket) => void | undefined} onOpen
   */
  private handleOpen = (onOpen: ((s: WebSocket) => void) | undefined) => {
    // Clean up any outstanding reconnection attempts.
    if (this.reconnectionInterval) {
      clearInterval(this.reconnectionInterval)

      this.reconnectionInterval = null
      this.reconnectCount = 0
    }

    // Hook to allow consumers to get access to the raw socket.
    if (onOpen && this.websocket != null) {
      onOpen(this.websocket)
    }

    // Track that we've been able to open the connection. We can use this flag
    // for error handling later, ensuring we don't try to reconnect when a
    // connection was never able to open in the first place.
    this.hasOpened = true
  }

  /**
   * Handle a message event.
   *
   * @param {MessageEvent} event
   */
  private baseHandleMessage = (event: { data: any; type: string; target: WebSocket }) => {
    //处理消息
    this.handleMessage(event.data)
    console.log(event)
  }

  /**
   * Close the WebSocket connection.
   * @private
   *
   * @param {number} [code]
   * @param {strin} [reason]
   */
  private close = (code?: number, reason?: string) => {
    if (this.websocket) {
      this.websocket.close(code || 1000, reason || 'WebSocket connection closed by redux-websocket.')

      this.websocket = null
      this.hasOpened = false
    }
  }

  /**
   * Handle a broken socket connection.
   * @private
   *
   */
  private handleBrokenConnection = () => {
    const { reconnectInterval } = this.options

    this.websocket = null

    this.reconnectCount = 1

    // Attempt to reconnect immediately by calling connect with assertions
    // that the arguments conform to the types we expect.
    this.connect(this.lastSocketUrl)

    // Attempt reconnecting on an interval.
    this.reconnectionInterval = setInterval(() => {
      this.reconnectCount += 1
      // Call connect again, same way.
      this.connect(this.lastSocketUrl)
    }, reconnectInterval)
  }

  // Only attempt to reconnect if the connection has ever successfully opened,
  // and we're not currently trying to reconnect.
  //
  // This prevents ongoing reconnect loops to connections that have not
  // successfully opened before, such as net::ERR_CONNECTION_REFUSED errors.
  //
  // This also prevents starting multiple reconnection attempt loops.
  private canAttemptReconnect(): boolean {
    return this.hasOpened && this.reconnectionInterval == null
  }
}
