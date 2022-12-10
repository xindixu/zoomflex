import React, { useContext, useState } from "react"
import dynamic from "next/dynamic"
import { Steps, Typography } from "antd"

import AuthContext from "../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../components/protected-routes"
import VideoForm from "../components/video/form"
import RoomForm from "../components/room/form"
import UserForm from "../components/users/form"
import { createVideo, createRoom, addParticipants } from "../lib/api"

const { Title } = Typography

const Call = dynamic(() => import("../components/call"), { ssr: false })
const Video = dynamic(() => import("../components/video"), { ssr: false })

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)
  const { query } = useRouter()
  const [step, setStep] = useState(2)
  const [videoId, setVideoId] = useState(1)
  const [roomId, setRoomId] = useState(1)

  const content = [
    <VideoForm
      onSubmit={(values) => {
        console.log(values)
        createVideo(values).then(() => {
          setVideoId(1)
          setStep(1)
        })
      }}
    />,
    <RoomForm
      onSubmit={(values) => {
        console.log(values)
        createRoom({ ...values, videoId, hostId: currentUser?.id }).then(() => {
          setStep(2)
          setRoomId(1)
        })
      }}
    />,
    <UserForm
      onSubmit={(values) => {
        console.log(values)
        addParticipants({ ...values, roomId }).then(() => {
          setStep(0)
        })
      }}
    />,
  ]

  if (!query.roomId) {
    return (
      <div>
        <Title level={2}>Create a meeting</Title>

        <Steps
          current={step}
          items={[
            {
              title: "Add a video",
            },
            {
              title: "Create a room",
            },
            {
              title: "Invite people",
            },
          ]}
          style={{ marginBottom: 24 }}
        />
        {content[step]}
      </div>
    )
  }

  console.log(currentUser?.email, currentUser?.username)
  return (
    <div>
      <Call />
      <Video />
    </div>
  )
}

export default Meetings
// export default withProtectedRoute(Meetings)
