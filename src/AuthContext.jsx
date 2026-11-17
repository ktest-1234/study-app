import { createContext, useState } from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        currentUser: localStorage.getItem('currentUser'),
    });
    const setIsAuthenticated = (isAuthenticated) => {
        setAuthState(json => ({
            ...json,
            isAuthenticated: isAuthenticated,
        }));
    }

    const setCurrentUser = ({username, password}) => {
        setAuthState(json => ({
            ...json,
            currentUser: {
                username: username,
                password: password
            }
        }));
        localStorage.setItem('currentUser', JSON.stringify({username: username, password: password}))
    }
    return (
        <AuthContext.Provider value={{ authState, setIsAuthenticated, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}