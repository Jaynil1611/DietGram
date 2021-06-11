import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken } from "./loginSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken({ token: null }));
    localStorage.removeItem("isUserLoggedIn");
    navigate("/login");
  }, []);

  return <></>;
}

export default Logout;
