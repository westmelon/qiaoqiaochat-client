import React from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd'
import { withStore } from '@/src/components'
// import { connect, shakehands } from '../../../core/websocket/index2'
import { IpcService } from '@/electron/ipc/IpcService'
import { IpcResponse } from '@/electron/ipc/IpcResponse'
const electron = window.require('electron')
const { ipcRenderer } = electron

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

interface LoginProps extends PageProps, StoreProps {
  user: StoreStates['user']
}

declare interface LoginState {
  asyncDispatchLoading: boolean
  content: string
}

const ipc = new IpcService()

@withStore(['user'])
export default class Login extends React.Component<LoginProps, LoginState> {
  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }

  async connect(): Promise<IpcResponse> {
    const t = await ipc.send<IpcResponse>('websocket-connect')
    return t
  }

  async shakehands(): Promise<IpcResponse> {
    const t = await ipc.send<IpcResponse>('websocket-shakehands')
    return t
  }

  state: LoginState = {
    asyncDispatchLoading: false,
    content: '登陆',
  }

  componentDidMount = () => {
    console.log($store)
  }

  //异步函数
  asyncDispatch = (dispatch: Dispatch) => {
    return new Promise(resolve => {
      this.setState({ asyncDispatchLoading: true, content: '登陆中' })
      setTimeout(() => {
        // dispatch({ type: 'ACTION_ADD_COUNT', data: count + 1 })
        this.setState({ asyncDispatchLoading: false, content: '登陆' })
        resolve()
      }, 1000)
    })
  }

  onFinish = async (values: any) => {
    console.log('Success:', values)
    console.log(this.props)
    // this.props.dispatch(this.asyncDispatch)
    this.setState({ asyncDispatchLoading: true, content: '登陆中' })
    try {
      const data = await $api.request('/auth/login', values)
      //建立socket连接
      await this.connect()

      //sock连接验证
      // await shakehands(data.token)
      // this.doLoginSuccess(values.account, data.token)
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ asyncDispatchLoading: false, content: '登陆' })
    }
  }
  doLoginSuccess = (account: string, token: string) => {
    this.props.dispatch({
      type: 'ACTION_USER_LOGIN_SUCCESS',
      data: {
        account: account,
        token: token,
        isLogin: true,
      },
    })
    // ipcRenderer.send('closed')
    $tools.createWindow('Home')
  }

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    const { asyncDispatchLoading, content } = this.state

    return (
      <div className="about flex column center" style={{ height: '100%' }}>
        <Card title="Redux Test" className="mb-16">
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="account"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={asyncDispatchLoading}>
                {content}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
} // class About end
