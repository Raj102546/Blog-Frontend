import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../AuthContext";

export default function Login() {
  const navigation = useNavigate()
  const { setToken, setLoggedUser ,API_URL } = useAuthContext();
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginCreds),
      });
      if (!res.ok) {
        throw new Error("login fucked");
      }
      const data = await res.json();
      setToken(data.token);
      setLoggedUser(data.user);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-semibold text-stone-900">
            Welcome Back!
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Pick up where you left off.
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-stone-700">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={loginCreds.username}
            placeholder="i.e, jhon123"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-stone-700">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={loginCreds.password}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
          <button type="submit" className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-500">
          Don't have an account? {" "}
          <Link
            to="/sign-up"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
