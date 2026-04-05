import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
export default function Signup() {
    /*Signup Details*/
    const [signupName, setSignupName] = useState(null)
    const [signupPassword, setSignupPassword] = useState(null)
    const [signupBirthday, setSignupBirthday] = useState(null)
    const [signupEmail, setSignupEmail] = useState(null)
    const [isTC, setIsTC] = useState(false)
    const userSignupRef = useRef(null)
    let signupIsFilled = isTC && !!signupName && !!signupPassword && !!signupBirthday && !!signupEmail
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
        console.log(userSignupRef.current)
    }
    return(
            <form className="signup" onSubmit={(e) => e.preventDefault()}>
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
                <input className="signup-submit" type="submit" onClick={(e) => setSignupInfoRef(e)} disabled={!signupIsFilled}></input>
                <NavLink to="/login" className="underline text-red-950">
                    Already have an account? Login here!
                </NavLink>
            </form>
    )

}