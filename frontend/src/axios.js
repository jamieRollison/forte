import axios from "axios"

export const api = axios.create({
  baseURL: "/",
  timeout: 1000,
})

export default api
