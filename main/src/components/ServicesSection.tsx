"use client";

import React, { useState, useRef, useEffect } from "react";
import { COLORS, services } from "./constants";
import SectionDivider from "./SectionDivider";

const VISIBLE_COUNT = 3;
const GAP = 24;

export default function ServicesSection() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const maxIndex = services.length - VISIBLE_COUNT;

    useEffect(() => {
        const updateCardWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setCardWidth((containerWidth - GAP * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT);
            }
        };
        updateCardWidth();
        window.addEventListener("resize", updateCardWidth);
        return () => window.removeEventListener("resize", updateCardWidth);
    }, []);



    const translateX = currentIndex * (cardWidth + GAP);

    return (
        <section style={{ background: "#f9f9f9", padding: "80px 40px" }} id="services">
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
                Services
            </h2>
            <SectionDivider />

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    position: "relative",
                }}
            >

                {/* Cards viewport */}
                <div
                    ref={containerRef}
                    style={{
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: GAP,
                            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: `translateX(-${translateX}px)`,
                        }}
                    >
                        {services.map((s, i) => (
                            <div
                                key={s.label}
                                style={{
                                    minWidth: cardWidth || `calc((100% - ${GAP * (VISIBLE_COUNT - 1)}px) / ${VISIBLE_COUNT})`,
                                    background: COLORS.blue,
                                    color: "#fff",
                                    padding: "44px 32px",
                                    textAlign: "center",
                                    cursor: "default",
                                    transition: "transform 0.25s, box-shadow 0.25s",
                                    transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                                    boxShadow:
                                        hovered === i
                                            ? "0 14px 36px rgba(21,101,192,0.4)"
                                            : "0 2px 8px rgba(0,0,0,0.08)",
                                    boxSizing: "border-box",
                                }}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <span style={{ fontSize: 52, display: "block", marginBottom: 18 }}>
                                    {s.icon}
                                </span>
                                <h3
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        marginBottom: 16,
                                    }}
                                >
                                    {s.label}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        lineHeight: 1.75,
                                        marginBottom: 26,
                                        color: "rgba(255,255,255,0.88)",
                                    }}
                                >
                                    {s.desc}
                                </p>
                                <a
                                    href="#"
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 26px",
                                        border: "2px solid #fff",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#fff",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        transition: "background 0.2s, color 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "#fff";
                                        (e.currentTarget as HTMLElement).style.color = COLORS.blue;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                        (e.currentTarget as HTMLElement).style.color = "#fff";
                                    }}
                                >
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination dots */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 30,
                }}
            >
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: i === currentIndex ? COLORS.blue : "#ccc",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
