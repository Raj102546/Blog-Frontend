import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../AuthContext";
import Navbar from "./Navbar";

export default function Layout() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", [token]);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, API_URL }}>
      <Navbar />
      <Outlet />
    </AuthContext.Provider>
  );
}
