"use client";

import React from "react";
import { COLORS } from "./constants";
import SectionDivider from "./SectionDivider";

const styles: Record<string, React.CSSProperties> = {
    aboutSection: { background: "#fff", padding: "80px 40px" },
    aboutGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
    },
    aboutImages: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 6,
    },
    aboutImg: {
        width: "100%",
        height: 140,
        objectFit: "cover",
        display: "block",
        transition: "transform 0.3s, filter 0.3s",
    },
    aboutImgWide: {
        width: "100%",
        height: 185,
        objectFit: "cover",
        display: "block",
        gridColumn: "1 / -1",
        transition: "transform 0.3s, filter 0.3s",
    },
    aboutH2: {
        fontFamily: "'Georgia', serif",
        fontSize: 30,
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: 18,
    },
    aboutP: { color: COLORS.muted, lineHeight: 1.85, marginBottom: 14 },
    readMore: {
        color: COLORS.blue,
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        transition: "color 0.2s",
    },
    featureRow: {
        display: "flex",
        gap: 18,
        marginTop: 26,
        alignItems: "flex-start",
    },
    featureIcon: {
        width: 56,
        height: 56,
        background: COLORS.lightBlue,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: COLORS.blue,
        fontSize: 22,
        transition: "background 0.2s, transform 0.2s",
    },
    featureH3: {
        color: COLORS.blue,
        fontSize: 17,
        fontWeight: 700,
        marginBottom: 6,
        fontFamily: "'Georgia', serif",
    },
    featureP: { color: "#666", fontSize: 14, lineHeight: 1.7 },
};

const features = [
    {
        icon: "👁",
        title: "Vision & Mission",
        desc: "Vision – To be an acclaimed company partnering in India's growth in Power Distribution, Engineering and Project Management. Our Mission – Focussed on delivering excellence in every project we undertake.",
    },
    {
        icon: "≡",
        title: "Message from MD",
        desc: "'ARADHYA ELECTRICALS & ENTERPRISES – Powering India's Growth Journey By Constructing Infrastructure of National Importance.' Dear Stakeholders, Warm Greetings! As we continue to grow...",
    },
];

const aboutImages = [
    {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        alt: "Transmission",
        wide: false,
    },
    {
        src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
        alt: "Electrical Work",
        wide: false,
    },
    {
        src: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80",
        alt: "Railways",
        wide: false,
    },
    {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        alt: "Civil Construction",
        wide: true,
    },
];

export default function AboutSection() {
    return (
        <section style={styles.aboutSection} id="about">
            <h2
                style={{
                    textAlign: "center",
                    fontFamily: "'Georgia', serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: COLORS.navy,
                    marginBottom: 12,
                }}
            >
                About Us
            </h2>
            <SectionDivider />
            <div style={styles.aboutGrid}>
                {/* Images */}
                <div style={styles.aboutImages}>
                    {aboutImages.map((img) => (
                        <img
                            key={img.alt}
                            style={img.wide ? styles.aboutImgWide : styles.aboutImg}
                            src={img.src}
                            alt={img.alt}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                                (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div>
                    <h2 style={styles.aboutH2}>About ARADHYA ELECTRICALS</h2>
                    <p style={styles.aboutP}>
                        ARADHYA ELECTRICALS & ENTERPRISES is an established electrical
                        services company with diversified interests in Power Transmission,
                        Electrical Contracting, and Civil Infrastructure offering
                        comprehensive services from concept to commissioning...
                    </p>
                    <a
                        href="#"
                        style={styles.readMore}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = COLORS.darkBlue)
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = COLORS.blue)
                        }
                    >
                        Read More &gt;&gt;
                    </a>

                    {features.map((f) => (
                        <div key={f.title} style={styles.featureRow}>
                            <div
                                style={styles.featureIcon}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = COLORS.blue;
                                    (e.currentTarget as HTMLElement).style.color = "#fff";
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = COLORS.lightBlue;
                                    (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                }}
                            >
                                {f.icon}
                            </div>
                            <div>
                                <h3 style={styles.featureH3}>{f.title}</h3>
                                <p style={styles.featureP}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
