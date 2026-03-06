"use client";

import React from "react";
import { COLORS } from "./constants";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    type = "danger"
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const accentColor = type === "danger" ? "#e74c3c" : type === "warning" ? "#f39c12" : COLORS.blue;
    const icon = type === "danger" ? "⚠️" : type === "warning" ? "❓" : "ℹ️";

    return (
        <div
            onClick={onCancel}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10,20,35,0.75)",
                zIndex: 10001,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    width: "100%",
                    maxWidth: 400,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
                    overflow: "hidden",
                    textAlign: "center",
                    padding: "32px 28px",
                    fontFamily: "'Arial', sans-serif",
                }}
            >
                <div style={{
                    width: 64,
                    height: 64,
                    background: `${accentColor}15`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    margin: "0 auto 20px",
                    color: accentColor
                }}>
                    {icon}
                </div>

                <h3 style={{
                    margin: "0 0 10px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.navy,
                }}>
                    {title}
                </h3>

                <p style={{
                    margin: "0 0 28px",
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.5,
                }}>
                    {message}
                </p>

                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            borderRadius: 8,
                            border: "1.5px solid #dde3e8",
                            background: "#fff",
                            color: "#555",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: "12px 0",
                            borderRadius: 8,
                            border: "none",
                            background: accentColor,
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: `0 4px 12px ${accentColor}40`,
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
