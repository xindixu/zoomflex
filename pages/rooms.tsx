import { Divider, Typography } from "antd"
import type { NextPage } from "next"
import withProtectedRoute from "../components/protected-routes"

const { Title } = Typography

const Rooms: NextPage = () => {
  return (
    <>
      <Title level={2}>Join a room</Title>
      <p>PLACEHOLDER: list of room</p>
    </>
  )
}

export default withProtectedRoute(Rooms)
