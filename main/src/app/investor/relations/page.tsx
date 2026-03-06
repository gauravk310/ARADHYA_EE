"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS, CONTACT_INFO } from "@/components/constants";

export default function InvestorRelationsPage() {
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
                        Investor Relations
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
                            Investor Relations
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
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 40,
                    }}
                >
                    {/* Registered Office */}
                    <div>
                        <h3 style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: COLORS.navy,
                            marginBottom: 16,
                            textTransform: "uppercase"
                        }}>
                            Regd. Office :
                        </h3>
                        <p style={{ lineHeight: 1.8, color: "#666", fontSize: 14 }}>
                            {CONTACT_INFO.addressFull}<br />
                            Tel: {CONTACT_INFO.phone}<br />
                            Email ID: {CONTACT_INFO.email}
                        </p>
                    </div>

                    {/* Corporate Office */}
                    <div>
                        <h3 style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: COLORS.navy,
                            marginBottom: 16,
                            textTransform: "uppercase"
                        }}>
                            Corporate Office:
                        </h3>
                        <p style={{ lineHeight: 1.8, color: "#666", fontSize: 14 }}>
                            {CONTACT_INFO.addressFull}<br />
                            Tel: {CONTACT_INFO.phone}<br />
                            Email ID: {CONTACT_INFO.email}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
