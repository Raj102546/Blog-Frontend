import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
     <header className=" relative border-b border-stone-200 bg-stone-50 max-h-[68px]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          className="-ml-1 p-1.5 text-stone-700 md:hidden"
          onClick={() => setToggle((t) => !t)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {toggle ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
 
        <Link to="/" className="flex items-center gap-0.5">
          <span className="font-serif text-2xl font-semibold tracking-tight text-stone-900">
            blogAPI
          </span>
          <span className="font-serif text-2xl font-semibold text-emerald-700">.</span>
        </Link>
 
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
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
 
      {toggle && (
        <div className="animate-slide-left border-t border-stone-200 bg-stone-50 md:hidden">
          <div className="flex flex-col px-6 py-4">
            <Link
              to="/"
              onClick={() => setToggle(false)}
              className="border-b border-stone-100 py-3 text-sm font-medium text-stone-700"
            >
              Home
            </Link>
            <Link
              to="/posts"
              onClick={() => setToggle(false)}
              className="py-3 text-sm font-medium text-stone-700"
            >
              Posts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group relative text-sm font-medium text-stone-600 transition hover:text-stone-900"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-700 transition-all duration-200 group-hover:w-full" />
    </Link>
  );
}