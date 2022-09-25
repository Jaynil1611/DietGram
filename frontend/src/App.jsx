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
  getBookmarks,
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
  let token = useSelector(selectToken) ?? getTokenFromLocalStorage();
  setupAuthHeaderForServerCalls(token);

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(getCurrentUser());
        dispatch(setToken({ token }));
        dispatch(getUsers());
        dispatch(getPosts());
        dispatch(getBookmarks());
      }
    })();
  }, [dispatch, token]);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={
            <CustomRoute path="/login">
              <Login />
            </CustomRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <CustomRoute path="/signup">
              <SignUp />
            </CustomRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Home />} />
        <Route
          path="/logout"
          element={
            <PrivateRoute path="/logout">
              <Logout />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
