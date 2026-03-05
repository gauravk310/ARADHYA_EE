"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

export default function ContactUsPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

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
                        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 16 }}>
                            Kuranwadi, Solapur,<br />
                            Maharashtra – 413216
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2, color: "#555", fontSize: 15 }}>
                            <li>
                                <span style={{ color: COLORS.teal, marginRight: 8 }}>✉</span>
                                <a href="mailto:hr@aradhyaee.com" style={{ color: COLORS.teal, textDecoration: "none" }}>
                                    hr@aradhyaee.com
                                </a>
                            </li>
                            <li>
                                <span style={{ color: COLORS.teal, marginRight: 8 }}>✉</span>
                                <a href="mailto:info@aradhyaee.com" style={{ color: COLORS.teal, textDecoration: "none" }}>
                                    info@aradhyaee.com
                                </a>
                            </li>
                            <li>
                                <span style={{ color: COLORS.teal, marginRight: 8 }}>📞</span>
                                <a href="tel:+919921446398" style={{ color: "#555", textDecoration: "none" }}>
                                    +91 99214 46398
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
                        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 16 }}>
                            Kuranwadi, Solapur,<br />
                            Maharashtra – 413216
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2, color: "#555", fontSize: 15 }}>
                            <li>
                                <span style={{ color: COLORS.orange, marginRight: 8 }}>✉</span>
                                <a href="mailto:corporate@aradhyaee.com" style={{ color: COLORS.teal, textDecoration: "none" }}>
                                    corporate@aradhyaee.com
                                </a>
                            </li>
                            <li>
                                <span style={{ color: COLORS.orange, marginRight: 8 }}>📞</span>
                                <a href="tel:+919921446398" style={{ color: "#555", textDecoration: "none" }}>
                                    +91 99214 46398
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Contact Form + Map ── */}
            <section style={{ padding: "50px 40px 70px", background: "#fff" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: 48,
                        alignItems: "start",
                    }}
                >
                    {/* Contact Form */}
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
                            Send Us a Message
                        </h2>

                        {submitted ? (
                            <div
                                style={{
                                    background: "#e6f4f1",
                                    border: `1px solid ${COLORS.teal}`,
                                    borderRadius: 6,
                                    padding: "20px 24px",
                                    color: COLORS.darkTeal,
                                    fontSize: 15,
                                    lineHeight: 1.7,
                                }}
                            >
                                ✅ Thank you for reaching out! We will get back to you shortly.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    { label: "Full Name *", name: "name", type: "text", required: true },
                                    { label: "Email Address *", name: "email", type: "email", required: true },
                                    { label: "Phone Number", name: "phone", type: "tel", required: false },
                                    { label: "Subject *", name: "subject", type: "text", required: true },
                                ].map((field) => (
                                    <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label
                                            htmlFor={field.name}
                                            style={{ fontSize: 13, fontWeight: 600, color: "#444", fontFamily: "Arial, sans-serif" }}
                                        >
                                            {field.label}
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            required={field.required}
                                            value={(form as Record<string, string>)[field.name]}
                                            onChange={handleChange}
                                            style={{
                                                padding: "10px 14px",
                                                border: "1px solid #ccc",
                                                borderRadius: 4,
                                                fontSize: 14,
                                                fontFamily: "Arial, sans-serif",
                                                outline: "none",
                                                transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.teal; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "#ccc"; }}
                                        />
                                    </div>
                                ))}

                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <label
                                        htmlFor="message"
                                        style={{ fontSize: 13, fontWeight: 600, color: "#444", fontFamily: "Arial, sans-serif" }}
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        style={{
                                            padding: "10px 14px",
                                            border: "1px solid #ccc",
                                            borderRadius: 4,
                                            fontSize: 14,
                                            fontFamily: "Arial, sans-serif",
                                            outline: "none",
                                            resize: "vertical",
                                            transition: "border-color 0.2s",
                                        }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.teal; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = "#ccc"; }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        alignSelf: "flex-start",
                                        background: COLORS.teal,
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 4,
                                        padding: "12px 32px",
                                        fontSize: 14,
                                        fontWeight: 700,
                                        fontFamily: "Arial, sans-serif",
                                        cursor: "pointer",
                                        letterSpacing: 0.5,
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = COLORS.darkTeal; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = COLORS.teal; }}
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

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
