import path from 'path'
import { Model as QiaoQiaoHua, IModel } from '../protobuf/compiled'
import MyWebSocket from './MyWebSocket'
import { shakehandsMsg, replyMsg, chatMsg, isMessage, encode, decode } from '../protobuf/index'

const DEFAULT_CONFIG = {
  host: process.env.WS_HOST,
  protocol: process.env.WS_PROTOCOL,
  baseUrl: process.env.WS_BASE_PATH,
}

export const replyMessage: Map<string, boolean> = new Map()

//创建websocket连接
export const connect = () => {
  console.log('connect begin')
  const { protocol, host, baseUrl } = DEFAULT_CONFIG
  const url = `${protocol}${path.join(host || '', baseUrl || '')}`
  const websocket = MyWebSocket.getInstance()
  websocket.setMessageHandler(callback)
  websocket.connect(url)
  console.log(websocket.isOpen())
  return new Promise((resolve, reject) => {
    let isOpen = false
    const clock = setInterval(function() {
      console.log('connect count++')
      if ((isOpen = websocket.isOpen())) {
        console.log('connect success')
        resolve()
        clearInterval(clock)
      }
    }, 300)
  })
}

//与服务器握手验证
export const shakehands = (token: string) => {
  const websocket = MyWebSocket.getInstance()
  const qiaoqiaohua = shakehandsMsg(token)
  //监听对应消息是否有返回
  return messageSendSuccessPromise(qiaoqiaohua)
}

//聊天消息
export const chat = (baseParam: IModel) => {
  const websocket = MyWebSocket.getInstance()
  const qiaoqiaohua = chatMsg(baseParam)
  //监听对应消息是否有返回
  send(qiaoqiaohua)
}

//发送消息
const send = (qiaoqiaohua: QiaoQiaoHua | null) => {
  if (qiaoqiaohua) {
    replyMessage.set(qiaoqiaohua.requestId, false)
    const websocket = MyWebSocket.getInstance()
    websocket.send(encode(qiaoqiaohua))
    return qiaoqiaohua.requestId
  }
}

const messageSendSuccessPromise = (qiaoqiaohua: QiaoQiaoHua) => {
  const requestId = send(qiaoqiaohua)
  return new Promise((resolve, reject) => {
    if (requestId == undefined) {
      reject('requestId is undefined')
    } else {
      const clock = setInterval(function() {
        if (replyMessage.get(requestId)) {
          console.log('send success')
          resolve()
          clearInterval(clock)
          replyMessage.delete(requestId)
        }
      }, 300)
    }
  })
}

//消息应答
export const reply = (qiaoqiaohua: QiaoQiaoHua) => {
  const message = replyMsg(qiaoqiaohua)
  send(message)
}

//接收到消息以后的回调函数 常驻
const callback = (message: Buffer) => {
  //处理服务器接受到消息的ack消息
  const buf = new Uint8Array(message)
  const decodeMsg = decode(buf)
  const responseId = decodeMsg.responseId
  // if (replyMessage.get(responseId) == false) {
  replyMessage.set(responseId, true)
  reply(decodeMsg)
  if (isMessage(decodeMsg)) {
    console.log('11111111')
    console.log(decodeMsg)
    const win = $tools.windowList.get('Home')
    if (win != undefined) {
      win.webContents.send('pikaqiu', JSON.stringify(decodeMsg))
    }
  }
  // }

  //在这里处理消息？
}
