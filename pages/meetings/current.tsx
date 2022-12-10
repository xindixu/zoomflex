import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button, Typography } from "antd"

import AuthContext from "../../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../../components/protected-routes"
import NextLink from "next/link"
import { getVideoUrlByRoomId } from "../../lib/api"

const { Link } = Typography

const Call = dynamic(() => import("../../components/call"), { ssr: false })
const Video = dynamic(() => import("../../components/video"), { ssr: false })

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const { query } = router

  const [url, setUrl] = useState("")

  useEffect(() => {
    if (query.roomId) {
      getVideoUrlByRoomId(query.roomId).then(setUrl)
    }
  }, [query.roomId])

  console.log(currentUser?.email, currentUser?.username)
  return (
    <div>
      <Call />
      {url && <Video url={url} />}
    </div>
  )
}

const MeetingsPage = () => {
  const router = useRouter()
  const { query } = router

  if (!query.roomId) {
    return (
      <div>
        <NextLink href="/meetings/new" passHref>
          <Button>Create a new meeting</Button>
        </NextLink>
      </div>
    )
  }

  return <Meetings />
}
export default Meetings
// export default withProtectedRoute(Meetings)
