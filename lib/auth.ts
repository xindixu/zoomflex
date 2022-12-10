import { apiFetch } from "./api-fetch"

export const CLIENT_ID =
  "763700428974-p8k77625c1vf43vm68260hoqouoocaef.apps.googleusercontent.com"

export const SCOPE = "https://www.googleapis.com/auth/userinfo.profile "

export function signUp({ email, username, password }) {
  return apiFetch({
    method: "post",
    data: {
      email,
      username,
      password,
    },
    url: "/user/sign-up",
  }).then((resp) => ({
    user: resp.data.data,
  }))
}

export function signIn({ username, password }) {
  return apiFetch({
    method: "post",
    data: {
      username,
      password,
    },
    url: "/user/sign-in",
  }).then((resp) => ({
    user: resp.data.data,
  }))
}

export async function signOut() {
  return () => {}
}

export async function getCurrentUser() {
  return () => {}
}
