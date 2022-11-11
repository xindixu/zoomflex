import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react"
import classnames from "classnames"
import _ from "lodash"

import { ZoomContext, MediaContext } from "../../context/zoom"

// import VideoFooter from "./components/video-footer"
// import Pagination from "./components/pagination"
import { useCanvasDimension } from "./hooks/useCanvasDimension"
import { useGalleryLayout } from "./hooks/useGalleryLayout"
import { usePagination } from "./hooks/usePagination"
import { useActiveVideo } from "./hooks/useAvtiveVideo"
import Avatar from "./avatar"

import VideoFooter from "./video-footer"
import "./video.module.scss"

const VideoContainer = () => {
  const zoomClient = useContext(ZoomContext)
  const {
    mediaStream,
    video: { decode: isVideoDecodeReady },
  } = useContext(MediaContext)
  const videoRef = useRef<HTMLCanvasElement | null>(null)

  const canvasDimension = useCanvasDimension(mediaStream, videoRef)
  const activeVideo = useActiveVideo(zoomClient)
  const { page, pageSize, totalPage, totalSize, setPage } = usePagination(
    zoomClient,
    canvasDimension
  )
  const { visibleParticipants, layout: videoLayout } = useGalleryLayout(
    zoomClient,
    mediaStream,
    isVideoDecodeReady,
    videoRef,
    canvasDimension,
    {
      page,
      pageSize,
      totalPage,
      totalSize,
    }
  )

  return (
    <div className="viewport">
      <div className={"video-container"}>
        <canvas
          className="video-canvas"
          id="video-canvas"
          width="800"
          height="600"
          ref={videoRef}
        />
        <ul className="avatar-list">
          {visibleParticipants.map((user, index) => {
            if (index > videoLayout.length - 1) {
              return null
            }
            const dimension = videoLayout[index]
            const { width, height, x, y } = dimension
            const { height: canvasHeight } = canvasDimension
            return (
              <Avatar
                participant={user}
                key={user.userId}
                isActive={activeVideo === user.userId}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  top: `${canvasHeight - y - height}px`,
                  left: `${x}px`,
                }}
              />
            )
          })}
        </ul>
      </div>
      <VideoFooter className="video-operations" />
      {/* {totalPage > 1 && (
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      )} */}
    </div>
  )
}

export default VideoContainer
