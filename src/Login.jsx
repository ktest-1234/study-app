import { useState, useRef, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    /*Login Details*/
    const [loginName, setLoginName] = useState(null)
    const [loginPassword, setLoginPassword] = useState(null)
    const loginRef = useRef(null)
    if (isAuthenticated){
        return <Navigate to="/" replace />
    }
    function setLoginInfoRef(e) {
        e.preventDefault()
        
        loginRef.current = {
          'name': loginName,
          'password': loginPassword,
        }
        setIsAuthenticated(true);
        
    }
    return(
            <form className="" onSubmit={(e) => setLoginInfoRef(e)}>
                <h2 className="text-white">Login</h2>
                <h4>Name</h4>
                <input className="" type='text' onChange={(e) => setLoginName(e.target.value)}></input>
                <h4>Password</h4>
                <input className="login-input-password" type='password' onChange={(e) => setLoginPassword(e.target.value)}></input>
                <br></br>
                <input className="login-submit" type="submit" ></input>
                <NavLink to="/signup" className="underline text-green-500">
                    Don't have an account? Signup here!
                </NavLink>
            </form>
    )
}