import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

        // Upload to Vercel Blob
        const blob = await put(`Gallary/${uniqueName}`, file, {
            access: "public",
        });

        return NextResponse.json({ success: true, path: blob.url });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
