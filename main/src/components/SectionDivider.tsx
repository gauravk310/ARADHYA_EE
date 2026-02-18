"use client";

import React from "react";
import { COLORS } from "./constants";

export default function SectionDivider() {
    return (
        <div
            style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ width: 55, height: 2, background: "#ccc" }} />
                <div
                    style={{
                        width: 10,
                        height: 10,
                        background: COLORS.blue,
                        transform: "rotate(45deg)",
                        margin: "0 -1px",
                    }}
                />
                <div style={{ width: 55, height: 2, background: "#ccc" }} />
            </div>
        </div>
    );
}
