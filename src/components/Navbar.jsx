import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function Navbar() {
  return (
    <>
      <h3>blogAPI</h3>
      <Link to="/">Home</Link>
      <Link to="/sign-up">sign up</Link>
      <Link to="/login">login</Link>
      <Link to="/comments">comments</Link>
      <Link to="/posts">posts</Link>
    </>
  );
}
