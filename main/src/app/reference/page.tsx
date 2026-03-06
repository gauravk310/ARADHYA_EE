"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

const clients = [
    { name: "Power Grid Corporation of India Ltd", short: "POWERGRID", icon: "⚡", category: "Transmission" },
    { name: "Indian Railways", short: "Indian Railways", icon: "🚆", category: "Railways" },
    { name: "Northern Railway", short: "Northern Railway", icon: "🚆", category: "Railways" },
    { name: "Larsen & Toubro Limited", short: "L&T", icon: "🏗️", category: "Construction" },
    { name: "Kalpataru Power Transmission Ltd", short: "Kalpataru", icon: "⚡", category: "Transmission" },
    { name: "Texmaco Rail & Engineering Ltd", short: "Texmaco", icon: "🚆", category: "Railways" },
    { name: "Delhi Metro Rail Corporation", short: "DMRC", icon: "🚇", category: "Railways" },
    { name: "TP Central Odisha Distribution Ltd", short: "TPCODL", icon: "🔌", category: "Distribution" },
    { name: "TP Western Odisha Distribution Ltd", short: "TPWODL", icon: "🔌", category: "Distribution" },
    { name: "TP Southern Odisha Distribution Ltd", short: "TPSODL", icon: "🔌", category: "Distribution" },
    { name: "South East Central Railway", short: "SECR", icon: "🚆", category: "Railways" },
    { name: "South Eastern Railway", short: "SER", icon: "🚆", category: "Railways" },
    { name: "North Eastern Railway", short: "NER", icon: "🚆", category: "Railways" },
    { name: "Industrial Development Corporation of Odisha", short: "IDCO", icon: "🏗️", category: "Civil" },
    { name: "ACB (India) Ltd", short: "ACB India", icon: "🏗️", category: "Civil" },
    { name: "MP Warehousing & Logistic Corporation", short: "MPWLC", icon: "🏗️", category: "Civil" },
];

const categoryColors: Record<string, string> = {
    Transmission: "#0d6e7a",
    Railways: "#1a2744",
    Distribution: "#e8621a",
    Civil: "#2e7d32",
    Construction: "#5c3d2e",
};

export default function ReferencePage() {
    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                background: "#f9fbfd",
            }}
        >
            <Navbar />
            <TopBar />

            {/* ── Page Banner ── */}
            <section
                style={{
                    position: "relative",
                    background: COLORS.navy,
                    padding: "48px 40px",
                    overflow: "hidden",
                }}
            >
                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 50%, ${COLORS.teal} 100%)`,
                        opacity: 0.95,
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 38,
                            fontWeight: 700,
                            color: "#fff",
                            margin: 0,
                            letterSpacing: 0.5,
                        }}
                    >
                        Reference
                    </h1>

                    {/* Breadcrumb */}
                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 14,
                            color: "rgba(255,255,255,0.7)",
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Reference</span>
                    </nav>
                </div>
            </section>

            {/* ── References Grid ── */}
            <section
                style={{
                    padding: "100px 40px",
                    background: "linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                    }}
                >
                    <div style={{
                        textAlign: 'center',
                        marginBottom: 80
                    }} className="animate-fadeIn">
                        <h2 style={{
                            fontSize: 36,
                            fontWeight: 700,
                            color: COLORS.navy,
                            marginBottom: 20,
                            fontFamily: "'Georgia', serif",
                        }}>Our Prestigious Clients</h2>
                        <div style={{
                            width: 80,
                            height: 4,
                            background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.teal})`,
                            margin: '0 auto',
                            borderRadius: 10
                        }} />
                        <p style={{ color: COLORS.muted, marginTop: 24, fontSize: 16 }}>
                            We take pride in our collaborations with government and private sector giants.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 32,
                        }}
                    >
                        {clients.map((client, index) => {
                            const accentColor = categoryColors[client.category] || COLORS.teal;
                            return (
                                <div
                                    key={index}
                                    className="animate-fadeInUp"
                                    style={{
                                        background: "#fff",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        borderRadius: 16,
                                        padding: "36px 28px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: 200,
                                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        animationDelay: `${index * 0.06}s`,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) scale(1.02)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                                        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.06)";
                                    }}
                                >
                                    {/* Top accent bar */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 4,
                                        background: `linear-gradient(to right, ${accentColor}, ${accentColor}88)`,
                                        borderRadius: '16px 16px 0 0',
                                    }} />

                                    {/* Icon */}
                                    <div style={{
                                        fontSize: 36,
                                        marginBottom: 16,
                                        width: 64,
                                        height: 64,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        background: `${accentColor}10`,
                                    }}>
                                        {client.icon}
                                    </div>

                                    {/* Short name */}
                                    <div style={{
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontSize: 20,
                                        textAlign: 'center',
                                        fontFamily: "'Georgia', serif",
                                        marginBottom: 8,
                                        lineHeight: 1.3,
                                    }}>
                                        {client.short}
                                    </div>

                                    {/* Full name */}
                                    <div style={{
                                        color: COLORS.muted,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        lineHeight: 1.4,
                                    }}>
                                        {client.name}
                                    </div>

                                    {/* Category badge */}
                                    <div style={{
                                        marginTop: 14,
                                        padding: '4px 14px',
                                        borderRadius: 20,
                                        background: `${accentColor}12`,
                                        color: accentColor,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        textTransform: 'uppercase',
                                    }}>
                                        {client.category}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
