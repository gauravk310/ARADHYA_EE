"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

interface PageContent {
    intro1: string;
    intro2: string;
    intro3: string;
    intro4: string;
    bulletPoints: string[];
}

interface ServicesData {
    pageContent: PageContent;
}

const DEFAULT_PAGE_CONTENT: PageContent = {
    intro1: "Distribution and Retail Supply is the most critical link in the electricity market, which interfaces with the end customers and provides revenue for the entire value chain. In pursuance of reforms in the Power Sector, Government has introduced various models of New Connection, Smart Meter Installation, Meter Reading, Bill Generation, Bill Distribution & Revenue Collection in the distribution segment, both at the rural and urban level.",
    intro2: "ARADHYA EE worked with TPDDL (erstwhile NDPL) in renovation of old electrical infrastructure of Delhi. Also, ARADHYA EE provides services in Meter Installation, Complete Operation & Maintenance of Zone, System Augmentation, Survey and Energy Audit, Meter Reading & Bills Distribution, GIS Mapping, Street Lighting.",
    intro3: "The company has evolved on its own to develop and manage sophisticated distribution system to improve the AT&C losses level with effective plans and better synchronization amongst man, machine & material. The company has devised methods for energy conversation & technical loss reduction in transmission & distribution and better performance through renovation & modernization of older electrical infrastructure to reduce need for capacity addition as per demand.",
    intro4: "The company has various plans to reduce the AT & C losses and improve the existing distribution system, as enumerated below:",
    bulletPoints: [
        "Metering of all categories of consumers",
        "Energy Audit at 11 KV feeders",
        "Effective MIS",
        "Identification and Elimination of theft",
        "Increase in transformer capacity",
        "Increase in HT/LT ratio",
    ],
};

export default function ServicesPage() {
    const [pageContent, setPageContent] = useState<PageContent>(DEFAULT_PAGE_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/services.json")
            .then(r => r.json())
            .then((d: ServicesData) => {
                if (d.pageContent) {
                    setPageContent(d.pageContent);
                }
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <main>
                <Navbar />
                <TopBar />
                <section style={{ padding: "100px 40px", textAlign: "center", color: COLORS.muted }}>
                    Loading services…
                </section>
                <Footer />
                <ScrollToTop />
            </main>
        );
    }

    return (
        <main style={{ fontFamily: "'Georgia', serif", fontSize: 15, color: "#333" }}>
            <Navbar />
            <TopBar />

            {/* ── Hero Banner ── */}
            <section
                style={{
                    background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 100%)`,
                    color: "#fff",
                    padding: "60px 40px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h1
                        style={{
                            fontSize: 42,
                            fontWeight: 700,
                            margin: "0 0 12px",
                            fontFamily: "'Georgia', serif",
                        }}
                    >
                        Our Services
                    </h1>
                    <p
                        style={{
                            fontSize: 16,
                            margin: 0,
                            color: "rgba(255,255,255,0.8)",
                            lineHeight: 1.5,
                        }}
                    >
                        Comprehensive solutions in distribution and electrical infrastructure management
                    </p>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
                {/* Intro 1 */}
                <div style={{ marginBottom: 50 }}>
                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: "#555",
                            textAlign: "justify",
                        }}
                    >
                        {pageContent.intro1}
                    </p>
                </div>

                {/* Intro 2 */}
                <div style={{ marginBottom: 50 }}>
                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: "#555",
                            textAlign: "justify",
                        }}
                    >
                        {pageContent.intro2}
                    </p>
                </div>

                {/* Intro 3 */}
                <div style={{ marginBottom: 50 }}>
                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: "#555",
                            textAlign: "justify",
                        }}
                    >
                        {pageContent.intro3}
                    </p>
                </div>

                {/* Intro 4 & Bullet Points */}
                <div>
                    <p
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            marginBottom: 16,
                            color: COLORS.navy,
                        }}
                    >
                        {pageContent.intro4}
                    </p>

                    <ul
                        style={{
                            listStyleType: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {pageContent.bulletPoints.map((point, idx) => (
                            <li
                                key={idx}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 12,
                                    padding: "12px 16px",
                                    background: "#f7f9fa",
                                    borderLeft: `4px solid ${COLORS.teal}`,
                                    borderRadius: 4,
                                    fontSize: 14,
                                }}
                            >
                                <span style={{ color: COLORS.orange, fontWeight: 700, marginTop: 2 }}>
                                    ✓
                                </span>
                                <span style={{ color: "#555" }}>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
