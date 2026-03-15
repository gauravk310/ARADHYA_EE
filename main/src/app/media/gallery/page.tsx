"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";

// ── Types ────────────────────────────────────────────────────────────────────
interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    caption: string;
    category: string;
}

const categoryColor: Record<string, string> = {
    Railways: "#1a6faf",
    Substation: "#0d6e7a",
    "Site Team": "#7a4e00",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
    // Gallery state - display only
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    // ── Load gallery data ──────────────────────────────────────────────────────
    useEffect(() => {
        fetch("/data/gallery.json")
            .then((r) => r.json())
            .then((data: GalleryImage[]) => {
                setImages(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const dynamicCategories = ["All", ...Array.from(new Set(images.map(img => img.category)))];

    const filtered =
        activeFilter === "All"
            ? images
            : images.filter((img) => img.category === activeFilter);

    // ── Lightbox keyboard nav ──────────────────────────────────────────────────
    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (lightboxIdx === null) return;
            if (e.key === "Escape") setLightboxIdx(null);
            if (e.key === "ArrowRight")
                setLightboxIdx((i) =>
                    i !== null ? (i + 1) % filtered.length : null
                );
            if (e.key === "ArrowLeft")
                setLightboxIdx((i) =>
                    i !== null ? (i - 1 + filtered.length) % filtered.length : null
                );
        },
        [lightboxIdx, filtered.length]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    useEffect(() => {
        document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxIdx]);

    const activeLightbox =
        lightboxIdx !== null ? filtered[lightboxIdx] : null;

    // ── Render ────────────────────────────────────────────────────────────────
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
                            Gallery
                        </h1>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                            Snapshots from our project sites and field operations
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
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Media</span>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Gallery</span>
                    </nav>
                </div>
            </section>

            {/* ── Filter Tabs ── */}
            <div
                style={{
                    background: "#f7f9fa",
                    borderBottom: "1px solid #e5e9ec",
                    padding: "0 40px",
                    display: "flex",
                    alignItems: "center",
                    overflowX: "auto",
                }}
            >
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", width: "100%" }}>
                    {/* Category tabs */}
                    {dynamicCategories.map((cat) => {
                        const isActive = activeFilter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    borderBottom: isActive
                                        ? `3px solid ${COLORS.orange}`
                                        : "3px solid transparent",
                                    padding: "16px 20px",
                                    fontSize: 13.5,
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? COLORS.navy : COLORS.muted,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "color 0.2s, border-color 0.2s",
                                    fontFamily: "'Arial',sans-serif",
                                    letterSpacing: 0.3,
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive)
                                        (e.currentTarget as HTMLElement).style.color = COLORS.navy;
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive)
                                        (e.currentTarget as HTMLElement).style.color = COLORS.muted;
                                }}
                            >
                                {cat}
                                <span
                                    style={{
                                        marginLeft: 6,
                                        background: isActive ? COLORS.orange : "#dde3e8",
                                        color: isActive ? "#fff" : COLORS.muted,
                                        borderRadius: 20,
                                        padding: "1px 8px",
                                        fontSize: 11,
                                        fontWeight: 600,
                                        transition: "background 0.2s, color 0.2s",
                                    }}
                                >
                                    {cat === "All"
                                        ? images.length
                                        : images.filter((i) => i.category === cat).length}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* ── Masonry Grid ── */}
            <section style={{ padding: "48px 40px 90px", background: "#fff", minHeight: "60vh" }}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: 80, color: COLORS.muted, fontFamily: "'Arial',sans-serif" }}>
                        Loading gallery…
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                maxWidth: 1200,
                                margin: "0 auto",
                                columns: "3 320px",
                                columnGap: 20,
                            }}
                        >
                            {filtered.map((img, idx) => {
                                const isHov = hoveredId === img.id;
                                return (
                                    <div
                                        key={img.id}
                                        onClick={() => setLightboxIdx(idx)}
                                        onMouseEnter={() => setHoveredId(img.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        style={{
                                            breakInside: "avoid",
                                            marginBottom: 20,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            position: "relative",
                                            cursor: "pointer",
                                            boxShadow: isHov
                                                ? "0 12px 36px rgba(0,0,0,0.22)"
                                                : "0 4px 16px rgba(0,0,0,0.1)",
                                            transform: isHov ? "scale(1.015)" : "scale(1)",
                                            transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s",
                                        }}
                                    >
                                        {/* Image */}
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={700}
                                            height={500}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                display: "block",
                                                objectFit: "cover",
                                            }}
                                        />

                                        {/* Hover overlay */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: isHov
                                                    ? "linear-gradient(to top, rgba(13,110,122,0.88) 0%, rgba(26,39,68,0.45) 60%, transparent 100%)"
                                                    : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                                                transition: "background 0.3s",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                padding: "18px 16px",
                                            }}
                                        >
                                            {/* Category badge */}
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    alignSelf: "flex-start",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    letterSpacing: 0.8,
                                                    textTransform: "uppercase",
                                                    background: categoryColor[img.category] || COLORS.teal,
                                                    color: "#fff",
                                                    borderRadius: 20,
                                                    padding: "3px 10px",
                                                    marginBottom: 8,
                                                    fontFamily: "'Arial',sans-serif",
                                                    opacity: isHov ? 1 : 0,
                                                    transform: isHov ? "translateY(0)" : "translateY(6px)",
                                                    transition: "opacity 0.25s, transform 0.25s",
                                                }}
                                            >
                                                {img.category}
                                            </span>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    lineHeight: 1.4,
                                                    fontFamily: "'Arial',sans-serif",
                                                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                {img.caption}
                                            </p>
                                            {isHov && (
                                                <div
                                                    style={{
                                                        marginTop: 10,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        fontSize: 12,
                                                        color: "rgba(255,255,255,0.85)",
                                                        fontFamily: "'Arial',sans-serif",
                                                        gap: 6,
                                                    }}
                                                >
                                                    <span style={{ fontSize: 15 }}>🔍</span>
                                                    Click to enlarge
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filtered.length === 0 && (
                            <div style={{ textAlign: "center", padding: 80, color: COLORS.muted }}>
                                No images in this category.
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ── Lightbox ── */}
            {activeLightbox && lightboxIdx !== null && (
                <div
                    onClick={() => setLightboxIdx(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(10,20,35,0.95)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        backdropFilter: "blur(6px)",
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setLightboxIdx(null)}
                        aria-label="Close lightbox"
                        style={{
                            position: "absolute",
                            top: 18,
                            right: 22,
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 42,
                            height: 42,
                            fontSize: 20,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                            zIndex: 10,
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.25)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.1)")
                        }
                    >
                        ✕
                    </button>

                    {/* Prev button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIdx((i) =>
                                i !== null ? (i - 1 + filtered.length) % filtered.length : null
                            );
                        }}
                        aria-label="Previous image"
                        style={{
                            position: "absolute",
                            left: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            fontSize: 22,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                            zIndex: 10,
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.25)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.1)")
                        }
                    >
                        ‹
                    </button>

                    {/* Image container */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "88vw",
                            maxHeight: "90vh",
                        }}
                    >
                        <Image
                            src={activeLightbox.src}
                            alt={activeLightbox.alt}
                            width={1200}
                            height={800}
                            style={{
                                maxWidth: "88vw",
                                maxHeight: "76vh",
                                objectFit: "contain",
                                borderRadius: 8,
                                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                            }}
                        />
                        {/* Caption bar */}
                        <div
                            style={{
                                marginTop: 16,
                                textAlign: "center",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: 0.8,
                                    textTransform: "uppercase",
                                    background: categoryColor[activeLightbox.category] || COLORS.teal,
                                    color: "#fff",
                                    borderRadius: 20,
                                    padding: "3px 12px",
                                    marginBottom: 8,
                                    fontFamily: "'Arial',sans-serif",
                                }}
                            >
                                {activeLightbox.category}
                            </span>
                            <p
                                style={{
                                    margin: 0,
                                    color: "rgba(255,255,255,0.9)",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    fontFamily: "'Arial',sans-serif",
                                }}
                            >
                                {activeLightbox.caption}
                            </p>
                            <p
                                style={{
                                    margin: "6px 0 0",
                                    color: "rgba(255,255,255,0.45)",
                                    fontSize: 12,
                                    fontFamily: "'Arial',sans-serif",
                                }}
                            >
                                {lightboxIdx + 1} / {filtered.length} &nbsp;·&nbsp; Use ← → to navigate, Esc to close
                            </p>
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIdx((i) =>
                                i !== null ? (i + 1) % filtered.length : null
                            );
                        }}
                        aria-label="Next image"
                        style={{
                            position: "absolute",
                            right: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            fontSize: 22,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                            zIndex: 10,
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.25)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.1)")
                        }
                    >
                        ›
                    </button>
                </div>
            )}

            {/* ── Add Image Modal ── */}
            {/* Modal removed - static website only */}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
