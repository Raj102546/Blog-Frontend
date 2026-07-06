import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        throw new Error("inputs fucked");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleChange}
          value={credentials.firstName}
          placeholder="John"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleChange}
          value={credentials.lastName}
          placeholder="Deo"
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={credentials.username}
          placeholder="jhondoe"
        />
        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          value={credentials.role}
          onChange={handleChange}
        >
          <option value="">Select a role-</option>
          <option value="user">User</option>
          <option value="author">Author</option>
        </select>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={credentials.email}
          placeholder="jhon123@xyz.com"
        />
        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <label htmlFor="confirmPass">Confirm Password:</label>
        <input
          type="password"
          name="confirmPass"
          id="confirmPass"
          onChange={handleChange}
          value={credentials.confirmPass}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
