"use client";

import React from "react";
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

const leftClients = [
    "POWER GRID CORPORATION OF INDIA LTD",
    "STERLITE POWER TRANSMISSION LTD",
    "ADANI TRANSMISSION LTD",
    "TORRENT POWER LTD",
    "TATA POWER DELHI DISTRIBUTION LTD",
    "DAKSHIN HARYANA BIJLI VITRAN NIGAM",
];

const rightClients = [
    "NORTHERN RAILWAY",
    "NORTH EASTERN RAILWAY",
    "RAIL VIKAS NIGAM LIMITED",
    "HARYANA SHAHARI VIKAS PRADHIKARAN",
    "POWER GRID CORPORATION INDIA LTD",
    "NATIONAL HIGHWAYS AUTHORITY OF INDIA",
];

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
    return (
        <section style={styles.referenceSection} id="reference">
            <h2 style={styles.sectionTitle}>Our References</h2>
            <SectionDivider />
            <div style={styles.referenceCols}>
                {[
                    { title: "Transmission Clients", items: leftClients },
                    { title: "Railway & Civil Clients", items: rightClients },
                ].map((col) => (
                    <div key={col.title}>
                        <h3 style={styles.refColH3}>{col.title}</h3>
                        {col.items.map((item) => (
                            <ClientItem key={item} name={item} />
                        ))}
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 30 }}>
                <a
                    href="#"
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
