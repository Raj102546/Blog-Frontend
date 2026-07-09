import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Comments from "./components/Comments";
import Posts from "./components/Posts";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "comments", element: <Comments /> },
      { path: "posts", element: <Posts /> },
    ],
  },
];
