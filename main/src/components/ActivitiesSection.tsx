"use client";

import React from "react";
import { COLORS, activities } from "./constants";
import SectionDivider from "./SectionDivider";

const styles: Record<string, React.CSSProperties> = {
    activitiesSection: { background: "#f9f9f9", padding: "80px 40px" },
    sectionTitle: {
        textAlign: "center",
        fontFamily: "'Georgia', serif",
        fontSize: 34,
        fontWeight: 700,
        color: COLORS.blue,
        marginBottom: 12,
    },
    activitiesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        maxWidth: 1200,
        margin: "0 auto",
    },
    activityCard: {
        background: "#fff",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "pointer",
    },
    activityImg: {
        width: "100%",
        height: 220,
        objectFit: "cover",
        display: "block",
        transition: "transform 0.4s",
    },
    activityText: { padding: "16px 18px" },
    activityH4: {
        fontSize: 14,
        fontWeight: 600,
        color: "#333",
        lineHeight: 1.55,
    },
};

export default function ActivitiesSection() {
    return (
        <section style={styles.activitiesSection} id="activities">
            <h2 style={styles.sectionTitle}>Recent Activities</h2>
            <SectionDivider />
            <div style={styles.activitiesGrid}>
                {activities.map((a) => (
                    <div
                        key={a.title}
                        style={styles.activityCard}
                        onMouseEnter={(e) => {
                            const card = e.currentTarget as HTMLElement;
                            card.style.transform = "translateY(-6px)";
                            card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                            const img = card.querySelector("img") as HTMLElement;
                            if (img) img.style.transform = "scale(1.06)";
                        }}
                        onMouseLeave={(e) => {
                            const card = e.currentTarget as HTMLElement;
                            card.style.transform = "translateY(0)";
                            card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                            const img = card.querySelector("img") as HTMLElement;
                            if (img) img.style.transform = "scale(1)";
                        }}
                    >
                        <div style={{ overflow: "hidden" }}>
                            <img
                                src={a.img}
                                alt={a.title}
                                style={styles.activityImg}
                            />
                        </div>
                        <div style={styles.activityText}>
                            <h4 style={styles.activityH4}>{a.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
