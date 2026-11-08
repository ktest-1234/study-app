import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { handleGetRequest, handlePostRequest, handleAuthenticatedPostRequest } from './fetch_api'

function ProtectedRoute({ isAuthenticated, isCheckingAuth }) {
    if (isCheckingAuth){
        return <Outlet />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

function PublicRoute({ isAuthenticated, isCheckingAuth }) {
    if (isCheckingAuth){
        return <Outlet />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

function App() {
    const { authState, setIsAuthenticated, setTokens } = useContext(AuthContext);
    const { isCheckingAuth, setIsCheckingAuth } = useState(true)

    useEffect(() => {

        async function refreshAccessToken(){
            try{
                const response = await handlePostRequest(
                    {refresh: authState.refreshToken}, 'api/token/refresh/'
                );
                if (!response.ok){
                    console.error('Invalid refresh token');
                    return;
                }
                setTokens({
                    accessToken: response.tokens.access,
                })
            }
            catch(error){
                console.error(error)
            }
        }   
        async function checkAccessToken(){
            try{
                if (!authState.accessToken){
                    setIsAuthenticated(false);
                    return;
                }
                const response = await handleAuthenticatedPostRequest(authState.accessToken, 'api/token/verify/')
                if (!response.ok){
                    console.error('Access token has expired')
                    setIsAuthenticated(false)
                    await refreshAccessToken()
                    return;
                }
                setIsAuthenticated(true)
            }
            catch(error){
                console.error(error)
                setIsAuthenticated(false)
            }
            finally{
                setIsCheckingAuth(false)
            }
        }
        checkAccessToken();
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