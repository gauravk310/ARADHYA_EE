"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { COLORS } from "@/components/constants";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const ok = await login(username, password);
        setLoading(false);
        if (ok) {
            router.push("/");
        } else {
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 50%, ${COLORS.darkTeal} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Arial', sans-serif",
                padding: "20px",
            }}
        >
            {/* Card */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                    width: "100%",
                    maxWidth: 440,
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                        padding: "36px 40px 30px",
                        textAlign: "center",
                    }}
                >
                    {/* Logo SVG */}
                    <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
                        <defs>
                            <linearGradient id="gG" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1a9baa" />
                                <stop offset="100%" stopColor="#0d6e7a" />
                            </linearGradient>
                            <linearGradient id="bG" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#f5a623" />
                                <stop offset="100%" stopColor="#e8621a" />
                            </linearGradient>
                        </defs>
                        <path d="M60 8 L65 2 L70 8 L70 14 Q80 16 88 22 L94 18 L100 22 L96 28 Q102 36 104 46 L110 48 L110 54 L104 56 Q102 66 96 74 L100 80 L94 84 L88 80 Q80 86 70 88 L70 94 L65 100 L60 94 L60 88 Q50 86 42 80 L36 84 L30 80 L34 74 Q28 66 26 56 L20 54 L20 48 L26 46 Q28 36 34 28 L30 22 L36 18 L42 22 Q50 16 60 14 Z" fill="url(#gG)" />
                        <circle cx="60" cy="51" r="32" fill="white" />
                        <circle cx="60" cy="51" r="32" fill="none" stroke="url(#gG)" strokeWidth="5" />
                        <polygon points="38,51 55,28 55,45 72,45 55,74 55,57" fill="url(#bG)" />
                        <polygon points="82,51 65,28 65,45 48,45 65,74 65,57" fill="url(#bG)" opacity="0.85" />
                        <rect x="57" y="24" width="6" height="54" rx="2" fill="url(#bG)" />
                    </svg>
                    <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>
                        ARADHYA
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2, letterSpacing: 1 }}>
                        ELECTRICALS & ENTERPRISES
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, marginTop: 10 }}>
                        Admin Panel Login
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: "36px 40px 40px" }}>
                    {error && (
                        <div
                            style={{
                                background: "#fff3f3",
                                border: "1px solid #f5c6c6",
                                color: "#c0392b",
                                borderRadius: 8,
                                padding: "12px 16px",
                                fontSize: 13.5,
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Username */}
                    <div style={{ marginBottom: 20 }}>
                        <label
                            htmlFor="login-username"
                            style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 7 }}
                        >
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Enter username"
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                border: "1.5px solid #ddd",
                                borderRadius: 8,
                                fontSize: 14.5,
                                color: "#333",
                                outline: "none",
                                transition: "border-color 0.2s",
                                boxSizing: "border-box",
                                fontFamily: "'Arial', sans-serif",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 28 }}>
                        <label
                            htmlFor="login-password"
                            style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 7 }}
                        >
                            Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Enter password"
                                style={{
                                    width: "100%",
                                    padding: "12px 46px 12px 14px",
                                    border: "1.5px solid #ddd",
                                    borderRadius: 8,
                                    fontSize: 14.5,
                                    color: "#333",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                    boxSizing: "border-box",
                                    fontFamily: "'Arial', sans-serif",
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: 17,
                                    color: "#888",
                                    padding: 0,
                                    lineHeight: 1,
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: loading
                                ? "#aaa"
                                : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 15,
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            letterSpacing: 0.5,
                            transition: "opacity 0.2s",
                        }}
                    >
                        {loading ? "Logging in…" : "Login"}
                    </button>

                    {/* Back link */}
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Link
                            href="/"
                            style={{ fontSize: 13, color: COLORS.teal, textDecoration: "none" }}
                        >
                            ← Back to Website
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
