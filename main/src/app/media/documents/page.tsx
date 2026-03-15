"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

interface Document {
    id: number;
    title: string;
    path: string;
    uploadDate: string;
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/documents.json")
            .then((r) => r.json())
            .then((data: Document[]) => {
                setDocuments(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <main style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
                <Navbar />
                <TopBar />
                <section style={{ padding: "100px 40px", textAlign: "center", color: COLORS.muted }}>
                    Loading documents…
                </section>
                <Footer />
                <ScrollToTop />
            </main>
        );
    }

    return (
        <main style={{ fontFamily: "'Georgia','Times New Roman',serif", fontSize: 15, color: "#333", margin: 0 }}>
            <Navbar />
            <TopBar />

            {/* ── Banner ── */}
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
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "'Georgia',serif",
                            fontSize: 38,
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 0 6px",
                            letterSpacing: 0.5,
                        }}
                    >
                        Documents
                    </h1>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                        Access important documents and resources
                    </p>
                </div>
            </section>

            {/* ── Documents List ── */}
            <section style={{ padding: "60px 40px 90px", background: "#fff" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    {documents.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {documents.map((doc, idx) => (
                                <a
                                    key={doc.id}
                                    href={doc.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                        padding: "20px 24px",
                                        border: "1.5px solid #e5e9ec",
                                        borderRadius: 10,
                                        background: "#fafbfc",
                                        textDecoration: "none",
                                        color: "inherit",
                                        transition: "all 0.3s",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        const elem = e.currentTarget as HTMLElement;
                                        elem.style.background = "#f0f5f8";
                                        elem.style.borderColor = COLORS.teal;
                                        elem.style.transform = "translateX(4px)";
                                        elem.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const elem = e.currentTarget as HTMLElement;
                                        elem.style.background = "#fafbfc";
                                        elem.style.borderColor = "#e5e9ec";
                                        elem.style.transform = "translateX(0)";
                                        elem.style.boxShadow = "none";
                                    }}
                                >
                                    {/* Index */}
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: COLORS.teal,
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {idx + 1}
                                    </div>

                                    {/* Document Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3
                                            style={{
                                                margin: "0 0 4px",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: COLORS.navy,
                                                fontFamily: "'Georgia',serif",
                                            }}
                                        >
                                            {doc.title}
                                        </h3>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: 13,
                                                color: "#999",
                                                fontFamily: "'Arial',sans-serif",
                                            }}
                                        >
                                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Download Icon */}
                                    <div
                                        style={{
                                            fontSize: 24,
                                            flexShrink: 0,
                                            color: COLORS.teal,
                                        }}
                                    >
                                        📄
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "60px 20px",
                                color: COLORS.muted,
                                fontFamily: "'Arial',sans-serif",
                            }}
                        >
                            <p style={{ fontSize: 18, margin: 0 }}>No documents available.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
