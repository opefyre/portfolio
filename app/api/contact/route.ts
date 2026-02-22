import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await request.json();

        // Currently, we just mock a 2-second success delay to simulate network latency for the UI
        // In the future, this is where we plug in Resend or EmailJS
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return NextResponse.json({ success: true, message: "Message sent successfully" });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to send message" },
            { status: 500 }
        );
    }
}
