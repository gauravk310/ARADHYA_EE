"use client";

import React from "react";
import { COLORS } from "./constants";

const styles: Record<string, React.CSSProperties> = {
    ctaBanner: {
        position: "relative",
        textAlign: "center",
        padding: "100px 40px",
        color: "#fff",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    ctaOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(15,30,60,0.72)",
    },
    ctaContent: {
        position: "relative",
        zIndex: 2,
        maxWidth: 800,
        margin: "0 auto",
    },
    ctaH2: {
        fontFamily: "'Georgia', serif",
        fontSize: 38,
        fontWeight: 700,
        marginBottom: 16,
    },
    ctaP: {
        fontSize: 16,
        lineHeight: 1.75,
        marginBottom: 32,
        color: "rgba(255,255,255,0.88)",
    },
    btnOutline: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "transparent",
        color: "#fff",
        padding: "14px 34px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1.5,
        border: "2px solid #fff",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.2s, color 0.2s, transform 0.2s",
    },
};

export default function CTABanner() {
    return (
        <div
            style={{
                ...styles.ctaBanner,
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&q=80')",
            }}
        >
            <div style={styles.ctaOverlay} />
            <div style={styles.ctaContent}>
                <h2 style={styles.ctaH2}>ARADHYA ELECTRICALS &amp; ENTERPRISES</h2>
                <p style={styles.ctaP}>
                    ARADHYA ELECTRICALS & ENTERPRISES has vast experience in execution of
                    electrical and civil projects including Power Transmission &amp; Distribution.
                </p>
                <a
                    href="#"
                    style={styles.btnOutline}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#fff";
                        (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                >
                    KNOW MORE →
                </a>
            </div>
        </div>
    );
}
