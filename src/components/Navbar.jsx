import { Link, Outlet } from "react-router"

export default function Navbar(){
    return(
        <>
        <h3>blogAPI</h3>
        <Link to="/">Home</Link>
        <Link to="/sign-up">sign up</Link>
        <Link to="/login">login</Link>
        <Outlet/> 
        </>
    )
}