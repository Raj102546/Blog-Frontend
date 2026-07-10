import { useState } from "react";
import { Link } from "react-router";
import { AuthContext, useAuthContext } from "../AuthContext";

export default function SignUp() {
  const { API_URL } = useAuthContext();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (credentials.password !== credentials.confirmPass) {
      setError("Passwords don't match.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        throw new Error("inputs fucked");
      }
      const data = await res.json();
      setSuccess(true);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-semibold text-stone-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Join as a reader or start publishing your own posts.
          </p>
        </div>

        {success ? (
          <div className="rounded-md bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800">
            Account created.{" "}
            <Link to="/login" className="font-medium underline">
              Log in
            </Link>{" "}
            to continue.
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="First name"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                placeholder="Jane"
              />
              <Field
                label="Last name"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>

            <Field
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="janedoe"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />

            <div>
              <label
                htmlFor="role"
                className="mb-1.5 block text-sm font-medium text-stone-700"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={credentials.role}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
              >
                <option value="">Select a role</option>
                <option value="user">Reader</option>
                <option value="author">Author</option>
              </select>
            </div>

            <Field
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Field
              label="Confirm password"
              name="confirmPass"
              type="password"
              value={credentials.confirmPass}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Sign up
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-stone-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
      />
    </div>
  );
}
