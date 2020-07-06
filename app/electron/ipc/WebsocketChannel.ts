import { IpcChannelInterface } from './IpcChannelInterface'
import { IpcMainEvent } from 'electron'
import { IpcRequest } from './IpcRequest'
import { IpcResponse } from './IpcResponse'
import { connect, shakehands } from '../../core/websocket/index2'

const DEFAULT_RESPONSE: IpcResponse = {
  status: true,
  message: 'success',
}
export class WebSocketConnectChannel implements IpcChannelInterface {
  getName(): string {
    return 'websocket-connect'
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    let response = DEFAULT_RESPONSE
    try {
      console.log(5654432563)
      await connect()
      console.log(5654432563111111)
    } catch (e) {
      console.log(e)
      response = { status: false, message: 'error' }
    }
    send(event, request, response)
  }
}

export class WebSocketShakehandsChannel implements IpcChannelInterface {
  getName(): string {
    return 'websocket-shakehands'
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    let response = DEFAULT_RESPONSE
    try {
      console.log(5654432563)
    } catch (e) {
      console.log(e)
      response = { status: false, message: 'error' }
    }
    send(event, request, response)
  }
}

const send = (event: IpcMainEvent, request: IpcRequest, response: IpcResponse) => {
  if (!request.responseChannel) {
    throw new Error('fuck')
  }
  event.sender.send(request.responseChannel, response)
}
