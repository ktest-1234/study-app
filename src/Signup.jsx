import { useState, useRef, useContext, Navigate } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

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

export default function Signup() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    /*Signup Details*/
    const [signupName, setSignupName] = useState(null)
    const [signupPassword, setSignupPassword] = useState(null)
    const [signupBirthday, setSignupBirthday] = useState(null)
    const [signupEmail, setSignupEmail] = useState(null)
    const [isTC, setIsTC] = useState(false)
    const userSignupRef = useRef(null)
    let signupIsFilled = isTC && !!signupName && !!signupPassword && !!signupBirthday && !!signupEmail
    if (isAuthenticated){
        return <Navigate to="/" replace />
    }
    function setSignupInfoRef(e) {
        e.preventDefault()
        if (!signupIsFilled){
            return
        }
        userSignupRef.current = {
          'name': signupName,
          'password': signupPassword,
          'birthday': signupBirthday,
        }
        setIsAuthenticated(true);
    }
    return(
            <form className="signup" onSubmit={(e) => setSignupInfoRef(e)}>
                <h2 className="signup-title">Signup</h2>
                <h4>Your Name</h4>
                <input className="signup-input-name" type='text' onChange={(e) => setSignupName(e.target.value)}></input>
                <h4>Your New Password</h4>
                <input className="signup-input-password" type='password' onChange={(e) => setSignupPassword(e.target.value)}></input>
                <h4>Your Birthday</h4>
                <input className="signup-input-birthday" type='date' onChange={(e) => setSignupBirthday(e.target.value)}></input>
                <h4>Your Email</h4>
                <input className="signup-input-birthday" type='email' onChange={(e) => setSignupEmail(e.target.value)}></input>
                <br />
                <label>
                       <input className="TC-checkbox" type="checkbox" checked={isTC} onChange={(e) => setIsTC(e.target.checked)}></input>
                        <h4>I agree to the Terms and Conditions</h4>
                </label>
                <input className="signup-submit" type="submit" disabled={!signupIsFilled}></input>
                <NavLink to="/login" className="underline text-red-950">
                    Already have an account? Login here!
                </NavLink>
            </form>
    )

}