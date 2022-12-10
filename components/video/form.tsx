import React, { useEffect } from "react"
import { Form, Input, Button, Space } from "antd"

type TProps = {
  onSubmit: (value: any) => void
  initialValues?: {
    name: string
    url: string
  }
}

const VideoForm = ({ initialValues, onSubmit }: TProps) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo)
  }

  useEffect(() => form.resetFields(), [form, initialValues])

  return (
    <Form
      name="video"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true }, { type: "url" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Create Video
        </Button>
      </Form.Item>
    </Form>
  )
}

export default VideoForm
