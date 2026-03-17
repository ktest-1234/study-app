import { useState, useRef } from "react";
function Login() {
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)
    const loginRef = useRef(null)

    let isFilled = !!name && !!password
    function setUserInfoRef() {
        loginRef.current = {
          'name': name,
          'password': password,
        }
        console.log(loginRef.current)
    }
    return(
      <>
          <form className="login">
              <h2 className="login-title">Login</h2>
              <h4>Name</h4>
              <input className="login-input-name" type='text' onChange={(e) => setName(e.target.value)}></input>
              <h4>Password</h4>
              <input className="login-input-password" type='password' onChange={(e) => setPassword(e.target.value)}></input>
              <br></br>
              <input className="login-submit" type="submit" onClick={setUserInfoRef}  disabled={!isFilled}></input>
          </form>
      </>
    );
}

export default Login