"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

const missionPoints = [
    "Focussed and innovative customer services",
    "Achieving excellence in delivery of services by creating benchmarks in safety and quality",
    "Enriching culture of cooperative growth through teamwork",
    "Strive to conserve natural resources for benefit of mankind",
    "Creating value for stakeholders through strong business results",
];

const valuesPoints = [
    "Trust and Belief in each other",
    "Integrity, Honesty, Fairness and Transparency in Conduct and Transactions",
    "Initiatives supported by able Processes",
    "Responsible Corporate Citizenship",
    "Quality for Customer Delight",
];

export default function VisionMissionPage() {
    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
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
                        Vision &amp; Mission
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
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>About Us</span>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            Vision &amp; Mission
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Vision & Mission Content ── */}
            <section
                style={{
                    padding: "60px 40px 80px",
                    background: "#fff",
                    minHeight: "60vh",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                    }}
                >
                    {/* ── Vision Section ── */}
                    <div style={{ marginBottom: 50 }}>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 26,
                                fontWeight: 700,
                                color: COLORS.navy,
                                marginBottom: 20,
                                margin: "0 0 20px 0",
                                paddingBottom: 10,
                                borderBottom: `3px solid ${COLORS.orange}`,
                                display: "inline-block",
                            }}
                        >
                            Vision
                        </h2>
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.9,
                                color: COLORS.text,
                                marginBottom: 0,
                                textAlign: "justify",
                                paddingLeft: 20,
                            }}
                        >
                            To be an acclaimed company partnering in India&apos;s growth in Power
                            Distribution, Engineering and Project Management.
                        </p>
                    </div>

                    {/* ── Our Mission Section ── */}
                    <div style={{ marginBottom: 50 }}>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 26,
                                fontWeight: 700,
                                color: COLORS.navy,
                                marginBottom: 24,
                                margin: "0 0 24px 0",
                                paddingBottom: 10,
                                borderBottom: `3px solid ${COLORS.orange}`,
                                display: "inline-block",
                            }}
                        >
                            Our Mission
                        </h2>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {missionPoints.map((point) => (
                                <li
                                    key={point}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 14,
                                        fontSize: 15,
                                        lineHeight: 1.9,
                                        color: COLORS.text,
                                        marginBottom: 16,
                                        paddingLeft: 20,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            background: COLORS.orange,
                                            borderRadius: "50%",
                                            flexShrink: 0,
                                            marginTop: 9,
                                        }}
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Our Values Section ── */}
                    <div style={{ marginBottom: 50 }}>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 26,
                                fontWeight: 700,
                                color: COLORS.navy,
                                marginBottom: 24,
                                margin: "0 0 24px 0",
                                paddingBottom: 10,
                                borderBottom: `3px solid ${COLORS.orange}`,
                                display: "inline-block",
                            }}
                        >
                            Our Values
                        </h2>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {valuesPoints.map((point) => (
                                <li
                                    key={point}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 14,
                                        fontSize: 15,
                                        lineHeight: 1.9,
                                        color: COLORS.text,
                                        marginBottom: 16,
                                        paddingLeft: 20,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            background: COLORS.orange,
                                            borderRadius: "50%",
                                            flexShrink: 0,
                                            marginTop: 9,
                                        }}
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
