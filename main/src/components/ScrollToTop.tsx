"use client";

import React, { useState, useEffect } from "react";
import { COLORS } from "./constants";

const styles: Record<string, React.CSSProperties> = {
    scrollTop: {
        position: "fixed",
        bottom: 20,
        left: 20,
        width: 42,
        height: 42,
        background: COLORS.blue,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        zIndex: 999,
        transition: "background 0.2s, transform 0.2s, opacity 0.3s",
        boxShadow: "0 4px 12px rgba(21,101,192,0.4)",
    },
};

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            style={styles.scrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = COLORS.darkBlue;
                (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = COLORS.blue;
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
}
