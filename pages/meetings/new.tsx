import React, { useContext, useState } from "react"
import { Steps, Typography } from "antd"

import AuthContext from "../../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../../components/protected-routes"
import VideoForm from "../../components/video/form"
import RoomForm from "../../components/room/form"
import UserForm from "../../components/users/form"
import { createVideo, createRoom, addParticipants } from "../../lib/api"

const { Title } = Typography

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [videoId, setVideoId] = useState()
  const [roomId, setRoomId] = useState()

  const content = [
    <VideoForm
      onSubmit={(values) => {
        console.log(values)
        createVideo(values).then(({ id }) => {
          setVideoId(id)
          setStep(1)
        })
      }}
    />,
    <RoomForm
      onSubmit={(values) => {
        console.log(values)
        createRoom({ ...values, videoId, hostId: currentUser?.id }).then(
          ({ id }) => {
            setStep(2)
            setRoomId(id)
          }
        )
      }}
    />,
    <UserForm
      onSubmit={(values) => {
        console.log(values)
        addParticipants({ ...values, roomId }).then(() => {
          console.log("done!")
          router.push(`/meetings/current?roomId=${roomId}`)
        })
      }}
    />,
  ]

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

export default Meetings
// export default withProtectedRoute(Meetings)
