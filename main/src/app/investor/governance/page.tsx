"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function CorporateGovernancePage() {
    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                background: "#fff",
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
                        Corporate Governance
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
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color =
                                    "rgba(255,255,255,0.7)";
                            }}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            Corporate Governance
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Content Section ── */}
            <section
                style={{
                    padding: "80px 40px",
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        maxWidth: 1000,
                        margin: "0 auto",
                    }}
                >
                    <h2 style={{
                        textAlign: "center",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#333",
                        marginBottom: 40,
                        textTransform: "uppercase"
                    }}>
                        BOARD OF DIRECTORS
                    </h2>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            border: "1px solid #ddd",
                            fontSize: 14,
                        }}>
                            <thead>
                                <tr style={{ background: COLORS.blue, color: "#fff", textAlign: "left" }}>
                                    <th style={{ padding: "12px 15px", border: "1px solid #ddd" }}>S.No.</th>
                                    <th style={{ padding: "12px 15px", border: "1px solid #ddd" }}>Name</th>
                                    <th style={{ padding: "12px 15px", border: "1px solid #ddd" }}>Designation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ background: "#fdfdfd" }}>
                                    <td style={{ padding: "12px 15px", border: "1px solid #ddd" }}>1</td>
                                    <td style={{ padding: "12px 15px", border: "1px solid #ddd" }}>Balaji Ankush Salgude</td>
                                    <td style={{ padding: "12px 15px", border: "1px solid #ddd" }}>Managing Director</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
