"use client";

import React, { createContext, useContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Static website - always return false (no admin functionality)
    return (
        <AuthContext.Provider value={{ isLoggedIn: false }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
