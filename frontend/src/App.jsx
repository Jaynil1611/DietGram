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
} from "./features";
import { Route, Routes } from "react-router";
import { ScrollToTop, setupAuthHeaderForServerCalls } from "./utils";
import "./styles.css";
import { useDispatch } from "react-redux";

function App() {
  const token = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  setupAuthHeaderForServerCalls(token);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(getCurrentUser());
        dispatch(setToken({ token }));
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/*" element={<Home />} />
        <PrivateRoute path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
