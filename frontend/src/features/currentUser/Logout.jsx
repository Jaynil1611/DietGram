import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken } from "./currentUserSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken({ token: null }));
    localStorage.removeItem("isUserLoggedIn");
    navigate("/login");
  }, [dispatch, navigate]);

  return <></>;
}

export default Logout;
