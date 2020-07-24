import * as React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
const electron = window.require('electron')
const { ipcRenderer } = electron
import { AppRouter, AppLayout, withStore } from '@/src/components'
import { MessageType, Message } from '@/core/store/actions/type'
import { IModel as QiaoQiaoHua } from '@/core/protobuf/compiled'
import { MESSAGE_SEND, MESSAGE_SEND_REPLY } from '@/core/protobuf/const'
import routes from './auto-routes'
import { buildStore } from '@/core/store'

interface AppProps {
  createConfig: CreateConfig
}

const store = buildStore()

// @withStore(['message'])
export default class App extends React.Component<AppProps> {
  componentDidMount() {
    //接收websocket消息
    ipcRenderer.on('pikaqiu', (event: any, message: string) => {
      const msg: QiaoQiaoHua = JSON.parse(message)
      const msgType = msg.msgType
      switch (msgType) {
        case MESSAGE_SEND:
          //普通消息
          //消息重新封装
          const message = new Message()
          message.id = msg.uniqueId ? msg.uniqueId : ''
          message.content = msg.textContent ? msg.textContent : ''
          message.sender = msg.sender ? msg.sender : ''
          message.receiver = msg.receiver ? msg.receiver : ''
          message.uniqueId = msg.uniqueId ? msg.uniqueId : ''
          message.timestamp = msg.timestamp ? msg.timestamp : 0
          message.identifier = msg.identifier ? msg.identifier : ''
          store.dispatch({
            type: 'ACTION_RECEIVE_SERVER_MESSAGE',
            data: message,
          })
          store.dispatch({
            type: 'ACTION_CHAT_RECEIVE_MESSAGE',
            data: { receiver: msg.receiver, id: msg.uniqueId },
          })
          break
        case MESSAGE_SEND_REPLY:
          //消息应答
          store.dispatch({
            type: 'ACTION_CHAT_RECEIVE_MESSAGE_REPLY',
            data: { receiver: msg.receiver, uniqueId: msg.uniqueId, identifier: msg.identifier },
          })
          store.dispatch({
            type: 'ACTION_RECEIVE_SERVER_MESSAGE_REPLY',
            data: { uniqueId: msg.uniqueId, identifier: msg.identifier },
          })
          break
        default:
          break
      }
    })
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <AppLayout createConfig={this.props.createConfig}>
          <AppRouter routes={routes} store={store} />
        </AppLayout>
      </ConfigProvider>
    )
  }
}
