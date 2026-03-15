"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

interface Client {
    name: string;
    short: string;
    icon: string;
    category: string;
}

const categoryColors: Record<string, string> = {
    Transmission: "#0d6e7a",
    Railways: "#1a2744",
    Distribution: "#e8621a",
    Civil: "#2e7d32",
    Construction: "#5c3d2e",
};

export default function ReferencePage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/references.json")
            .then(r => r.json())
            .then(d => {
                if (d.clients) setClients(d.clients);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    const categories = ["All", ...Array.from(new Set(clients.map(c => c.category)))];
    const filtered = filter === "All" ? clients : clients.filter(c => c.category === filter);

    return (
        <main>
            <Navbar />
            <TopBar />

            {/* ── Banner ── */}
            <section
                style={{
                    position: "relative",
                    background: COLORS.navy,
                    padding: "48px 40px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 50%, ${COLORS.darkTeal} 100%)`,
                        opacity: 0.95,
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: 1200,
                        margin: "0 auto",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "'Georgia',serif",
                            fontSize: 38,
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 0 6px",
                            letterSpacing: 0.5,
                        }}
                    >
                        Our References
                    </h1>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                        Trusted by leading organizations across sectors
                    </p>
                </div>
            </section>

            {/* ── Filter Tabs ── */}
            <section
                style={{
                    background: "#f7f9fa",
                    borderBottom: "1px solid #e5e9ec",
                    padding: "0 40px",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "flex",
                        gap: 20,
                        overflowX: "auto",
                    }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                background: "none",
                                border: "none",
                                borderBottom: filter === cat ? `3px solid ${COLORS.orange}` : "3px solid transparent",
                                padding: "16px 0",
                                fontSize: 14,
                                fontWeight: filter === cat ? 700 : 500,
                                color: filter === cat ? COLORS.navy : COLORS.muted,
                                cursor: "pointer",
                                transition: "color 0.2s",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                if (filter !== cat)
                                    (e.currentTarget as HTMLElement).style.color = COLORS.navy;
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== cat)
                                    (e.currentTarget as HTMLElement).style.color = COLORS.muted;
                            }}
                        >
                            {cat}
                            {cat === "All" && (
                                <span style={{ marginLeft: 8, fontSize: 12 }}>({clients.length})</span>
                            )}
                            {cat !== "All" && (
                                <span style={{ marginLeft: 8, fontSize: 12 }}>
                                    ({clients.filter(c => c.category === cat).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Clients Grid ── */}
            <section style={{ padding: "60px 40px 90px", background: "#fff" }}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: 100, color: COLORS.muted }}>
                        Loading references…
                    </div>
                ) : (
                    <div
                        style={{
                            maxWidth: 1200,
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: 20,
                        }}
                    >
                        {filtered.map((client, idx) => (
                            <div
                                key={idx}
                                style={{
                                    border: `1.5px solid ${categoryColors[client.category] || COLORS.teal}22`,
                                    borderRadius: 12,
                                    padding: 20,
                                    textAlign: "center",
                                    background: `${categoryColors[client.category] || COLORS.teal}08`,
                                    transition: "all 0.3s",
                                    cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                    const elem = e.currentTarget as HTMLElement;
                                    elem.style.background = `${categoryColors[client.category] || COLORS.teal}15`;
                                    elem.style.transform = "translateY(-4px)";
                                    elem.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                    const elem = e.currentTarget as HTMLElement;
                                    elem.style.background = `${categoryColors[client.category] || COLORS.teal}08`;
                                    elem.style.transform = "translateY(0)";
                                    elem.style.boxShadow = "none";
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 48,
                                        marginBottom: 12,
                                    }}
                                >
                                    {client.icon}
                                </div>
                                <h3
                                    style={{
                                        margin: "0 0 6px",
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontFamily: "'Georgia',serif",
                                    }}
                                >
                                    {client.name}
                                </h3>
                                <p
                                    style={{
                                        margin: "0 0 10px",
                                        fontSize: 12,
                                        color: "#999",
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    {client.short}
                                </p>
                                <span
                                    style={{
                                        display: "inline-block",
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        textTransform: "uppercase",
                                        background: categoryColors[client.category] || COLORS.teal,
                                        color: "#fff",
                                        borderRadius: 20,
                                        padding: "3px 10px",
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    {client.category}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
