"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function WhyAEEPage() {
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
                        Why AEE
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
                        <Link
                            href="#"
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
                            Careers
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            Why AEE
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Page Content ── */}
            <section
                style={{
                    padding: "60px 40px 80px",
                    background: "#fff",
                    minHeight: "60vh",
                }}
            >
                <div
                    style={{
                        maxWidth: 1000,
                        margin: "0 auto",
                    }}
                >
                    {/* Intro paragraph */}
                    <p
                        style={{
                            fontSize: 15.5,
                            lineHeight: 1.85,
                            color: "#555",
                            marginBottom: 36,
                            textAlign: "justify",
                        }}
                    >
                        At <strong>ARADHYA ELECTRICALS &amp; ENTERPRISES</strong>, we
                        believe that our people are the most valuable assets of our
                        Company. We depend on them to realise the vision and mission of our
                        organisation and drive it forward. We also strive to provide a
                        stimulating working environment where each individual contributes to
                        the maximum of his/her potential, to the growth of the Company, and
                        grows along with it. Individuals with the zeal to perform and grow
                        along with the organisation are always welcomed.
                    </p>

                    {/* Our Culture */}
                    <h3
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#222",
                            marginBottom: 6,
                            marginTop: 0,
                        }}
                    >
                        Our Culture
                    </h3>
                    <h4
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#333",
                            marginLeft: 16,
                            marginBottom: 10,
                            marginTop: 0,
                        }}
                    >
                        We are One Big Family
                    </h4>
                    <ul
                        style={{
                            marginLeft: 36,
                            marginBottom: 28,
                            paddingLeft: 0,
                            lineHeight: 1.9,
                            color: "#555",
                            fontSize: 15,
                        }}
                    >
                        <li>Everyone is a part of the <strong>ARADHYA EE</strong> family</li>
                        <li>We share all the happiness and sorrows</li>
                        <li>We work together, we care for each other</li>
                    </ul>

                    {/* Professional */}
                    <h3
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#222",
                            marginBottom: 10,
                            marginTop: 0,
                        }}
                    >
                        Professional
                    </h3>
                    <ul
                        style={{
                            marginLeft: 36,
                            marginBottom: 28,
                            paddingLeft: 0,
                            lineHeight: 1.9,
                            color: "#555",
                            fontSize: 15,
                        }}
                    >
                        <li>Customer always comes first</li>
                        <li>Quality in everything we do</li>
                        <li>We follow timelines</li>
                    </ul>

                    {/* Ethical */}
                    <h3
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#222",
                            marginBottom: 10,
                            marginTop: 0,
                        }}
                    >
                        Ethical
                    </h3>
                    <ul
                        style={{
                            marginLeft: 36,
                            marginBottom: 36,
                            paddingLeft: 0,
                            lineHeight: 1.9,
                            color: "#555",
                            fontSize: 15,
                        }}
                    >
                        <li>Honesty and truthfulness form the integral part of daily working and living</li>
                    </ul>

                    {/* Training Programs */}
                    <h3
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#222",
                            marginBottom: 12,
                            marginTop: 0,
                        }}
                    >
                        Training Programs
                    </h3>
                    <p
                        style={{
                            fontSize: 15.5,
                            lineHeight: 1.85,
                            color: "#555",
                            marginBottom: 18,
                            textAlign: "justify",
                        }}
                    >
                        There has been significant growth in Industrial Training Institutes
                        over the last decade with an increasing number of ITI pass-outs year
                        by year. However, these ITIs are unable to find jobs for themselves
                        and are doing odd jobs to sustain themselves. On the other side,
                        shortage of appropriately skilled labour across industries is
                        emerging as a significant and complex challenge to India&apos;s
                        growth.
                    </p>
                    <p
                        style={{
                            fontSize: 15.5,
                            lineHeight: 1.85,
                            color: "#555",
                            marginBottom: 18,
                            textAlign: "justify",
                        }}
                    >
                        In order to mitigate this demand-supply gap scenario of
                        employability, <strong>ARADHYA EE</strong> has developed an
                        innovative training programme wherein ITI holders with basic
                        knowledge &amp; lesser employability skills are recruited as helpers
                        and trained in a phased manner to become fully contributing members
                        of our project teams, as per their capability and liking.
                    </p>
                    <p
                        style={{
                            fontSize: 15.5,
                            lineHeight: 1.85,
                            color: "#555",
                            marginBottom: 0,
                            textAlign: "justify",
                        }}
                    >
                        Through this training program, <strong>ARADHYA EE</strong> has been
                        able to develop a team of Site In-charges &amp; Site Supervisors who
                        are an asset to the organisation. This initiative reflects our
                        commitment to skill development and nation-building, while
                        simultaneously strengthening the core talent pipeline that powers
                        our project execution capabilities.
                    </p>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
