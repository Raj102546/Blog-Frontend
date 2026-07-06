import { Children } from "react";
import App from "./App";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: "/", element: <Home /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "login", element: <Login /> },
    ],
  },
];
