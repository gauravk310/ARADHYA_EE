"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function AboutPage() {
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
                        About Us
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
                            About Us
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── About Content ── */}
            <section
                style={{
                    padding: "80px 40px",
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
                    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                        <p
                            style={{
                                fontSize: 15.5,
                                lineHeight: 1.8,
                                color: "#555",
                                marginBottom: 30,
                                textAlign: "justify",
                            }}
                        >
                            <strong>ARADHYA ELECTRICALS & ENTERPRISES (ARADHYA EE)</strong> is an established ISO 9001: 2015 certified EPC Company incorporated in the year 2004. The core competencies of the company are in the field of Electricity Distribution Franchise Management and Turnkey Projects in Transmission and Distribution Sector. The company has established a footprint in the Indian Railways as well as in civil construction businesses. ARADHYA ELECTRICALS holds the premier License issued by the Government of India's Central Electricity Regulatory Commission (CERC) to trade in Electricity. The Company has a highly qualified team of experts guiding the company to its present scales of success in Distribution, Transmission, Franchise Management, Metering and Power Generation Projects.
                        </p>

                        <h3
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#333",
                                marginBottom: 20,
                                textTransform: "uppercase",
                                letterSpacing: 0.5
                            }}
                        >
                            OPERATIONS:
                        </h3>

                        <p
                            style={{
                                fontSize: 15.5,
                                lineHeight: 1.8,
                                color: "#555",
                                marginBottom: 30,
                                textAlign: "justify",
                            }}
                        >
                            <strong>ARADHYA ELECTRICALS</strong> has a vast experience in execution of Turnkey Projects (including civil works) of Power Transmission & Distribution viz. GIS/AIS/SCADA Sub-stations along with associated lines upto 400 kV, Rural Electrification, Railway Over Head Electrification, Feeder Bifurcation/Renovation, High Voltage Distribution System, Pole-mounted sub-stations. The company's clientele includes esteemed organizations like TPDDL (erstwhile NDPL), CSPDCL, PSPCL, UHBVNL, DHBVN, HSIIDC, HVPNL, HPSEBL, HPPTCL, PVVNL, MPMKVVCL, MPPKVVCL, MPWCL, CORE & Northern Railways, CESU, PGCIL, ACB(I)L, ABB, SEIMENS, TRN Energy Pvt Ltd, Ambience etc. The company also provides services which include Energy Audit, Meter Reading, Bill Distribution, AMR, CMRI, Meter Installation, Street lighting, GIS Mapping including the respective AMCs.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
