"use client";

import React, { useState, useEffect } from "react";
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

interface MediaProjectsData {
    projects: WorkOrder[];
}

const CATEGORY_COLORS: Record<string, string> = {
    Railways: "#1a6faf",
    Transmission: "#0d6e7a",
    Civil: "#7a5200",
    Distribution: "#5a3d8c",
};

const CATEGORY_BG: Record<string, string> = {
    Railways: "#e8f0fb",
    Transmission: "#e0f2f1",
    Civil: "#fdf3e0",
    Distribution: "#f3eeff",
};

export default function MediaProjectsPage() {
    const [data, setData] = useState<MediaProjectsData | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/media-projects.json")
            .then((r) => r.json())
            .then((j) => {
                setData(j);
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
                    Loading projects…
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <div>
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
                            Media & Projects
                        </h1>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                            View our completed work orders and project documentation
                        </p>
                    </div>

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
                            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Projects</span>
                    </nav>
                </div>
            </section>

            {/* ── Projects Grid ── */}
            <section style={{ padding: "60px 40px 90px", background: "#fff" }}>
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                        gap: 28,
                    }}
                >
                    {data?.projects.map((project) => {
                        const isHovered = hoveredId === project.id;
                        return (
                            <a
                                key={project.id}
                                href={project.pdfFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "block",
                                    background: CATEGORY_BG[project.category] || "#f9f9f9",
                                    border: `2px solid ${project.categoryColor || "#ddd"}`,
                                    borderRadius: 12,
                                    padding: 24,
                                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                                    boxShadow: isHovered
                                        ? `0 16px 48px rgba(${parseInt(project.categoryColor.slice(1, 3), 16)}, ${parseInt(project.categoryColor.slice(3, 5), 16)}, ${parseInt(project.categoryColor.slice(5, 7), 16)}, 0.25)`
                                        : "0 4px 12px rgba(0,0,0,0.08)",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    style={{
                                        fontSize: 42,
                                        marginBottom: 12,
                                        transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
                                        transition: "transform 0.3s",
                                    }}
                                >
                                    {project.icon}
                                </div>

                                {/* Category Badge */}
                                <span
                                    style={{
                                        display: "inline-block",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: 0.8,
                                        textTransform: "uppercase",
                                        background: project.categoryColor,
                                        color: "#fff",
                                        borderRadius: 20,
                                        padding: "4px 12px",
                                        marginBottom: 12,
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3
                                    style={{
                                        margin: "0 0 8px",
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontFamily: "'Georgia',serif",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {project.title}
                                </h3>

                                {/* Subtitle */}
                                {project.subtitle && (
                                    <p
                                        style={{
                                            margin: "0 0 12px",
                                            fontSize: 13,
                                            color: "#666",
                                            fontFamily: "'Arial',sans-serif",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {project.subtitle}
                                    </p>
                                )}

                                {/* Description */}
                                <p
                                    style={{
                                        margin: "12px 0",
                                        fontSize: 14,
                                        color: "#555",
                                        lineHeight: 1.5,
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    {project.description}
                                </p>

                                {/* Download Link */}
                                <div
                                    style={{
                                        marginTop: 16,
                                        paddingTop: 16,
                                        borderTop: `1px solid ${project.categoryColor}33`,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: project.categoryColor,
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    <span>📄</span>
                                    View PDF {isHovered && "→"}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {!data?.projects || data.projects.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            color: COLORS.muted,
                            fontFamily: "'Arial',sans-serif",
                        }}
                    >
                        <p style={{ fontSize: 18, margin: 0 }}>No projects available yet.</p>
                    </div>
                )}
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
