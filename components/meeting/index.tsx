import { message, Modal } from "antd"

import { ConnectionState, ReconnectReason } from "@zoom/videosdk"
import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react"
import { ZoomContext, MediaContext } from "../../context/zoom"
import ZoomVideo from "@zoom/videosdk"
import { TStream, TVideoClient } from "../../types/zoom"

import Video from "./video"
type Props = {
  topic: string
  signature: string
  name: string
  password: string
}

const mediaShape = {
  audio: {
    encode: false,
    decode: false,
  },
  video: {
    encode: false,
    decode: false,
  },
}
const mediaReducer = (state, action) => {
  const draft = { ...state }
  switch (action.type) {
    case "audio-encode": {
      draft.audio.encode = action.payload
      break
    }
    case "audio-decode": {
      draft.audio.decode = action.payload
      break
    }
    case "video-encode": {
      draft.video.encode = action.payload
      break
    }
    case "video-decode": {
      draft.video.decode = action.payload
      break
    }
    case "reset-media": {
      Object.assign(draft, { ...mediaShape })
      break
    }
    default:
      break
  }
  return draft
}

const Zoom = ({ topic, signature, name, password }: Props) => {
  const zoomClient = useContext(ZoomContext)
  const [mediaStream, setMediaStream] = useState<TStream | null>(null)
  const [mediaState, dispatch] = useReducer(mediaReducer, mediaShape)

  const [loading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState("")
  const [status, setStatus] = useState<string>("closed")
  const [isFailover, setIsFailover] = useState<boolean>(false)

  const mediaContext = useMemo(
    () => ({ ...mediaState, mediaStream }),
    [mediaState, mediaStream]
  )

  useEffect(() => {
    if (!zoomClient) {
      return
    }

    const init = async () => {
      await zoomClient.init("en-US", "CDN")

      try {
        setLoadingText("Joining the session...")
        await zoomClient
          .join(topic, signature, name, password)
          .catch((e: any) => {
            console.log(e)
          })
        const stream = zoomClient.getMediaStream()
        setMediaStream(stream)
        setIsLoading(false)
      } catch (e: any) {
        setIsLoading(false)
      }
    }
    init()
    return () => {
      ZoomVideo.destroyClient()
    }
  }, [zoomClient])

  const onConnectionChange = useCallback(
    (payload) => {
      console.log("here")
      if (payload.state === ConnectionState.Reconnecting) {
        setIsLoading(true)
        setIsFailover(true)
        setStatus("connecting")
        const { reason, subsessionName } = payload
        if (reason === ReconnectReason.Failover) {
          setLoadingText("Session Disconnected,Try to reconnect")
        } else if (
          reason === ReconnectReason.JoinSubsession ||
          reason === ReconnectReason.MoveToSubsession
        ) {
          setLoadingText(`Joining ${subsessionName}...`)
        } else if (reason === ReconnectReason.BackToMainSession) {
          setLoadingText("Returning to Main Session...")
        }
      } else if (payload.state === ConnectionState.Connected) {
        setStatus("connected")
        if (isFailover) {
          setIsLoading(false)
        }
        // window.zoomClient = zoomClient
        // window.mediaStream = zoomClient.getMediaStream()
      } else if (payload.state === ConnectionState.Closed) {
        setStatus("closed")
        dispatch({ type: "reset-media" })
        if (payload.reason === "ended by host") {
          Modal.warning({
            title: "Meeting ended",
            content: "This meeting has been ended by host",
          })
        }
      }
    },
    [isFailover, zoomClient]
  )

  useEffect(() => {
    zoomClient.on("connection-change", onConnectionChange)
    return () => {
      zoomClient.off("connection-change", onConnectionChange)
    }
  }, [zoomClient, onConnectionChange])

  return (
    <MediaContext.Provider value={mediaContext}>
      <Video />
    </MediaContext.Provider>
  )
}

const Wrapper = (props: Props) => {
  const [videoClient, setVideoClient] = useState<TVideoClient | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVideoClient(ZoomVideo.createClient())
    }
  }, [])
  if (!videoClient) {
    return null
  }
  return (
    <ZoomContext.Provider value={videoClient}>
      <Zoom {...props} />
    </ZoomContext.Provider>
  )
}

export default Wrapper
