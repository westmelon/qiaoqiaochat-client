import React from 'react'
import { Layout, List, Avatar, Input, Button, Typography } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import InfiniteScroll from 'react-infinite-scroller'

const { TextArea } = Input
import { IpcService } from '@/electron/ipc/IpcService'
import { IpcResponse } from '@/electron/ipc/IpcResponse'
import { withStore } from '@/src/components'
import { v4 as uuidv4 } from 'uuid'
import { Message, MessageType } from '@/core/store/actions/type'

const ipc = new IpcService()

interface ChatProps extends PageProps, StoreProps {
  chat: StoreStates['chat']
  message: StoreStates['message']
}

declare interface ChatState {
  history: Array<string>
  message: string
  friend: string
}

@withStore(['chat', 'message'])
export default class Chat extends React.Component<ChatProps, ChatState> {
  state = {
    history: [],
    message: '',
    friend: 'nini',
  }

  // 构造函数
  constructor(props: ChatProps) {
    super(props)
  }

  chat() {
    const id = uuidv4()
    const baseParam = {
      receiver: this.state.friend,
      textContent: this.state.message,
      identifier: id,
    }
    ipc.send<IpcResponse>('websocket-chat', { params: [JSON.stringify(baseParam)] })
    //先塞message
    const message = new Message()
    message.sender = 'nini'
    message.receiver = 'nini'
    message.content = this.state.message
    message.id = id
    message.identifier = id
    this.props.dispatch({
      type: 'ACTION_SEND_CLIENT_MESSAGE',
      data: message,
    })
    //再塞chat
    this.props.dispatch({
      type: 'ACTION_CHAT_SEND_MESSAGE',
      data: { receiver: this.state.friend, id: id },
    })
  }

  render() {
    const data = [
      {
        title: 'doudou',
        avatar: '',
        shortcut: 'nihao',
      },
      {
        title: 'nini',
        avatar: '',
        shortcut: 'nihao',
      },
      {
        title: 'tutu',
        avatar: '',
        shortcut: 'nihao',
      },
      {
        title: 'jack',
        avatar: '',
        shortcut: 'nihao',
      },
    ]
    const { chat, message } = this.props
    const aChat = chat['nini']
    let messageIds: Array<string> = aChat.messages
    const receiveMessage = message.receive
    const sendMessage = message.send
    messageIds = messageIds.filter(item => item in receiveMessage || item in sendMessage)
    const messages: Array<MessageType | undefined> = messageIds.map(id => {
      if (id in receiveMessage) {
        return receiveMessage[id]
      } else if (id in sendMessage) {
        return sendMessage[id]
      }
      return
    })
    console.log(messages)
    return (
      <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Sider width={300}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<p>{item.title}</p>}
                    description={item.shortcut}
                  />
                </List.Item>
              )}
            />
          </Sider>
          <Content>
            <Content style={{ height: '70%', overflow: 'auto' }}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => console.log(1)}
                hasMore={false}
                useWindow={false}
              >
                <List
                  style={{ overflow: 'auto' }}
                  bordered
                  dataSource={messages}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text mark>{item?.sender}</Typography.Text> {item?.content}
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </Content>
            <TextArea
              rows={4}
              onChange={e => {
                this.handleChange(e)
              }}
            />
            <Button
              onClick={() => {
                this.chat()
              }}
            >
              发送
            </Button>
          </Content>
        </Layout>
      </div>
    )
  }

  handleChange = (e: any) => {
    console.log(e)
    this.setState({
      message: e.target.value,
    })
  }
} // class About end
