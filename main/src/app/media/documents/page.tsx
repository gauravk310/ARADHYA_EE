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

// ── Types ────────────────────────────────────────────────────────────────────
interface Document {
    id: number;
    title: string;
    path: string;
    uploadDate: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DocumentsPage() {
    const { isLoggedIn } = useAuth();

    // Documents state
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    // Add-document modal state
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        file: null as File | null,
    });
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // ── Load documents data ────────────────────────────────────────────────────
    useEffect(() => {
        fetch("/data/documents.json")
            .then((r) => r.json())
            .then((data: Document[]) => {
                setDocuments(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // ── File handling ──────────────────────────────────────────────────────────
    const handleFile = (file: File) => {
        if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
            setSaveError("Only PDF files are allowed.");
            return;
        }
        setForm((f) => ({ ...f, file }));
        setSaveError(null);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    // ── Save new document ──────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!form.file) { setSaveError("Please choose a PDF file."); return; }
        if (!form.title.trim()) { setSaveError("Please enter a document title."); return; }

        setSaving(true);
        setSaveError(null);

        try {
            // 1. Upload PDF file
            const fd = new FormData();
            fd.append("file", form.file);
            const uploadRes = await fetch("/api/upload-pdf", {
                method: "POST",
                body: fd,
            });
            if (!uploadRes.ok) {
                const err = await uploadRes.json();
                throw new Error(err.error || "Upload failed");
            }
            const { path: docPath } = await uploadRes.json();

            // 2. Update documents.json
            const newDocument: Document = {
                id: Date.now(),
                title: form.title.trim(),
                path: docPath,
                uploadDate: new Date().toISOString().split("T")[0],
            };
            const updatedDocuments = [...documents, newDocument];

            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "documents.json", data: updatedDocuments }),
            });
            if (!saveRes.ok) throw new Error("Failed to save document data");

            // 3. Update local state
            setDocuments(updatedDocuments);
            setShowModal(false);
            setForm({ title: "", file: null });
            setNotification({ message: "Document added successfully!", type: 'success' });
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
            const docToDelete = documents.find((doc) => doc.id === idToDelete);
            
            // 1. Delete PDF file from server
            if (docToDelete) {
                const deleteFileRes = await fetch("/api/delete-file", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ filePath: docToDelete.path }),
                });
                if (!deleteFileRes.ok) {
                    const err = await deleteFileRes.json();
                    throw new Error(err.error || "Failed to delete file");
                }
            }

            // 2. Remove from documents.json
            const updatedDocuments = documents.filter((doc) => doc.id !== idToDelete);
            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "documents.json", data: updatedDocuments }),
            });
            if (!saveRes.ok) throw new Error("Failed to delete document record");
            
            setDocuments(updatedDocuments);
            setIdToDelete(null);
            setNotification({ message: "Document deleted successfully!", type: 'success' });
        } catch (err: unknown) {
            setNotification({ message: err instanceof Error ? err.message : "Failed to delete document", type: 'error' });
        } finally {
            setIsDeleting(false);
        }
    };

    const closeModal = () => {
        if (saving) return;
        setShowModal(false);
        setForm({ title: "", file: null });
        setSaveError(null);
    };

    useEffect(() => {
        document.body.style.overflow =
            showModal || idToDelete !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal, idToDelete]);

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
                            Documents
                        </h1>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                            Download company documents, certifications, and reports
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
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Documents</span>
                    </nav>
                </div>
            </section>

            {/* ── Header + Add Button ── */}
            <div
                style={{
                    background: "#f7f9fa",
                    borderBottom: "1px solid #e5e9ec",
                    padding: "20px 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.navy, fontFamily: "'Arial',sans-serif" }}>
                            Available Documents
                        </h2>
                        <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.muted, fontFamily: "'Arial',sans-serif" }}>
                            {documents.length} document{documents.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Add Document button — right-aligned, admin only */}
                    {isLoggedIn && (
                        <button
                            id="add-document-btn"
                            onClick={() => setShowModal(true)}
                            style={{
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
                            Add Document
                        </button>
                    )}
                </div>
            </div>

            {/* ── Documents Grid (Card View) ── */}
            <section style={{ padding: "40px", background: "#fff", minHeight: "60vh" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: 80, color: COLORS.muted, fontFamily: "'Arial',sans-serif" }}>
                            Loading documents…
                        </div>
                    ) : documents.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 60, color: COLORS.muted }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                            <p style={{ fontFamily: "'Arial',sans-serif", fontSize: 16, fontWeight: 600, margin: 0 }}>
                                No documents available yet
                            </p>
                            <p style={{ fontFamily: "'Arial',sans-serif", fontSize: 14, margin: "6px 0 0", color: "#999" }}>
                                Check back soon for documents and certifications
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: 24,
                            }}
                        >
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    style={{
                                        background: "#fff",
                                        border: "1px solid #e5e9ec",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* Card Header */}
                                    <div
                                        style={{
                                            background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 100%)`,
                                            padding: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <div style={{ fontSize: 32, lineHeight: 1 }}>📑</div>
                                        <div style={{ flex: 1 }}>
                                            <h3
                                                style={{
                                                    margin: 0,
                                                    color: "#fff",
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    fontFamily: "'Arial',sans-serif",
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {doc.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div
                                        style={{
                                            padding: "16px 20px",
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <div style={{ marginBottom: 16 }}>
                                            <p style={{ margin: 0, fontSize: 12, color: COLORS.muted, fontFamily: "'Arial',sans-serif", fontWeight: 600, letterSpacing: 0.2, textTransform: "uppercase" }}>
                                                Upload Date
                                            </p>
                                            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#333", fontFamily: "'Arial',sans-serif", fontWeight: 500 }}>
                                                {new Date(doc.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </p>
                                        </div>

                                        {/* File info */}
                                        <div
                                            style={{
                                                padding: "12px",
                                                background: "#f5f7f9",
                                                borderRadius: 8,
                                                marginBottom: 16,
                                                borderLeft: `4px solid ${COLORS.teal}`,
                                            }}
                                        >
                                            <p style={{ margin: 0, fontSize: 11, color: COLORS.muted, fontFamily: "'Arial',sans-serif", fontWeight: 600 }}>
                                                📄 PDF Document
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div
                                        style={{
                                            padding: "12px 20px",
                                            borderTop: "1px solid #e5e9ec",
                                            display: "flex",
                                            gap: 8,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <button
                                            onClick={() => window.open(doc.path, '_blank')}
                                            style={{
                                                flex: 1,
                                                minWidth: 100,
                                                background: COLORS.teal,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 6,
                                                padding: "8px 12px",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "'Arial',sans-serif",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 5,
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = "#065966";
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = COLORS.teal;
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                            }}
                                        >
                                           
                                            View
                                        </button>

                                        <a
                                            href={doc.path}
                                            download
                                            style={{
                                                flex: 1,
                                                minWidth: 100,
                                                background: COLORS.orange,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 6,
                                                padding: "8px 12px",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "'Arial',sans-serif",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 5,
                                                textDecoration: "none",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = "#d4640a";
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = COLORS.orange;
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                            }}
                                        >
                                            <span>⬇️</span>
                                            Download
                                        </a>

                                        {isLoggedIn && (
                                            <button
                                                onClick={() => setIdToDelete(doc.id)}
                                                style={{
                                                    background: "#e74c3c",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 6,
                                                    padding: "8px 12px",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    cursor: "pointer",
                                                    fontFamily: "'Arial',sans-serif",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 4,
                                                    transition: "all 0.2s",
                                                    flex: "0 1 auto",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = "#c0392b";
                                                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = "#e74c3c";
                                                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                                }}
                                            >
                                                <span>🗑️</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Add Document Modal ── */}
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
                                    Add New Document
                                </h2>
                                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "'Arial',sans-serif" }}>
                                    Upload a PDF file
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
                                {form.file ? (
                                    <div style={{ textAlign: "center", padding: "16px 20px" }}>
                                        <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
                                        <p style={{ margin: 0, fontFamily: "'Arial',sans-serif", fontSize: 14, color: COLORS.teal, fontWeight: 600 }}>
                                            {form.file.name}
                                        </p>
                                        <p style={{ margin: "6px 0 0", fontFamily: "'Arial',sans-serif", fontSize: 12, color: "#999" }}>
                                            ({(form.file.size / 1024 / 1024).toFixed(2)} MB)
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: "center", padding: "32px 20px" }}>
                                        <div style={{ fontSize: 36, marginBottom: 10 }}>📄</div>
                                        <p style={{ margin: 0, fontFamily: "'Arial',sans-serif", fontSize: 14, color: "#666", fontWeight: 600 }}>
                                            Click or drag &amp; drop a PDF
                                        </p>
                                        <p style={{ margin: "6px 0 0", fontFamily: "'Arial',sans-serif", fontSize: 12, color: "#aaa" }}>
                                            PDF files only
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,application/pdf"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleFile(f);
                                }}
                            />

                            {/* Title Input */}
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
                                    Document Title *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Company Certification 2024"
                                    value={form.title}
                                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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
                                    id="save-document-btn"
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
                                        "Upload Document"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={idToDelete !== null}
                title="Delete Document"
                message="Are you sure you want to delete this document? This action cannot be undone."
                confirmText={isDeleting ? "Deleting..." : "Delete Document"}
                onConfirm={confirmDelete}
                onCancel={() => setIdToDelete(null)}
            />

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
