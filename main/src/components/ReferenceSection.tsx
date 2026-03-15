"use client";

import React, { useState, useEffect } from "react";
import { COLORS } from "./constants";
import SectionDivider from "./SectionDivider";

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
    const [data, setData] = useState<HomeReferences>({
        transmission: [],
        railway_civil: []
    });

    useEffect(() => {
        fetch("/data/references.json")
            .then(r => r.json())
            .then(d => {
                if (d.homeReferences) {
                    setData(d.homeReferences);
                }
            })
            .catch(e => console.error("Failed to fetch references:", e));
    }, []);

    return (
        <section style={styles.referenceSection} id="reference">
            <h2 style={styles.sectionTitle}>Our References</h2>
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
        </section>
    );
}
