import { useState, useRef } from "react";

function Signup() {
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [email, setEmail] = useState(null)
    const [isTC, setIsTC] = useState(null)
    const userSignupRef = useRef(null)

    let isFilled = isTC && !!name && !!password && !!birthday && !!email
    function setUserInfoRef() {
        userSignupRef.current = {
          'name': name,
          'password': password,
          'birthday': birthday,
        }
        console.log(userSignupRef.current)
    }
    return(
      <>
          <form className="signup">
              <h2 className="signup-title">Signup</h2>
              <h4>Your Name</h4>
              <input className="signup-input-name" type='text' onChange={(e) => setName(e.target.value)}></input>
              <h4>Your New Password</h4>
              <input className="signup-input-password" type='password' onChange={(e) => setPassword(e.target.value)}></input>
              <h4>Your Birthday</h4>
              <input className="signup-input-birthday" type='date' onChange={(e) => setBirthday(e.target.value)}></input>
              <h4>Your Email</h4>
              <input className="signup-input-birthday" type='email' onChange={(e) => setEmail(e.target.value)}></input>
              <br />
              <label>
                    <input className="TC-checkbox" type="checkbox" checked={isTC} onChange={(e) => setIsTC(e.target.value)}></input>
                    <h4>I agree to the Terms and Conditions</h4>
              </label>
              <input className="signup-submit" type="submit" onClick={setUserInfoRef} disabled={!isFilled}></input>
          </form>
      </>
    );
}
export default Signup