import React, { useEffect, useRef } from "react"
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"

const client = ZoomMtgEmbedded.createClient()

type Props = {}

const Videos = (props: Props) => {
  const zoomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && zoomRef.current) {
      client.init({
        debug: true,
        zoomAppRoot: zoomRef.current,
        language: "en-US",
        customize: {
          meetingInfo: [
            "topic",
            "host",
            "mn",
            "pwd",
            "telPwd",
            "invite",
            "participant",
            "dc",
            "enctype",
          ],
          toolbar: {
            buttons: [
              {
                text: "Custom Button",
                className: "CustomButton",
                onClick: () => {
                  console.log("custom button")
                },
              },
            ],
          },
        },
      })
    }
  }, [])

  return <div ref={zoomRef} />
}

export default Videos
