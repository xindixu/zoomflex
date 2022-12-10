import axios from "axios"

export const API_ENDPOINT =
  "https://et3r5itt50.execute-api.us-east-1.amazonaws.com/prod/"

// export const API_ENDPOINT = "http://127.0.0.1:5000"

// TODO: use this function to fetch data from the api
export const apiFetch = ({
  method,
  url,
  data,
}: {
  url: string
  method: "get" | "post" | "delete" | "put"
  data?: any
}) =>
  axios.request({
    method,
    baseURL: API_ENDPOINT,
    url,
    data,
  })
