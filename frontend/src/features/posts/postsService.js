import axios from "axios";
import { constructURL } from "../../utils";

export const getPostsService = async () => {
  const response = await axios.get(`${constructURL()}/posts/feed`);
  return response.data;
};

export const addPostService = async ({ post }) => {
  const response = await axios.post(`${constructURL()}/posts`, {
    ...post,
  });
  return response.data;
};

export const editPostService = async ({ post }) => {
  const response = await axios.post(`${constructURL()}/posts/${post.id}`, {
    ...post,
  });
  return response.data;
};

export const deletePostService = async ({ post }) => {
  const response = await axios.delete(`${constructURL()}/posts/${post.id}`);
  return response.data;
};

export const likeService = async ({ id }) => {
  const response = await axios.post(`${constructURL()}/posts/${id}/likes`);
  return response.data;
};
