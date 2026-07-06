import { Children } from "react";
import App from "./App";
import SignUp from "./pages/SignUp";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "sign-up", element: <SignUp /> }],
  },
];
