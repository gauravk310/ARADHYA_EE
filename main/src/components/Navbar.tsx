"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { COLORS, navItems } from "./constants";
import { useAuth } from "@/context/AuthContext";

const styles: Record<string, React.CSSProperties> = {
    nav: {
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logoArea: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 0",
    },
    logoText: {
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        lineHeight: 1.25,
        letterSpacing: 0.5,
        textTransform: "uppercase" as const,
    },
    navList: {
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        gap: 0,
    },
    navLink: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "20px 15px",
        fontSize: 13.5,
        fontWeight: 600,
        color: COLORS.text,
        borderBottom: "3px solid transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
        textDecoration: "none",
        letterSpacing: 0.3,
        transition: "color 0.2s, border-color 0.2s",
    },
    navLinkActive: {
        color: COLORS.blue,
        borderBottom: `3px solid ${COLORS.blue}`,
    },
    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,
        background: "#fff",
        minWidth: 190,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        zIndex: 200,
        animation: "fadeIn 0.2s ease",
    },
    dropdownItem: {
        display: "block",
        padding: "11px 18px",
        fontSize: 13,
        color: COLORS.text,
        borderBottom: "1px solid #f0f0f0",
        textDecoration: "none",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
    },
};

type NavChild = string | { label: string; href: string };

interface NavItemProps {
    item: { label: string; href: string; children?: NavChild[] };
    active: boolean;
    onActivate: (label: string) => void;
}

function NavItem({ item, active, onActivate }: NavItemProps) {
    const [open, setOpen] = useState(false);

    const linkStyle: React.CSSProperties = {
        ...styles.navLink,
        ...(active ? styles.navLinkActive : {}),
    };

    return (
        <li
            style={{ position: "relative" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <a
                href={item.href}
                style={linkStyle}
                onClick={() => onActivate(item.label)}
                onMouseEnter={(e) => {
                    if (!active) {
                        (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                    }
                }}
                onMouseLeave={(e) => {
                    if (!active) {
                        (e.currentTarget as HTMLElement).style.color = COLORS.text;
                    }
                }}
            >
                {item.label}
                {item.children && (
                    <span style={{ fontSize: 9, marginLeft: 2 }}>▼</span>
                )}
            </a>
            {item.children && open && (
                <div style={styles.dropdown}>
                    {item.children.map((c) => {
                        const label = typeof c === "string" ? c : c.label;
                        const href = typeof c === "string" ? "#" : c.href;
                        return (
                            <a
                                key={label}
                                href={href}
                                style={styles.dropdownItem}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background =
                                        COLORS.lightBlue;
                                    (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = "";
                                    (e.currentTarget as HTMLElement).style.color = "";
                                }}
                            >
                                {label}
                            </a>
                        );
                    })}
                </div>
            )}
        </li>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();
    const [activeNav, setActiveNav] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [logoutHover, setLogoutHover] = useState(false);

    useEffect(() => {
        // Find which nav item corresponds to the current path
        const currentItem = navItems.find(item => {
            if (item.href === "/" && pathname === "/") return true;
            if (item.href !== "/" && pathname.startsWith(item.href)) return true;
            return false;
        });

        if (currentItem) {
            setActiveNav(currentItem.label);
        }
    }, [pathname]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <nav
            style={{
                ...styles.nav,
                flexWrap: isMobile ? "wrap" : "nowrap",
            }}
        >
            {/* LOGO */}
            <Link href="/" style={{ textDecoration: "none" }}>
                <div style={styles.logoArea}>
                    {/* ARADHYA ELECTRICALS & ENTERPRISES Logo */}
                    <svg width="52" height="52" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gearGrad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1a9baa" />
                                <stop offset="100%" stopColor="#0d6e7a" />
                            </linearGradient>
                            <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#f5a623" />
                                <stop offset="50%" stopColor="#e8621a" />
                                <stop offset="100%" stopColor="#f5a623" />
                            </linearGradient>
                            <linearGradient id="centerGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f5c842" />
                                <stop offset="100%" stopColor="#e8621a" />
                            </linearGradient>
                        </defs>
                        {/* Gear teeth */}
                        <path d="M60 8 L65 2 L70 8 L70 14 Q80 16 88 22 L94 18 L100 22 L96 28 Q102 36 104 46 L110 48 L110 54 L104 56 Q102 66 96 74 L100 80 L94 84 L88 80 Q80 86 70 88 L70 94 L65 100 L60 94 L60 88 Q50 86 42 80 L36 84 L30 80 L34 74 Q28 66 26 56 L20 54 L20 48 L26 46 Q28 36 34 28 L30 22 L36 18 L42 22 Q50 16 60 14 Z" fill="url(#gearGrad)" />
                        {/* Inner circle cutout */}
                        <circle cx="60" cy="51" r="32" fill="white" />
                        {/* Gear inner ring */}
                        <circle cx="60" cy="51" r="32" fill="none" stroke="url(#gearGrad)" strokeWidth="5" />
                        {/* Lightning bolt - left arrow */}
                        <polygon points="38,51 55,28 55,45 72,45 55,74 55,57" fill="url(#boltGrad)" />
                        {/* Lightning bolt - right arrow (mirrored) */}
                        <polygon points="82,51 65,28 65,45 48,45 65,74 65,57" fill="url(#boltGrad)" opacity="0.85" />
                        {/* Center vertical stripe */}
                        <rect x="57" y="24" width="6" height="54" rx="2" fill="url(#centerGrad)" />
                    </svg>
                    <div style={styles.logoText}>
                        <span style={{ color: "#0d6e7a" }}>ARADHYA</span>{" "}
                        <span style={{ color: "#0d6e7a" }}>ELECTRICALS</span>
                        <br />
                        <span style={{ color: "#e8621a", fontSize: 13 }}>&amp; ENTERPRISES</span>
                    </div>
                </div>
            </Link>

            {/* Mobile hamburger */}
            {isMobile && (
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    style={{
                        background: "none",
                        border: "none",
                        fontSize: 22,
                        cursor: "pointer",
                        color: COLORS.text,
                    }}
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            )}

            {/* Nav Links */}
            {(!isMobile || mobileOpen) && (
                <ul
                    style={{
                        ...styles.navList,
                        flexDirection: isMobile ? "column" : "row",
                        width: isMobile ? "100%" : "auto",
                        paddingBottom: isMobile ? 10 : 0,
                        background: isMobile ? "#fff" : "transparent",
                        alignItems: isMobile ? "stretch" : "center",
                    }}
                >
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            item={item}
                            active={activeNav === item.label}
                            onActivate={setActiveNav}
                        />
                    ))}

                    {/* Login / Logout Button */}
                    <li style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                        {isLoggedIn ? (
                            <button
                                id="logout-btn"
                                onClick={handleLogout}
                                onMouseEnter={() => setLogoutHover(true)}
                                onMouseLeave={() => setLogoutHover(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "8px 16px",
                                    background: logoutHover ? "#c0392b" : "#e74c3c",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                    letterSpacing: 0.3,
                                    fontFamily: "'Arial', sans-serif",
                                }}
                            >
                                🔓 Logout
                            </button>
                        ) : (
                            <Link
                                id="login-btn"
                                href="/login"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "8px 16px",
                                    background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                                    color: "#fff",
                                    borderRadius: 6,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    letterSpacing: 0.3,
                                    transition: "opacity 0.2s",
                                    fontFamily: "'Arial', sans-serif",
                                    whiteSpace: "nowrap",
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                            >
                                🔐 Login
                            </Link>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
}
