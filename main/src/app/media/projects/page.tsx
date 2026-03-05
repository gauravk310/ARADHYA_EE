"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

interface WorkOrder {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    categoryColor: string;
    icon: string;
    pdfFile: string;
    description: string;
}

const workOrders: WorkOrder[] = [
    {
        id: "wo-1",
        title: "25 kV AC Electric Traction – SP/SSP Substation",
        subtitle: "Work Order No. 2400107302",
        category: "Railways",
        categoryColor: "#1a6faf",
        icon: "🚆",
        pdfFile: "/Projects/2400107302 - Aradhya - SP -SSP.pdf",
        description:
            "Supply, Installation, Testing & Commissioning of SP/SSP substation equipment for 25 kV AC traction system as part of Indian Railways electrification programme.",
    },
    {
        id: "wo-2",
        title: "Electrical Erection Work Order – Contract I",
        subtitle: "Aradhya Electricals & Enterprises",
        category: "Transmission",
        categoryColor: "#0d6e7a",
        icon: "⚡",
        pdfFile: "/Projects/Aradhya Electrical WO - 1.pdf",
        description:
            "Erection, Testing and Commissioning of high-voltage electrical infrastructure under a dedicated turnkey contract awarded to Aradhya Electricals & Enterprises.",
    },
    {
        id: "wo-3",
        title: "Electrical Erection & Commissioning Work Order",
        subtitle: "Aradhya Electricals & Enterprises",
        category: "Transmission",
        categoryColor: "#0d6e7a",
        icon: "🔌",
        pdfFile: "/Projects/Erection Work Order.pdf",
        description:
            "Comprehensive erection and commissioning work order covering supply, installation, testing and handing-over of electrical systems for power infrastructure projects.",
    },
    {
        id: "wo-4",
        title: "Railway OHE Electrification – Work Order WOA25000050",
        subtitle: "Order Ref: LELE24M711WOA25000050",
        category: "Railways",
        categoryColor: "#1a6faf",
        icon: "🚈",
        pdfFile: "/Projects/LELE24M711WOA25000050 (1).pdf",
        description:
            "Overhead Electrification (OHE) work order for construction and commissioning of traction infrastructure, forming part of the national railway electrification drive.",
    },
    {
        id: "wo-5",
        title: "Railway OHE Electrification – Work Order WOD25000044",
        subtitle: "Order Ref: LELE24M711WOD25000044",
        category: "Railways",
        categoryColor: "#1a6faf",
        icon: "🛤️",
        pdfFile: "/Projects/LELE24M711WOD25000044.pdf",
        description:
            "Traction Overhead Equipment installation, testing and commissioning contract covering designated sections under the Indian Railways network electrification programme.",
    },
    {
        id: "wo-6",
        title: "Civil Construction Work Order – Contract II",
        subtitle: "Aradhya Electricals & Enterprises",
        category: "Civil",
        categoryColor: "#7a5200",
        icon: "🏗️",
        pdfFile: "/Projects/civil Work Order 2.pdf",
        description:
            "Civil works contract for construction of quarters, warehouses, roads and allied infrastructure awarded under a competitive bidding process for public-sector projects.",
    },
];

const categoryBg: Record<string, string> = {
    Railways: "#e8f0fb",
    Transmission: "#e0f2f1",
    Civil: "#fdf3e0",
};

export default function MediaProjectsPage() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

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
                        Work Order Projects
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
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Media</span>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            Projects
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Intro strip ── */}
            <div
                style={{
                    background: "#f7f9fa",
                    borderBottom: "1px solid #e5e9ec",
                    padding: "18px 40px",
                }}
            >
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 14,
                            color: COLORS.muted,
                            lineHeight: 1.7,
                        }}
                    >
                        Below are the official Work Order documents awarded to Aradhya
                        Electricals & Enterprises. Click any card to view or download the
                        corresponding PDF.
                    </p>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <section
                style={{
                    padding: "56px 40px 90px",
                    background: "#fff",
                    minHeight: "60vh",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                        gap: 32,
                    }}
                >
                    {workOrders.map((wo) => {
                        const isHovered = hoveredId === wo.id;
                        return (
                            <a
                                key={wo.id}
                                href={wo.pdfFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open PDF: ${wo.title}`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    background: "#fff",
                                    borderRadius: 10,
                                    boxShadow: isHovered
                                        ? "0 12px 36px rgba(13,110,122,0.18)"
                                        : "0 2px 14px rgba(0,0,0,0.08)",
                                    transform: isHovered ? "translateY(-6px)" : "none",
                                    transition: "transform 0.25s, box-shadow 0.25s",
                                    overflow: "hidden",
                                    textDecoration: "none",
                                    color: "inherit",
                                    cursor: "pointer",
                                    border: isHovered
                                        ? `1.5px solid ${COLORS.teal}`
                                        : "1.5px solid transparent",
                                }}
                                onMouseEnter={() => setHoveredId(wo.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Top colour band */}
                                <div
                                    style={{
                                        background: categoryBg[wo.category] || "#f0f4f5",
                                        padding: "22px 24px 16px",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 14,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 34,
                                            lineHeight: 1,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {wo.icon}
                                    </span>
                                    <div>
                                        {/* Category badge */}
                                        <span
                                            style={{
                                                display: "inline-block",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: 0.8,
                                                textTransform: "uppercase",
                                                color: wo.categoryColor,
                                                background: "#fff",
                                                borderRadius: 20,
                                                padding: "3px 10px",
                                                marginBottom: 8,
                                                fontFamily: "'Arial', sans-serif",
                                            }}
                                        >
                                            {wo.category}
                                        </span>
                                        <h2
                                            style={{
                                                fontFamily: "'Georgia', serif",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: COLORS.navy,
                                                margin: 0,
                                                lineHeight: 1.45,
                                            }}
                                        >
                                            {wo.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Body */}
                                <div
                                    style={{
                                        padding: "18px 24px 20px",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: 13.5,
                                            lineHeight: 1.75,
                                            color: COLORS.text,
                                            margin: "0 0 18px",
                                        }}
                                    >
                                        {wo.description}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderTop: "1px solid #f0f0f0",
                                            paddingTop: 14,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: COLORS.muted,
                                                fontFamily: "'Arial', sans-serif",
                                            }}
                                        >
                                            {wo.subtitle}
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 5,
                                                fontSize: 12.5,
                                                fontWeight: 600,
                                                color: isHovered ? COLORS.orange : COLORS.teal,
                                                fontFamily: "'Arial', sans-serif",
                                                transition: "color 0.2s",
                                            }}
                                        >
                                            📄 View PDF
                                        </span>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
