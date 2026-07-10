import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../AuthContext";
import Navbar from "./Navbar";

export default function Layout() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loggedUser, setLoggedUser] = useState(() => {
    const stored = localStorage.getItem("loggedUser");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  useEffect(() => {
    if (loggedUser && Object.keys(loggedUser).length > 0) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [loggedUser]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, API_URL, loggedUser, setLoggedUser }}
    >
      <Navbar />
      <Outlet />
    </AuthContext.Provider>
  );
}
