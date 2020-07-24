import { MessageType, MessageWrapper, ServerReplyMessageType, Chat } from './type'

export const initialState = {
  message: {
    receive: {},
    send: {},
  },
}

//接收到服务端消息
export function ACTION_RECEIVE_SERVER_MESSAGE(
  state: StoreStates,
  action: StoreAction<'ACTION_RECEIVE_SERVER_MESSAGE'>
): { message: MessageWrapper } {
  //合并消息
  const receive = action.data
  const merge = Object.assign({}, state.message.receive, { [receive.uniqueId]: receive })
  const rtn = Object.assign({}, state.message, { receive: merge })
  return { message: rtn }
}

//接收到服务端消息应答 某条消息的ack信息 identifier 对应的本地消息  替换message.send中的消息
export function ACTION_RECEIVE_SERVER_MESSAGE_REPLY(
  state: StoreStates,
  action: StoreAction<'ACTION_RECEIVE_SERVER_MESSAGE_REPLY'>
): { message: MessageWrapper } {
  //接收到的消息
  const receive = action.data
  const identifier = receive.identifier
  const uniqueId = receive.uniqueId
  //根据identifier 查找message.send 中对应的消息
  const sendMessage = Object.assign({}, state.message.send)
  if (identifier in sendMessage) {
    const sended = sendMessage[identifier]
    sended.uniqueId = uniqueId
    sendMessage[uniqueId] = sended
    delete sendMessage[identifier]
  }
  return { message: Object.assign({}, state.message, { send: sendMessage }) }
}

//客户端发送消息
export function ACTION_SEND_CLIENT_MESSAGE(
  state: StoreStates,
  action: StoreAction<'ACTION_SEND_CLIENT_MESSAGE'>
): { message: MessageWrapper } {
  const sendMessage = Object.assign({}, state.message.send)
  const message = action.data
  sendMessage[message.id] = message
  return { message: Object.assign({}, state.message, { send: sendMessage }) }
}

declare global {
  //state 节点类型
  interface StoreStates {
    message: MessageWrapper
  }

  //参数类型
  interface StoreActions {
    ACTION_RECEIVE_SERVER_MESSAGE: MessageType
    ACTION_RECEIVE_SERVER_MESSAGE_REPLY: { uniqueId: string; identifier: string }
    ACTION_SEND_CLIENT_MESSAGE: MessageType
  }
}
