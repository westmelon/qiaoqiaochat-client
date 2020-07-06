import React from 'react'
import { Layout, List, Avatar, Input, Button } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
const { Header, Footer, Sider, Content } = Layout
const { TextArea } = Input
const electron = window.require('electron')
const { ipcRenderer } = electron

import { withStore } from '@/src/components'

interface ChatProps extends PageProps, StoreProps {
  message: StoreStates['message']
}

declare interface ChatState {
  history: Array<string>
  message: string
  collapsed: boolean
}

@withStore(['message'])
export default class Chat extends React.Component<ChatProps, ChatState> {
  state = {
    history: [],
    message: '',
    collapsed: false,
  }

  // 构造函数
  constructor(props: ChatProps) {
    super(props)
  }

  onCollapse = (collapsed: any) => {
    console.log(collapsed)
    this.setState({ collapsed })
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
    const { message: msg } = this.props
    console.log(msg)
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
            <Content style={{ height: '70%' }}>
              <p>{msg}</p>
            </Content>
            <TextArea
              rows={4}
              onChange={e => {
                this.handleChange(e)
              }}
            />
            <Button
              onClick={() => {
                ipcRenderer.send('close')
                this.props.dispatch({ type: 'ACTION_SEND_MESSAGE', data: this.state.message })
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
