"use client";

import React, { useState } from "react";
import { COLORS } from "./constants";

const projects = [
    {
        date: "January 02, 2026",
        desc: "SIPS awarded a Rate Contract for for supply of Goods Contract for Package – B- Construction of (i) 02 Nos. 400 kv Line bays, (ii) Augmentation of 1×1500 MVA ICT (3rd), (iii) 01 No 765kv ICT bay and associated Tie Bay and (iv) 01 No. 400 kv ICT bay at 765/400kv Substation, Bareilly: Spec No. NR3/NT/W-AIS/DOM/K00/25/11854 (Rfx No. 5002004746).",
        client: "PGCIL",
    },
    {
        date: "December 22, 2025",
        desc: "SIPS awarded a Rate Contract for SITC of 33 KV Double Circuit Joda-Tensa Transmission line and Underground cable system. Package # A New Tower 1 to proposed Tower at interface point (near Koira PSS/Existing Tower 110).",
        client: "TPWODL",
    },
    {
        date: "November 19, 2025",
        desc: 'SIPS awarded a Contract : OEW-1995 - "Supply, Installation, Testing and Commissioning of Phase to Phase to Ground Metal oxide Surge Arresters in Dry type auxiliary transformer of ASS of Delhi Metro Rail Corporation Ltd.".',
        client: "DELHI METRO CORPORATION LIMITED",
    },
    {
        date: "November 12, 2025",
        desc: "SIPS awarded a contract for work of Extention of 765/400KV Champa S/S (for Installation of 1x240MVAR, 765KV Bus Reactor & 1x125MVAR, 420 KV Bus Reactor at Champa PS (on bus Section-A where Lara I project is connected) under Transmission Scheme to control high voltage at Champa PS (On Bus Section-A, where Lara TPS -I (2x800MW) of NTPC is connected).",
        client: "POWER GRID CORPORATION INDIA LTD",
    },
    {
        date: "October 30, 2025",
        desc: "SIPS awarded a contract for Supply of Service Contract for Substation Package SS-01 for Construction of additional 400 KV dia towards Mundka section at Jhatikra substation. Specification No. NR1/NT/W-CB/DOM/100/25/08207(RFX-5002004558) Domestic Competitive Bidding (Project Funding : Domestic).",
        client: "POWER GRID CORPORATION INDIA LTD",
    },
];

const styles: Record<string, React.CSSProperties> = {
    section: {
        padding: "80px 40px",
        background: "#fff",
    },
    container: {
        maxWidth: 1200,
        margin: "0 auto",
    },
    title: {
        fontFamily: "'Georgia', serif",
        fontSize: 34,
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: 40,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 28,
        marginBottom: 28,
    },
    gridSecond: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 28,
    },
    card: {
        background: "#fff",
        borderLeft: `4px solid ${COLORS.teal}`,
        borderRadius: 8,
        padding: "28px 26px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "space-between",
        transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "default",
    },
    dateBadge: {
        display: "inline-block",
        fontSize: 12,
        color: COLORS.muted,
        background: "#f0f4f5",
        borderRadius: 20,
        padding: "5px 14px",
        marginBottom: 16,
        fontWeight: 500,
        alignSelf: "flex-start",
    },
    desc: {
        fontSize: 13.5,
        lineHeight: 1.75,
        color: COLORS.text,
        marginBottom: 20,
        flex: 1,
    },
    clientRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginTop: "auto",
    },
    star: {
        color: COLORS.teal,
        fontSize: 14,
        fontWeight: 700,
    },
    clientName: {
        fontSize: 12,
        fontWeight: 600,
        color: COLORS.navy,
        textTransform: "uppercase" as const,
        letterSpacing: 0.3,
    },
    viewAll: {
        display: "inline-block",
        marginTop: 36,
        fontSize: 15,
        fontWeight: 600,
        color: COLORS.teal,
        textDecoration: "none",
        cursor: "pointer",
        transition: "color 0.2s",
    },
};

export default function LatestProjectsSection() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section style={styles.section} id="latest-projects">
            <div style={styles.container}>
                <h2 style={styles.title}>Latest Projects</h2>

                <div style={styles.grid}>
                    {projects.slice(0, 3).map((p, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.card,
                                transform: hoveredIdx === i ? "translateY(-6px)" : "none",
                                boxShadow:
                                    hoveredIdx === i
                                        ? "0 10px 28px rgba(13,110,122,0.15)"
                                        : "0 2px 12px rgba(0,0,0,0.07)",
                            }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <span style={styles.dateBadge}>{p.date}</span>
                            <p style={styles.desc}>{p.desc}</p>
                            <div style={styles.clientRow}>
                                <span style={styles.star}>★</span>
                                <span style={styles.clientName}>{p.client}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.gridSecond}>
                    {projects.slice(3).map((p, i) => {
                        const idx = i + 3;
                        return (
                            <div
                                key={idx}
                                style={{
                                    ...styles.card,
                                    transform: hoveredIdx === idx ? "translateY(-6px)" : "none",
                                    boxShadow:
                                        hoveredIdx === idx
                                            ? "0 10px 28px rgba(13,110,122,0.15)"
                                            : "0 2px 12px rgba(0,0,0,0.07)",
                                }}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                            >
                                <span style={styles.dateBadge}>{p.date}</span>
                                <p style={styles.desc}>{p.desc}</p>
                                <div style={styles.clientRow}>
                                    <span style={styles.star}>★</span>
                                    <span style={styles.clientName}>{p.client}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <a
                    href="#"
                    style={styles.viewAll}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = COLORS.darkTeal;
                        (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = COLORS.teal;
                        (e.currentTarget as HTMLElement).style.textDecoration = "none";
                    }}
                >
                    View All Projects &gt;&gt;
                </a>
            </div>
        </section>
    );
}
