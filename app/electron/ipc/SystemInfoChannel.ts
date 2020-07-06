import { IpcChannelInterface } from './IpcChannelInterface'
import { IpcMainEvent } from 'electron'
import { IpcRequest } from './IpcRequest'
import { execSync } from 'child_process'

export class SystemInfoChannel implements IpcChannelInterface {
  getName(): string {
    return 'system-info'
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`
    }
    event.sender.send(request.responseChannel, { kernel: execSync('uname -a').toString() })
  }
}

export class SystemInfoChannel2 implements IpcChannelInterface {
  getName(): string {
    return 'system-info'
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`
    }
    event.sender.send(request.responseChannel, { kernel: execSync('uname -a').toString() })
  }
}
