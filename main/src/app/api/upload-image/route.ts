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

        // Validate image type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
        }

        // Sanitize filename and make it unique
        const ext = file.name.split(".").pop() || "jpg";
        const baseName = file.name
            .replace(/\.[^.]+$/, "")
            .replace(/[^a-zA-Z0-9_\-]/g, "_")
            .slice(0, 60);
        const uniqueName = `${baseName}_${Date.now()}.${ext}`;

        const uploadDir = path.join(process.cwd(), "public", "Gallary");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ success: true, path: `/Gallary/${uniqueName}` });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
