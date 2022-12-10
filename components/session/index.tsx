import React, { useEffect, useState } from "react"
import { Divider, notification, Spin, Typography, Col, Row } from "antd"
import dynamic from "next/dynamic"

import { signUp, signIn } from "../../lib/auth"
import NewSession from "./form"

const Google = dynamic(() => import("./google"), { ssr: false })

const { Title, Text } = Typography

const NOTIFICATIONS = {
  SIGNUP: "Sign Up Failed",
  SIGNIN: "Sign In Failed",
}

const PROMPTS = {
  SIGNUP: {
    title: "Sign up",
    text: "Sign up to fully enjoy exciting features offered by Zoomflex",
  },
  SIGNIN: {
    title: "Sign in",
    text: "Sign in to enjoy all features offered by Zoomflex",
  },
}

export const SIGNIN = "SIGNIN"
export const SIGNUP = "SIGNUP"

export const BUTTON_TEXT = {
  SIGNIN: "Sign in",
  SIGNUP: "Sign up",
}

const ACTIONS = {
  SIGNUP: signUp,
  SIGNIN: signIn,
}

const KEY = "session-create-error"
const openNotification = (title, msg) => {
  notification.error({
    message: title,
    description: msg,
    duration: 0,
    key: KEY,
  })
}

type TProps = {
  type: typeof SIGNIN | typeof SIGNUP
  initialEmail?: string
  onSuccess: (user: any) => void
}

function Session({ type, initialEmail = "", onSuccess }: TProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      notification.destroy(KEY)
    }
  }, [])

  const onSubmit = async (values) => {
    try {
      notification.destroy(KEY)
      setIsSubmitting(true)
      // @ts-ignore
      const { user } = await ACTIONS[type](values)
      console.log(user)
      onSuccess(user)
    } catch (err) {
      // @ts-ignore
      openNotification(NOTIFICATIONS[type], err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = (
    <>
      <NewSession
        type={type}
        onSubmit={onSubmit}
        // @ts-ignore
        initialValues={{ email: initialEmail }}
      />
      <Col offset={4} span={16}>
        <Divider plain> Or </Divider>
        <Google type={type} onSuccess={onSuccess} />
      </Col>
    </>
  )
  return (
    <>
      <Row>
        <Col offset={4}>
          <Title level={2}>{PROMPTS[type].title}</Title>
          <Text>{PROMPTS[type].text}</Text>
        </Col>
      </Row>
      {isSubmitting ? <Spin>{content}</Spin> : content}
    </>
  )
}

export default Session
