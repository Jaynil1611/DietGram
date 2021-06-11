import axios from "axios";
import { constructURL } from "../../utils";

export const getCurrentUserService = async () => {
  const response = await axios.get(`${constructURL()}/users/user`);
  return response.data;
};

export const loginUserService = async (
  { email, password },
  { rejectWithValue }
) => {
  try {
    const response = await axios.post(`${constructURL()}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    rejectWithValue(error.response.data.errorMessage);
  }
};

export const signUpUserService = async (
  { ...userCredentials },
  { rejectWithValue }
) => {
  try {
    const response = await axios.post(`${constructURL()}/users`, {
      ...userCredentials,
    });
    return response.data;
  } catch (error) {
    rejectWithValue(error.response.data.errorMessage);
  }
};
