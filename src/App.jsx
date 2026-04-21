import Login from "./Login";
import Signup from "./Signup";
import HomeProfile from "./HomeProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

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
export default App