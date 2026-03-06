"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";

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
    const { isLoggedIn } = useAuth();

    // Gallery state
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Add-image modal state
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        caption: "",
        category: "Site Team",
        file: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);

    // Delete confirmation state
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Notification state
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

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
        document.body.style.overflow =
            lightboxIdx !== null || showModal || idToDelete !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxIdx, showModal, idToDelete]);

    const activeLightbox =
        lightboxIdx !== null ? filtered[lightboxIdx] : null;

    // ── File handling ──────────────────────────────────────────────────────────
    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setSaveError("Only image files are allowed.");
            return;
        }
        setForm((f) => ({ ...f, file }));
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
        setSaveError(null);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    // ── Save new image ─────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!form.file) { setSaveError("Please choose an image."); return; }
        if (!form.caption.trim()) { setSaveError("Please enter a title/caption."); return; }

        setSaving(true);
        setSaveError(null);

        try {
            // 1. Upload image file
            const fd = new FormData();
            fd.append("file", form.file);
            const uploadRes = await fetch("/api/upload-image", {
                method: "POST",
                body: fd,
            });
            if (!uploadRes.ok) {
                const err = await uploadRes.json();
                throw new Error(err.error || "Upload failed");
            }
            const { path: imgPath } = await uploadRes.json();

            // 2. Update gallery.json
            const newImage: GalleryImage = {
                id: Date.now(),
                src: imgPath,
                alt: form.caption.trim(),
                caption: form.caption.trim(),
                category: form.category,
            };
            const updatedImages = [...images, newImage];

            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "gallery.json", data: updatedImages }),
            });
            if (!saveRes.ok) throw new Error("Failed to save gallery data");

            // 3. Update local state
            setImages(updatedImages);
            setShowModal(false);
            setForm({ caption: "", category: "Site Team", file: null });
            setPreview(null);
            setNotification({ message: "Image added successfully!", type: 'success' });
        } catch (err: unknown) {
            setSaveError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (idToDelete === null) return;
        setIsDeleting(true);

        try {
            const updatedImages = images.filter((img) => img.id !== idToDelete);
            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "gallery.json", data: updatedImages }),
            });
            if (!saveRes.ok) throw new Error("Failed to delete image");
            setImages(updatedImages);
            setIdToDelete(null);
            setNotification({ message: "Image deleted successfully!", type: 'success' });
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Failed to delete image");
        } finally {
            setIsDeleting(false);
        }
    };

    const closeModal = () => {
        if (saving) return;
        setShowModal(false);
        setForm({ caption: "", category: "Site Team", file: null });
        setPreview(null);
        setSaveError(null);
    };

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

            {/* ── Filter Tabs + Add Button ── */}
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

                    {/* Add Image button — right-aligned, admin only */}
                    {isLoggedIn && (
                        <button
                            id="add-gallery-image-btn"
                            onClick={() => setShowModal(true)}
                            style={{
                                marginLeft: "auto",
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: 7,
                                background: COLORS.orange,
                                color: "#fff",
                                border: "none",
                                borderRadius: 7,
                                padding: "8px 18px",
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "'Arial',sans-serif",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.14)",
                                transition: "background 0.2s, transform 0.15s",
                                letterSpacing: 0.3,
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#d4640a";
                                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.orange;
                                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            }}
                        >
                            <span style={{ fontSize: 16, lineHeight: 1 }}>＋</span>
                            Add Image
                        </button>
                    )}
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
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 6,
                                                            fontSize: 12,
                                                            color: "rgba(255,255,255,0.85)",
                                                            fontFamily: "'Arial',sans-serif",
                                                        }}
                                                    >
                                                        <span style={{ fontSize: 15 }}>🔍</span>
                                                        Click to enlarge
                                                    </div>

                                                    {isLoggedIn && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIdToDelete(img.id);
                                                            }}
                                                            style={{
                                                                background: "#e74c3c",
                                                                color: "#fff",
                                                                border: "none",
                                                                borderRadius: 6,
                                                                padding: "4px 10px",
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                cursor: "pointer",
                                                                fontFamily: "'Arial',sans-serif",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 4,
                                                                transition: "background 0.2s",
                                                            }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.background = "#c0392b")}
                                                            onMouseLeave={(e) => (e.currentTarget.style.background = "#e74c3c")}
                                                        >
                                                            <span>🗑️</span>
                                                            Delete
                                                        </button>
                                                    )}
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
            {showModal && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(10,20,35,0.75)",
                        zIndex: 9998,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                        backdropFilter: "blur(4px)",
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff",
                            borderRadius: 16,
                            width: "100%",
                            maxWidth: 520,
                            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Modal header */}
                        <div
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 100%)`,
                                padding: "22px 28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <h2
                                    style={{
                                        margin: 0,
                                        color: "#fff",
                                        fontSize: 20,
                                        fontWeight: 700,
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    Add New Image
                                </h2>
                                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "'Arial',sans-serif" }}>
                                    Upload an image to the gallery
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: "rgba(255,255,255,0.12)",
                                    border: "1px solid rgba(255,255,255,0.22)",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    width: 36,
                                    height: 36,
                                    fontSize: 18,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal body */}
                        <div style={{ padding: "28px 28px 24px" }}>
                            {/* Drop zone */}
                            <div
                                ref={dropRef}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={onDrop}
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    border: `2px dashed ${form.file ? COLORS.teal : "#c8d0d8"}`,
                                    borderRadius: 12,
                                    padding: 0,
                                    cursor: "pointer",
                                    transition: "border-color 0.2s",
                                    overflow: "hidden",
                                    marginBottom: 20,
                                    minHeight: 160,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: form.file ? "#f0fafb" : "#f8fafc",
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            maxHeight: 220,
                                            objectFit: "cover",
                                            display: "block",
                                            borderRadius: 10,
                                        }}
                                    />
                                ) : (
                                    <div style={{ textAlign: "center", padding: "32px 20px" }}>
                                        <div style={{ fontSize: 36, marginBottom: 10 }}>🖼️</div>
                                        <p style={{ margin: 0, fontFamily: "'Arial',sans-serif", fontSize: 14, color: "#666", fontWeight: 600 }}>
                                            Click or drag &amp; drop an image
                                        </p>
                                        <p style={{ margin: "6px 0 0", fontFamily: "'Arial',sans-serif", fontSize: 12, color: "#aaa" }}>
                                            JPEG, PNG, WEBP, GIF supported
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleFile(f);
                                }}
                            />

                            {/* Caption / Title */}
                            <div style={{ marginBottom: 16 }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontFamily: "'Arial',sans-serif",
                                        marginBottom: 6,
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    Image Title / Caption *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Substation commissioning at dawn"
                                    value={form.caption}
                                    onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
                                    style={{
                                        width: "100%",
                                        padding: "10px 14px",
                                        borderRadius: 8,
                                        border: "1.5px solid #dde3e8",
                                        fontSize: 14,
                                        fontFamily: "'Arial',sans-serif",
                                        color: "#333",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = "#dde3e8")}
                                />
                            </div>

                            {/* Category Input Field */}
                            <div style={{ marginBottom: 24 }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontFamily: "'Arial',sans-serif",
                                        marginBottom: 6,
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Substation, Railways, Site Team"
                                    value={form.category}
                                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                                    style={{
                                        width: "100%",
                                        padding: "10px 14px",
                                        borderRadius: 8,
                                        border: "1.5px solid #dde3e8",
                                        fontSize: 14,
                                        fontFamily: "'Arial',sans-serif",
                                        color: "#333",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = "#dde3e8")}
                                />
                            </div>

                            {/* Error */}
                            {saveError && (
                                <div
                                    style={{
                                        background: "#fff0f0",
                                        border: "1px solid #f5c6c6",
                                        borderRadius: 8,
                                        padding: "10px 14px",
                                        marginBottom: 16,
                                        color: "#c0392b",
                                        fontSize: 13,
                                        fontFamily: "'Arial',sans-serif",
                                    }}
                                >
                                    ⚠️ {saveError}
                                </div>
                            )}

                            {/* Action buttons */}
                            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                                <button
                                    onClick={closeModal}
                                    disabled={saving}
                                    style={{
                                        padding: "10px 22px",
                                        borderRadius: 8,
                                        border: "1.5px solid #dde3e8",
                                        background: "#fff",
                                        color: "#555",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "'Arial',sans-serif",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => { if (!saving) (e.currentTarget as HTMLElement).style.background = "#f5f7f9"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                                >
                                    Cancel
                                </button>
                                <button
                                    id="save-gallery-image-btn"
                                    onClick={handleSave}
                                    disabled={saving}
                                    style={{
                                        padding: "10px 26px",
                                        borderRadius: 8,
                                        border: "none",
                                        background: saving ? "#aaa" : COLORS.orange,
                                        color: "#fff",
                                        fontSize: 14,
                                        fontWeight: 700,
                                        cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "'Arial',sans-serif",
                                        boxShadow: saving ? "none" : "0 4px 12px rgba(0,0,0,0.15)",
                                        transition: "background 0.2s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    {saving ? (
                                        <>
                                            <span style={{
                                                display: "inline-block",
                                                width: 14,
                                                height: 14,
                                                border: "2px solid rgba(255,255,255,0.4)",
                                                borderTopColor: "#fff",
                                                borderRadius: "50%",
                                                animation: "spin 0.7s linear infinite",
                                            }} />
                                            Uploading…
                                        </>
                                    ) : (
                                        "Save Image"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirmation Modal ── */}
            {idToDelete !== null && (
                <div
                    onClick={() => setIdToDelete(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(10,20,35,0.75)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                        backdropFilter: "blur(4px)",
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff",
                            borderRadius: 16,
                            width: "100%",
                            maxWidth: 400,
                            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
                            overflow: "hidden",
                            textAlign: "center",
                            padding: "32px 28px",
                        }}
                    >
                        <div style={{
                            width: 64,
                            height: 64,
                            background: "#fff0f0",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 32,
                            margin: "0 auto 20px",
                            color: "#e74c3c"
                        }}>
                            🗑️
                        </div>

                        <h3 style={{
                            margin: "0 0 10px",
                            fontSize: 20,
                            fontWeight: 700,
                            color: COLORS.navy,
                            fontFamily: "'Arial',sans-serif",
                        }}>
                            Confirm Deletion
                        </h3>

                        <p style={{
                            margin: "0 0 28px",
                            fontSize: 14,
                            color: "#666",
                            lineHeight: 1.5,
                            fontFamily: "'Arial',sans-serif",
                        }}>
                            Are you sure you want to delete this image? This action cannot be undone.
                        </p>

                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                onClick={() => setIdToDelete(null)}
                                disabled={isDeleting}
                                style={{
                                    flex: 1,
                                    padding: "12px 0",
                                    borderRadius: 8,
                                    border: "1.5px solid #dde3e8",
                                    background: "#fff",
                                    color: "#555",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: isDeleting ? "not-allowed" : "pointer",
                                    fontFamily: "'Arial',sans-serif",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => { if (!isDeleting) (e.currentTarget as HTMLElement).style.background = "#f5f7f9"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                style={{
                                    flex: 1,
                                    padding: "12px 0",
                                    borderRadius: 8,
                                    border: "none",
                                    background: isDeleting ? "#aaa" : "#e74c3c",
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    cursor: isDeleting ? "not-allowed" : "pointer",
                                    fontFamily: "'Arial',sans-serif",
                                    boxShadow: isDeleting ? "none" : "0 4px 12px rgba(231, 76, 60, 0.25)",
                                    transition: "background 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8,
                                }}
                                onMouseEnter={(e) => { if (!isDeleting) (e.currentTarget as HTMLElement).style.background = "#c0392b"; }}
                                onMouseLeave={(e) => { if (!isDeleting) (e.currentTarget as HTMLElement).style.background = "#e74c3c"; }}
                            >
                                {isDeleting ? (
                                    <>
                                        <span style={{
                                            display: "inline-block",
                                            width: 14,
                                            height: 14,
                                            border: "2px solid rgba(255,255,255,0.4)",
                                            borderTopColor: "#fff",
                                            borderRadius: "50%",
                                            animation: "spin 0.7s linear infinite",
                                        }} />
                                        Deleting...
                                    </>
                                ) : "Delete Image"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Notification (Toast) ── */}
            {notification && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 30,
                        right: 30,
                        background: notification.type === 'success' ? "#27ae60" : "#e74c3c",
                        color: "#fff",
                        padding: "12px 24px",
                        borderRadius: 8,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        zIndex: 10000,
                        fontFamily: "'Arial',sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        animation: "slideUp 0.3s ease-out",
                    }}
                >
                    <span>{notification.type === 'success' ? "✅" : "⚠️"}</span>
                    {notification.message}
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
