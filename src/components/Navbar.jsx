import { Link } from "react-router"

export default function Navbar(){
    return(
        <>
        <h3>blogAPI</h3>
        <Link to="/home">Home</Link>
        <Link to="/blog/sign-up">sign up</Link>
        <Link to="/login">login</Link>
        </>
    )
}