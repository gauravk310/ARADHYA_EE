"use client";

import React from "react";
import { COLORS } from "./constants";

const styles: Record<string, React.CSSProperties> = {
    topBar: {
        background: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },
    topBarLeft: { display: "flex", gap: 24, flexWrap: "wrap" },
    topBarItem: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: "#555",
    },
    topBarRight: { display: "flex", alignItems: "center", gap: 14 },
    socialIcon: {
        color: COLORS.blue,
        fontSize: 15,
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.2s, color 0.2s",
        display: "inline-block",
    },
    searchBtn: {
        background: COLORS.blue,
        color: "#fff",
        border: "none",
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 15,
        transition: "background 0.2s",
    },
};

const contactItems = [
    { icon: "✉", text: "info@aradhyaee.com" },
    { icon: "📞", text: "+91-124-6913000" },
    { icon: "📍", text: "Signature Tower, Gurugram" },
];

const socialLinks = [
    { key: "f", label: "𝐟", href: "#" },
    { key: "t", label: "𝐭", href: "#" },
    { key: "in", label: "🔗", href: "#" },
    { key: "ig", label: "📷", href: "#" },
];

export default function TopBar() {
    return (
        <div style={styles.topBar}>
            <div style={styles.topBarLeft}>
                {contactItems.map((item) => (
                    <div key={item.text} style={styles.topBarItem}>
                        <span style={{ color: COLORS.blue }}>{item.icon}</span>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
            <div style={styles.topBarRight}>
                {socialLinks.map((s) => (
                    <a
                        key={s.key}
                        href={s.href}
                        style={styles.socialIcon}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.2)";
                            (e.currentTarget as HTMLElement).style.color = COLORS.darkBlue;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                        }}
                    >
                        {s.label}
                    </a>
                ))}
                <button
                    style={styles.searchBtn}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = COLORS.darkBlue)
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = COLORS.blue)
                    }
                >
                    🔍
                </button>
            </div>
        </div>
    );
}
