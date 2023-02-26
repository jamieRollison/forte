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
