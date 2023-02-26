import api from "../axios"
import { Buffer } from "buffer"

export const songSearch = async (query) => {
  const requestString = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`
  const res = await api.get(requestString, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })

  return res.data.tracks.items
}

export const getAccessToken = async () => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          import.meta.env.VITE_SPOTIFY_CLIENT_ID +
            ":" +
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    },
  }

  return await api
    .post(
      authOptions.url,
      {},
      {
        params: { grant_type: "client_credentials", json: true },
        headers: authOptions.headers,
      }
    )
    .then((res) => {
      return res.data.access_token
    })
}

// TODO: change to /posts/${postId}/likes
export const getLikes = async (postId) => {
  const requestString = `/likes/${postId}`

  const res = await api.get(requestString)

  return res.data
}

export const removeLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`

  const res = await api.delete(requestString)

  return res.data
}

export const addLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`

  const res = await api.post(requestString).then((res) => {
    return res
  })

  return res.data
}

export const findOrCreateUser = async (userId) => {
  const requestString = `/users`
  const res = await api.post(requestString, userId)

  return res.data
}

export const getUser = async (userId) => {
  const requestString = `/users/${userId}`
  const res = await api.get(requestString)

  return res.data
}

export const getComments = async (postId) => {
  const requestString = `/comments/${postId}`

  const res = await api.get(requestString)

  return res.data
}

// TODO: redo routes for comment and likes to follow convention
export const getComment = async (commentId) => {
  const requestString = `/comments/comment/${commentId}`
  const res = await api.get(requestString)

  return res.data
}

export const updateUsername = async (id, username) => {
  const requestString = `/users/${id}/${username}`
  try {
    await api.put(requestString)
    return true
  } catch (err) {
    return false
  }
}

export const findUserLike = async (query) => {
  const requestString = `/users?query=${query}`

  const res = await api.get(requestString)
}

export const getPosts = async (userId) => {
  if (userId) {
    const requestString = `/posts/${userId}`
    const res = await api.get(requestString)
    return res.data
  } else {
    return null
  }
}
export const postPost = async (post) => {

  const requestString = `/posts`
  const songId = await postSong(post.song).then((res) => {
    return res._id
  })
  const postData = { ...post, song: songId }
  const res = await api.post(requestString, postData)

  return res.data
}

export const getUserByUsername = async (username) => {
  const requestString = `/users?username=${username}`

  const res = await api.get(requestString)

  return res.data
}

export const getFriends = async (userId) => {
  const requestString = `/friends/${userId}`

  const res = await api.get(requestString)

  return res.data
}

export const addFriend = async (userId, friendId) => {
  const requestString = "/friends"

  const res = await api.post(requestString, { userId, friendId })
export const postSong = async (song) => {
  const requestString = `/songs`
  const res = await api.post(requestString, song)

  return res.data
}

export const getSong = async (songId) => {
  const requestString = `/songs/${songId}`
  const res = await api.get(requestString)

  return res.data
}
