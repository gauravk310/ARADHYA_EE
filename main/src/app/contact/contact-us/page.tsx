"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS, CONTACT_INFO } from "@/components/constants";

export default function ContactUsPage() {

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
                        Contact Us
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
                            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Contact Us</span>
                    </nav>
                </div>
            </section>

            {/* ── Office Info ── */}
            <section style={{ padding: "60px 40px 0", background: "#fff" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 40,
                    }}
                >
                    {/* Regd. Office */}
                    <div>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 22,
                                fontWeight: 700,
                                color: "#222",
                                marginBottom: 14,
                                marginTop: 0,
                                paddingBottom: 10,
                                borderBottom: `2px solid ${COLORS.teal}`,
                            }}
                        >
                            Regd. Office
                        </h2>
                        <a
                            href={CONTACT_INFO.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                fontSize: 15,
                                lineHeight: 1.8,
                                color: "#555",
                                marginBottom: 16,
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = COLORS.teal;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#555";
                            }}
                        >
                            {CONTACT_INFO.addressFull.split(', Solapur')[0]},
                            <br />
                            Solapur, Maharashtra – 413214
                        </a>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                lineHeight: 2,
                                color: "#555",
                                fontSize: 15,
                            }}
                        >
                            <li>
                                <span style={{ color: COLORS.teal, marginRight: 8 }}>✉</span>
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    style={{ color: COLORS.teal, textDecoration: "none" }}
                                >
                                    {CONTACT_INFO.email}
                                </a>
                            </li>
                            <li>
                                <span style={{ color: COLORS.teal, marginRight: 8 }}>📞</span>
                                <a href={CONTACT_INFO.phoneHref} style={{ color: "#555", textDecoration: "none" }}>
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Corporate Office */}
                    <div>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 22,
                                fontWeight: 700,
                                color: "#222",
                                marginBottom: 14,
                                marginTop: 0,
                                paddingBottom: 10,
                                borderBottom: `2px solid ${COLORS.orange}`,
                            }}
                        >
                            Corporate Office
                        </h2>
                        <a
                            href={CONTACT_INFO.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                fontSize: 15,
                                lineHeight: 1.8,
                                color: "#555",
                                marginBottom: 16,
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = COLORS.orange;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#555";
                            }}
                        >
                            {CONTACT_INFO.addressFull.split(', Solapur')[0]},
                            <br />
                            Solapur, Maharashtra – 413214
                        </a>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                lineHeight: 2,
                                color: "#555",
                                fontSize: 15,
                            }}
                        >
                            <li>
                                <span style={{ color: COLORS.orange, marginRight: 8 }}>✉</span>
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    style={{ color: COLORS.teal, textDecoration: "none" }}
                                >
                                    {CONTACT_INFO.email}
                                </a>
                            </li>
                            <li>
                                <span style={{ color: COLORS.orange, marginRight: 8 }}>📞</span>
                                <a href={CONTACT_INFO.phoneHref} style={{ color: "#555", textDecoration: "none" }}>
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Map ── */}
            <section style={{ padding: "50px 40px 70px", background: "#fff" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                    }}
                >

                    {/* Google Map */}
                    <div>
                        <h2
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#222",
                                marginBottom: 22,
                                marginTop: 0,
                            }}
                        >
                            Find Us on Map
                        </h2>
                        <div
                            style={{
                                borderRadius: 6,
                                overflow: "hidden",
                                border: "1px solid #ddd",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                        >
                            <iframe
                                title="ARADHYA EE Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46281.654656476676!2d75.39412649564463!3d17.863505725220183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc43f507a4e66d7%3A0x59646b6958008003!2sKuranwadi%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1772738777074!5m2!1sen!2sin"
                                width="100%"
                                height="380"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
