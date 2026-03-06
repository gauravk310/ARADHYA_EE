"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: async () => false,
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Restore session from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem("aradhya_admin");
        if (stored === "true") setIsLoggedIn(true);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                setIsLoggedIn(true);
                sessionStorage.setItem("aradhya_admin", "true");
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem("aradhya_admin");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
