"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { COLORS } from "@/components/constants";
import { useAuth } from "@/context/AuthContext";

interface PageContent {
    intro1: string;
    intro2: string;
    intro3: string;
    intro4: string;
    bulletPoints: string[];
}

interface ServicesData {
    pageContent: PageContent;
}

const DEFAULT_PAGE_CONTENT: PageContent = {
    intro1: "Distribution and Retail Supply is the most critical link in the electricity market, which interfaces with the end customers and provides revenue for the entire value chain. In pursuance of reforms in the Power Sector, Government has introduced various models of New Connection, Smart Meter Installation, Meter Reading, Bill Generation, Bill Distribution & Revenue Collection in the distribution segment, both at the rural and urban level.",
    intro2: "ARADHYA EE worked with TPDDL (erstwhile NDPL) in renovation of old electrical infrastructure of Delhi. Also, ARADHYA EE provides services in Meter Installation, Complete Operation & Maintenance of Zone, System Augmentation, Survey and Energy Audit, Meter Reading & Bills Distribution, GIS Mapping, Street Lighting.",
    intro3: "The company has evolved on its own to develop and manage sophisticated distribution system to improve the AT&C losses level with effective plans and better synchronization amongst man, machine & material. The company has devised methods for energy conversation & technical loss reduction in transmission & distribution and better performance through renovation & modernization of older electrical infrastructure to reduce need for capacity addition as per demand.",
    intro4: "The company has various plans to reduce the AT & C losses and improve the existing distribution system, as enumerated below:",
    bulletPoints: [
        "Metering of all categories of consumers",
        "Energy Audit at 11 KV feeders",
        "Effective MIS",
        "Identification and Elimination of theft",
        "Increase in transformer capacity",
        "Increase in HT/LT ratio",
    ],
};

export default function ServicesPage() {
    const { isLoggedIn } = useAuth();
    const [pageContent, setPageContent] = useState<PageContent>(DEFAULT_PAGE_CONTENT);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState<PageContent>(DEFAULT_PAGE_CONTENT);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");

    useEffect(() => {
        fetch("/data/services.json")
            .then((r) => r.json())
            .then((d: ServicesData) => {
                if (d.pageContent) {
                    setPageContent(d.pageContent);
                    setEditData(d.pageContent);
                }
            })
            .catch(() => { /* use defaults */ });
    }, []);

    const openEdit = () => {
        setEditData({ ...pageContent, bulletPoints: [...pageContent.bulletPoints] });
        setSaveMsg("");
        setShowEditModal(true);
    };

    const closeEdit = () => setShowEditModal(false);

    const handleBulletChange = (idx: number, val: string) => {
        const updated = [...editData.bulletPoints];
        updated[idx] = val;
        setEditData({ ...editData, bulletPoints: updated });
    };

    const addBullet = () => {
        setEditData({ ...editData, bulletPoints: [...editData.bulletPoints, ""] });
    };

    const removeBullet = (idx: number) => {
        const updated = editData.bulletPoints.filter((_, i) => i !== idx);
        setEditData({ ...editData, bulletPoints: updated });
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveMsg("");
        try {
            // Fetch full file, merge, save
            const res = await fetch("/data/services.json");
            const fullData = await res.json();
            fullData.pageContent = editData;
            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "services.json", data: fullData }),
            });
            if (saveRes.ok) {
                setPageContent({ ...editData, bulletPoints: [...editData.bulletPoints] });
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

    return (
        <main
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 15,
                color: "#333",
                margin: 0,
                background: "#fff",
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
                        Services
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
                        <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                            Services
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
                            maxWidth: 1100,
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
                            ✏️ Edit Page Content
                        </button>
                    </div>
                </div>
            )}

            {/* ── Services Content ── */}
            <section
                style={{
                    padding: "48px 40px 80px",
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                    }}
                >
                    {/* Featured Image */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 900,
                            margin: "0 auto 50px",
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src="/railways-hero.jpg"
                            alt="Railway Track Sunset"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                maxHeight: 500,
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <div style={{ maxWidth: 950, margin: "0 auto" }}>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            {pageContent.intro1}
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            <strong>ARADHYA EE</strong>{" "}
                            {pageContent.intro2.replace(/^ARADHYA EE\s*/i, "")}
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            {pageContent.intro3}
                        </p>

                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "#444",
                                marginBottom: 24,
                                textAlign: "justify",
                            }}
                        >
                            {pageContent.intro4}
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                paddingLeft: 20,
                                margin: 0,
                            }}
                        >
                            {pageContent.bulletPoints.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        fontSize: 15.5,
                                        lineHeight: 1.6,
                                        color: "#444",
                                        marginBottom: 12,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            background: COLORS.orange,
                                            borderRadius: "50%",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />

            {/* ── Edit Modal ── */}
            {showEditModal && (
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
                                ✏️ Edit Services Page Content
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
                            {(["intro1", "intro2", "intro3", "intro4"] as const).map((field, idx) => (
                                <div key={field} style={{ marginBottom: 20 }}>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: COLORS.navy,
                                            marginBottom: 6,
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        Paragraph {idx + 1}
                                    </label>
                                    <textarea
                                        value={editData[field]}
                                        onChange={(e) =>
                                            setEditData({ ...editData, [field]: e.target.value })
                                        }
                                        rows={4}
                                        style={{
                                            width: "100%",
                                            padding: "10px 14px",
                                            border: `1.5px solid #d0d0d0`,
                                            borderRadius: 6,
                                            fontSize: 14,
                                            lineHeight: 1.6,
                                            fontFamily: "Arial, sans-serif",
                                            color: "#333",
                                            resize: "vertical",
                                            outline: "none",
                                            boxSizing: "border-box",
                                            transition: "border-color 0.2s",
                                        }}
                                        onFocus={(e) =>
                                            ((e.target as HTMLTextAreaElement).style.borderColor = COLORS.blue)
                                        }
                                        onBlur={(e) =>
                                            ((e.target as HTMLTextAreaElement).style.borderColor = "#d0d0d0")
                                        }
                                    />
                                </div>
                            ))}

                            {/* Bullet Points */}
                            <div style={{ marginBottom: 20 }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: COLORS.navy,
                                        marginBottom: 10,
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    Bullet Points
                                </label>
                                {editData.bulletPoints.map((bp, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginBottom: 8,
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 8,
                                                height: 8,
                                                background: COLORS.orange,
                                                borderRadius: "50%",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <input
                                            type="text"
                                            value={bp}
                                            onChange={(e) => handleBulletChange(idx, e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: "8px 12px",
                                                border: "1.5px solid #d0d0d0",
                                                borderRadius: 6,
                                                fontSize: 14,
                                                fontFamily: "Arial, sans-serif",
                                                color: "#333",
                                                outline: "none",
                                                transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) =>
                                                ((e.target as HTMLInputElement).style.borderColor = COLORS.blue)
                                            }
                                            onBlur={(e) =>
                                                ((e.target as HTMLInputElement).style.borderColor = "#d0d0d0")
                                            }
                                        />
                                        <button
                                            onClick={() => removeBullet(idx)}
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
                                    onClick={addBullet}
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
                                    + Add Bullet Point
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
