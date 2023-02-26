import api from "../axios"

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
