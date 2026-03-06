"use client";

import React from "react";
import Link from "next/link";
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
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Reference", href: "/reference" },
    { label: "Investor", href: "/investor/relations" },
    { label: "Media", href: "/media/projects" },
    { label: "Careers", href: "/careers/why-aee" },
    { label: "Contact Us", href: "/contact/contact-us" },
];

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <nav style={styles.footerNav} aria-label="Footer navigation">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        style={styles.footerNavA}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "#fff")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)")
                        }
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <p>Copyright &copy; {new Date().getFullYear()} ARADHYA ELECTRICALS & ENTERPRISES. All rights reserved.</p>
            <p style={{ marginTop: 4 }}>
                <a href="https://www.aradhyaee.com" style={{ color: "inherit", textDecoration: "none" }}>
                    www.aradhyaee.com
                </a>
            </p>
        </footer>
    );
}
