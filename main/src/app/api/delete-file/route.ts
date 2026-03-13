import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const { filePath } = await req.json();

        if (!filePath) {
            return NextResponse.json({ error: "No file path provided" }, { status: 400 });
        }

        // Security: Only allow deleting files from allowed folders
        const allowedFolders = ["/documents/", "/Gallary/", "/Projects/"];
        const isFolderAllowed = allowedFolders.some(folder => filePath.startsWith(folder));
        
        if (!isFolderAllowed) {
            return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
        }

        const fullPath = path.join(process.cwd(), "public", filePath);
        
        // Additional security check - prevent directory traversal
        const normalizedPath = path.normalize(fullPath);
        const publicDir = path.join(process.cwd(), "public");
        if (!normalizedPath.startsWith(publicDir)) {
            return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
        }

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        // Delete the file
        fs.unlinkSync(fullPath);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
