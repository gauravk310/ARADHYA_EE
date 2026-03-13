import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate PDF type
        if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
            return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
        }

        // Sanitize filename and make it unique
        const ext = "pdf";
        const baseName = file.name
            .replace(/\.pdf$/i, "")
            .replace(/[^a-zA-Z0-9_\-]/g, "_")
            .slice(0, 60);
        const uniqueName = `${baseName}_${Date.now()}.${ext}`;

        const uploadDir = path.join(process.cwd(), "public", "documents");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ success: true, path: `/documents/${uniqueName}` });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
