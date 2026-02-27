"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

/* ── inline images for the profile grid ── */
const profileImages = [
    {
        src: "/about-1.jpg",
        alt: "Safety Training Session",
    },
    {
        src: "/about-3.jpg",
        alt: "Safety Awareness Program",
    },
    {
        src: "/railways-hero.jpg",
        alt: "Railway Electrification OHE Work",
    },
];

const wideImage = {
    src: "/about-2.jpg",
    alt: "Team Briefing Session",
};

export default function ProfilePage() {
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
                        Profile
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
                            Profile
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Profile Content ── */}
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
                    {/* ── Image Grid ── */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: 8,
                            marginBottom: 12,
                        }}
                    >
                        {profileImages.map((img) => (
                            <div
                                key={img.alt}
                                style={{
                                    overflow: "hidden",
                                    borderRadius: 4,
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    style={{
                                        width: "100%",
                                        height: 220,
                                        objectFit: "cover",
                                        display: "block",
                                        transition: "transform 0.4s ease, filter 0.4s ease",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform =
                                            "scale(1.05)";
                                        (e.currentTarget as HTMLElement).style.filter =
                                            "brightness(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform =
                                            "scale(1)";
                                        (e.currentTarget as HTMLElement).style.filter =
                                            "brightness(1)";
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Wide Civil Image */}
                    <div
                        style={{
                            overflow: "hidden",
                            borderRadius: 4,
                            marginBottom: 50,
                        }}
                    >
                        <img
                            src={wideImage.src}
                            alt={wideImage.alt}
                            style={{
                                width: "100%",
                                height: 300,
                                objectFit: "cover",
                                display: "block",
                                transition: "transform 0.4s ease, filter 0.4s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform =
                                    "scale(1.03)";
                                (e.currentTarget as HTMLElement).style.filter =
                                    "brightness(1.08)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLElement).style.filter =
                                    "brightness(1)";
                            }}
                        />
                    </div>

                    {/* ── Company Description ── */}
                    <div
                        style={{
                            maxWidth: 1000,
                            margin: "0 auto",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.9,
                                color: COLORS.text,
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            ARADHYA ELECTRICALS & ENTERPRISES is an established ISO 9001:2015
                            certified EPC Company, incorporated in the year 2004, with
                            diversified interests in Energy, Railways and Civil Infrastructure
                            offering comprehensive services from concept to commissioning
                            solutions of Turnkey Projects.
                        </p>

                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.9,
                                color: COLORS.text,
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            Our Core Competencies lies in the field of Power Distribution,
                            Franchise Management and execution of Turnkey Projects in
                            Transmission and Distribution Sector.
                        </p>

                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.9,
                                color: COLORS.text,
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            ARADHYA ELECTRICALS & ENTERPRISES has established an impression in the Indian
                            Railways for Overhead Electrification (OHE) & Civil works. ARADHYA ELECTRICALS
                            provides services for engineering and design, project management,
                            construction supervision, railway electrification and signalling &
                            telecommunication. It is a matter of pride for ARADHYA ELECTRICALS to leverage
                            its expertise in building Railways Infrastructure and contributing our bit to
                            the Nation&apos;s Economic Development and its growth story.
                        </p>

                        {/* ── Key Highlights ── */}
                        <div
                            style={{
                                marginTop: 40,
                                padding: "32px 36px",
                                background: `linear-gradient(135deg, ${COLORS.navy}08, ${COLORS.teal}08)`,
                                borderLeft: `4px solid ${COLORS.teal}`,
                                borderRadius: "0 8px 8px 0",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "'Georgia', serif",
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: COLORS.navy,
                                    marginBottom: 20,
                                    margin: "0 0 20px 0",
                                }}
                            >
                                Key Highlights
                            </h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "14px 40px",
                                }}
                            >
                                {[
                                    "ISO 9001:2015 Certified EPC Company",
                                    "Incorporated in the Year 2004",
                                    "Power Transmission & Distribution",
                                    "Railway Electrification (OHE) Works",
                                    "Civil Infrastructure Projects",
                                    "Franchise Management Services",
                                    "End-to-End Turnkey Project Solutions",
                                    "Engineering, Procurement & Construction",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            fontSize: 14,
                                            color: COLORS.text,
                                            lineHeight: 1.6,
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Core Competencies Section ── */}
                        <div
                            style={{
                                marginTop: 50,
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "'Georgia', serif",
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: COLORS.navy,
                                    marginBottom: 24,
                                    margin: "0 0 24px 0",
                                    paddingBottom: 10,
                                    borderBottom: `3px solid ${COLORS.orange}`,
                                    display: "inline-block",
                                }}
                            >
                                Our Core Competencies
                            </h3>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 24,
                                }}
                            >
                                {[
                                    {
                                        icon: "⚡",
                                        title: "Transmission",
                                        desc: "33 kV to 765 kV Transmission Lines, EHV Substation Construction & Augmentation with turnkey EPC solutions.",
                                    },
                                    {
                                        icon: "🚆",
                                        title: "Railways",
                                        desc: "Overhead Electrification (OHE) works for Indian Railways including 25 kV AC traction systems and SCADA.",
                                    },
                                    {
                                        icon: "🏗️",
                                        title: "Civil Infrastructure",
                                        desc: "Design, Survey, Supply & Construction of residential quarters, warehouses, roads, and office buildings.",
                                    },
                                    {
                                        icon: "🔌",
                                        title: "Distribution",
                                        desc: "HT/LT line construction, substation erection, underground cabling, and rural electrification projects.",
                                    },
                                    {
                                        icon: "📋",
                                        title: "Project Management",
                                        desc: "Comprehensive project management services covering planning, execution, and commissioning of turnkey projects.",
                                    },
                                    {
                                        icon: "🔧",
                                        title: "Engineering & Design",
                                        desc: "In-house engineering capabilities for design, detailed engineering, and quality assurance across all domains.",
                                    },
                                ].map((comp) => (
                                    <div
                                        key={comp.title}
                                        style={{
                                            padding: "28px 24px",
                                            background: "#fff",
                                            borderRadius: 10,
                                            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                                            border: "1px solid #f0f0f0",
                                            transition:
                                                "transform 0.3s ease, box-shadow 0.3s ease",
                                            cursor: "default",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.transform =
                                                "translateY(-4px)";
                                            (e.currentTarget as HTMLElement).style.boxShadow =
                                                "0 8px 30px rgba(0,0,0,0.12)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.transform =
                                                "translateY(0)";
                                            (e.currentTarget as HTMLElement).style.boxShadow =
                                                "0 2px 16px rgba(0,0,0,0.06)";
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 52,
                                                height: 52,
                                                background: `linear-gradient(135deg, ${COLORS.teal}15, ${COLORS.teal}25)`,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 24,
                                                marginBottom: 16,
                                            }}
                                        >
                                            {comp.icon}
                                        </div>
                                        <h4
                                            style={{
                                                fontFamily: "'Georgia', serif",
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: COLORS.teal,
                                                marginBottom: 8,
                                                margin: "0 0 8px 0",
                                            }}
                                        >
                                            {comp.title}
                                        </h4>
                                        <p
                                            style={{
                                                fontSize: 13.5,
                                                lineHeight: 1.7,
                                                color: COLORS.muted,
                                                margin: 0,
                                            }}
                                        >
                                            {comp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
