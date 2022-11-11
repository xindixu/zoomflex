import React, { createContext } from "react"
import { TStream, TVideoClient } from "../types/zoom"

interface MediaContext {
  audio: {
    encode: boolean
    decode: boolean
  }
  video: {
    encode: boolean
    decode: boolean
  }
  mediaStream: TStream | null
}
export const MediaContext = createContext<MediaContext | null>(null as any)
export const ZoomContext = createContext<TVideoClient | null>(null as any)
