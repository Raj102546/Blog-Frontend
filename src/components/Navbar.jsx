import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-stone-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-0.5">
          <span className="font-serif text-2xl font-semibold tracking-tight text-stone-900">
            blogAPI
          </span>
          <span className="font-serif text-2xl font-semibold text-emerald-700">
            .
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex ">
          <Link to="/" className="hover:border-b-2">
            Home
          </Link>
          <Link to="/comments" className="hover:border-b-2">
            comments
          </Link>
          <Link to="/posts" className="hover:border-b-2">
            posts
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-stone-700 transition hover:text-stone-900"
          >
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
