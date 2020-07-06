import path from 'path'
import { Model as QiaoQiaoHua, IModel } from '../protobuf/compiled'
import MyWebSocket from './MyWebSocket'
import { shakehandsMsg, replyMsg, encode, decode } from '../protobuf/index'

const DEFAULT_CONFIG = {
  host: process.env.WS_HOST,
  protocol: process.env.WS_PROTOCOL,
  baseUrl: process.env.WS_BASE_PATH,
}

export const replyMessage: Map<string, any> = new Map()

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
    let count = 0
    const clock = setInterval(function() {
      console.log('connect count++')
      count++
      if ((isOpen = websocket.isOpen())) {
        console.log('connect success')
        resolve()
        clearInterval(clock)
      }
    }, 300)
  })
}

export const shakehands = (token: string) => {
  const websocket = MyWebSocket.getInstance()
  const qiaoqiaohua = shakehandsMsg(token)
  replyMessage.set(qiaoqiaohua.requestId, null)
  websocket.send(encode(qiaoqiaohua))
  //监听对应消息是否有返回
  return new Promise((resolve, reject) => {
    let count = 0
    const clock = setInterval(function() {
      count++
      // if (replyMessage.get('')) {
      if (true) {
        console.log('send success')
        resolve()
        clearInterval(clock)
      }
    }, 300)
  })
}

//发送消息
const send = (qiaoqiaohua: QiaoQiaoHua | null) => {
  if (qiaoqiaohua) {
    const websocket = MyWebSocket.getInstance()
    websocket.send(encode(qiaoqiaohua))
  }
}

//消息应答
export const reply = (qiaoqiaohua: QiaoQiaoHua) => {
  const message = replyMsg(qiaoqiaohua)
  send(message)
}

//接收到消息以后的回调函数 常驻
const callback = (message: Blob) => {
  //处理服务器接受到消息的ack消息
  const promise = new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(message)
    reader.onload = () => {
      const buf = new Uint8Array(reader.result as ArrayBuffer)
      if (buf) {
        resolve(buf)
      } else {
        reject()
      }
    }
    reader.onerror = () => {
      reject()
    }
  })
  promise.then(msg => {
    const decodeMsg = decode(msg)
    console.log(decodeMsg)
    reply(decodeMsg)
    //在这里处理消息？
  })
}
