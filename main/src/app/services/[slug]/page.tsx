"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS, serviceDetails } from "@/components/constants";

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const detail = serviceDetails[slug];

    if (!detail) {
        return (
            <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
                <Navbar />
                <TopBar />
                <div style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 40px",
                    textAlign: "center",
                }}>
                    <h1 style={{ fontSize: 48, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>404</h1>
                    <p style={{ fontSize: 18, color: COLORS.muted, marginBottom: 32 }}>Service not found.</p>
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "14px 36px",
                            background: COLORS.blue,
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textDecoration: "none",
                            transition: "background 0.2s",
                        }}
                    >
                        ← BACK TO HOME
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
            <Navbar />
            <TopBar />

            {/* Page Banner / Hero */}
            <section
                style={{
                    position: "relative",
                    background: COLORS.navy,
                    padding: "48px 40px",
                    overflow: "hidden",
                }}
            >
                {/* Subtle gradient overlay */}
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
                        {detail.title}
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
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                            }}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <Link
                            href="/services"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                            }}
                        >
                            Services
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            {detail.title}
                        </span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <section
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "60px 40px 80px",
                }}
            >
                {/* Hero Image */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 800,
                        margin: "0 auto 48px",
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                >
                    <img
                        src={detail.bannerImage}
                        alt={detail.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            maxHeight: 420,
                            objectFit: "cover",
                        }}
                    />
                </div>

                {/* Text Content */}
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    {detail.paragraphs.map((p, i) => (
                        <p
                            key={i}
                            style={{
                                fontSize: 15.5,
                                lineHeight: 1.85,
                                color: COLORS.text,
                                marginBottom: 22,
                                textAlign: "justify",
                            }}
                        >
                            {p}
                        </p>
                    ))}

                    {/* Highlights Section */}
                    <div
                        style={{
                            marginTop: 40,
                            padding: "32px 36px",
                            background: `linear-gradient(135deg, ${COLORS.lightTeal} 0%, #f0fafa 100%)`,
                            borderLeft: `4px solid ${COLORS.blue}`,
                            borderRadius: 4,
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 20,
                                fontWeight: 700,
                                color: COLORS.navy,
                                marginBottom: 20,
                            }}
                        >
                            Key Capabilities
                        </h3>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: "12px 32px",
                            }}
                        >
                            {detail.highlights.map((h, i) => (
                                <li
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        fontSize: 14.5,
                                        color: COLORS.text,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: COLORS.orange,
                                            flexShrink: 0,
                                        }}
                                    />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Back Link */}
                    <div style={{ marginTop: 48, textAlign: "center" }}>
                        <Link
                            href="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "14px 36px",
                                background: COLORS.blue,
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: 1.5,
                                textDecoration: "none",
                                transition: "background 0.2s, transform 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.darkBlue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.blue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                        >
                            ← BACK TO HOME
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
