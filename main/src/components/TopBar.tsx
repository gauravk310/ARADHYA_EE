"use client";

import React from "react";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
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
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.2s, color 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

const contactItems = [
    { icon: <Mail size={16} />, text: "info@aradhyaee.com" },
    { icon: <Phone size={16} />, text: "+91 99214 46398" },
    { icon: <MapPin size={16} />, text: "Kuranwadi , Solapur" },
];

const socialLinks = [
    { key: "fb", icon: <Facebook size={18} fill="currentColor" strokeWidth={0} />, href: "https://facebook.com/aradhyaee" },
    { key: "li", icon: <Linkedin size={18} fill="currentColor" strokeWidth={0} />, href: "https://linkedin.com/company/aradhyaee" },
    { key: "ig", icon: <Instagram size={18} />, href: "https://instagram.com/aradhyaee" },
];

export default function TopBar() {
    return (
        <div style={styles.topBar}>
            <div style={styles.topBarLeft}>
                {contactItems.map((item, idx) => (
                    <div key={idx} style={styles.topBarItem}>
                        <span style={{ color: COLORS.blue, display: "flex" }}>{item.icon}</span>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
            <div style={styles.topBarRight}>
                {socialLinks.map((s) => (
                    <a
                        key={s.key}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
