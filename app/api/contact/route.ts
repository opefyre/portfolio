import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic server-side validation
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Generate a pseudo-cryptographic request ID for the cinematic ticket
        const requestId = `REQ-${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(1).toString('hex').toUpperCase()}`;

        const submission = {
            name,
            email,
            message,
            requestId,
            createdAt: new Date().toISOString(),
            status: "unread"
        };

        // Push to Firebase directly
        await db.collection('inquiries').add(submission);

        // Intentionally delay the response slightly (1.5s) to allow the loading animation to play out
        // before snapping to the cinematic Transmission Ticket.
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json({
            success: true,
            ticket: {
                id: requestId,
                timestamp: submission.createdAt
            }
        });
    } catch (error) {
        console.error("Firebase Submission Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to transmit message securely" },
            { status: 500 }
        );
    }
}
