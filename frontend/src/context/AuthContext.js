import React,{ createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    const setAuthSituation = () => {
        setAuth(true)
    };

    const clearAuth = () => {
        setAuth(false)
    };

    const value = {
        auth,
        setAuthSituation,
        clearAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 