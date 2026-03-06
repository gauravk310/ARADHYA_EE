"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function MessageFromMDPage() {
    return (
        <main
            style={{
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                backgroundColor: "#fff",
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
                        Message from MD
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
                            Message from MD
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Content Section ── */}
            <section
                style={{
                    padding: "80px 40px",
                    background: "#fff",
                    lineHeight: 1.8,
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                    }}
                >
                    {/* Centered Headline */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: 60,
                            fontFamily: "'Georgia', serif",
                            fontStyle: "italic",
                            color: "#444",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 24,
                                fontWeight: 700,
                                margin: "0 0 10px 0",
                                color: "#333",
                            }}
                        >
                            &apos;ARADHYA ELECTRICALS &amp; ENTERPRISES
                        </h2>
                        <div style={{ fontSize: 20, fontWeight: 600, margin: "10px 0" }}>Powering</div>
                        <div style={{ fontSize: 22, fontWeight: 700, margin: "10px 0" }}>
                            India&apos;s Growth Journey
                        </div>
                        <div style={{ fontSize: 18, margin: "10px 0" }}>By</div>
                        <div style={{ fontSize: 22, fontWeight: 700, margin: "10px 0" }}>
                            Constructing Infrastructure of National Importance&apos;
                        </div>
                    </div>

                    {/* Main Message */}
                    <div style={{ color: "#555", fontSize: "1.05rem" }}>
                        <p style={{ marginBottom: 30 }}>
                            Dear Stakeholders,<br />
                            Warm Greetings!
                        </p>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            As we mark over two decades of our journey, since commencing operations in 2004, ARADHYA ELECTRICALS &amp; ENTERPRISES (ARADHYA EE) has grown from strength to strength. From our inception as an Engineering, Procurement &amp; Construction (EPC) company to our evolution into a trusted, pan-India organization, we have consistently demonstrated our commitment to excellence, innovation, and nation-building.
                        </p>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            Today, ARADHYA EE stands as an established ISO 9001:2015 certified EPC Company and a trusted partner delivering comprehensive infrastructure solutions across the Power Transmission &amp; Distribution, Railway Electrification, and Civil Infrastructure sectors. Our growth story is not just about expansion; it is about purpose — playing our part in building the infrastructure that drives and powers India&apos;s growth journey.
                        </p>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            We take immense pride in serving prestigious organizations such as Power Grid Corporation of India Ltd (POWERGRID), Indian Railways, Larsen &amp; Toubro Limited, Delhi Metro Rail Corporation (DMRC), TP Central Odisha Distribution Ltd (TPCODL), and many more. These partnerships reflect the trust our clients place in our capabilities and our unwavering commitment to delivering quality on every project.
                        </p>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            At ARADHYA EE, we continue to evolve with the times, leveraging technology, investing in capability-building, and embracing smart, future-ready solutions across all our business verticals.
                        </p>

                        <p style={{ marginBottom: 25 }}>
                            As we look ahead, we do so with renewed focus, enthusiasm, energy, ambition and a clear vision as follows:
                        </p>

                        <ul style={{ paddingLeft: 20, marginBottom: 30, listStyleType: "none" }}>
                            <li style={{ marginBottom: 15, paddingLeft: 20, position: "relative" }}>
                                <span style={{ position: "absolute", left: 0, top: 10, width: 6, height: 6, backgroundColor: "#333", borderRadius: "50%" }}></span>
                                To remain the preferred EPC partner for both public and private sector organisations by delivering excellence in service and consistently exceeding our clients&apos; expectations across Transmission, Railways, Distribution and Civil sectors.
                            </li>
                            <li style={{ marginBottom: 15, paddingLeft: 20, position: "relative" }}>
                                <span style={{ position: "absolute", left: 0, top: 10, width: 6, height: 6, backgroundColor: "#333", borderRadius: "50%" }}></span>
                                To lead with innovation by adopting digital tools, data-driven project management practices, and modern engineering techniques in all our operations.
                            </li>
                            <li style={{ marginBottom: 15, paddingLeft: 20, position: "relative" }}>
                                <span style={{ position: "absolute", left: 0, top: 10, width: 6, height: 6, backgroundColor: "#333", borderRadius: "50%" }}></span>
                                To focus on strengthening core competencies, diversifying strategically, and exploring upstream and downstream opportunities across all EPC-related sectors including power transmission, railway electrification, distribution networks, and civil infrastructure.
                            </li>
                            <li style={{ marginBottom: 15, paddingLeft: 20, position: "relative" }}>
                                <span style={{ position: "absolute", left: 0, top: 10, width: 6, height: 6, backgroundColor: "#333", borderRadius: "50%" }}></span>
                                To build responsibly, aligning with Environmental, Social and Governance (ESG) frameworks and embedding sustainability in every project we undertake.
                            </li>
                        </ul>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            To sustain and strengthen our position, we remain committed to delivering high-quality services, staying responsive to client needs, and drawing valuable lessons from both the challenges and achievements of the past two decades.
                        </p>

                        <p style={{ marginBottom: 25, textAlign: "justify" }}>
                            I extend my sincere gratitude to all our team members, partners, clients, and stakeholders for their unwavering support which has been the foundation of our journey so far, and will continue to be the driving force as we aim for new heights in the years ahead.
                        </p>

                        <p style={{ marginBottom: 40, textAlign: "justify" }}>
                            Together, let&apos;s continue building not just infrastructure, but the future of our nation.
                        </p>

                        {/* Signature */}
                        <div style={{ marginTop: 50 }}>
                            <p style={{ margin: 0, fontWeight: 500 }}>With Warm Regards,</p>
                            <p style={{ margin: "5px 0", fontWeight: 700, fontSize: 18, color: "#333" }}>
                                Balaji Ankush Salgude
                            </p>
                            <p style={{ margin: 0, fontWeight: 600 }}>Managing Director</p>
                            <p style={{ margin: 0 }}>ARADHYA ELECTRICALS &amp; ENTERPRISES</p>
                            <p style={{ margin: "15px 0 0 0", fontWeight: 700, color: COLORS.navy }}>Jai Hind</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
