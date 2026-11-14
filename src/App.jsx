import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { checkAccessToken } from "./authTokenApi";
import { LoadingPage } from './LoadingPage'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



function ProtectedRoute({ isAuthenticated, isCheckingAuth }) {
    if (isCheckingAuth){
        return <LoadingPage />
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

function PublicRoute({ isAuthenticated, isCheckingAuth }) {
    if (isCheckingAuth){
        return <LoadingPage />
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

function App() {
    const { authState, setIsAuthenticated, setTokens } = useContext(AuthContext);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            await delay(2000);
            checkAccessToken(authState.accessToken, setIsAuthenticated, setIsCheckingAuth);
        }
        fetchData();
    }, []);

    return(
        <BrowserRouter>
             <Routes>
                 <Route element={ <ProtectedRoute isAuthenticated={authState.isAuthenticated} isCheckingAuth={isCheckingAuth} /> }>
                     <Route path="/" element={<HomeProfile />} />
                 </Route>
                 <Route element={ <PublicRoute isAuthenticated={authState.isAuthenticated} isCheckingAuth={isCheckingAuth} /> }>
                     <Route path="/login" element={<Login />} />
                     <Route path="/signup" element={<Signup />} />
                 </Route>
             </Routes>
        </BrowserRouter>
    )
}

export default App