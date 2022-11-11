import { generateVideoToken } from "./token"

export const devConfig = {
  sdkKey: "ll2mTrX4kTZIOgaK2DcSoijFG6FCPMYKhJRN",
  sdkSecret: "jrDLdVwsmOzDEmMr7Pex2LFciWXquTnIJtTo",
  webEndpoint: "zoom.us",
  topic: "Watch Party",
  password: "abc123",
  signature: "",
  sessionKey: "",
  userIdentity: "",
  // role = 1 to join as host, 0 to join as attendee. The first user must join as host to start the session
  role: 1,
  enforceGalleryView: true,
}

export const meetingArgs = {
  ...devConfig,
  signature: generateVideoToken(
    devConfig.sdkKey,
    devConfig.sdkSecret,
    devConfig.topic,
    devConfig.password,
    devConfig.userIdentity,
    devConfig.sessionKey,
    devConfig.role
  ),
}
