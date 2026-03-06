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
    {
        icon: <Mail size={16} />,
        text: "balajisalgude@gmail.com",
        href: "mailto:balajisalgude@gmail.com",
    },
    {
        icon: <Phone size={16} />,
        text: "+91 99214 46398",
        href: "tel:+919921446398",
    },
    {
        icon: <MapPin size={16} />,
        text: "House No 20/1/292, Kuranwadi, Mohol, Solapur - 413214",
        href: "https://www.google.com/maps/search/?api=1&query=House+No+20/1/292,+Kuranwadi,+Mohol,+Solapur+-+413214",
    },
];

const socialLinks = [
    { key: "fb", icon: <Facebook size={18} fill="currentColor" strokeWidth={0} />, href: "https://facebook.com/aradhyaee" },
    { key: "li", icon: <Linkedin size={18} fill="currentColor" strokeWidth={0} />, href: "https://linkedin.com/company/aradhyaee" },
    { key: "ig", icon: <Instagram size={18} />, href: "https://instagram.com/aradhyaee" },
    {
        key: "wa",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        href: "https://wa.me/919921446398",
    },
];

export default function TopBar() {
    return (
        <div style={styles.topBar}>
            <div style={styles.topBarLeft}>
                {contactItems.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                            ...styles.topBarItem,
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#555";
                        }}
                    >
                        <span style={{ color: COLORS.blue, display: "flex" }}>{item.icon}</span>
                        <span>{item.text}</span>
                    </a>
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
