import { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    /*Login Details*/
    const [loginName, setLoginName] = useState(null)
    const [loginPassword, setLoginPassword] = useState(null)
    const loginRef = useRef(null)
    function setLoginInfoRef(e) {
        e.preventDefault()
        loginRef.current = {
          'name': loginName,
          'password': loginPassword,
        }
        console.log(loginRef.current)
        setIsAuthenticated(true);
        console.log(isAuthenticated)
    }
    return(
            <form className="" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-white">Login</h2>
                <h4>Name</h4>
                <input className="" type='text' onChange={(e) => setLoginName(e.target.value)}></input>
                <h4>Password</h4>
                <input className="login-input-password" type='password' onChange={(e) => setLoginPassword(e.target.value)}></input>
                <br></br>
                <input className="login-submit" type="submit" onClick={(e) => setLoginInfoRef(e)}></input>
                <NavLink to="/signup" className="underline text-green-500">
                    Don't have an account? Signup here!
                </NavLink>
            </form>
    )
}