import axios from "axios";
import { constructURL } from "../../utils";

export const getBookmarksService = async () => {
  const response = await axios.get(`${constructURL()}/bookmarks`);
  return response.data;
};

export const postBookmarkService = async ({ id: postId }) => {
  const response = await axios.post(`${constructURL()}/bookmarks`, {
    postId,
  });
  return response.data;
};

export const deleteBookmarkService = async ({ id }) => {
  const response = await axios.delete(`${constructURL()}/bookmarks/${id}`);
  return response.data;
};
