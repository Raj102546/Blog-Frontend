import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../AuthContext";


export default function Login() {
  const {setToken, API_URL} = useAuthContext();
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    try{
        e.preventDefault();
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCreds),
        });
        if(!res.ok){
            throw new Error("login fucked");
        }
        const data = await res.json();
        setToken(data.token)
        console.log(data);
    }catch(error){
        console.log(error);
    }
  };

  return(
    <>
    <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={handleChange} value={loginCreds.username} placeholder="i.e, jhon123"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={loginCreds.password}/>
        <button type="submit">Login</button>
    </form>
    </>
  )
}
