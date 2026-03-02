"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function ServicesPage() {
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
                        Services
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
                            Services
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Services Content ── */}
            <section
                style={{
                    padding: "60px 40px 80px",
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                    }}
                >
                    {/* Featured Image */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 900,
                            margin: "0 auto 50px",
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src="/railways-hero.jpg"
                            alt="Railway Track Sunset"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                maxHeight: 500,
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <div style={{ maxWidth: 950, margin: "0 auto" }}>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            Distribution and Retail Supply is the most critical link in the electricity market, which interfaces with the end customers and provides revenue for the entire value chain. In pursuance of reforms in the Power Sector, Government has introduced various models of New Connection, Smart Meter Installation, Meter Reading, Bill Generation, Bill Distribution & Revenue Collection in the distribution segment, both at the rural and urban level.
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            <strong>ARADHYA EE</strong> worked with TPDDL (erstwhile NDPL) in renovation of old electrical infrastructure of Delhi. Also, ARADHYA EE provides services in Meter Installation, Complete Operation & Maintenance of Zone, System Augmentation, Survey and Energy Audit, Meter Reading & Bills Distribution, GIS Mapping, Street Lighting.
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            The company has evolved on its own to develop and manage sophisticated distribution system to improve the AT&C losses level with effective plans and better synchronization amongst man, machine & material. The company has devised methods for energy conversation & technical loss reduction in transmission & distribution and better performance through renovation & modernization of older electrical infrastructure to reduce need for capacity addition as per demand.
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            The company has various plans to reduce the AT & C losses and improve the existing distribution system, as enumerated below:
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                paddingLeft: 20,
                                margin: 0,
                            }}
                        >
                            {[
                                "Metering of all categories of consumers",
                                "Energy Audit at 11 KV feeders",
                                "Effective MIS",
                                "Identification and Elimination of theft",
                                "Increase in transformer capacity",
                                "Increase in HT/LT ratio",
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        fontSize: 15.5,
                                        lineHeight: 1.6,
                                        color: "#444",
                                        marginBottom: 12,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            background: COLORS.orange,
                                            borderRadius: "50%",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {item}
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
