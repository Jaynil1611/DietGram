import axios from "axios";
import { showToast } from "../features";
export const linkHoverProps = {
  _hover: {
    textDecoration: "underline",
    background: "orange.100",
    borderRadius: "1rem",
    padding: "0.5rem",
  },
  color: "orange.600",
  p: 2,
};

export const loginBoxProps = {
  p: 6,
  pb: 4,
  borderWidth: 1,
  borderRadius: 8,
  boxShadow: "lg",
  w: { base: "85%", md: "60%" },
};

export const focusProps = {
  _focus: {
    zIndex: 1,
    borderColor: "#ED8936",
    boxShadow: "0 0 0 1px #ED8936",
  },
};

export const setupAuthHeaderForServerCalls = (AUTH_TOKEN) => {
  return AUTH_TOKEN
    ? (axios.defaults.headers.common["Authorization"] = AUTH_TOKEN)
    : delete axios.defaults.headers.common["Authorization"];
};

export const constructURL = () => `${process.env.REACT_APP_BACKEND_URL}`;

export const checkEmail = (email) =>
  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(email);

export const checkPassword = (password) =>
  /^(?=.+[A-Za-z])(?=.+\d).{6,}$/g.test(password);

export const validateForm = ({ email, password, confirmPassword = undefined }) => {
  if (!checkEmail(email)) {
    showToast("Email is incomplete", "error");
    return false;
  }
  if (!checkPassword(password)) {
    showToast("Password should have atleast 6 chars", "error");
    return false;
  }
  if (confirmPassword && confirmPassword !== password) {
    showToast("Passwords don't match", "error");
    return false;
  }
  return true;
};

export const getFormValues = (e, type) => {
  switch (type) {
    case "login": {
      const {
        email: { value: email },
        password: { value: password },
      } = e.target;
      return { email, password };
    }
    case "signup": {
      const {
        email: { value: email },
        password: { value: password },
        username: { value: username },
        firstname: { value: firstname },
        lastname: { value: lastname },
        confirmPassword: { value: confirmPassword },
      } = e.target;
      return {
        email,
        password,
        firstname,
        lastname,
        username,
        confirmPassword,
      };
    }
    default:
      return new Error("Invalid Choice");
  }
};

export const storeToken = (token) => {
  localStorage.setItem("isUserLoggedIn", JSON.stringify(token));
};
