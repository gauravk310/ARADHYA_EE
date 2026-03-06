"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";

interface ServiceDetail {
    title: string;
    slug: string;
    bannerImage: string;
    paragraphs: string[];
    highlights: string[];
}

interface ServicesJson {
    serviceDetails: Record<string, ServiceDetail>;
}

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { isLoggedIn } = useAuth();

    const [detail, setDetail] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState<ServiceDetail | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");
    const [fullJson, setFullJson] = useState<ServicesJson | null>(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [imgUploadMsg, setImgUploadMsg] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("/data/services.json")
            .then((r) => r.json())
            .then((d: ServicesJson) => {
                setFullJson(d);
                const found = d.serviceDetails?.[slug] ?? null;
                setDetail(found);
                if (found) setEditData({ ...found, paragraphs: [...found.paragraphs], highlights: [...found.highlights] });
            })
            .catch(() => { /* not found */ })
            .finally(() => setLoading(false));
    }, [slug]);

    const openEdit = () => {
        if (!detail) return;
        setEditData({ ...detail, paragraphs: [...detail.paragraphs], highlights: [...detail.highlights] });
        setSaveMsg("");
        setImgUploadMsg("");
        setShowEditModal(true);
    };

    const handleImageUpload = async (file: File) => {
        setImageUploading(true);
        setImgUploadMsg("");
        try {
            const form = new FormData();
            form.append("file", file);
            const res = await fetch("/api/upload-image", { method: "POST", body: form });
            const data = await res.json();
            if (res.ok && data.path) {
                setEditData((prev) => prev ? { ...prev, bannerImage: data.path } : prev);
                setImgUploadMsg("✅ Image uploaded!");
            } else {
                setImgUploadMsg("❌ " + (data.error || "Upload failed"));
            }
        } catch {
            setImgUploadMsg("❌ Network error.");
        }
        setImageUploading(false);
    };

    const closeEdit = () => setShowEditModal(false);

    const handleParagraphChange = (idx: number, val: string) => {
        if (!editData) return;
        const updated = [...editData.paragraphs];
        updated[idx] = val;
        setEditData({ ...editData, paragraphs: updated });
    };

    const addParagraph = () => {
        if (!editData) return;
        setEditData({ ...editData, paragraphs: [...editData.paragraphs, ""] });
    };

    const removeParagraph = (idx: number) => {
        if (!editData) return;
        setEditData({ ...editData, paragraphs: editData.paragraphs.filter((_, i) => i !== idx) });
    };

    const handleHighlightChange = (idx: number, val: string) => {
        if (!editData) return;
        const updated = [...editData.highlights];
        updated[idx] = val;
        setEditData({ ...editData, highlights: updated });
    };

    const addHighlight = () => {
        if (!editData) return;
        setEditData({ ...editData, highlights: [...editData.highlights, ""] });
    };

    const removeHighlight = (idx: number) => {
        if (!editData) return;
        setEditData({ ...editData, highlights: editData.highlights.filter((_, i) => i !== idx) });
    };

    const handleSave = async () => {
        if (!editData || !fullJson) return;
        setSaving(true);
        setSaveMsg("");
        try {
            const updated = {
                ...fullJson,
                serviceDetails: {
                    ...fullJson.serviceDetails,
                    [slug]: editData,
                },
            };
            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "services.json", data: updated }),
            });
            if (saveRes.ok) {
                setFullJson(updated);
                setDetail({ ...editData, paragraphs: [...editData.paragraphs], highlights: [...editData.highlights] });
                setSaveMsg("✅ Saved successfully!");
                setTimeout(() => setShowEditModal(false), 1000);
            } else {
                setSaveMsg("❌ Save failed. Please try again.");
            }
        } catch {
            setSaveMsg("❌ Network error. Please try again.");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
                <Navbar />
                <TopBar />
                <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: COLORS.muted, fontSize: 18 }}>Loading…</p>
                </div>
                <Footer />
            </main>
        );
    }

    if (!detail) {
        return (
            <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
                <Navbar />
                <TopBar />
                <div style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 40px",
                    textAlign: "center",
                }}>
                    <h1 style={{ fontSize: 48, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>404</h1>
                    <p style={{ fontSize: 18, color: COLORS.muted, marginBottom: 32 }}>Service not found.</p>
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "14px 36px",
                            background: COLORS.blue,
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textDecoration: "none",
                            transition: "background 0.2s",
                        }}
                    >
                        ← BACK TO HOME
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
            <Navbar />
            <TopBar />

            {/* Page Banner / Hero */}
            <section
                style={{
                    position: "relative",
                    background: COLORS.navy,
                    padding: "48px 40px",
                    overflow: "hidden",
                }}
            >
                {/* Subtle gradient overlay */}
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
                        {detail.title}
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
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                            }}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <Link
                            href="/services"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                            }}
                        >
                            Services
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            {detail.title}
                        </span>
                    </nav>
                </div>
            </section>

            {/* ── Admin Edit Toolbar ── */}
            {isLoggedIn && (
                <div
                    style={{
                        background: "#fff8f4",
                        borderBottom: `3px solid ${COLORS.orange}`,
                        padding: "12px 40px",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1200,
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 12,
                                fontFamily: "Arial, sans-serif",
                                fontWeight: 600,
                                color: COLORS.orange,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                            }}
                        >
                            Admin
                        </span>
                        <span style={{ color: "#ddd", fontSize: 16 }}>|</span>
                        <button
                            onClick={openEdit}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 7,
                                padding: "8px 20px",
                                background: COLORS.orange,
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                letterSpacing: 0.5,
                                boxShadow: "0 2px 8px rgba(232,98,26,0.35)",
                                transition: "background 0.2s, transform 0.15s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.darkOrange;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.orange;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                        >
                            ✏️ Edit Service
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <section
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "48px 40px 80px",
                }}
            >
                {/* Hero Image */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 800,
                        margin: "0 auto 48px",
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                >
                    <img
                        src={detail.bannerImage}
                        alt={detail.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            maxHeight: 420,
                            objectFit: "cover",
                        }}
                    />
                </div>

                {/* Text Content */}
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    {detail.paragraphs.map((p, i) => (
                        <p
                            key={i}
                            style={{
                                fontSize: 15.5,
                                lineHeight: 1.85,
                                color: COLORS.text,
                                marginBottom: 22,
                                textAlign: "justify",
                            }}
                        >
                            {p}
                        </p>
                    ))}

                    {/* Highlights Section */}
                    <div
                        style={{
                            marginTop: 40,
                            padding: "32px 36px",
                            background: `linear-gradient(135deg, ${COLORS.lightTeal} 0%, #f0fafa 100%)`,
                            borderLeft: `4px solid ${COLORS.blue}`,
                            borderRadius: 4,
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 20,
                                fontWeight: 700,
                                color: COLORS.navy,
                                marginBottom: 20,
                            }}
                        >
                            Key Capabilities
                        </h3>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: "12px 32px",
                            }}
                        >
                            {detail.highlights.map((h, i) => (
                                <li
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        fontSize: 14.5,
                                        color: COLORS.text,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: COLORS.orange,
                                            flexShrink: 0,
                                        }}
                                    />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Back Link */}
                    <div style={{ marginTop: 48, textAlign: "center" }}>
                        <Link
                            href="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "14px 36px",
                                background: COLORS.blue,
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: 1.5,
                                textDecoration: "none",
                                transition: "background 0.2s, transform 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.darkBlue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.blue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                        >
                            ← BACK TO HOME
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />

            {/* ── Edit Modal ── */}
            {showEditModal && editData && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.65)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        padding: "40px 16px",
                        overflowY: "auto",
                        backdropFilter: "blur(3px)",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 10,
                            width: "100%",
                            maxWidth: 760,
                            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Modal Header */}
                        <div
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.darkTeal} 100%)`,
                                padding: "22px 28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
                                ✏️ Edit — {detail.title}
                            </span>
                            <button
                                onClick={closeEdit}
                                style={{
                                    background: "rgba(255,255,255,0.15)",
                                    border: "none",
                                    color: "#fff",
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    fontSize: 18,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: "28px 28px 8px" }}>
                            {/* Title (full width) */}
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 6, fontFamily: "Arial, sans-serif" }}>
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    style={{
                                        width: "100%", padding: "8px 12px", border: "1.5px solid #d0d0d0",
                                        borderRadius: 6, fontSize: 14, fontFamily: "Arial, sans-serif", color: "#333",
                                        outline: "none", boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = COLORS.blue)}
                                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#d0d0d0")}
                                />
                            </div>

                            {/* Banner Image Upload */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 10, fontFamily: "Arial, sans-serif" }}>
                                    Banner Image
                                </label>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 16,
                                        padding: 14,
                                        border: "1.5px dashed #c8c8c8",
                                        borderRadius: 8,
                                        background: "#fafafa",
                                    }}
                                >
                                    {/* Current image preview */}
                                    <div
                                        style={{
                                            width: 100,
                                            height: 70,
                                            borderRadius: 6,
                                            overflow: "hidden",
                                            border: "1px solid #e0e0e0",
                                            flexShrink: 0,
                                            background: "#eee",
                                        }}
                                    >
                                        {editData.bannerImage ? (
                                            <img
                                                src={editData.bannerImage}
                                                alt="Preview"
                                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                            />
                                        ) : (
                                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 22 }}>
                                                🖼️
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload controls */}
                                    <div style={{ flex: 1 }}>
                                        {/* Hidden file input */}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(file);
                                                e.target.value = "";
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={imageUploading}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 7,
                                                padding: "9px 20px",
                                                background: imageUploading ? "#aaa" : COLORS.blue,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 6,
                                                fontSize: 13,
                                                fontWeight: 700,
                                                cursor: imageUploading ? "not-allowed" : "pointer",
                                                fontFamily: "Arial, sans-serif",
                                                transition: "background 0.2s",
                                                marginBottom: 8,
                                            }}
                                        >
                                            {imageUploading ? "⏳ Uploading…" : "📤 Upload Image"}
                                        </button>
                                        <p style={{ margin: 0, fontSize: 12, color: "#888", fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
                                            Accepts JPG, PNG, WEBP, GIF. Saved to /Gallary/
                                        </p>
                                        {imgUploadMsg && (
                                            <p style={{
                                                margin: "6px 0 0",
                                                fontSize: 12,
                                                fontFamily: "Arial, sans-serif",
                                                fontWeight: 600,
                                                color: imgUploadMsg.startsWith("✅") ? "#27ae60" : "#c0392b",
                                            }}>
                                                {imgUploadMsg}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Paragraphs */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 8, fontFamily: "Arial, sans-serif" }}>
                                    Paragraphs
                                </label>
                                {editData.paragraphs.map((p, idx) => (
                                    <div key={idx} style={{ marginBottom: 10, position: "relative" }}>
                                        <textarea
                                            value={p}
                                            onChange={(e) => handleParagraphChange(idx, e.target.value)}
                                            rows={3}
                                            style={{
                                                width: "100%",
                                                padding: "10px 44px 10px 14px",
                                                border: "1.5px solid #d0d0d0",
                                                borderRadius: 6,
                                                fontSize: 14,
                                                lineHeight: 1.6,
                                                fontFamily: "Arial, sans-serif",
                                                color: "#333",
                                                resize: "vertical",
                                                outline: "none",
                                                boxSizing: "border-box",
                                            }}
                                            onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = COLORS.blue)}
                                            onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#d0d0d0")}
                                        />
                                        <button
                                            onClick={() => removeParagraph(idx)}
                                            title="Remove paragraph"
                                            style={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                background: "#ffeeee",
                                                border: "none",
                                                color: "#c0392b",
                                                width: 26,
                                                height: 26,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                fontSize: 15,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addParagraph}
                                    style={{
                                        padding: "7px 18px",
                                        background: COLORS.lightTeal,
                                        border: `1.5px solid ${COLORS.blue}`,
                                        borderRadius: 6,
                                        color: COLORS.darkTeal,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    + Add Paragraph
                                </button>
                            </div>

                            {/* Key Capabilities (Highlights) */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 10, fontFamily: "Arial, sans-serif" }}>
                                    Key Capabilities
                                </label>
                                {editData.highlights.map((h, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span style={{ width: 8, height: 8, background: COLORS.orange, borderRadius: "50%", flexShrink: 0 }} />
                                        <input
                                            type="text"
                                            value={h}
                                            onChange={(e) => handleHighlightChange(idx, e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: "8px 12px",
                                                border: "1.5px solid #d0d0d0",
                                                borderRadius: 6,
                                                fontSize: 14,
                                                fontFamily: "Arial, sans-serif",
                                                color: "#333",
                                                outline: "none",
                                            }}
                                            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = COLORS.blue)}
                                            onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#d0d0d0")}
                                        />
                                        <button
                                            onClick={() => removeHighlight(idx)}
                                            title="Remove"
                                            style={{
                                                background: "#ffeeee",
                                                border: "none",
                                                color: "#c0392b",
                                                width: 30,
                                                height: 30,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                fontSize: 16,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addHighlight}
                                    style={{
                                        marginTop: 4,
                                        padding: "7px 18px",
                                        background: COLORS.lightTeal,
                                        border: `1.5px solid ${COLORS.blue}`,
                                        borderRadius: 6,
                                        color: COLORS.darkTeal,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    + Add Capability
                                </button>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div
                            style={{
                                padding: "16px 28px 24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                                flexWrap: "wrap",
                            }}
                        >
                            {saveMsg && (
                                <span
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "Arial, sans-serif",
                                        color: saveMsg.startsWith("✅") ? "#27ae60" : "#c0392b",
                                        fontWeight: 600,
                                    }}
                                >
                                    {saveMsg}
                                </span>
                            )}
                            <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
                                <button
                                    onClick={closeEdit}
                                    style={{
                                        padding: "11px 24px",
                                        background: "#f0f0f0",
                                        border: "none",
                                        borderRadius: 6,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "#555",
                                        cursor: "pointer",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    style={{
                                        padding: "11px 28px",
                                        background: saving ? "#aaa" : COLORS.orange,
                                        border: "none",
                                        borderRadius: 6,
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: "#fff",
                                        cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "Arial, sans-serif",
                                        letterSpacing: 0.5,
                                        boxShadow: saving ? "none" : "0 2px 8px rgba(232,98,26,0.35)",
                                        transition: "background 0.2s",
                                    }}
                                >
                                    {saving ? "Saving…" : "💾 Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
