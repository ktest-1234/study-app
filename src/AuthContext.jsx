import { createContext, useState } from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    });
    const setIsAuthenticated = (isAuthenticated) => {
        setAuthState(json => ({
            ...json,
            isAuthenticated: isAuthenticated,
        }))
    }
    const setTokens = ({accessToken, refreshToken}) => {
        setAuthState(json => ({
            ...json,
            ...(accessToken !== undefined && { accessToken }),
            ...(refreshToken !== undefined && { refreshToken }),
        }))
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken);
        console.log('set tokens')
    }
    return (
        <AuthContext.Provider value={{ authState, setIsAuthenticated, setTokens }}>
            {children}
        </AuthContext.Provider>
    );
}