"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

interface ProjectItem {
    id: string;
    date: string;
    title: string;
    description: string;
    client: string;
    category: string;
    location: string;
}

interface ProjectYear {
    year: number;
    items: ProjectItem[];
}

interface ProjectsData {
    projects: ProjectYear[];
}

export default function ProjectsPage() {
    const [data, setData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        fetch("/data/projects.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

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
                        Prestigious Projects
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
                            Prestigious Projects
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Projects List ── */}
            <section
                style={{
                    padding: "50px 40px 80px",
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
                    {!data && (
                        <div style={{ textAlign: "center", padding: 80, color: COLORS.muted }}>
                            Loading projects...
                        </div>
                    )}

                    {data?.projects.map((yearGroup) => (
                        <div key={yearGroup.year} style={{ marginBottom: 40 }}>
                            {/* Year Heading */}
                            <h2
                                style={{
                                    fontFamily: "'Georgia', serif",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: COLORS.teal,
                                    marginBottom: 6,
                                    paddingBottom: 8,
                                    display: "inline-block",
                                    borderBottom: `3px solid ${COLORS.orange}`,
                                }}
                            >
                                {yearGroup.year}
                            </h2>

                            {/* Bullet List */}
                            <ul
                                style={{
                                    listStyle: "disc",
                                    paddingLeft: 28,
                                    marginTop: 20,
                                }}
                            >
                                {yearGroup.items.map((project) => (
                                    <li
                                        key={project.id}
                                        style={{
                                            fontSize: 14,
                                            lineHeight: 1.8,
                                            color: COLORS.text,
                                            marginBottom: 14,
                                        }}
                                    >
                                        {project.description}
                                        {" by "}
                                        <strong>{project.client}</strong>
                                        {" on "}
                                        {project.date}.
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
