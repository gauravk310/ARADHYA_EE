import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 401 });
}
