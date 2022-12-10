import React, { useEffect } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import "videojs-youtube/dist/Youtube.min.js"

type Props = {
  url: string
}

const DEFAULT_OPTIONS = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
}

const Video = ({ url }: Props) => {
  const videoRef = React.useRef<HTMLDivElement>(null)
  const playerRef = React.useRef<any>(null)

  const options = {
    ...DEFAULT_OPTIONS,
    sources: [
      {
        type: "video/youtube",
        src: url,
      },
    ],
  }

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js")

      videoElement.classList.add("vjs-big-play-centered")
      videoRef?.current?.appendChild(videoElement)

      playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready")
      })
    }
  }, [])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div>
      <div ref={videoRef} />
    </div>
  )
}

export default Video
