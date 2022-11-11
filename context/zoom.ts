import React from "react"
import { MediaStream, ZoomClient } from "../types/zoom"

interface MediaContext {
  audio: {
    encode: boolean
    decode: boolean
  }
  video: {
    encode: boolean
    decode: boolean
  }
  share: {
    encode: boolean
    decode: boolean
  }
  mediaStream: MediaStream | null
}
export const MediaContext = React.createContext<MediaContext>(null as any)
export const ZoomContext = React.createContext<ZoomClient>(null as any)
