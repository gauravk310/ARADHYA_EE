"use client";

import React, { useState, useEffect } from "react";
import { COLORS } from "./constants";
import SectionDivider from "./SectionDivider";
import { useAuth } from "@/context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

const styles: Record<string, React.CSSProperties> = {
    referenceSection: { background: "#fff", padding: "80px 40px" },
    sectionTitle: {
        textAlign: "center",
        fontFamily: "'Georgia', serif",
        fontSize: 34,
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: 12,
    },
    referenceCols: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 50,
        maxWidth: 1200,
        margin: "0 auto",
    },
    refColH3: {
        fontFamily: "'Georgia', serif",
        fontSize: 19,
        color: COLORS.navy,
        fontWeight: 700,
        marginBottom: 20,
        borderLeft: `4px solid ${COLORS.blue}`,
        paddingLeft: 14,
    },
    refItem: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 0",
        borderBottom: "1px solid #f0f0f0",
        fontSize: 14,
        color: COLORS.muted,
        transition: "color 0.2s, padding-left 0.2s",
        cursor: "default",
    },
};

interface HomeReferences {
    transmission: string[];
    railway_civil: string[];
}

function ClientItem({ name }: { name: string }) {
    return (
        <div
            style={styles.refItem}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = COLORS.muted;
                (e.currentTarget as HTMLElement).style.paddingLeft = "0px";
            }}
        >
            <span style={{ color: COLORS.blue }}>★</span> {name}
        </div>
    );
}

export default function ReferenceSection() {
    const { isLoggedIn } = useAuth();
    const [data, setData] = useState<HomeReferences>({
        transmission: [],
        railway_civil: []
    });
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState<HomeReferences>({
        transmission: [],
        railway_civil: []
    });
    const [saving, setSaving] = useState(false);
    const [deleteRowInfo, setDeleteRowInfo] = useState<{ type: 'transmission' | 'railway_civil', idx: number } | null>(null);

    useEffect(() => {
        fetch("/data/references.json")
            .then(r => r.json())
            .then(d => {
                if (d.homeReferences) {
                    setData(d.homeReferences);
                    setEditData(d.homeReferences);
                }
            })
            .catch(e => console.error("Failed to fetch references:", e));
    }, []);

    const confirmRowDelete = () => {
        if (!deleteRowInfo) return;
        const { type, idx } = deleteRowInfo;
        const news = [...editData[type]];
        news.splice(idx, 1);
        setEditData({ ...editData, [type]: news });
        setDeleteRowInfo(null);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/data/references.json");
            const fullJson = await res.json();
            fullJson.homeReferences = editData;

            const saveRes = await fetch("/api/save-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: "references.json", data: fullJson })
            });

            if (saveRes.ok) {
                setData(editData);
                setShowEdit(false);
            }
        } catch (e) {
            console.error(e);
        }
        setSaving(false);
    };

    return (
        <section style={styles.referenceSection} id="reference">
            <div style={{ position: 'relative' }}>
                <h2 style={styles.sectionTitle}>Our References</h2>
                {isLoggedIn && (
                    <button
                        onClick={() => setShowEdit(true)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            padding: '6px 12px',
                            background: COLORS.orange,
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        ✏️ Edit References
                    </button>
                )}
            </div>
            <SectionDivider />
            <div style={styles.referenceCols}>
                <div>
                    <h3 style={styles.refColH3}>Transmission Clients</h3>
                    {data.transmission.map((item, i) => (
                        <ClientItem key={i} name={item} />
                    ))}
                </div>
                <div>
                    <h3 style={styles.refColH3}>Railway & Civil Clients</h3>
                    {data.railway_civil.map((item, i) => (
                        <ClientItem key={i} name={item} />
                    ))}
                </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
                <a
                    href="/reference"
                    style={{
                        color: COLORS.blue,
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = COLORS.darkBlue)
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = COLORS.blue)
                    }
                >
                    View All Projects &gt;&gt;
                </a>
            </div>

            {showEdit && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                    <div style={{
                        background: '#fff',
                        padding: 30,
                        borderRadius: 8,
                        width: '100%',
                        maxWidth: 800,
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h3 style={{ marginBottom: 20, color: COLORS.navy }}>Edit Home Page References</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                                <h4 style={{ fontSize: 14, marginBottom: 10 }}>Transmission Clients</h4>
                                {editData.transmission.map((val, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
                                        <input
                                            value={val}
                                            onChange={(e) => {
                                                const news = [...editData.transmission];
                                                news[idx] = e.target.value;
                                                setEditData({ ...editData, transmission: news });
                                            }}
                                            style={{ flex: 1, padding: 5, fontSize: 13 }}
                                        />
                                        <button onClick={() => {
                                            if (val.trim() === "") {
                                                const news = editData.transmission.filter((_, i) => i !== idx);
                                                setEditData({ ...editData, transmission: news });
                                            } else {
                                                setDeleteRowInfo({ type: 'transmission', idx });
                                            }
                                        }} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                                    </div>
                                ))}
                                <button onClick={() => setEditData({ ...editData, transmission: [...editData.transmission, ""] })} style={{ fontSize: 12, marginTop: 5, cursor: 'pointer' }}>+ Add Row</button>
                            </div>
                            <div>
                                <h4 style={{ fontSize: 14, marginBottom: 10 }}>Railway & Civil Clients</h4>
                                {editData.railway_civil.map((val, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
                                        <input
                                            value={val}
                                            onChange={(e) => {
                                                const news = [...editData.railway_civil];
                                                news[idx] = e.target.value;
                                                setEditData({ ...editData, railway_civil: news });
                                            }}
                                            style={{ flex: 1, padding: 5, fontSize: 13 }}
                                        />
                                        <button onClick={() => {
                                            if (val.trim() === "") {
                                                const news = editData.railway_civil.filter((_, i) => i !== idx);
                                                setEditData({ ...editData, railway_civil: news });
                                            } else {
                                                setDeleteRowInfo({ type: 'railway_civil', idx });
                                            }
                                        }} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                                    </div>
                                ))}
                                <button onClick={() => setEditData({ ...editData, railway_civil: [...editData.railway_civil, ""] })} style={{ fontSize: 12, marginTop: 5, cursor: 'pointer' }}>+ Add Row</button>
                            </div>
                        </div>
                        <div style={{ marginTop: 30, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowEdit(false)} style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', background: COLORS.orange, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteRowInfo !== null}
                title="Delete Row"
                message={`Are you sure you want to delete "${deleteRowInfo ? editData[deleteRowInfo.type][deleteRowInfo.idx] : ''}"?`}
                confirmText="Delete"
                onConfirm={confirmRowDelete}
                onCancel={() => setDeleteRowInfo(null)}
            />
        </section>
    );
}
