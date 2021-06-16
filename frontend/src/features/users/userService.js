import axios from "axios";
import { constructURL } from "../../utils";

export const getUsersService = async () => {
  const response = await axios.get(`${constructURL()}/users`);
  return response.data;
};

export const followUserService = async ({ userId }) => {
  const response = await axios.post(`${constructURL()}/users/user/follow`, {
    userId,
  });
  return response.data;
};

export const unfollowUserService = async ({ userId }) => {
  const response = await axios.post(`${constructURL()}/users/user/unfollow`, {
    userId,
  });
  return response.data;
};

export const updateUserService = async ({ updates }) => {
  const response = await axios.post(`${constructURL()}/users/user`, {
    ...updates,
  });
  return response.data;
};

export const getFollowService = async ({ userId }) => {
  const response = await axios.get(`${constructURL()}/users/${userId}/follow`);
  return response.data;
};
