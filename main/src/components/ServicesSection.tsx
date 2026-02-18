"use client";

import React, { useState } from "react";
import { COLORS, services } from "./constants";
import SectionDivider from "./SectionDivider";

const styles: Record<string, React.CSSProperties> = {
    servicesSection: { background: "#f9f9f9", padding: "80px 40px" },
    sectionTitle: {
        textAlign: "center",
        fontFamily: "'Georgia', serif",
        fontSize: 34,
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: 12,
    },
    servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        maxWidth: 1200,
        margin: "0 auto",
    },
    serviceCard: {
        background: COLORS.blue,
        color: "#fff",
        padding: "44px 32px",
        textAlign: "center",
        cursor: "default",
        transition: "transform 0.25s, box-shadow 0.25s",
    },
    serviceCardH3: {
        fontFamily: "'Georgia', serif",
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 16,
    },
    serviceCardP: {
        fontSize: 14,
        lineHeight: 1.75,
        marginBottom: 26,
        color: "rgba(255,255,255,0.88)",
    },
    btnService: {
        display: "inline-block",
        padding: "10px 26px",
        border: "2px solid #fff",
        fontSize: 13,
        fontWeight: 600,
        color: "#fff",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.2s, color 0.2s",
    },
};

export default function ServicesSection() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section style={styles.servicesSection} id="services">
            <h2 style={styles.sectionTitle}>Services</h2>
            <SectionDivider />
            <div style={styles.servicesGrid}>
                {services.map((s, i) => (
                    <div
                        key={s.label}
                        style={{
                            ...styles.serviceCard,
                            transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                            boxShadow:
                                hovered === i
                                    ? "0 14px 36px rgba(21,101,192,0.4)"
                                    : "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <span style={{ fontSize: 52, display: "block", marginBottom: 18 }}>
                            {s.icon}
                        </span>
                        <h3 style={styles.serviceCardH3}>{s.label}</h3>
                        <p style={styles.serviceCardP}>{s.desc}</p>
                        <a
                            href="#"
                            style={styles.btnService}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#fff";
                                (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>

            {/* Pagination dots */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 30,
                }}
            >
                {[0, 1].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: i === 0 ? COLORS.blue : "#ccc",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
