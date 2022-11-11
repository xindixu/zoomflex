import React from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { meetingArgs } from "../../lib/zoom"
const Zoom = dynamic(() => import("../../components/meeting"), { ssr: false })

const Room = () => {
  const router = useRouter()
  const { rid } = router.query
  return (
    <div>
      Room: {rid}
      <Zoom
        topic={meetingArgs.topic}
        signature={meetingArgs.signature}
        name="Xindi"
        password={meetingArgs.password}
      />
    </div>
  )
}

export default Room
