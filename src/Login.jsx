import { useState, useRef, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaUserCircle, FaLock } from "react-icons/fa";

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
            <form className="grid grid-cols-1 gap-3 place-items-center mt-10 bg-gray-100 p-10 rounded-lg" onSubmit={(e) => setLoginInfoRef(e)}>
                <div className="mb-[2rem]">
                    <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                </div>
                <div>
                    <p className="text-gray-600">Welcome to our study app! Login and have fun!</p>
                </div>
                <FaUserCircle className="text-4xl text-gray-500" />
                <div className="">
                    <input className="rounded-md border w-[200px] h-[30px] placeholder:text-center" type='text' onChange={(e) => setLoginName(e.target.value)} placeholder="Enter Your Name...." />
                </div>
                <FaLock className="text-4xl text-gray-500" />
                <div className="">
                    <input className="rounded-md border w-[200px] h-[30px] duration-300 placeholder:text-center" type='password' onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter Your Password...." />
                </div>
                <div>
                    <input className="bg-blue-500 hover:bg-blue-700 rounded-md w-[200px] h-[50px] hover:cursor-pointer" type="submit" />
                </div>
                <div>
                    <NavLink to="/signup" className="underline text-blue-500 hover:text-blue-700">
                        Don't have an account? Signup here!
                    </NavLink>
                </div>
                
            </form>
    )
}