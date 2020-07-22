export interface MessageType {
  id: string
  uniqueId: string
  sender: string
  receiver: string
  type: string
  content: string
  timestamp: number
  state: number
  identifier: string
}

//服务端响应消息类型
export interface ServerReplyMessageType {
  id: string
  uniqueId: string
  sender: string
  receiver: string
  type: string
  content: string
  timestamp: number
  state: number
  identifier: string
}

export interface MessageWrapper {
  receive: { [key: string]: MessageType }
  send: { [key: string]: MessageType }
}

export interface ChatWrapper {
  chat: { [key: string]: ChatType }
}

//一个聊天类型
export interface ChatType {
  someone: string
  type: number
  messages: Array<string>
}

export class Message implements MessageType {
  id = ''
  uniqueId = ''
  sender = ''
  receiver = ''
  type = ''
  content = ''
  timestamp = 0
  state = 0
  identifier = ''
}

export class Chat implements ChatType {
  someone = ''
  type = 0
  messages = []

  constructor(someone: string) {
    this.someone = someone
  }
}
