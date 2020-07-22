import { IpcChannelInterface } from './IpcChannelInterface'
import { IpcMainEvent } from 'electron'
import { IpcRequest } from './IpcRequest'
import { IpcResponse } from './IpcResponse'
import { connect, shakehands, chat } from '../../core/websocket'

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
      await connect()
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

  async handle(event: IpcMainEvent, request: IpcRequest & { params: string[] }): Promise<void> {
    let response = DEFAULT_RESPONSE
    try {
      // if (request == undefined || request.params == undefined) {
      //   throw new Error('params is null')
      // }
      const token = request.params[0]
      await shakehands(token)
    } catch (e) {
      console.log(e)
      response = { status: false, message: 'error' }
    }
    send(event, request, response)
  }
}

export class WebSocketChatChannel implements IpcChannelInterface {
  getName(): string {
    return 'websocket-chat'
  }

  handle(event: IpcMainEvent, request: IpcRequest & { params: string[] }): void {
    let response = DEFAULT_RESPONSE
    try {
      const message = JSON.parse(request.params[0])
      chat(message)
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
