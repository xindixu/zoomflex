import { apiFetch } from "./api-fetch"

export function createVideo({ name, url }) {
  return apiFetch({
    method: "post",
    data: {
      name,
      video_url: url,
    },
    url: "/video/videos",
  }).then((resp) => resp.data.data)
}

export function getVideo(videoId) {
  return apiFetch({
    method: "get",
    url: `/video/videos/${videoId}`,
  }).then((resp) => resp.data.data)
}

export function createRoom({ name, videoId, hostId }) {
  return apiFetch({
    method: "post",
    data: {
      name,
      video_id: videoId,
      host_id: hostId,
    },
    url: "/room/room",
  }).then((resp) => resp.data.data)
}

export function getRoom(roomId) {
  return apiFetch({
    method: "get",
    url: `/room/room/${roomId}`,
  }).then((resp) => resp.data.data)
}

export async function getVideoUrlByRoomId(roomId) {
  const room = await getRoom(roomId)
  const videoId = room.video_id
  const video = await getVideo(videoId)
  return video.video_url
}

export function addParticipants({ roomId, participants }) {
  const addUserToRoom = (id) =>
    apiFetch({
      method: "put",
      data: {
        current_room_id: roomId,
      },
      url: `/user/users/${id}`,
    })

  if (!participants || participants.length === 0) return Promise.resolve()

  return Promise.all(participants?.map(addUserToRoom)).then((resp) => {
    console.log(resp)
  })
}

export function listUsers() {
  return apiFetch({
    method: "get",
    url: "/user/users",
  }).then((resp) => resp.data.data)
}
