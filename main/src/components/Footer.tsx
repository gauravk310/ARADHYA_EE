"use client";

import React from "react";
import { COLORS } from "./constants";

const styles: Record<string, React.CSSProperties> = {
    footer: {
        background: COLORS.navy,
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        padding: "30px 20px",
        fontSize: 13,
    },
    footerNav: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 20,
        marginBottom: 16,
    },
    footerNavA: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
        cursor: "pointer",
        textDecoration: "none",
        transition: "color 0.2s",
    },
};

const links = [
    "Home",
    "About Us",
    "Services",
    "Reference",
    "Investor",
    "Media",
    "Careers",
    "Contact Us",
    "Privacy Policy",
];

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <nav style={styles.footerNav} aria-label="Footer navigation">
                {links.map((l) => (
                    <a
                        key={l}
                        href="#"
                        style={styles.footerNavA}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "#fff")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)")
                        }
                    >
                        {l}
                    </a>
                ))}
            </nav>
            <p>Copyright &copy; {new Date().getFullYear()} All rights reserved.</p>
            <p style={{ marginTop: 4 }}>www.shyamindus.com</p>
        </footer>
    );
}
