import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

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
    }

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

    /*Setting which screen are we on*/
    const [authScreen, setAuthScreen] = useState('login')

    /*Display Login/Signup Screen*/
    function displayScreen() {
        if (authScreen === 'login'){
            console.log(navigate.current)
            return(
                <form className="" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-white">Login</h2>
                    <h4>Name</h4>
                    <input className="" type='text' onChange={(e) => setLoginName(e.target.value)}></input>
                    <h4>Password</h4>
                    <input className="login-input-password" type='password' onChange={(e) => setLoginPassword(e.target.value)}></input>
                    <br></br>
                    <input className="login-submit" type="submit" onClick={(e) => setLoginInfoRef(e)}></input>
                    <a href="#" className="underline text-red-950" onClick={(e) => setAuthScreen('signup')} >Don't have an account? Signup here!</a>
                </form>
            )
        }
        if (authScreen === 'signup'){
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
                    <a href="#" className="underline bg-sky-700" onClick={(e) => setAuthScreen('login')}>Already have an account? Login here!</a>
                </form>
            )
        }
    }

    return(<>{displayScreen()}</>);
}
export default App