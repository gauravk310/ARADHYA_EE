"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Client {
    name: string;
    short: string;
    icon: string;
    category: string;
}

const categoryColors: Record<string, string> = {
    Transmission: "#0d6e7a",
    Railways: "#1a2744",
    Distribution: "#e8621a",
    Civil: "#2e7d32",
    Construction: "#5c3d2e",
};

export default function ReferencePage() {
    const { isLoggedIn } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [formData, setFormData] = useState<Client>({ name: "", short: "", icon: "⚡", category: "Transmission" });
    const [saving, setSaving] = useState(false);
    const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

    useEffect(() => {
        fetch("/data/references.json")
            .then(r => r.json())
            .then(d => {
                if (d.clients) setClients(d.clients);
            })
            .catch(e => console.error(e));
    }, []);

    const openAdd = () => {
        setEditIdx(null);
        setFormData({ name: "", short: "", icon: "⚡", category: "Transmission" });
        setShowModal(true);
    };

    const openEdit = (idx: number) => {
        setEditIdx(idx);
        setFormData(clients[idx]);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (deleteIdx === null) return;
        const newClients = clients.filter((_, i) => i !== deleteIdx);
        await saveClients(newClients);
        setDeleteIdx(null);
    };

    const handleDelete = (idx: number) => {
        setDeleteIdx(idx);
    };

    const handleSave = async () => {
        let newClients = [...clients];
        if (editIdx !== null) {
            newClients[editIdx] = formData;
        } else {
            newClients.push(formData);
        }
        await saveClients(newClients);
        setShowModal(false);
    };

    const saveClients = async (newClients: Client[]) => {
        setSaving(true);
        try {
            const res = await fetch("/data/references.json");
            const fullJson = await res.json();
            fullJson.clients = newClients;

            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "references.json", data: fullJson })
            });

            if (saveRes.ok) {
                setClients(newClients);
            }
        } catch (e) {
            console.error(e);
        }
        setSaving(false);
    };

    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                background: "#f9fbfd",
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
                        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d3a5c 50%, ${COLORS.teal} 100%)`,
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
                        Reference
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
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                        >
                            Home
                        </Link>
                        <span style={{ color: COLORS.orange }}>›</span>
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>Reference</span>
                    </nav>
                </div>
            </section>

            {/* ── Admin Toolbar ── */}
            {isLoggedIn && (
                <div style={{ background: '#fff8f4', borderBottom: `2px solid ${COLORS.orange}`, padding: '15px 40px' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: COLORS.orange }}>ADMIN PANEL - REFERENCES</span>
                        <button
                            onClick={openAdd}
                            style={{
                                padding: '10px 20px',
                                background: COLORS.orange,
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontWeight: 700
                            }}
                        >
                            + Add New Client
                        </button>
                    </div>
                </div>
            )}

            {/* ── References Grid ── */}
            <section
                style={{
                    padding: "100px 40px",
                    background: "linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                    }}
                >
                    <div style={{
                        textAlign: 'center',
                        marginBottom: 80
                    }} className="animate-fadeIn">
                        <h2 style={{
                            fontSize: 36,
                            fontWeight: 700,
                            color: COLORS.navy,
                            marginBottom: 20,
                            fontFamily: "'Georgia', serif",
                        }}>Our Prestigious Clients</h2>
                        <div style={{
                            width: 80,
                            height: 4,
                            background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.teal})`,
                            margin: '0 auto',
                            borderRadius: 10
                        }} />
                        <p style={{ color: COLORS.muted, marginTop: 24, fontSize: 16 }}>
                            We take pride in our collaborations with government and private sector giants.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 32,
                        }}
                    >
                        {clients.map((client, index) => {
                            const accentColor = categoryColors[client.category] || COLORS.teal;
                            return (
                                <div
                                    key={index}
                                    className="animate-fadeInUp"
                                    style={{
                                        background: "#fff",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        borderRadius: 16,
                                        padding: "36px 28px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: 200,
                                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        animationDelay: `${index * 0.05}s`,
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) scale(1.02)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                                        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.06)";
                                    }}
                                >
                                    {isLoggedIn && (
                                        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 5, zIndex: 10 }}>
                                            <button onClick={(e) => { e.stopPropagation(); openEdit(index); }} style={{ padding: '4px 8px', background: COLORS.teal, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 10 }}>Edit</button>
                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(index); }} style={{ padding: '4px 8px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 10 }}>Del</button>
                                        </div>
                                    )}

                                    {/* Top accent bar */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 4,
                                        background: `linear-gradient(to right, ${accentColor}, ${accentColor}88)`,
                                        borderRadius: '16px 16px 0 0',
                                    }} />

                                    {/* Icon */}
                                    <div style={{
                                        fontSize: 36,
                                        marginBottom: 16,
                                        width: 64,
                                        height: 64,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        background: `${accentColor}10`,
                                    }}>
                                        {client.icon}
                                    </div>

                                    {/* Short name */}
                                    <div style={{
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        fontSize: 20,
                                        textAlign: 'center',
                                        fontFamily: "'Georgia', serif",
                                        marginBottom: 8,
                                        lineHeight: 1.3,
                                    }}>
                                        {client.short}
                                    </div>

                                    {/* Full name */}
                                    <div style={{
                                        color: COLORS.muted,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        lineHeight: 1.4,
                                    }}>
                                        {client.name}
                                    </div>

                                    {/* Category badge */}
                                    <div style={{
                                        marginTop: 14,
                                        padding: '4px 14px',
                                        borderRadius: 20,
                                        background: `${accentColor}12`,
                                        color: accentColor,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        textTransform: 'uppercase',
                                    }}>
                                        {client.category}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />

            {/* ── Edit/Add Modal ── */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', padding: 30, borderRadius: 8, width: 400 }}>
                        <h3 style={{ marginBottom: 20 }}>{editIdx !== null ? "Edit Client" : "Add New Client"}</h3>
                        <div style={{ marginBottom: 15 }}>
                            <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Short Name</label>
                            <input value={formData.short} onChange={e => setFormData({ ...formData, short: e.target.value })} style={{ width: '100%', padding: 8 }} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Full Name</label>
                            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: 8 }} />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Category</label>
                            <input
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Transmission, Railways"
                                style={{ width: '100%', padding: 8 }}
                            />
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Icon (Emoji)</label>
                            <input value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} style={{ width: '100%', padding: 8 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: 4 }}>Cancel</button>
                            <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', background: COLORS.orange, color: '#fff', border: 'none', borderRadius: 4 }}>
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteIdx !== null}
                title="Delete Client"
                message={`Are you sure you want to delete "${deleteIdx !== null ? clients[deleteIdx]?.short : ''}"? This action cannot be undone.`}
                confirmText="Delete"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteIdx(null)}
            />
        </main>
    );
}
