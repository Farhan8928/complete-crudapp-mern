import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    });

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
