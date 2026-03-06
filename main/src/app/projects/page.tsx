"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";

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

const EMPTY_PROJECT: Omit<ProjectItem, "id"> = {
    date: "",
    title: "",
    description: "",
    client: "",
    category: "",
    location: "",
};

// ─── Modal Component ────────────────────────────────────────────────────────
function ProjectModal({
    title,
    initial,
    onSave,
    onClose,
    saving,
}: {
    title: string;
    initial: Omit<ProjectItem, "id">;
    onSave: (data: Omit<ProjectItem, "id">) => void;
    onClose: () => void;
    saving: boolean;
}) {
    const [form, setForm] = useState(initial);

    const set = (k: keyof typeof form, v: string) =>
        setForm((prev) => ({ ...prev, [k]: v }));

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
                    maxWidth: 640,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
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
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
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

                {/* Form Body */}
                <div style={{ padding: "28px 28px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                        {/* Title - full width */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>Project Title *</label>
                            <input
                                style={inputStyle}
                                value={form.title}
                                onChange={(e) => set("title", e.target.value)}
                                placeholder="Enter project title"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Description - full width */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>Description *</label>
                            <textarea
                                style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                                value={form.description}
                                onChange={(e) => set("description", e.target.value)}
                                placeholder="Enter project description"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Client */}
                        <div>
                            <label style={labelStyle}>Client *</label>
                            <input
                                style={inputStyle}
                                value={form.client}
                                onChange={(e) => set("client", e.target.value)}
                                placeholder="Client name"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label style={labelStyle}>Date *</label>
                            <input
                                style={inputStyle}
                                value={form.date}
                                onChange={(e) => set("date", e.target.value)}
                                placeholder="e.g. January 02, 2026"
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label style={labelStyle}>Category *</label>
                            <select
                                style={{ ...inputStyle, cursor: "pointer" }}
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                            >
                                <option value="">Select category</option>
                                <option value="Transmission">Transmission</option>
                                <option value="Railways">Railways</option>
                                <option value="Civil">Civil</option>
                                <option value="Distribution">Distribution</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label style={labelStyle}>Location *</label>
                            <input
                                style={inputStyle}
                                value={form.location}
                                onChange={(e) => set("location", e.target.value)}
                                placeholder="e.g. Delhi, Odisha"
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
                            disabled={saving || !form.title || !form.description || !form.client}
                            style={{
                                padding: "10px 28px",
                                background:
                                    saving || !form.title || !form.description || !form.client
                                        ? "#aaa"
                                        : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`,
                                border: "none",
                                borderRadius: 7,
                                fontSize: 14,
                                fontWeight: 700,
                                cursor:
                                    saving || !form.title || !form.description || !form.client
                                        ? "not-allowed"
                                        : "pointer",
                                color: "#fff",
                                fontFamily: "'Arial', sans-serif",
                                letterSpacing: 0.3,
                            }}
                        >
                            {saving ? "Saving…" : "Save Project"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const { isLoggedIn } = useAuth();
    const [data, setData] = useState<ProjectsData | null>(null);
    const [modal, setModal] = useState<{
        mode: "add" | "edit";
        year: number;
        project?: ProjectItem;
    } | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{
        year: number;
        id: string;
    } | null>(null);

    useEffect(() => {
        fetch("/data/projects.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const saveToServer = async (newData: ProjectsData) => {
        const res = await fetch("/api/save-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: "projects.json", data: newData }),
        });
        return res.ok;
    };

    const handleSave = async (formData: Omit<ProjectItem, "id">) => {
        if (!data || !modal) return;
        setSaving(true);

        let newData: ProjectsData;

        if (modal.mode === "add") {
            const newId = `proj-${modal.year}-${Date.now()}`;
            const newItem: ProjectItem = { id: newId, ...formData };

            // Find or create the year group
            const yearIndex = data.projects.findIndex((p) => p.year === modal.year);
            if (yearIndex >= 0) {
                const updated = [...data.projects];
                updated[yearIndex] = {
                    ...updated[yearIndex],
                    items: [newItem, ...updated[yearIndex].items],
                };
                newData = { projects: updated };
            } else {
                // Insert new year group sorted descending
                const newGroup: ProjectYear = { year: modal.year, items: [newItem] };
                const updated = [newGroup, ...data.projects].sort((a, b) => b.year - a.year);
                newData = { projects: updated };
            }
        } else {
            // Edit mode
            newData = {
                projects: data.projects.map((yg) => ({
                    ...yg,
                    items: yg.items.map((item) =>
                        item.id === modal.project?.id ? { ...item, ...formData } : item
                    ),
                })),
            };
        }

        const ok = await saveToServer(newData);
        setSaving(false);
        if (ok) {
            setData(newData);
            setModal(null);
            showToast(modal.mode === "add" ? "✅ Project added successfully!" : "✅ Project updated!");
        } else {
            showToast("❌ Failed to save. Please try again.");
        }
    };

    const handleDelete = async (year: number, id: string) => {
        if (!data) return;
        setSaving(true);
        const newData: ProjectsData = {
            projects: data.projects
                .map((yg) => ({
                    ...yg,
                    items: yg.items.filter((item) => item.id !== id),
                }))
                .filter((yg) => yg.items.length > 0),
        };
        const ok = await saveToServer(newData);
        setSaving(false);
        setDeleteConfirm(null);
        if (ok) {
            setData(newData);
            showToast("🗑️ Project deleted.");
        } else {
            showToast("❌ Delete failed.");
        }
    };

    const currentYear = new Date().getFullYear();

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
                <ProjectModal
                    title={
                        modal.mode === "add"
                            ? `Add Project — ${modal.year}`
                            : "Edit Project"
                    }
                    initial={
                        modal.project
                            ? {
                                date: modal.project.date,
                                title: modal.project.title,
                                description: modal.project.description,
                                client: modal.project.client,
                                category: modal.project.category,
                                location: modal.project.location,
                            }
                            : { ...EMPTY_PROJECT }
                    }
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                    saving={saving}
                />
            )}

            {/* ── Delete Confirm ── */}
            {deleteConfirm && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(10,20,40,0.65)",
                        zIndex: 9000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: "32px 36px",
                            maxWidth: 400,
                            textAlign: "center",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontFamily: "'Georgia', serif",
                                fontSize: 18,
                                color: COLORS.navy,
                            }}
                        >
                            Delete Project?
                        </h3>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#666",
                                marginBottom: 24,
                                fontFamily: "'Arial', sans-serif",
                            }}
                        >
                            This action cannot be undone. The project will be permanently removed.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                            <button
                                onClick={() => setDeleteConfirm(null)}
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
                                onClick={() =>
                                    handleDelete(deleteConfirm.year, deleteConfirm.id)
                                }
                                disabled={saving}
                                style={{
                                    padding: "10px 24px",
                                    background: "#e74c3c",
                                    border: "none",
                                    borderRadius: 7,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    cursor: saving ? "not-allowed" : "pointer",
                                    color: "#fff",
                                    fontFamily: "'Arial', sans-serif",
                                }}
                            >
                                {saving ? "Deleting…" : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

            {/* ── Admin: Add New Project ── */}
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
                            maxWidth: 1100,
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
                            🔧 Admin Mode — You can add, edit or delete projects
                        </span>
                        <button
                            id="add-project-btn"
                            onClick={() =>
                                setModal({ mode: "add", year: currentYear })
                            }
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
                            + Add New Project
                        </button>
                    </div>
                </div>
            )}

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
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                    flexWrap: "wrap",
                                    gap: 8,
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        fontSize: 24,
                                        fontWeight: 700,
                                        color: COLORS.teal,
                                        margin: 0,
                                        paddingBottom: 8,
                                        display: "inline-block",
                                        borderBottom: `3px solid ${COLORS.orange}`,
                                    }}
                                >
                                    {yearGroup.year}
                                </h2>
                                {/* Admin: Add project to this year */}
                                {isLoggedIn && (
                                    <button
                                        onClick={() =>
                                            setModal({ mode: "add", year: yearGroup.year })
                                        }
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            padding: "6px 14px",
                                            background: COLORS.teal,
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: 5,
                                            fontSize: 12.5,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            fontFamily: "'Arial', sans-serif",
                                        }}
                                    >
                                        + Add to {yearGroup.year}
                                    </button>
                                )}
                            </div>

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

                                        {/* Admin edit/delete buttons */}
                                        {isLoggedIn && (
                                            <span style={{ marginLeft: 10, display: "inline-flex", gap: 6, verticalAlign: "middle" }}>
                                                <button
                                                    onClick={() =>
                                                        setModal({
                                                            mode: "edit",
                                                            year: yearGroup.year,
                                                            project,
                                                        })
                                                    }
                                                    title="Edit project"
                                                    style={{
                                                        padding: "2px 10px",
                                                        background: COLORS.teal,
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: 4,
                                                        fontSize: 11.5,
                                                        cursor: "pointer",
                                                        fontFamily: "'Arial', sans-serif",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDeleteConfirm({
                                                            year: yearGroup.year,
                                                            id: project.id,
                                                        })
                                                    }
                                                    title="Delete project"
                                                    style={{
                                                        padding: "2px 10px",
                                                        background: "#e74c3c",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: 4,
                                                        fontSize: 11.5,
                                                        cursor: "pointer",
                                                        fontFamily: "'Arial', sans-serif",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
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
