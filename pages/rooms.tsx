import { Divider, Typography } from "antd"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import withProtectedRoute from "../components/protected-routes"

import RoomForm from "../components/room/form"

const { Title } = Typography
const fackAPI = (values) =>
  new Promise((resolve) => {
    console.log(values)
    resolve(100)
  })

const Rooms: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Title level={2}>Create a room</Title>
      <RoomForm
        onSubmit={(values) => {
          // TODO: call api to create room
          fackAPI(values).then((id) => {
            router.push(`/meetings?roomId=${id}`)
          })
        }}
      />
      <Divider plain> Or </Divider>
      <Title level={2}>Join a room</Title>
      <p>PLACEHOLDER: list of room</p>
    </>
  )
}

export default withProtectedRoute(Rooms)
