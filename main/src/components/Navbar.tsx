"use client";

import React, { useState, useEffect } from "react";
import { COLORS, navItems } from "./constants";

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
        fontFamily: "'Georgia', serif",
        fontSize: 17,
        fontWeight: 700,
        lineHeight: 1.2,
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

interface NavItemProps {
    item: { label: string; href: string; children?: string[] };
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
                    {item.children.map((c) => (
                        <a
                            key={c}
                            href="#"
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
                            {c}
                        </a>
                    ))}
                </div>
            )}
        </li>
    );
}

export default function Navbar() {
    const [activeNav, setActiveNav] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <nav
            style={{
                ...styles.nav,
                flexWrap: isMobile ? "wrap" : "nowrap",
            }}
        >
            {/* LOGO */}
            <div style={styles.logoArea}>
                <svg width="48" height="48" viewBox="0 0 48 48">
                    <polygon points="24,2 46,24 24,46 2,24" fill="#e8ecf0" />
                    <polygon
                        points="24,3 45,24 24,45 3,24"
                        fill={COLORS.red}
                        opacity="0.85"
                    />
                    <polygon
                        points="24,3 45,24 24,45"
                        fill={COLORS.blue}
                        opacity="0.9"
                    />
                    <text
                        x="24"
                        y="30"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#fff"
                        fontFamily="Georgia, serif"
                    >
                        SIPS
                    </text>
                </svg>
                <div style={styles.logoText}>
                    <span style={{ color: COLORS.red }}>Shyam</span>{" "}
                    <span style={{ color: COLORS.blue }}>Indus</span>{" "}
                    <span style={{ color: COLORS.text }}>Power Solutions Pvt Ltd</span>
                </div>
            </div>

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
                </ul>
            )}
        </nav>
    );
}
