import React, { useContext } from "react"
import dynamic from "next/dynamic"

import AuthContext from "../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../components/protected-routes"

const Call = dynamic(() => import("../components/call"), { ssr: false })
const Video = dynamic(() => import("../components/video"), { ssr: false })

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)
  const { query } = useRouter()
  const { roomId } = query
  if (!roomId) {
    return <div>Room not found</div>
  }

  console.log(currentUser?.email, currentUser?.username)
  return (
    <div>
      <Call />
      <Video />
    </div>
  )
}

export default withProtectedRoute(Meetings)
