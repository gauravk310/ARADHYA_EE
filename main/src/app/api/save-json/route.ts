import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_FILES = [
    "projects.json",
    "media-projects.json",
    "gallery.json",
    "vision.json",
    "references.json",
    "site-data.json",
];

export async function POST(req: NextRequest) {
    const { filename, data } = await req.json();

    if (!ALLOWED_FILES.includes(filename)) {
        return NextResponse.json({ error: "File not allowed" }, { status: 403 });
    }

    const filePath = path.join(process.cwd(), "public", "data", filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
