"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

const logos = [
    { name: "BSES", src: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BSES_Limited_logo.svg/1200px-BSES_Limited_logo.svg.png" },
    { name: "Indian Railways", src: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IR_Logo.svg/1200px-IR_Logo.svg.png" },
    { name: "Northern Railway", src: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Northern_Railway_logo.png/220px-Northern_Railway_logo.png" },
    { name: "DHBVN", src: "/images/references/collage.png" }, // Using the collage as an example
    { name: "HVPNL", src: "https://hvpn.org.in/static/images/hvpn_logo.png" },
    { name: "PHILIPS", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Philips_logo_new.svg/1200px-Philips_logo_new.svg.png" },
    { name: "PSPCL", src: "https://pspcl.in/wp-content/uploads/2021/05/pspcl-logo.png" },
    { name: "TATA Power", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tata_Power_logo.svg/1200px-Tata_Power_logo.svg.png" },
    { name: "POWERGRID", src: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Power_Grid_Corporation_of_India_logo.svg/1200px-Power_Grid_Corporation_of_India_logo.svg.png" },
    { name: "Adani", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adani_Group_logo.svg/1200px-Adani_Group_logo.svg.png" },
    { name: "Reliance Energy", src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Reliance_Energy_logo.svg/1200px-Reliance_Energy_logo.svg.png" },
    { name: "STERLITE", src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Sterlite_Technologies_logo.svg/1200px-Sterlite_Technologies_logo.svg.png" },
];

export default function ReferencePage() {
    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                background: "#f9fbfd",
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
                        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 50%, ${COLORS.teal} 100%)`,
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
                        Reference
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
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Reference</span>
                    </nav>
                </div>
            </section>

            {/* ── References Grid ── */}
            <section
                style={{
                    padding: "100px 40px",
                    background: "linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                    }}
                >
                    <div style={{
                        textAlign: 'center',
                        marginBottom: 80
                    }} className="animate-fadeIn">
                        <h2 style={{
                            fontSize: 36,
                            fontWeight: 700,
                            color: COLORS.navy,
                            marginBottom: 20,
                            fontFamily: "'Georgia', serif",
                        }}>Our Prestigious Clients</h2>
                        <div style={{
                            width: 80,
                            height: 4,
                            background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.teal})`,
                            margin: '0 auto',
                            borderRadius: 10
                        }} />
                        <p style={{ color: COLORS.muted, marginTop: 24, fontSize: 16 }}>
                            We take pride in our collaborations with government and private sector giants.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 40,
                        }}
                    >
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className="animate-fadeInUp"
                                style={{
                                    background: "#fff",
                                    border: "1px solid rgba(0,0,0,0.05)",
                                    borderRadius: 20,
                                    padding: 40,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 220,
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    animationDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = "translateY(-12px) scale(1.02)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 25px 50px rgba(0,0,0,0.1)";
                                    (e.currentTarget as HTMLElement).style.borderColor = COLORS.orange;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.05)";
                                }}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        transition: 'all 0.4s ease'
                                    }}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).parentElement!.innerHTML = `
                                            <div style="font-weight: 700; color: ${COLORS.navy}; font-size: 22px; text-align: center; font-family: 'Georgia', serif;">
                                                ${logo.name}
                                            </div>
                                        `;
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 15,
                                    right: 15,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: COLORS.teal,
                                    opacity: 0.3
                                }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
