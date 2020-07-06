import { Model as QiaoQiaoHua, IModel } from './compiled'
import {
  COMMAND_CONNECT,
  COMMAND_CLOSE,
  COMMAND_HEARTBEAT,
  COMMAND_ONLINE,
  COMMAND_OFFLINE,
  COMMAND_MESSAGE,
  MESSAGE_SEND,
  MESSAGE_SEND_REPLY,
  MESSAGE_NOTIFY,
  MESSAGE_NOTIFY_REPLY,
} from './const'

const create = (properties?: IModel): QiaoQiaoHua => {
  return QiaoQiaoHua.create(properties)
}

export const encode = (message: QiaoQiaoHua) => {
  return QiaoQiaoHua.encode(message).finish()
}

export const decode = (buffer: Uint8Array): QiaoQiaoHua => {
  return QiaoQiaoHua.decode(buffer)
}

//发消息
export const sendMessage = (baseParam: IModel) => {
  return messageGenerater(baseParam, COMMAND_MESSAGE, MESSAGE_SEND)
}

//验证连接
export const shakehandsMsg = (token: string) => {
  return messageGenerater({ token: token }, COMMAND_CONNECT)
}

//消息应答
export const replyMsg = (qiaoqiaohua: QiaoQiaoHua): QiaoQiaoHua | null => {
  const cmd = qiaoqiaohua.cmd
  const msgType = qiaoqiaohua.msgType
  if (cmd == COMMAND_HEARTBEAT) {
    return heartbeatMsg()
  }
  if (cmd == COMMAND_MESSAGE && msgType == MESSAGE_SEND) {
    return replyMessage(qiaoqiaohua)
  }
  return null
}

//心跳包
const heartbeatMsg = (): QiaoQiaoHua => {
  console.log('heartbeat')
  return messageGenerater({}, COMMAND_HEARTBEAT)
}

//消息回应
const replyMessage = (qiaoqiaohua: QiaoQiaoHua): QiaoQiaoHua => {
  console.log('reply message')
  return messageGenerater({}, COMMAND_MESSAGE, MESSAGE_SEND_REPLY)
}

const messageGenerater = (baseParam: IModel, cmd: number, msgType = 0) => {
  const qiaoqiaohua = create(baseParam)
  qiaoqiaohua.cmd = cmd
  qiaoqiaohua.msgType = msgType
  qiaoqiaohua.timestamp = new Date().getTime
  qiaoqiaohua.groupId = ''
  return qiaoqiaohua
}
