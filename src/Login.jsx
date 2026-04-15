import { useState, useRef, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaUserCircle, FaLock } from "react-icons/fa";

function Field({ type, placeholder, icon: Icon, onChange }) {
    return (
        <div className="relative items-center mt-[1rem] mb-[1rem]">
            <Icon className="absolute text-2xl text-gray-500" />
            <input
                className="ml-8 rounded-md border w-[200px] h-[30px] px-2"
                type={type}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

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
            <div className="grid min-h-screen place-items-center bg-gradient-to-tr from-blue-500 to-blue-200">
                <form className="mt-10 bg-gray-100 p-10 rounded-lg shadow-xl" onSubmit={(e) => setLoginInfoRef(e)}>
                    <div className="mb-[2rem]">
                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                    </div>
                    <div>
                        <p className="text-gray-600">Welcome to our study app! Login and have fun!</p>
                    </div>
                    <Field
                        type="text"
                        placeholder="Username or Email"
                        icon={FaUserCircle}
                        onChange={(e) => setLoginName(e.target.value)}
                    />
                    <Field
                        type="password"
                        placeholder="Your Password"
                        icon={FaLock}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <div>
                        <input className="bg-blue-500 hover:bg-blue-600 rounded-md w-[300px] h-[50px] hover:cursor-pointer transition-colors duration-100" type="submit" />
                    </div>
                    <div className="mt-[1rem]">
                        <NavLink to="/signup" className=" text-black hover:underline">
                            Don't have an account? Signup here!
                        </NavLink>
                    </div> 
                </form>
            </div>
    )
}