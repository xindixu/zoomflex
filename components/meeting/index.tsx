import { VideoClient } from "@zoom/videosdk"
import React, { useEffect, useState, useContext } from "react"
import { ZoomContext } from "../../context/zoom"
import { TStream, TVideoClient } from "../../types/zoom"
import ZoomVideo from "@zoom/videosdk"

type Props = {
  topic: string
  signature: string
  name: string
  password: string
}

const Zoom = ({ topic, signature, name, password }: Props) => {
  const [mediaStream, setMediaStream] = useState<TStream | null>(null)
  const [loading, setLoading] = useState(false)
  const { videoClient, setVideoClient } = useContext(ZoomContext)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVideoClient(ZoomVideo.createClient())
    }
  }, [])

  useEffect(() => {
    if (!videoClient) {
      return
    }

    const init = async () => {
      await videoClient.init("en-US", "CDN")

      try {
        setLoading(true)
        await videoClient
          .join(topic, signature, name, password)
          .catch((e: any) => {
            console.log(e)
          })
        const stream = videoClient.getMediaStream()
        setMediaStream(stream)
      } catch (e: any) {
        setLoading(false)
      }
    }
    init()
    return () => {
      ZoomVideo.destroyClient()
      setVideoClient(null)
    }
  }, [videoClient])

  return null
}

const Wrapper = (props: Props) => {
  const [videoClient, setVideoClient] = useState<TVideoClient | null>(null)

  return (
    <ZoomContext.Provider value={{ videoClient, setVideoClient }}>
      <Zoom {...props} />
    </ZoomContext.Provider>
  )
}

export default Wrapper
