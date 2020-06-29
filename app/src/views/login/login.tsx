import React from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd'

const electron = window.require('electron')
const { ipcRenderer } = electron

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export default class Login extends React.Component<PageProps> {
  onFinish = (values: any) => {
    console.log('Success:', values)
    ipcRenderer.send('close')
    this.openNewWindow()
  }

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  openNewWindow = () => {
    // this.setState({ createWindowLoading: true })
    $tools.createWindow('Home')
  }

  render() {
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
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
} // class About end
