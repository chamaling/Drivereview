"use server"
import { actionClient } from '@/lib/actionClient';
import { z } from 'zod';
import { cookies } from 'next/headers';
import serverConfig from '@/lib/config/server';
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new OAuth2Client(
    serverConfig.GOOGLE_CLIENT_ID,
    serverConfig.GOOGLE_CLIENT_SECRET,
);

export const authenticateUserAction = actionClient.inputSchema(
    z.object({
        code: z.string()
    })
).action(async ({parsedInput}) => {
    const {code} = parsedInput;
    console.log("Received authorization code in server action:", code);
    try {
    const {tokens} = await oauth2Client.getToken(code);
    const cookieStore = await cookies();
    const sessionId = crypto.randomUUID();
    cookieStore.set("session", sessionId , {
        httpOnly: true,
        secure: serverConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 // 1 hour
    });
} catch (error) {
    console.error("Error exchanging code for tokens:", error);
    throw new Error("Authentication failed. Please try again.");
}
})