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