import { apiFetch } from "./api-fetch"

export function createVideo({ name, url }) {
  return apiFetch({
    method: "post",
    data: {
      name,
      url,
    },
    url: "/video/videos",
  }).then((resp) => {
    console.log(resp.data)
  })
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
  }).then((resp) => {
    console.log(resp.data)
  })
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

  return Promise.all(participants.map(addUserToRoom)).then((resp) => {
    console.log(resp)
  })
}

export function listUsers() {
  return apiFetch({
    method: "get",
    url: "/user/users",
  }).then((resp) => resp.data.data)
}
