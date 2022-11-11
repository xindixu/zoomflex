import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  MutableRefObject,
} from "react"
import classNames from "classnames"
import { message } from "antd"
import { ZoomContext, MediaContext } from "../../context/zoom"

import CameraButton from "./camera"
import MicrophoneButton from "./microphone"

import { useUnmount } from "../../hooks/useMount"
import { MediaDevice } from "./video-types"
import "./video-footer.module.scss"
import { SELF_VIDEO_ID } from "./video-constants"

import {
  MutedSource,
  AudioChangeAction,
  VideoCapturingState,
} from "@zoom/videosdk"

interface VideoFooterProps {
  className?: string
}

const isAudioEnable = typeof AudioWorklet === "function"
const VideoFooter = (props: VideoFooterProps) => {
  const { className } = props
  const [isStartedAudio, setIsStartedAudio] = useState(false)
  const [isStartedVideo, setIsStartedVideo] = useState(false)
  const [audio, setAudio] = useState("")
  const [isMirrored, setIsMirrored] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeMicrophone, setActiveMicrophone] = useState("")
  const [activeSpeaker, setActiveSpeaker] = useState("")
  const [activeCamera, setActiveCamera] = useState("")
  const [micList, setMicList] = useState<MediaDevice[]>([])
  const [speakerList, setSpeakerList] = useState<MediaDevice[]>([])
  const [cameraList, setCameraList] = useState<MediaDevice[]>([])
  const [isComputerAudioDisabled, setIsComputerAudioDisabled] = useState(false)
  const { mediaStream } = useContext(MediaContext)

  const zoomClient = useContext(ZoomContext)
  const onCameraClick = useCallback(async () => {
    if (isStartedVideo) {
      await mediaStream?.stopVideo()
      setIsStartedVideo(false)
    } else {
      const startVideoOptions = { hd: true }
      if (mediaStream?.isSupportVirtualBackground()) {
        Object.assign(startVideoOptions, {
          virtualBackground: { imageUrl: "blur" },
        })
      }
      await mediaStream?.startVideo(startVideoOptions)
      if (!mediaStream?.isSupportMultipleVideos()) {
        const canvasElement = document.querySelector(
          `#${SELF_VIDEO_ID}`
        ) as HTMLCanvasElement
        mediaStream?.renderVideo(
          canvasElement,
          zoomClient.getSessionInfo().userId,
          254,
          143,
          0,
          0,
          3
        )
      }

      setIsStartedVideo(true)
    }
  }, [mediaStream, isStartedVideo, zoomClient])
  const onMicrophoneClick = useCallback(async () => {
    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio()
        setIsMuted(false)
      } else {
        await mediaStream?.muteAudio()
        setIsMuted(true)
      }
    } else {
      await mediaStream?.startAudio()
      setIsStartedAudio(true)
    }
  }, [mediaStream, isStartedAudio, isMuted])

  const onMicrophoneMenuClick = async (key: string) => {
    if (mediaStream) {
      const [type, deviceId] = key.split("|")
      if (type === "microphone") {
        if (deviceId !== activeMicrophone) {
          await mediaStream.switchMicrophone(deviceId)
          setActiveMicrophone(mediaStream.getActiveMicrophone())
        }
      } else if (type === "speaker") {
        if (deviceId !== activeSpeaker) {
          await mediaStream.switchSpeaker(deviceId)
          setActiveSpeaker(mediaStream.getActiveSpeaker())
        }
      } else if (type === "leave audio") {
        if (audio === "computer") {
          await mediaStream.stopAudio()
        }
        setIsStartedAudio(false)
      }
    }
  }

  const onSwitchCamera = async (key: string) => {
    if (mediaStream) {
      if (activeCamera !== key) {
        await mediaStream.switchCamera(key)
        setActiveCamera(mediaStream.getActiveCamera())
      }
    }
  }
  const onMirrorVideo = async () => {
    await mediaStream?.mirrorVideo(!isMirrored)
    setIsMirrored(!isMirrored)
  }

  const onHostAudioMuted = useCallback((payload) => {
    const { action, source, type } = payload
    if (action === AudioChangeAction.Join) {
      setIsStartedAudio(true)
      setAudio(type)
    } else if (action === AudioChangeAction.Leave) {
      setIsStartedAudio(false)
    } else if (action === AudioChangeAction.Muted) {
      setIsMuted(true)
      if (source === MutedSource.PassiveByMuteOne) {
        message.info("Host muted you")
      }
    } else if (action === AudioChangeAction.Unmuted) {
      setIsMuted(false)
      if (source === "passive") {
        message.info("Host unmuted you")
      }
    }
  }, [])

  const onDeviceChange = useCallback(() => {
    if (mediaStream) {
      setMicList(mediaStream.getMicList())
      setSpeakerList(mediaStream.getSpeakerList())
      setCameraList(mediaStream.getCameraList())
      setActiveMicrophone(mediaStream.getActiveMicrophone())
      setActiveSpeaker(mediaStream.getActiveSpeaker())
      setActiveCamera(mediaStream.getActiveCamera())
    }
  }, [mediaStream])

  const onVideoCaptureChange = useCallback((payload) => {
    if (payload.state === VideoCapturingState.Started) {
      setIsStartedVideo(true)
    } else {
      setIsStartedVideo(false)
    }
  }, [])
  const onShareAudioChange = useCallback((payload) => {
    const { state } = payload
    if (state === "on") {
      setIsComputerAudioDisabled(true)
    } else if (state === "off") {
      setIsComputerAudioDisabled(false)
    }
  }, [])
  const onHostAskToUnmute = useCallback((payload) => {
    const { reason } = payload
    console.log(`Host ask to unmute the audio.`, reason)
  }, [])

  useEffect(() => {
    zoomClient.on("current-audio-change", onHostAudioMuted)
    zoomClient.on("device-change", onDeviceChange)
    zoomClient.on("video-capturing-change", onVideoCaptureChange)
    zoomClient.on("share-audio-change", onShareAudioChange)
    zoomClient.on("host-ask-unmute-audio", onHostAskToUnmute)
    return () => {
      zoomClient.off("current-audio-change", onHostAudioMuted)
      zoomClient.off("device-change", onDeviceChange)
      zoomClient.off("video-capturing-change", onVideoCaptureChange)
      zoomClient.off("share-audio-change", onShareAudioChange)
      zoomClient.off("host-ask-unmute-audio", onHostAskToUnmute)
    }
  }, [
    zoomClient,
    onHostAudioMuted,
    onDeviceChange,
    onVideoCaptureChange,
    onShareAudioChange,
    onHostAskToUnmute,
  ])

  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio()
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo()
    }
  })

  useEffect(() => {
    if (mediaStream && zoomClient.getSessionInfo().isInMeeting) {
      mediaStream.subscribeAudioStatisticData()
      mediaStream.subscribeVideoStatisticData()
    }
    return () => {
      if (zoomClient.getSessionInfo().isInMeeting) {
        mediaStream?.unsubscribeAudioStatisticData()
        mediaStream?.unsubscribeVideoStatisticData()
      }
    }
  }, [mediaStream, zoomClient])

  return (
    <div className={classNames("video-footer", className)}>
      {isAudioEnable && (
        <MicrophoneButton
          isStartedAudio={isStartedAudio}
          isMuted={isMuted}
          audio={audio}
          onMicrophoneClick={onMicrophoneClick}
          onMicrophoneMenuClick={onMicrophoneMenuClick}
          microphoneList={micList}
          speakerList={speakerList}
          activeMicrophone={activeMicrophone}
          activeSpeaker={activeSpeaker}
          disabled={isComputerAudioDisabled}
        />
      )}
      <CameraButton
        isStartedVideo={isStartedVideo}
        onCameraClick={onCameraClick}
        onSwitchCamera={onSwitchCamera}
        onMirrorVideo={onMirrorVideo}
        cameraList={cameraList}
        activeCamera={activeCamera}
        isMirrored={isMirrored}
      />
    </div>
  )
}
export default VideoFooter
