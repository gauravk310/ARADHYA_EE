import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
    try {
        const logEntry = await req.json();
        
        // Re-log the client-side entry on the server
        logger.info(`[CLIENT] ${logEntry.message}`, {
            ...logEntry.context,
            level: logEntry.level,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Failed to process log entry", error as Error, {
            url: req.url,
        });
        return NextResponse.json(
            { error: "Failed to process log" },
            { status: 500 }
        );
    }
}
