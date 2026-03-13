"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";
import ConfirmationModal from "@/components/ConfirmationModal";

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

const CATEGORY_ICONS: Record<string, string> = {
    Railways: "🚆",
    Transmission: "⚡",
    Civil: "🏗️",
    Distribution: "🔌",
};

const EMPTY_WO: Omit<WorkOrder, "id"> = {
    title: "",
    subtitle: "",
    category: "Railways",
    categoryColor: "#1a6faf",
    icon: "🚆",
    pdfFile: "",
    description: "",
};

// ─── Work Order Modal ────────────────────────────────────────────────────────
function WorkOrderModal({
    title: modalTitle,
    initial,
    onSave,
    onClose,
    saving,
}: {
    title: string;
    initial: Omit<WorkOrder, "id">;
    onSave: (data: Omit<WorkOrder, "id">) => void;
    onClose: () => void;
    saving: boolean;
}) {
    const [form, setForm] = useState(initial);
    const [uploading, setUploading] = useState(false);
    const [uploadMsg, setUploadMsg] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
        if (k === "category" && typeof v === "string") {
            setForm((prev) => ({
                ...prev,
                category: v,
                categoryColor: CATEGORY_COLORS[v] || "#888",
                icon: CATEGORY_ICONS[v] || "📄",
            }));
        } else {
            setForm((prev) => ({ ...prev, [k]: v }));
        }
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf")) {
            setUploadMsg("❌ Only PDF files are allowed.");
            return;
        }

        setUploading(true);
        setUploadMsg("Uploading…");

        const fd = new FormData();
        fd.append("file", file);

        try {
            const res = await fetch("/api/upload-pdf", { method: "POST", body: fd });
            const json = await res.json();
            if (json.success) {
                setForm((prev) => ({ ...prev, pdfFile: json.path }));
                setUploadMsg(`✅ Uploaded: ${json.path}`);
            } else {
                setUploadMsg("❌ Upload failed.");
            }
        } catch {
            setUploadMsg("❌ Network error.");
        } finally {
            setUploading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px 12px",
        border: "1.5px solid #ddd",
        borderRadius: 7,
        fontSize: 14,
        color: "#333",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "'Arial', sans-serif",
        transition: "border-color 0.2s",
        background: "#fafafa",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        fontSize: 12.5,
        fontWeight: 700,
        color: "#555",
        marginBottom: 5,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10,20,40,0.65)",
                zIndex: 9000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 12,
                    width: "100%",
                    maxWidth: 660,
                    maxHeight: "92vh",
                    overflowY: "auto",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.teal} 100%)`,
                        padding: "20px 28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: "12px 12px 0 0",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#fff",
                            fontFamily: "'Georgia', serif",
                        }}
                    >
                        {modalTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
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

                {/* Form */}
                <div style={{ padding: "28px 28px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                        {/* Title — full */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>Work Order Title *</label>
                            <input
                                style={inputStyle}
                                value={form.title}
                                onChange={(e) => set("title", e.target.value)}
                                placeholder="e.g. 25 kV AC Electric Traction – SP/SSP Substation"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Description — full */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>Description *</label>
                            <textarea
                                style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                                value={form.description}
                                onChange={(e) => set("description", e.target.value)}
                                placeholder="Brief description of the work order"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Subtitle */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>Subtitle / Reference</label>
                            <input
                                style={inputStyle}
                                value={form.subtitle}
                                onChange={(e) => set("subtitle", e.target.value)}
                                placeholder="e.g. Work Order No. 2400107302"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label style={labelStyle}>Category *</label>
                            <input
                                style={inputStyle}
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                                placeholder="e.g. Railways, Transmission"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Icon (emoji) */}
                        <div>
                            <label style={labelStyle}>Icon (Emoji)</label>
                            <input
                                style={inputStyle}
                                value={form.icon}
                                onChange={(e) => set("icon", e.target.value)}
                                placeholder="e.g. 🚆"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* PDF Upload — full */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>PDF File *</label>
                            {/* Current file */}
                            {form.pdfFile && (
                                <div
                                    style={{
                                        fontSize: 12.5,
                                        color: COLORS.teal,
                                        marginBottom: 8,
                                        fontFamily: "'Arial', sans-serif",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    📄 Current: {form.pdfFile}
                                </div>
                            )}
                            <div
                                style={{
                                    border: "2px dashed #ccc",
                                    borderRadius: 8,
                                    padding: "18px 20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "border-color 0.2s",
                                    background: "#fafafa",
                                }}
                                onClick={() => fileRef.current?.click()}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLElement).style.borderColor = COLORS.teal)
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLElement).style.borderColor = "#ccc")
                                }
                            >
                                <div style={{ fontSize: 28, marginBottom: 6 }}>📤</div>
                                <div style={{ fontSize: 13.5, color: "#666", fontFamily: "'Arial', sans-serif" }}>
                                    {uploading ? "Uploading…" : "Click to upload PDF"}
                                </div>
                                <div style={{ fontSize: 11.5, color: "#aaa", marginTop: 4, fontFamily: "'Arial', sans-serif" }}>
                                    Only .pdf files accepted
                                </div>
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf"
                                style={{ display: "none" }}
                                onChange={handlePdfUpload}
                            />
                            {uploadMsg && (
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 12.5,
                                        fontFamily: "'Arial', sans-serif",
                                        color: uploadMsg.startsWith("✅") ? "#1a7a4a" : "#c0392b",
                                    }}
                                >
                                    {uploadMsg}
                                </div>
                            )}
                            {/* Or enter path manually */}
                            <input
                                style={{ ...inputStyle, marginTop: 10, fontSize: 12.5 }}
                                value={form.pdfFile}
                                onChange={(e) => set("pdfFile", e.target.value)}
                                placeholder="Or type path manually, e.g. /Projects/my-file.pdf"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "flex-end",
                            marginTop: 28,
                            paddingTop: 20,
                            borderTop: "1px solid #f0f0f0",
                        }}
                    >
                        <button
                            onClick={onClose}
                            disabled={saving}
                            style={{
                                padding: "10px 24px",
                                background: "#f0f0f0",
                                border: "none",
                                borderRadius: 7,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                                color: "#555",
                                fontFamily: "'Arial', sans-serif",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(form)}
                            disabled={saving || !form.title || !form.description || !form.pdfFile}
                            style={{
                                padding: "10px 28px",
                                background:
                                    saving || !form.title || !form.description || !form.pdfFile
                                        ? "#aaa"
                                        : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                                border: "none",
                                borderRadius: 7,
                                fontSize: 14,
                                fontWeight: 700,
                                cursor:
                                    saving || !form.title || !form.description || !form.pdfFile
                                        ? "not-allowed"
                                        : "pointer",
                                color: "#fff",
                                fontFamily: "'Arial', sans-serif",
                                letterSpacing: 0.3,
                            }}
                        >
                            {saving ? "Saving…" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MediaProjectsPage() {
    const { isLoggedIn } = useAuth();
    const [data, setData] = useState<MediaProjectsData | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [modal, setModal] = useState<{
        mode: "add" | "edit";
        item?: WorkOrder;
    } | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        fetch("/data/media-projects.json")
            .then((r) => r.json())
            .then((j) => setData(j));
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const saveToServer = async (newData: MediaProjectsData) => {
        const res = await fetch("/api/save-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: "media-projects.json", data: newData }),
        });
        return res.ok;
    };

    const handleSave = async (formData: Omit<WorkOrder, "id">) => {
        if (!data || !modal) return;
        setSaving(true);

        let newData: MediaProjectsData;
        if (modal.mode === "add") {
            const newItem: WorkOrder = { id: `wo-${Date.now()}`, ...formData };
            newData = { projects: [...data.projects, newItem] };
        } else {
            newData = {
                projects: data.projects.map((p) =>
                    p.id === modal.item?.id ? { ...p, ...formData } : p
                ),
            };
        }

        const ok = await saveToServer(newData);
        setSaving(false);
        if (ok) {
            setData(newData);
            setModal(null);
            showToast(modal.mode === "add" ? "✅ Work order added!" : "✅ Updated successfully!");
        } else {
            showToast("❌ Save failed. Please try again.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!data) return;
        setSaving(true);

        try {
            const projectToDelete = data.projects.find((p) => p.id === id);
            
            // 1. Delete PDF file from server
            if (projectToDelete && projectToDelete.pdfFile) {
                const deleteFileRes = await fetch("/api/delete-file", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ filePath: projectToDelete.pdfFile }),
                });
                if (!deleteFileRes.ok) {
                    const err = await deleteFileRes.json();
                    throw new Error(err.error || "Failed to delete PDF file");
                }
            }

            // 2. Remove from media-projects.json
            const newData: MediaProjectsData = {
                projects: data.projects.filter((p) => p.id !== id),
            };
            const ok = await saveToServer(newData);
            setSaving(false);
            setDeleteConfirm(null);
            if (ok) {
                setData(newData);
                showToast("🗑️ Work order deleted.");
            } else {
                showToast("❌ Delete failed.");
            }
        } catch (err) {
            setSaving(false);
            setDeleteConfirm(null);
            showToast(err instanceof Error ? `❌ ${err.message}` : "❌ Delete failed.");
        }
    };

    const projects = data?.projects ?? [];

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

            {/* ── Toast ── */}
            {toast && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        background: toast.startsWith("✅")
                            ? "#1a7a4a"
                            : toast.startsWith("🗑️")
                                ? COLORS.navy
                                : "#c0392b",
                        color: "#fff",
                        padding: "14px 22px",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "'Arial', sans-serif",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                        zIndex: 9999,
                        animation: "fadeIn 0.3s ease",
                    }}
                >
                    {toast}
                </div>
            )}

            {/* ── Modal ── */}
            {modal && (
                <WorkOrderModal
                    title={modal.mode === "add" ? "Add Work Order" : "Edit Work Order"}
                    initial={
                        modal.item
                            ? {
                                title: modal.item.title,
                                subtitle: modal.item.subtitle,
                                category: modal.item.category,
                                categoryColor: modal.item.categoryColor,
                                icon: modal.item.icon,
                                pdfFile: modal.item.pdfFile,
                                description: modal.item.description,
                            }
                            : { ...EMPTY_WO }
                    }
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                    saving={saving}
                />
            )}

            {/* ── Delete Confirmation ── */}
            <ConfirmationModal
                isOpen={deleteConfirm !== null}
                title="Delete Work Order?"
                message="Are you sure you want to delete this work order? This action cannot be undone."
                confirmText={saving ? "Deleting..." : "Yes, Delete"}
                onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
                onCancel={() => setDeleteConfirm(null)}
            />

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

            {/* ── Admin bar ── */}
            {isLoggedIn && (
                <div
                    style={{
                        background: "#fffbf0",
                        borderBottom: "2px solid #f0c040",
                        padding: "14px 40px",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1200,
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 13,
                                color: "#7a5c00",
                                fontFamily: "'Arial', sans-serif",
                                fontWeight: 600,
                            }}
                        >
                            🔧 Admin Mode — Add, edit or delete work orders &amp; upload PDFs
                        </span>
                        <button
                            id="add-work-order-btn"
                            onClick={() => setModal({ mode: "add" })}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "9px 20px",
                                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                                color: "#fff",
                                border: "none",
                                borderRadius: 7,
                                fontSize: 13.5,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "'Arial', sans-serif",
                                letterSpacing: 0.3,
                            }}
                        >
                            + Add Work Order
                        </button>
                    </div>
                </div>
            )}

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
                        Electricals &amp; Enterprises. Click any card to view or download the
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
                {!data && (
                    <div style={{ textAlign: "center", padding: 80, color: COLORS.muted }}>
                        Loading…
                    </div>
                )}

                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                        gap: 32,
                    }}
                >
                    {projects.map((wo) => {
                        const isHovered = hoveredId === wo.id;
                        const catBg = CATEGORY_BG[wo.category] || "#f0f4f5";
                        return (
                            <div
                                key={wo.id}
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
                                    border: isHovered
                                        ? `1.5px solid ${COLORS.teal}`
                                        : "1.5px solid transparent",
                                    position: "relative",
                                }}
                                onMouseEnter={() => setHoveredId(wo.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Admin action buttons overlay */}
                                {isLoggedIn && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            display: "flex",
                                            gap: 6,
                                            zIndex: 10,
                                        }}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setModal({ mode: "edit", item: wo });
                                            }}
                                            title="Edit"
                                            style={{
                                                padding: "4px 10px",
                                                background: COLORS.teal,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 5,
                                                fontSize: 11.5,
                                                cursor: "pointer",
                                                fontWeight: 600,
                                                fontFamily: "'Arial', sans-serif",
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDeleteConfirm(wo.id);
                                            }}
                                            title="Delete"
                                            style={{
                                                padding: "4px 10px",
                                                background: "#e74c3c",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 5,
                                                fontSize: 11.5,
                                                cursor: "pointer",
                                                fontWeight: 600,
                                                fontFamily: "'Arial', sans-serif",
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}

                                {/* Clickable link to PDF */}
                                <a
                                    href={wo.pdfFile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open PDF: ${wo.title}`}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    {/* Top band */}
                                    <div
                                        style={{
                                            background: catBg,
                                            padding: "22px 24px 16px",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 14,
                                        }}
                                    >
                                        <span style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>
                                            {wo.icon}
                                        </span>
                                        <div>
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
                            </div>
                        );
                    })}
                </div>
            </section>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
