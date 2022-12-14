import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button, Typography } from "antd"

import AuthContext from "../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../components/protected-routes"
import NextLink from "next/link"
import { getRoom, getVideo, getVideoUrlByRoomId } from "../lib/api"

const Call = dynamic(() => import("../components/call"), { ssr: false })
const Video = dynamic(() => import("../components/video"), { ssr: false })

const Meeting = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const { query } = router
  const { roomId } = query
  const [url, setUrl] = useState("")
  const [hostId, setHostId] = useState(-1)

  useEffect(() => {
    if (roomId) {
      const start = async () => {
        const room = await getRoom(roomId)
        const videoId = room.video_id
        setHostId(room.host_id)

        const video = await getVideo(videoId)
        setUrl(video.video_url)
      }
      try {
        start()
      } catch (error) {
        console.error(error)
      }
    }
  }, [roomId])

  return (
    <div>
      {roomId && hostId && (
        <Call id={roomId} isHost={hostId === currentUser?.id} />
      )}
      {url && <Video url={url} />}
    </div>
  )
}

const CurrentMeetingsPage = () => {
  const router = useRouter()
  const { query } = router

  if (!query?.roomId) {
    return (
      <NextLink href="/new-meeting" passHref>
        <Button>Create a new meeting</Button>
      </NextLink>
    )
  }

  return <Meeting />
}

export default withProtectedRoute(CurrentMeetingsPage)
