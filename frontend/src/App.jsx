import React, { useEffect } from "react";
import {
  Login,
  Navbar,
  SignUp,
  PrivateRoute,
  Home,
  getCurrentUser,
  setToken,
  Logout,
  CustomRoute,
  getPosts,
  getUsers,
  selectToken,
  ScrollToTop,
} from "./features";
import "./styles.css";
import { Route, Routes } from "react-router";
import {
  getTokenFromLocalStorage,
  setupAuthHeaderForServerCalls,
} from "./utils";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  let token = useSelector(selectToken) || getTokenFromLocalStorage();
  setupAuthHeaderForServerCalls(token);

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(setToken({ token }));
        dispatch(getCurrentUser());
        dispatch(getUsers());
        dispatch(getPosts());
      }
    })();
  }, [dispatch, token]);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <CustomRoute path="/login" element={<Login />} />
        <CustomRoute path="/signup" element={<SignUp />} />
        <PrivateRoute path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <PrivateRoute path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
