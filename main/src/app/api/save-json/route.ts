import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { logger } from "@/lib/logger";

const ALLOWED_FILES = [
    "projects.json",
    "media-projects.json",
    "gallery.json",
    "documents.json",
    "vision.json",
    "references.json",
    "site-data.json",
    "services.json",
];

export async function POST(req: NextRequest) {
    try {
        const { filename, data } = await req.json();

        logger.debug("save-json request received", { filename });

        if (!ALLOWED_FILES.includes(filename)) {
            logger.warn("Attempted to save disallowed file", { filename });
            return NextResponse.json({ error: "File not allowed" }, { status: 403 });
        }

        const filePath = path.join(process.cwd(), "public", "data", filename);
        
        logger.debug("Writing file to disk", { 
            filename, 
            filePath,
            dataSize: JSON.stringify(data).length,
        });

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
        
        logger.info("File saved successfully", { filename, filePath });
        return NextResponse.json({ success: true });
    } catch (error) {
        const err = error as Error;
        logger.error(`Failed to save JSON file`, err, {
            filename: error instanceof Object && 'filename' in error ? error.filename : 'unknown',
            cwd: process.cwd(),
            platform: process.platform,
            nodeEnv: process.env.NODE_ENV,
        });
        return NextResponse.json(
            { error: err.message }, 
            { status: 500 }
        );
    }
}
