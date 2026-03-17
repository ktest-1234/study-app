import { useState, useEffect } from "react";

import Login from "./Login";
import Signup from "./Signup";
function App() {
    const [authScreen, setAuthScreen] = useState('login')

    function goSignup() {
        setAuthScreen('signup')
    }
    function goLogin() {
        setAuthScreen('login')
    }

    const goSignupButton = <button className="a" onClick={goSignup} >Go Sign Up</button>
    const goLoginButton = <button className="login-button" onClick={goLogin} >Go Login</button>
    return(
        <div className="auth">
            {authScreen === 'login' && <Login/>}
            {authScreen === 'signup' && <Signup/>}
            {authScreen === 'login' && goSignupButton}
            {authScreen === 'signup' && goLoginButton}
        </div>
    );
}
export default App