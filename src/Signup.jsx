import { useState, useRef, useContext, Navigate } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaUser, FaLock, FaCalendar, FaEnvelopeOpen } from "react-icons/fa";
import { motion as m } from 'framer-motion';
import { handlePostData } from './fetch_api.js'

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
    let signupIsFilled = isTC && !!signupName && !!signupPassword && !!signupBirthday && !!signupEmail

    if (isAuthenticated){
        return <Navigate to="/" replace />
    }
    function handleSignupSubmit(e) {
        e.preventDefault()
        if (signupIsFilled){
            const send = async (e) => {
                const response = await handlePostData({
                username: signupName,
                password: signupPassword,
                email:signupEmail,
                birthday: signupBirthday,
                }, 'api/users/')

                data
                if (response.ok) {
                    localStorage.setItem('refreshToken', data.tokens.refresh);
                    localStorage.setItem('accessToken', data.tokens.access);
                }
            }
            send()
            
        }
        
    }
    return(
        <div className="grid min-h-screen place-items-center bg-gradient-to-tr from-purple-500 to-purple-200">
            <m.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.45 },
                }}
            >
                <form className="mt-10 bg-gray-100 p-10 rounded-lg shadow-xl" onSubmit={(e) => handleSignupSubmit(e)}>
                    <div className="mb-[2rem]">
                        <h2 className="text-2xl font-bold text-gray-800">Signup</h2>
                    </div>
                    <div>
                        <h4>Sign up to begin your journey!</h4>
                    </div>
                    <Field
                        type="text"
                        placeholder="Your Name"
                        icon={FaUser}
                        onChange={(e) => setSignupName(e.target.value)}
                    />
                    <Field
                        type="password"
                        placeholder="Your New Password"
                        icon={FaLock}
                        onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <Field
                        type="date"
                        placeholder="Your Birthday"
                        icon={FaCalendar}
                        onChange={(e) => setSignupBirthday(e.target.value)}
                    />
                    <Field 
                        type="email"
                        placeholder="Your Email"
                        icon={FaEnvelopeOpen}
                        onChange={(e) => setSignupEmail(e.target.value)}
                    />
                    <label className="flex flex-row [&>*]:mr-1 mb-10">
                        <input className="TC-checkbox" type="checkbox" checked={isTC} onChange={(e) => setIsTC(e.target.checked)}></input>
                        <h4>I agree to the Terms and Conditions</h4>
                    </label>
                    <input className="bg-purple-500 hover:bg-purple-600 rounded-md w-[300px] h-[50px] hover:cursor-pointer transition-colors duration-100" type="submit" disabled={!signupIsFilled}></input>
                    <div className="mt-[1rem]">
                    <NavLink to="/login" className="mt-10 text-black hover:underline">
                        Already have an account? Login here!
                    </NavLink>
                    </div>
                </form>
            </m.div>
        </div>
    )

}