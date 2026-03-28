import { useState, useEffect } from "react";

import Login from "./Login";
import Signup from "./Signup";
function App() {

    /*Login Details*/
    const [loginName, setLoginName] = useState(null)
    const [loginPassword, setLoginPassword] = useState(null)
    const loginRef = useRef(null)
    function setUserInfoRef() {
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
    const [isTC, setIsTC] = useState(null)
    const userSignupRef = useRef(null)
    let signupIsFilled = isTC && !!signupName && !!signupPassword && !!signupBirthday && !!signupEmail
    function setUserInfoRef() {
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

    function goSignup() {
        setAuthScreen('signup')
    }
    function goLogin() {
        setAuthScreen('login')
    }

    const goSignupButton = <button className="underline bg-red-500 text-white text-3xl min-h-screen" onClick={goSignup} >Go Sign Up</button>
    const goLoginButton = <button className="underline bg-sky-700 min-w-[100px] px-4 py-2" onClick={goLogin} >Go Login</button>
    return(
        <div className="bg-cyan-200">
            {authScreen === 'login' && <Login/>}
            {authScreen === 'signup' && <Signup/>}
            {authScreen === 'login' && goSignupButton}
            {authScreen === 'signup' && goLoginButton}
        </div>
    );
}
export default App