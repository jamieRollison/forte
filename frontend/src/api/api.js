import api from "../axios";

export const getLikes = async (postId) => {
  const requestString = `/likes/${postId}`;

  const res = await api.get(requestString);

  return res.data;
};

export const removeLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`;

  const res = await api.delete(requestString);

  return res.data;
};

export const addLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`;

  const res = await api.post(requestString).then((res) => {
    return res;
  });

  return res.data;
};

export const findOrCreateUser = async (patientInfo) => {
  const requestString = `/users`;
  const res = await api.post(requestString, patientInfo);
  return res.data;
};

export const getUser = async (userId) => {
  const requestString = `/users/${userId}`
  const res = await api.get(requestString)
  return res.data
}

export const updateUsername = async (id, username) => {
  const requestString = `/users/${id}/${username}`
  try {
    await api.put(requestString)
    return true;
  } catch (err) {
    return false;
  }
}
