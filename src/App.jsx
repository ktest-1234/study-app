import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const isAuthenticated = true
    function ProtectedHomeRoute({ isAuthenticated, redirectPath = "/signup", children }) {
        if (!isAuthenticated) {
          return <Navigate to={redirectPath} replace />;
        }
        return children ? children : <Outlet />;
    }
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <ProtectedHomeRoute isAuthenticated={isAuthenticated}>
                        <HomeProfile/>
                    </ProtectedHomeRoute> } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App