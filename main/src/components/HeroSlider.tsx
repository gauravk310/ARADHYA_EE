"use client";

import React, { useState, useEffect } from "react";
import { COLORS, slides } from "./constants";

const styles: Record<string, React.CSSProperties> = {
    hero: { position: "relative", height: 520, overflow: "hidden" },
    slide: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 60px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.9s ease",
    },
    slideOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,40,50,0.55)",
    },
    slideContent: {
        position: "relative",
        zIndex: 2,
        color: "#fff",
        maxWidth: 760,
    },
    slideH1: {
        fontFamily: "'Georgia', serif",
        fontSize: 50,
        fontWeight: 700,
        marginBottom: 20,
        textShadow: "0 2px 10px rgba(0,0,0,0.4)",
        letterSpacing: 1,
    },
    slideP: {
        fontSize: 16,
        lineHeight: 1.75,
        marginBottom: 30,
        maxWidth: 680,
        margin: "0 auto 28px",
    },
    sliderArrow: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.15)",
        color: "#fff",
        border: "none",
        width: 44,
        height: 64,
        fontSize: 22,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "background 0.2s",
    },
    dotsContainer: {
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        zIndex: 10,
    },
    dot: {
        height: 4,
        background: "rgba(255,255,255,0.4)",
        cursor: "pointer",
        transition: "all 0.3s",
        borderRadius: 2,
    },
    btnPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: COLORS.blue,
        color: "#fff",
        padding: "14px 32px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1.5,
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.2s, transform 0.2s",
    },
};

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(
            () => setCurrent((p) => (p + 1) % slides.length),
            5000
        );
        return () => clearInterval(t);
    }, []);

    const go = (n: number) => setCurrent((n + slides.length) % slides.length);

    return (
        <div style={styles.hero} id="home">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    style={{
                        ...styles.slide,
                        backgroundImage: `url('${slide.bg}')`,
                        opacity: i === current ? 1 : 0,
                        pointerEvents: i === current ? "auto" : "none",
                    }}
                >
                    <div style={styles.slideOverlay} />
                    <div style={styles.slideContent}>
                        <h1 style={styles.slideH1}>{slide.title}</h1>
                        <p style={styles.slideP}>{slide.desc}</p>
                        <a
                            href="#"
                            style={styles.btnPrimary}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background =
                                    COLORS.darkBlue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = COLORS.blue;
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                        >
                            KNOW MORE →
                        </a>
                    </div>
                </div>
            ))}

            {/* Left Arrow */}
            <button
                onClick={() => go(current - 1)}
                style={{ ...styles.sliderArrow, left: 10 }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.15)")
                }
                aria-label="Previous slide"
            >
                ‹
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => go(current + 1)}
                style={{ ...styles.sliderArrow, right: 10 }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.15)")
                }
                aria-label="Next slide"
            >
                ›
            </button>

            {/* Dots */}
            <div style={styles.dotsContainer}>
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        style={{
                            ...styles.dot,
                            width: i === current ? 28 : 14,
                            background:
                                i === current ? "#fff" : "rgba(255,255,255,0.45)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
