import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState, useRef } from "react";
import { handleRetrieveData } from './fetch_api.js'

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