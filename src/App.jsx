import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProtectedHomeRoute({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return <Outlet />;
}

function App() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    useEffect(() => {setIsAuthenticated(true)}, [isAuthenticated, setIsAuthenticated])

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={ <ProtectedHomeRoute isAuthenticated={isAuthenticated} /> }>
                        <Route path="/" element={<HomeProfile />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App