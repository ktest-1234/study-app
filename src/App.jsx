import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState, useRef } from "react";

function ProtectedRoute({ isAuthenticated }) {
    if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

    return <Outlet />;
}

function PublicRoute({ isAuthenticated }) {
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

function App() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [received, setReceived] = useState('');

    useEffect(() => {
    async function fetchUsers() {
        try {
            const response = await fetch('https://solid-adventure-wvxxjxw5rxxf9594-8000.app.github.dev/auth/users/')
            
            if (!response.ok) {
                // 1. Log the HTTP status code
                console.error(`An HTTP error occurred with code ${response.status}`);
                
                // 2. Log the HTML body text to see the exact server error page
                const errorText = await response.text();
                console.error("Server Error HTML:", errorText);
                return; // Stop execution here
            }

            // This only runs if status code is 200-299
            console.log(`Status code ${response.status}`);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error(`An error occurred ${error}`);
        }
    }
    fetchUsers();
}, []);


    return(
        
        <BrowserRouter>
             <Routes>
                 <Route element={ <ProtectedRoute isAuthenticated={isAuthenticated} /> }>
                     <Route path="/" element={<HomeProfile />} />
                 </Route>
                 <Route element={ <PublicRoute isAuthenticated={isAuthenticated} /> }>
                     <Route path="/login" element={<Login />} />
                     <Route path="/signup" element={<Signup />} />
                 </Route>
             </Routes>
        </BrowserRouter>
    )
}

// function App() {
//     const [received, setReceived] = useState("");
//     const accessUserID = null
//     const socket = useRef(null)
//     useEffect(() => {
//         socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${accessUserID}/`);

//         socket.onopen = () => {
//             console.log("Websocket connection opened:", socket.current);
//         };

//         socket.onerror = (error) => {
//             console.log("Websocket error:", error);
//         };

//         socket.onclose = (event) => {
//             console.log("Websocket connection closed:", event);
//         };
//     },[accessUserID]);

//     useEffect

//     return (
//         <div>
//             <h1>Hello</h1>
//             <h2>{received}</h2>
//         </div>
//     );
// }

export default App